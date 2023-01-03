param (
    [String]
    $subscription = '233e4023-8ea5-418c-b407-2ea999d54189',
    [String]
    $aksResourceGroup = 'PrincipleK8s',
    [String]
    $aksName = 'PrincipleToolsCluster',
    [String]
    $acrName = 'PrincipleStudios',

    [String]
    $appName = 'PrincipleTools-GitHub-Actions'
)

# see https://aka.ms/create-secrets-for-GitHub-workflows
# version when written: https://github.com/Azure/actions-workflow-samples/blob/9a151eaa180e20378c308bcb24a3dcad7d49f22c/assets/create-secrets-for-GitHub-workflows.md
$details = az ad sp create-for-rbac --name "$appName" `
    --skip-assignment `
    --sdk-auth --only-show-errors | ConvertFrom-Json

$objectId = az ad sp show --id 976a9a3f-8417-472f-ae53-0092ebb8c411 --query objectId -o tsv --only-show-errors

$dump = az role assignment create `
    --role AcrPush `
    --assignee-principal-type ServicePrincipal `
    --assignee-object-id $objectId `
    --scope $(az acr show --name $acrName --query id -o tsv) `
    --only-show-errors

$dump = az role assignment create `
    --role "Azure Kubernetes Service Cluster User Role" `
    --assignee-principal-type ServicePrincipal `
    --assignee-object-id $objectId `
    --scope $(az aks show `
        --resource-group $aksResourceGroup `
        --name $aksName `
        --query id -o tsv) `
    --only-show-errors

$dump = az role assignment create `
    --role "Azure Kubernetes Service RBAC Writer" `
    --assignee-principal-type ServicePrincipal `
    --assignee-object-id $objectId `
    --scope "$(az aks show `
        --resource-group $aksResourceGroup `
        --name $aksName `
        --query id -o tsv)/namespaces/principle-tools" `
    --only-show-errors

$dump = az ad group member add --group 107f6fd6-054f-441b-bfe3-815b145eb5c4 --member-id $objectId

@{
    AZURE_CREDENTIALS = $details
    REGISTRY_PASSWORD = $($details.clientSecret)
    REGISTRY_USERNAME = $($details.clientId)
} | ConvertTo-Json
