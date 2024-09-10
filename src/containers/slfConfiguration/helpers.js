let _ = require('underscore');

export const returnModifiedDropDownList=(listOfValues,type)=>{
    let IdList=_.pluck(listOfValues, type).flat()
    IdList=[...new Set(IdList)]
    return IdList
}