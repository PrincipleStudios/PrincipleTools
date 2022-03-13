param (
    [String]
    $subscription = '233e4023-8ea5-418c-b407-2ea999d54189',

    [String]
    $repository = 'principlestudios',
    [String]
    $imageName = 'principle-tools',

    [String]
    $azureResourceGroup = 'PrincipleK8s',
    [String]
    $azureAksCluster = 'PrincipleToolsCluster',

    [String]
    $k8sNamespace = 'principle-tools',
    [String]
    $chartName = 'principle-tools',
    [String]
    $sslClusterIssuer = 'principle-tools-issuer',

    [String]
    $domain = 'principle.tools'
)

Push-Location "$PSScriptRoot/.."

$tag = (Get-Date).ToString('yyyy-MM-ddTHH_mm_ss')

docker build . -t "$($repository).azurecr.io/$($imageName):$tag"

az account set --subscription $($subscription)
az acr login --name $repository

docker push "$($repository).azurecr.io/$($imageName):$tag"

az aks get-credentials --resource-group $azureResourceGroup -n $azureAksCluster
helm install -n $k8sNamespace $chartName --create-namespace chart/principle-tools/ --values chart/principle-tools/values.yaml `
    --set-string "image.repository=$($repository).azurecr.io/$imageName" `
    --set-string "image.tag=$tag" `
    --set-string "ingress.annotations.cert-manager\.io/cluster-issuer=$sslClusterIssuer" `
    --set-string "ingress.hosts[0].host=$domain"

Pop-Location
