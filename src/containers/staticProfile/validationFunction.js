export const isNFProfileValuesEmpty=(currentStatProf)=>{
    let isAnyEmpty = false
    if(currentStatProf.peerNfProfiles.peerNfProfile[0].nfInstanceId.trim()===""){
        isAnyEmpty=true
    }
    else if(currentStatProf.peerNfProfiles.peerNfProfile[0].nfType.trim()===""){
        isAnyEmpty=true
    }
    else if(currentStatProf.peerNfProfiles.peerNfProfile[0].nfStatus.trim()===""){
        isAnyEmpty=true
    }
    return isAnyEmpty
}

export const isNFServiceIpEndPointEmpty=(currentStatProf)=>{
    let isFqdnEmpty = false
    let isIpEndPointEmpty = false
    
    if(currentStatProf.peerNfProfiles.peerNfProfile[0].fqdn.trim()===""){
        isFqdnEmpty=true
    }

    if(isFqdnEmpty){
        currentStatProf.peerNfProfiles.peerNfProfile[0].nfServices.map((value)=>{
        if(value.fqdn.trim()===""){
            if(value.ipEndPoints.length === 0 ){
            isIpEndPointEmpty=true
        }}
    })
    }
    return (isFqdnEmpty && isIpEndPointEmpty)
}
export const isNFServiceIpEndPointValueEmpty=(currentStatProf)=>{
    let isFqdnEmpty = false
    let isIpEndPointEmpty = false
    
    if(currentStatProf.peerNfProfiles.peerNfProfile[0].fqdn.trim()===""){
        isFqdnEmpty=true
    }

    if(isFqdnEmpty){
        currentStatProf.peerNfProfiles.peerNfProfile[0].nfServices.map((value)=>{
        if(value.fqdn.trim()===""){  
            value.ipEndPoints.map((ip)=>{
                if(ip.ipv6Address.trim() === "" && ip.ipv4Address.trim() === ""){
                    isIpEndPointEmpty=true
                }
            })
        }
    })
    }
    return (isFqdnEmpty && isIpEndPointEmpty)
}


export const isNFServiceEmpty=(currentStatProf)=>{
    let isEmptyNFservice = false
    if(currentStatProf.peerNfProfiles.peerNfProfile[0].nfServices.length === 0 ){
        isEmptyNFservice=true
    }
    return isEmptyNFservice
}

export const isNFServiceValuesEmpty=(currentStatProf)=>{
    let isAnyEmpty = false
    
    currentStatProf.peerNfProfiles.peerNfProfile[0].nfServices.map((value)=>{
        if(value.serviceInstanceId.trim()==="" ){
            isAnyEmpty=true
        }
        if(value.serviceName.trim()==="" ){
            isAnyEmpty=true
        }
        if(value.scheme.trim()==="" ){
            isAnyEmpty=true
        }
        if(value.nfServiceStatus.trim()==="" ){
            isAnyEmpty=true
        }
    })
    return isAnyEmpty
}

export const isNFServiceVersionsEmpty=(currentStatProf)=>{
    let isAnyEmpty = false
    
    currentStatProf.peerNfProfiles.peerNfProfile[0].nfServices.map((value)=>{
        if(value.versions.length===0 ){
            isAnyEmpty=true
        }
    })
    return isAnyEmpty
}

export const isNFServiceVersionsValueEmpty=(currentStatProf)=>{
    let isAnyEmpty = false
    
    currentStatProf.peerNfProfiles.peerNfProfile[0].nfServices.map((value)=>{
        value.versions.map((version)=>{
            if(version.apiVersionInUri.trim() === ""){
                isAnyEmpty=true
                return isAnyEmpty
            }
        })
    })
    return isAnyEmpty
}