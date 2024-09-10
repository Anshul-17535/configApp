import {IPV4_REGEX,IPV6_REGEX,IPV6_PREFIX_REGEX} from '../slfNfService/validationRegexs';
import {testRegex} from '../slfNfService/helperFunctions';
let _ = require('underscore');


const isDuplicatesPresentInPlmnList=(plmnList)=>{
    const ModifiedPlmnList=plmnList.map((plmn)=>`${Number(plmn.mcc)}${Number(plmn.mnc)}`)
    const PlmnListOriginalLength=ModifiedPlmnList.length
    const PlmnListWithUniqueValues=new Set(ModifiedPlmnList)
    const plmnListWithUniqueValuesLength=PlmnListWithUniqueValues.size
    return PlmnListOriginalLength!==plmnListWithUniqueValuesLength
}

const isRegexValidationFailedInIpv4AddressRanges=(ipv4AddressRanges)=>{
    const startArray=_.pluck(ipv4AddressRanges, 'start');
    const endArray=_.pluck(ipv4AddressRanges,'end');
    const startFailedValidation=startArray.filter(start=>!testRegex(IPV4_REGEX,start));
    const endFailedValidation=endArray.filter(end=>!testRegex(IPV4_REGEX,end));
    return !(_.isEmpty(startFailedValidation)&&_.isEmpty(endFailedValidation))
}

const isRegexValidationFailedInIpv6PrefixRanges=(ipv6PrefixRanges)=>{
    const startArray=_.pluck(ipv6PrefixRanges, 'start');
    const endArray=_.pluck(ipv6PrefixRanges,'end');
    const startFailedValidation=startArray.filter(start=>!testRegex(IPV6_PREFIX_REGEX,start));
    const endFailedValidation=endArray.filter(end=>!testRegex(IPV6_PREFIX_REGEX,end));
    return !(_.isEmpty(startFailedValidation)&&_.isEmpty(endFailedValidation))
}

const isEmptyFieldsPresentInAddressRanges=(AddressRanges)=>{
    const startArray=_.pluck(AddressRanges, 'start');
    const endArray=_.pluck(AddressRanges,'end');
    const startFailedValidation=startArray.filter(start=>start==="");
    const endFailedValidation=endArray.filter(end=>end==="");
    return !(_.isEmpty(startFailedValidation)&&_.isEmpty(endFailedValidation))
}

const isDuplicatesPresentInAddressRanges=(AddressRanges)=>{
    const ModifiedAllowedAddressRanges=AddressRanges.map((AddressRange)=>`${AddressRange.start}${AddressRange.end}`)
    const AddressRangesOriginalLength=ModifiedAllowedAddressRanges.length
    const AddressRangesWithUniqueValues=new Set(ModifiedAllowedAddressRanges)
    const AddressRangesWithUniqueValuesLength=AddressRangesWithUniqueValues.size
    return AddressRangesOriginalLength!==AddressRangesWithUniqueValuesLength
}

const isValuesInvalidInIpv4Address=(ipv4Addresses)=>{
    const textFailedValidation=ipv4Addresses.filter(text=>!testRegex(IPV4_REGEX,text));
    return !_.isEmpty(textFailedValidation)
}

const isValuesInvalidInIpv6Address=(ipv6Addresses)=>{
    const textFailedValidation=ipv6Addresses.filter(text=>!testRegex(IPV6_REGEX,text));
    return !_.isEmpty(textFailedValidation)
}

export const failedValidationsNfProfile=(nfProfile)=>{
    const {plmnList,bsfInfo,ipv4Addresses,ipv6Addresses} = nfProfile
    switch(true){
        case isValuesInvalidInIpv4Address(ipv4Addresses):return [true,"Invalid values in Ipv4 Addresses"]
        case isValuesInvalidInIpv6Address(ipv6Addresses):return [true,"Invalid values in Ipv6 Addresses"]
        case isDuplicatesPresentInPlmnList(plmnList):return [true,"Duplicate values present in plmnList"]
        case isRegexValidationFailedInIpv4AddressRanges(bsfInfo.ipv4AddressRanges):return [true,"Invalid values in Ipv4AddressRanges"]
        case isRegexValidationFailedInIpv6PrefixRanges(bsfInfo.ipv6PrefixRanges):return [true,"Invalid values in Ipv6PrefixRanges"]
        case isEmptyFieldsPresentInAddressRanges(bsfInfo.ipv4AddressRanges): return [true,"Empty fields in Ipv4AddressRanges"]
        case isEmptyFieldsPresentInAddressRanges(bsfInfo.ipv6PrefixRanges):return [true,"Empty fields in Ipv6PrefixRanges"]
        case isDuplicatesPresentInAddressRanges(bsfInfo.ipv4AddressRanges):return [true,"Duplicate values present in Ipv4AddressRanges"]
        case isDuplicatesPresentInAddressRanges(bsfInfo.ipv6PrefixRanges): return [true,"Duplicate values present in Ipv6PrefixRanges"]
        default: return [false,"All Validation Successfull"]
    }
}