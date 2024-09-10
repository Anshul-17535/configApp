let _ = require('underscore');

export const longestStringLengthInArray=(SelectOptions)=>{
    let result = SelectOptions.reduce((r, e) => r.length < e.length ? e : r, "");
    return result.length
}

export const returnIndexUsingId=(Arr,Id)=>{
    return Arr.findIndex(item => item.id === Id);
}

export const performUpOperation=(Arr,ind)=>{
    return [...Arr.slice(0,ind-1),Arr[ind],Arr[ind-1],...Arr.slice(ind+1)]
}

export const datatypeValidationOfListOfValues=(Arr,attributeType)=>{
    let type=_.last(attributeType.split("."))
    switch(type){
        case 'Integer':
            return Arr.length!==0&&Arr.map(e=>/^\d+$/.test(e)).includes(false)
    }
}

export const datatypeValidationofTextInputs=(val,attributeType)=>{
    let type=_.last(attributeType.split("."))
    switch(type){
        case 'Integer':
            return val.trim().length!==0&&!/^\d+$/.test(val)
    }
}
