param (
    [String]
    $subscription = '233e4023-8ea5-418c-b407-2ea999d54189',

    [String]
    $azureResourceGroup = 'PrincipleK8s',
    [String]
    $azureAksCluster = 'PrincipleToolsCluster',

    [String]
    $k8sNamespace = 'principle-tools',
    [String]
    $chartName = 'principle-tools',

    [String]
    $domain = 'principle.tools'
)

Push-Location "$PSScriptRoot/.."

az account set --subscription $($subscription)

az aks get-credentials --resource-group $azureResourceGroup -n $azureAksCluster

helm upgrade -n $k8sNamespace $chartName chart/principle-tools/ --reuse-values `
    --set-string "ingress.annotations.acme\.cert-manager\.io/http01-edit-in-place=true" `
    --set-string "ingress.annotations.cert-manager\.io/cluster-issuer=principle-tools-issuer" `
    --set-string "ingress.tls[0].secretName=$chartName-tls" `
    --set-string "ingress.tls[0].hosts[0]=$domain"

Pop-Location
