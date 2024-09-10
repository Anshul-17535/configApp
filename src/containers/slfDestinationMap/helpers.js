let _ = require('underscore');

export const returnModifiedObject=(listOfValues,instanceIdType,fieldType)=>{
    let resObj={}
    listOfValues.map(value=>{
        let IdList=_.pluck([value], fieldType).flat()
        IdList=IdList.filter(Id=>!!Id)
        if(fieldType==="udmInfo"){
            IdList=_.pluck(IdList,"groupId")
        }
        if(fieldType==="nfServices"){
            IdList=_.pluck(IdList,"nfServiceSetIdList").flat()
        }
        IdList=IdList.filter(Id=>!!Id)
        IdList=[...new Set(IdList)]
        IdList.map(element=>{
            if(resObj[element]){
                resObj[element]=[...resObj[element],value[instanceIdType]]
            }else{
                resObj[element]=[value[instanceIdType]]
            }
        })
    })
    return resObj
}

export const returnDeleteMapConfigAction=(pattern)=>{
    switch(pattern){
        case 'NF_INSTANCE':
            return "DELETE_DESTINATION_NFSERVICE_INSTANCE_CONFIG"
        case 'FQDN':
            return "DELETE_SLF_FQDN_CONFIG"
        case 'IP_ADDRESS':
            return "DELETE_SLF_IPLIST_CONFIG"
        case 'NF_SERVICE':
            return "DELETE_DESTINATION_NF_SERVICE_CONFIG"
        case 'NF_GROUP':
            return "DELETE_DESTINATION_NF_SERVICE_CONFIG"
        case 'NF_SET':
            return "DELETE_DESTINATION_NF_SERVICE_CONFIG"
        case 'IPADDRESS_SCP':
            return "DELETE_SLF_IPLIST_CONFIG"
        case 'IPADDRESS_SEPP':
            return "DELETE_SLF_IPLIST_CONFIG"    
        case 'FQDN_SCP':
            return "DELETE_SLF_FQDN_CONFIG"
        case 'FQDN_SEPP':
            return "DELETE_SLF_FQDN_CONFIG"    
        case 'NFSET_SCP':
            return "DELETE_DESTINATION_NF_SERVICE_CONFIG"
        case 'NFSET_SEPP':
            return "DELETE_DESTINATION_NF_SERVICE_CONFIG"    
         default: return ""  
    }
}

export const returnDestinationObject=(pattern)=>{
    switch(pattern){
        case 'NF_INSTANCE':
            return ["nfServiceMap",[{
                "srvcInstncId":"",
                "weight":1,
                "priority":1,
                "isNew":true
                }]]
        case 'FQDN':
            return ["fqdnMap",[{
                "fqdn":"",
                "scheme":"",
                "port":0,
                "apiPrefix":"",
                "weight":1,
                "priority":1,
                "isNew":true
                }]]
        case 'IP_ADDRESS':
            return ["ipListMap",[{
                "ipAddress":"",
                "scheme":"",
                "port":0,
                "apiPrefix":"",
                "weight":1,
                "priority":1,
                "isNew":true
                }]]
        case 'NF_SERVICE':
            return ["nfProfileMap",[{
                "nfInstanceID":"",            
                "weight":1,            
                "priority":1,
                "isNew":true            
                }]]
        case 'NF_GROUP':
            return ["nfProfileMap",[{
                "nfInstanceID":"",
                "weight":1,
                "priority":1,
                "isNew":true
         }]]
        case 'NF_SET':
            return ["nfProfileMap",[{
                "nfInstanceID":"",
                "weight":1,
                "priority":1,
                "isNew":true
         }]]
         case 'IPADDRESS_SCP':
            return ["ipListMap",[{
                "ipAddress":"",
                "scheme":"",
                "port":0,
                "apiPrefix":"",
                "weight":1,
                "priority":1,
                "isNew":true
                }]]
        case 'IPADDRESS_SEPP':
            return ["ipListMap",[{
                "ipAddress":"",
                "scheme":"",
                "port":0,
                "apiPrefix":"",
                "weight":1,
                "priority":1,
                "isNew":true
                }]]  
        case 'FQDN_SCP':
            return ["fqdnMap",[{
                "fqdn":"",
                "scheme":"",
                "port":0,
                "apiPrefix":"",
                "weight":1,
                "priority":1,
                "isNew":true
                }]]
        case 'FQDN_SEPP':
            return ["fqdnMap",[{
                "fqdn":"",
                "scheme":"",
                "port":0,
                "apiPrefix":"",
                "weight":1,
                "priority":1,
                "isNew":true
                }]]
        case 'NFSET_SCP':
            return ["nfProfileMap",[{
                "nfInstanceID":"",
                "weight":1,
                "priority":1,
                "isNew":true
         }]]
         case 'NFSET_SEPP':
            return ["nfProfileMap",[{
                "nfInstanceID":"", 
                "weight":1,    
                "priority":1,
                "isNew":true
         }]]
         default: return
    }
}

export const returnMapKey=(destinationObj)=>{
    let {destinationId,mapPattern,...rest} = destinationObj
    if(_.isEmpty(rest)){
        return ""
    }
    return Object.keys(rest)[0].toLocaleUpperCase()
}

export const returnQueryName=(mapPattern)=>{
    switch(mapPattern){
        case "NF_INSTANCE":
            return "NFInstance"
        case "FQDN":
            return "FQDN"
        case "IP_ADDRESS":
            return "IP_ADDRESS"
        case "NF_SERVICE":
            return "NFService"
        case "NF_GROUP":
            return "NFGroup"
        case "NF_SET":
            return "NFSet"
        case "IPADDRESS_SCP":
            return "IPAddress_SCP"
        case "IPADDRESS_SEPP":
            return "IPAddress_SEPP"
        case "FQDN_SCP":
            return "FQDN_SCP"
        case "FQDN_SEPP":
            return "FQDN_SEPP"
        case "NFSET_SCP":
            return "NFSet_SCP"
        case "NFSET_SEPP":
            return "NFSet_SEPP"
        default:return
    }
}

export const longestStringLengthInArray=(SelectOptions)=>{
    let result = !!SelectOptions&&SelectOptions.reduce((r, e) => r.length < e.length ? e : r, "");
    return result.length
}

export const returnSchemeDropdownOptions=()=>{
    return ["http","https"]
}

export const returnDestinationObjBasedOnMapPattern=(mapPattern)=>{
    switch(mapPattern){
        case "NF_SERVICE":
            return "nfserviceSetIdListNfProfileObj"
        case "NF_GROUP":
            return "udmInfoListObj"
        case "NF_SET":
            return "nfSetIdListObj"
        case "NFSET_SCP":
            return "nfSetIdListObj"
        case "NFSET_SEPP":
            return "nfSetIdListObj"
        default:return
    }
}

export const returnDeleteIndividualMapPayload=(DestinationMapObj,MapArray,ConfigIndex,mapType)=>{
    let mapArrayCopy=MapArray.slice()
    let modifiedMapObject=mapArrayCopy[ConfigIndex]
    modifiedMapObject=_.omit(modifiedMapObject, 'isNew')
    const deletePayload={
        "destinationMap":{
            "DestMapList":[{
                "destinationId":DestinationMapObj.destinationId,
                "mapPattern":DestinationMapObj.mapPattern,
                [mapType]:[modifiedMapObject]
            }]
        }
    }
    return deletePayload
}

export const returnMapName=(mapPattern)=>{
    switch(mapPattern){
        case "NF_INSTANCE":
            return "nfServiceMap"
        case "FQDN":
            return "fqdnMap"
        case "IP_ADDRESS":
            return "ipListMap"
        case "NF_SERVICE":
            return "nfProfileMap"
        case "NF_GROUP":
            return "nfProfileMap"
        case "NF_SET":
            return "nfProfileMap"
        case "NFSET_SCP":
            return "nfProfileMap"
        case "NFSET_SEPP":
            return "nfProfileMap"
        case "FQDN_SCP":
            return "fqdnMap"
        case "FQDN_SEPP":
            return "fqdnMap"
        case "IPADDRESS_SCP":
            return "ipListMap"
        case "IPADDRESS_SEPP":
            return "ipListMap"
        default:return
    }
}

export const isItNewlyAdded=(destinationMapConfigs,destinationMapObj,mapListObj)=>{
    const {mapPattern,destinationId}=destinationMapObj
    let [selectedRecordInConfigs]=destinationMapConfigs.destinationMap.DestMapList.filter(config=>config.destinationId===destinationId&&config.mapPattern===mapPattern)
    let count=0;
    selectedRecordInConfigs[returnMapName(mapPattern)].map(config=>{
        if(_.isEqual(config,mapListObj)){
            count+=1
        }
    })
    return count===1
}

export const singleMapConfigPresent=(nfProfileMapArray,nfProfileMapObj)=>{
    let modifiedMapArray=nfProfileMapArray.filter(mapObject=>mapObject.isNew===false)
    let modifiedMapArrayLength=modifiedMapArray.length
    return !(modifiedMapArrayLength===1&&!nfProfileMapObj.isNew)
}