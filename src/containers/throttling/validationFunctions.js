let _ = require('underscore');

export const isTracingConfigNameEmpty=(tracingConfig)=>{
    return tracingConfig.name.trim()===""
}

export const isFilterNameOrActionEmpty=(filtersArray)=>{
    let isFilterNameOrActionEmpty=filtersArray.some((filterObj)=>{
        return filterObj.name.trim()===""||filterObj.filterActions.length===0
    })
    return isFilterNameOrActionEmpty
}

export const isNumberOfFiltersZero=(filtersArray)=>{
    return filtersArray.length===0
}

export const isContextOrNameEmptyInAction=(filtersArray)=>{
    filtersArray.map(filterObj=>{
        filterObj.filterActions.map(ActionObj=>{
            if(ActionObj.context===""||ActionObj.name===""){
                return true
            }
        })
    })
    return false
}

export const isContextOrNameEmptyInCriteria=(filtersArray)=>{
    let isContextOrNameEmptyInCriteria=false
    filtersArray.map((filterObj)=>{
        filterObj.filterCriteria.map((CriteriaObj)=>{
            if(CriteriaObj.context===""||CriteriaObj.name===""){
                isContextOrNameEmptyInCriteria=true
                return
            }
        })
    })
    return isContextOrNameEmptyInCriteria
}

export const isValueMissingInAction=(filtersArray)=>{
    let isValueMissingInAction=false
    filtersArray.map((filterObj)=>{
        filterObj.filterActions.map(ActionObj=>{
            if(Object.values(ActionObj.parameterNamesAndValues).some(e=>e.trim().length===0)){
                isValueMissingInAction=true
            }
        })
    })
    return isValueMissingInAction
}

export const isValueMissingInCriteria=(filtersArray)=>{
    let presentOperators=["PRESENT","NOT_PRESENT"]
    let isValueMissingInCriteria=false
    filtersArray.map((filterObj)=>{
        filterObj.filterCriteria.map(CriteriaObj=>{
            if(Object.values(CriteriaObj.parameterNamesAndValues).some(e=>e.trim().length===0)||(CriteriaObj.values.length===0&&!presentOperators.includes(CriteriaObj.operator))){
                isValueMissingInCriteria=true
            }
        })
    })
    return isValueMissingInCriteria
}

export const isMessageFilterNameNotUnique=(filtersArray)=>{
    let filterNameList=_.pluck(filtersArray, 'name');
    let filterNameListWithUniqueNames=_.uniq(filterNameList)
    return filterNameList.length!==filterNameListWithUniqueNames.length
}

export const isDuplicateActionsPresent=(filtersArray)=>{
    let isDuplicateActionsPresent=false
    filtersArray.map((filterObj)=>{
        let ModifiedActionsArray=filterObj.filterActions.map(ActionObj=>_.pick(ActionObj,"name","context"))
        let ArrayOfContextNameConcatenated=ModifiedActionsArray.map(Obj=>Obj.context+Obj.name)
        if(_.uniq(ArrayOfContextNameConcatenated).length<filterObj.filterActions.length){
            isDuplicateActionsPresent=true
        }
    })
    return isDuplicateActionsPresent
}