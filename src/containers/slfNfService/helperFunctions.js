let _ = require('underscore');

export const removeSpecifiedKeysFromPlmnList=(List)=>{
    let resultList = List.map((plmnObj)=>{
        return _.omit(plmnObj, "mncIn3Digits");
    });
    return resultList
}

export const testRegex=(pattern,testString)=>{
    let REGEX=new RegExp(pattern)
    return !!testString?REGEX.test(testString):true
}