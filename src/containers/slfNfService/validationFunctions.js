import {FQDN_REGEX,SST_REGEX,SD_REGEX,API_PREFIX_REGEX} from './validationRegexs';
import {testRegex} from './helperFunctions';
let _ = require('underscore');


const isInterPlmnFqdnInValid=(interPlmnFqdn)=>{
    return !testRegex(FQDN_REGEX,interPlmnFqdn)
}

const isApiPrefixInValid=(apiPrefix)=>{
    return !testRegex(API_PREFIX_REGEX,apiPrefix)
}

const isFqdnApiPrefixInvalid=(fqdnApiPrefix)=>{
    return !testRegex(API_PREFIX_REGEX,fqdnApiPrefix)
}

const isDuplicatesPresentInAllowedPlmns=(allowedPlmns)=>{
    const ModifiedAllowedPlmns=allowedPlmns.map((allowedPlmn)=>`${Number(allowedPlmn.mcc)}${Number(allowedPlmn.mnc)}`)
    const AllowedPlmnsOriginalLength=ModifiedAllowedPlmns.length
    const AllowedPlmnsWithUniqueValues=new Set(ModifiedAllowedPlmns)
    const AllowedPlmnsWithUniqueValuesLength=AllowedPlmnsWithUniqueValues.size
    return AllowedPlmnsOriginalLength!==AllowedPlmnsWithUniqueValuesLength
}

const isRegexValidationFailedInAllowedNssais=(allowedNssais)=>{
    const sstArray=_.pluck(allowedNssais, 'sst');
    const sdArray=_.pluck(allowedNssais,'sd');
    const sstFailedValidation=sstArray.filter(sst=>!testRegex(SST_REGEX,sst));
    const sdFailedValidation=sdArray.filter(sd=>!testRegex(SD_REGEX,sd));
    return !(_.isEmpty(sstFailedValidation)&&_.isEmpty(sdFailedValidation))
}

const isEmptyFieldsPresentInAllowedNssais=(allowedNssais)=>{
    const sstArray=_.pluck(allowedNssais, 'sst');
    const sdArray=_.pluck(allowedNssais,'sd');
    const sstFailedValidation=sstArray.filter(sst=>sst==="");
    const sdFailedValidation=sdArray.filter(sd=>sd==="");
    return !(_.isEmpty(sstFailedValidation)&&_.isEmpty(sdFailedValidation))
}

const isEmptyFieldsPresentInVersions=(Versions)=>{
    const apiVersionInUriArray=_.pluck(Versions, 'apiVersionInUri');
    const apiFullVersionArray=_.pluck(Versions,'apiFullVersion');
    const expiryArray=_.pluck(Versions,'expiry');
    const apiVersionInUriFailedValidation=apiVersionInUriArray.filter(apiVersionInUri=>apiVersionInUri==="");
    const apiFullVersionFailedValidation=apiFullVersionArray.filter(apiFullVersion=>apiFullVersion==="");
    const expiryFailedValidation=expiryArray.filter(expiry=>expiry==="");
    return !(_.isEmpty(apiVersionInUriFailedValidation)&&_.isEmpty(apiFullVersionFailedValidation)&&_.isEmpty(expiryFailedValidation))
}

const isDuplicatesPresentInAllowedNssais=(allowedNssais)=>{
    const ModifiedAllowedallowedNssais=allowedNssais.map((allowedNssai)=>`${allowedNssai.sst}${allowedNssai.sd}`)
    const AllowedNssaisOriginalLength=ModifiedAllowedallowedNssais.length
    const AllowedNssaisWithUniqueValues=new Set(ModifiedAllowedallowedNssais)
    const AllowedNssaisWithUniqueValuesLength=AllowedNssaisWithUniqueValues.size
    return AllowedNssaisOriginalLength!==AllowedNssaisWithUniqueValuesLength
}

const isDuplicatesPresentInVersions=(Versions)=>{
    const ModifiedAllowedVersions=Versions.map((version)=>`${version.apiFullVersion}${version.apiVersionInUri}${version.expiry}`)
    const AllowedVersionsOriginalLength=ModifiedAllowedVersions.length
    const AllowedVersionsWithUniqueValues=new Set(ModifiedAllowedVersions)
    const AllowedVersionsWithUniqueValuesLength=AllowedVersionsWithUniqueValues.size
    return AllowedVersionsOriginalLength!==AllowedVersionsWithUniqueValuesLength
}

const isApiprefixInvalidInIpEndpoints=(ipEndPoints)=>{
    const apiPrefixArray=_.pluck(ipEndPoints, 'apiPrefix');
    const apiPrefixFailedValidation=apiPrefixArray.filter(apiPrefix=>!testRegex(API_PREFIX_REGEX,apiPrefix));
    return !_.isEmpty(apiPrefixFailedValidation)
}

export const missingMandatoryParameters=(state)=>{
    const {serviceInstanceId,serviceName,fqdn,nfServiceStatus,scheme}=state.NFServiceMap
    let isMandatoryParamsMissing=false
    if(serviceInstanceId===""||serviceName===""||fqdn===""||nfServiceStatus===""||scheme===""){
        isMandatoryParamsMissing=true
    }
    return isMandatoryParamsMissing
}

export const failedValidations=(state)=>{
    const {NFServiceMap,allowedPlmns,allowedNssais,ipEndPoints,versions}=state
    switch(true){
        case isInterPlmnFqdnInValid(NFServiceMap.interPlmnFqdn):return [true,"InterPlmnFqdn is invalid in nfService."]
        case isApiPrefixInValid(NFServiceMap.apiPrefix):return [true,"ApiPrefix is invalid in nfService."]
        case isFqdnApiPrefixInvalid(NFServiceMap.fqdnApiPrefix):return [true,"fqdnApiPrefix is invalid in nfService."]
        case isDuplicatesPresentInAllowedPlmns(allowedPlmns): return [true,"Duplicate values present in AllowedPlmns"]
        case isRegexValidationFailedInAllowedNssais(allowedNssais):return [true,"Invalid values in allowedNssais"]
        case isEmptyFieldsPresentInAllowedNssais(allowedNssais):return [true,"Empty fields in allowedNssais"]
        case isDuplicatesPresentInAllowedNssais(allowedNssais): return [true,"Duplicate values present in allowedNssais"]
        case isApiprefixInvalidInIpEndpoints(ipEndPoints): return [true,"Invalid apiPrefix in ipEndpoints"]
        case isEmptyFieldsPresentInVersions(versions): return [true,"Empty fields in versions"]
        case isDuplicatesPresentInVersions(versions): return [true,"Duplicate values present in versions"]
        default: return [false,"All Validation Successfull"]
    }
}