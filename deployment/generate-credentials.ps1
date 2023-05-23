param (
    [String]
    $subscription = '233e4023-8ea5-418c-b407-2ea999d54189',
    [String]
    $aksResourceGroup = 'PrincipleK8s',
	[String]
	$aksName = 'PrincipleToolsCluster',

	[String]
	$k8sNamespace = 'principle-tools',

    [String]
    $acrName = 'PrincipleStudios',

    [String]
    $appName = 'PrincipleTools-GitHub-Actions'
)

az account set -s $subscription

# see https://aka.ms/create-secrets-for-GitHub-workflows
# version when written: https://github.com/Azure/actions-workflow-samples/blob/9a151eaa180e20378c308bcb24a3dcad7d49f22c/assets/create-secrets-for-GitHub-workflows.md
$list = (az ad sp list --display-name $appName | ConvertFrom-Json)
if ($list -ne $nil) {
	Write-Host 'Resetting old credentials - be sure to update GitHub'
    $appId = $list[0].servicePrincipalNames[0]
	$details = az ad sp credential reset --id $appId | ConvertFrom-Json
} else {
	Write-Host "Creating new credentials for app '$appName'"
	$details = az ad sp create-for-rbac --name "$appName" --skip-assignment | ConvertFrom-Json
	$appId = $details.appId

	# Adds to Principle's 'K8sContinuousIntegration' group
	az ad group member add --group 107f6fd6-054f-441b-bfe3-815b145eb5c4 --member-id $objectId > $nil

	az aks get-credentials --resource-group $azureResourceGroup -n $aksName --overwrite-existing
	kubectl -n $k8sNamespace create role ci-user-full-access --verb='*' --resource='*.*'
	kubectl -n $k8sNamespace create rolebinding ci-user-access --role='ci-user-full-access' --user="$($objectId)"
}

$objectId = az ad sp show --id $appId --query id -o tsv

# Remove all old roles
$previousRoles = az role assignment list --assignee $objectId | ConvertFrom-Json
if ($previousRoles -ne $nil) {
	az role assignment delete --ids $($previousRoles | ForEach-Object { $_.id})
}

# grant access to push/pull from Azure Container Registry
az role assignment create `
    --role AcrPush `
	--assignee $objectId `
    --scope $(az acr show --name $acrName --query id -o tsv) `
    --only-show-errors > $nil

# grant access to log into the k8s cluster
az role assignment create `
	--assignee $objectId `
	--role 'Azure Kubernetes Service Cluster User Role' `
	--scope $(az aks show --resource-group $aksResourceGroup --name $aksName --query id -o tsv) > $nil

# grant access to a namespace
az role assignment create `
    --role "Azure Kubernetes Service RBAC Writer" `
    --assignee $objectId `
    --scope "$(az aks show `
        --resource-group $aksResourceGroup `
        --name $aksName `
        --query id -o tsv)/namespaces/$($k8sNamespace)" `
    --only-show-errors > $nil

# order is alphabetical to reflect what it shows in github, each key is its own secret without quotes
@{
    AZ_CLIENT_ID = $($details.appId)
    AZ_CLIENT_SECRET = $($details.password)
	AZ_SUBSCRIPTION_ID = $($subscription)
	AZ_TENANT_ID = $($details.tenant)
} | ConvertTo-Json
