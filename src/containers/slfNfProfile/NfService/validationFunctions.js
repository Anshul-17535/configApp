import {FQDN_REGEX,MNC_REGEX,MCC_REGEX,IPV4_REGEX,IPV6_REGEX} from '../../slfNfService/validationRegexs';
import {testRegex} from '../../slfNfService/helperFunctions';
let _ = require('underscore');


export const missingMandatoryParameters=(state)=>{
    const {serviceInstanceId,serviceName,fqdn,nfServiceStatus,scheme}=state.NFServiceMap
    let isMandatoryParamsMissing=false
    if(serviceInstanceId===""||serviceName===""||fqdn===""||nfServiceStatus===""||scheme===""){
        isMandatoryParamsMissing=true
    }
    return isMandatoryParamsMissing
}

export const invalidServiceInstanceId=(state)=>{
    let REGEX=new RegExp("^\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b$")
    return !REGEX.test(state.NFServiceMap.serviceInstanceId)
}

export const duplicateServiceInstanceId=(nfProfileConfig,state,tabType)=>{
    let nfServicesCopy=nfProfileConfig.nfServices.slice()
    let pluckedList=_.pluck(nfServicesCopy, 'serviceInstanceId')
    return tabType==="new"&&pluckedList.includes(state.NFServiceMap.serviceInstanceId)
}

const isFqdnInvalid=(fqdn)=>{
    return !testRegex(FQDN_REGEX,fqdn)
}

const isRegexValidationFailedInAllowedPlmns=(allowedPlmns)=>{
    const mncArray=_.pluck(allowedPlmns, 'mnc');
    const mccArray=_.pluck(allowedPlmns,'mcc');
    const mncFailedValidation=mncArray.filter(mnc=>!testRegex(MNC_REGEX,mnc));
    const mccFailedValidation=mccArray.filter(mcc=>!testRegex(MCC_REGEX,mcc));
    return !(_.isEmpty(mncFailedValidation)&&_.isEmpty(mccFailedValidation))
}

const isEmptyFieldsPresentInAllowedPlmns=(allowedPlmns)=>{
    const mncArray=_.pluck(allowedPlmns, 'mnc');
    const mccArray=_.pluck(allowedPlmns,'mcc');
    const mncFailedValidation=mncArray.filter(mnc=>mnc==="");
    const mccFailedValidation=mccArray.filter(mcc=>mcc==="");
    return !(_.isEmpty(mncFailedValidation)&&_.isEmpty(mccFailedValidation))
}

const isIpv4AddressInvalidInIpEndpoints=(ipEndPoints)=>{
    const ipv4AddressArray=_.pluck(ipEndPoints, 'ipv4Address');
    const ipv4AddressFailedValidation=ipv4AddressArray.filter(ipv4Address=>!testRegex(IPV4_REGEX,ipv4Address));
    return !_.isEmpty(ipv4AddressFailedValidation)
}

const isIpv6AddressInvalidInIpEndpoints=(ipEndPoints)=>{
    const ipv6AddressArray=_.pluck(ipEndPoints, 'ipv6Address');
    const ipv6AddressFailedValidation=ipv6AddressArray.filter(ipv6Address=>!testRegex(IPV6_REGEX,ipv6Address));
    return !_.isEmpty(ipv6AddressFailedValidation)
}

const isTransportEmptyInIpEndpoints=(ipEndPoints)=>{
    const transportArray=_.pluck(ipEndPoints, 'transport');
    const transportFailedValidation=transportArray.filter(transport=>transport==="");
    return !_.isEmpty(transportFailedValidation)
}

const isEmptyFieldsPresentInIpEndpoints=(ipEndPoints)=>{
    const ipv4AddressArray=_.pluck(ipEndPoints, 'ipv4Address');
    const ipv6AddressArray=_.pluck(ipEndPoints,'ipv6Address');
    const ipv4AddressFailedValidation=ipv4AddressArray.filter(ipv4Address=>ipv4Address==="");
    const ipv6AddressFailedValidation=ipv6AddressArray.filter(ipv6Address=>ipv6Address==="");
    return !(_.isEmpty(ipv4AddressFailedValidation)&&_.isEmpty(ipv6AddressFailedValidation))
}

export const failedValidationsNfService=(state)=>{
    const {NFServiceMap,allowedPlmns,ipEndPoints}=state
    switch(true){
        case isFqdnInvalid(NFServiceMap.fqdn):return [true,"FQDN is invalid in nfService."]
        case isRegexValidationFailedInAllowedPlmns(allowedPlmns):return [true,"Invalid inputs in AllowedPlmns"]
        case isEmptyFieldsPresentInAllowedPlmns(allowedPlmns):return [true,"Empty fields in AllowedPlmns"]
        case isTransportEmptyInIpEndpoints(ipEndPoints):return [true,"Transport is empty in ipEndpoints"]
        case isEmptyFieldsPresentInIpEndpoints(ipEndPoints): return [true,"Empty fields in ipEndpoints"]
        case isIpv4AddressInvalidInIpEndpoints(ipEndPoints): return [true,"Invalid ipv4Address in ipEndpoints"]
        case isIpv6AddressInvalidInIpEndpoints(ipEndPoints):return [true,"Invalid ipv6Address in ipEndpoints"]
        default: return [false,"All Validation Successfull"]
    }
}