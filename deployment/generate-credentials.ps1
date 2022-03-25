param (
    [String]
    $subscription = '233e4023-8ea5-418c-b407-2ea999d54189',
    [String]
    $azureResourceGroup = 'PrincipleK8s',
    [String]
    $azureResourceGroup2 = 'PrincipleStudios',

    [String]
    $appName = 'PrincipleTools-GitHub-Actions'
)

# see https://aka.ms/create-secrets-for-GitHub-workflows
# version when written: https://github.com/Azure/actions-workflow-samples/blob/9a151eaa180e20378c308bcb24a3dcad7d49f22c/assets/create-secrets-for-GitHub-workflows.md
$details = az ad sp create-for-rbac --name "$appName" --role contributor `
    --scopes /subscriptions/$($subscription)/resourceGroups/$azureResourceGroup /subscriptions/$($subscription)/resourceGroups/$azureResourceGroup2 `
    --sdk-auth | ConvertFrom-Json

@{
    AZURE_CREDENTIALS = $details
    REGISTRY_PASSWORD = $($details.clientSecret)
    REGISTRY_USERNAME = $($details.clientId)
} | ConvertTo-Json