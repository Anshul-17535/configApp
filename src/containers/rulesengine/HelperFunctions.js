let _ = require('underscore');
let numberRegex = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/;
let splitAtCommaOutsideDoubleQuotes=/,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

const mapOrder=(array, order, key)=>{
  
    array.sort( function (a, b) {
      var A = a[key], B = b[key];
      
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
      
    });
    
    return array;
  };

const ReturnConditionRHS=(ruleObjectCond,sourceContext,triggerName)=>{
    if(ruleObjectCond.value===null){
        return " "
    }else if(ruleObjectCond.valueArguments.length===0){
        if(ruleObjectCond.value.type==="ATTRIBUTE" && (ruleObjectCond.value.value.startsWith(triggerName)||ruleObjectCond.value.value.startsWith(getRelatedContext(triggerName)))){
            return ` ${ruleObjectCond.value.value.split(".").slice(1).join(".")} `
        }else if(ruleObjectCond.value.type==="STRING"){
            return ` "${ruleObjectCond.value.value}" `
        }else{
            return ` ${ruleObjectCond.value.value} `
        }
    }else{
        let ConditionValueArguments=ruleObjectCond.valueArguments
        let SourceContextAttribute=(ruleObjectCond.value.value.startsWith(triggerName)||ruleObjectCond.value.value.startsWith(getRelatedContext(triggerName)))?ruleObjectCond.value.value.split(".").slice(1).join("."):ruleObjectCond.value.value
        let OrderedConditionValueArguments=mapOrder(ConditionValueArguments,_.pluck(sourceContext[triggerName][SourceContextAttribute].arg, 'nm'),"name")
              let ConditionValueArgumentsString="("
        !!OrderedConditionValueArguments&&OrderedConditionValueArguments.map((ConditionValueArgument,Index)=>{
            if(ConditionValueArgument.name==="Index"&&Number(ConditionValueArgument.value.value)!==-1){
                ConditionValueArgumentsString+=ConditionValueArgument.value.value+","
            }else{
                if(ConditionValueArgument.name!=="Index"){
                    if(ConditionValueArgument.value.type==="STRING"){
                        if(Index===ruleObjectCond.valueArguments.length-1){
                            ConditionValueArgumentsString+=`"${ConditionValueArgument.value.value}"`;
                        }else{
                            ConditionValueArgumentsString+=`"${ConditionValueArgument.value.value}",`;
                        }
                    }else if(ConditionValueArgument.value.type==="ATTRIBUTE"&&(ConditionValueArgument.value.value.startsWith(triggerName)||ConditionValueArgument.value.value.startsWith(getRelatedContext(triggerName)))){
                        if(Index===ruleObjectCond.valueArguments.length-1){
                            ConditionValueArgumentsString+=`${ConditionValueArgument.value.value.split(".").slice(1).join(".")}`;
                        }else{
                            ConditionValueArgumentsString+=`"${ConditionValueArgument.value.value.split(".").slice(1).join(".")}",`;
                        }
                    }
                    else{
                        if(Index===ruleObjectCond.valueArguments.length-1){
                            ConditionValueArgumentsString+=ConditionValueArgument.value.value;
                        }else{
                            ConditionValueArgumentsString+=`${ConditionValueArgument.value.value},`
                        }
                    }
                }
            }
        })
        ConditionValueArgumentsString=`${ConditionValueArgumentsString})`
        return ` ${SourceContextAttribute}${ConditionValueArgumentsString} `
    }
}

const ReturnConditionLHS=(ruleObjectCond,triggerName)=>{
    if(!!triggerName && ruleObjectCond.criteria.sourceContext!==triggerName &&
        ruleObjectCond.criteria.sourceContext!==getRelatedContext(triggerName)){
            return ruleObjectCond.criteria.sourceContext+"."+ruleObjectCond.criteria.name
    }
    else{
            return ruleObjectCond.criteria.name
    }
}

const ReturnConditionArgument=(ruleObjectCond,sourceContext,triggerName,conditionLHS)=>{
    let ConditionArgumentString=""
    if(ruleObjectCond.criteriaArguments.length===0){
        return ""
    }else{
        ConditionArgumentString="("+ConditionArgumentString;
        const OrderedcriteriaArguments=mapOrder(ruleObjectCond.criteriaArguments,_.pluck(sourceContext[triggerName][conditionLHS].arg, 'nm'),"name")
        !!OrderedcriteriaArguments&&OrderedcriteriaArguments.map((criteriaArgument,Index)=>{
            if(criteriaArgument.name==="Index"&&Number(criteriaArgument.value.value)!==-1){
                ConditionArgumentString+=`${criteriaArgument.value.value},`
            }else{
                if(criteriaArgument.name!=="Index"){
                    if(criteriaArgument.value.type=="STRING"){
                        if(Index===ruleObjectCond.criteriaArguments.length-1){
                            ConditionArgumentString+=`"${criteriaArgument.value.value}"`;
                        }else{
                            ConditionArgumentString+=`"${criteriaArgument.value.value}",`;
                        }
                    }else if(criteriaArgument.value.type==="ATTRIBUTE"&&(criteriaArgument.value.value.startsWith(triggerName)||criteriaArgument.value.value.startsWith(getRelatedContext(triggerName)))){
                        if(Index===ruleObjectCond.criteriaArguments.length-1){
                            ConditionArgumentString+=`${criteriaArgument.value.value.split(".").slice(1).join(".")}`;
                        }else{
                            ConditionArgumentString+=`${criteriaArgument.value.value.split(".").slice(1).join(".")},`;
                        }
                    }
                    else{
                        if(Index===ruleObjectCond.criteriaArguments.length-1){
                            ConditionArgumentString+=criteriaArgument.value.value;
                        }else{
                            ConditionArgumentString+=`${criteriaArgument.value.value},`
                        }
                    }
                }
            }
        })
        ConditionArgumentString=`${ConditionArgumentString})`
        return ConditionArgumentString
    }
}

const ReturnActionLHS=(ruleObjectAction,triggerName)=>{
    if(!!triggerName && ruleObjectAction.attributeInfoRequest.resultContext !== triggerName){
        return ruleObjectAction.attributeInfoRequest.resultContext+"."+ruleObjectAction.attributeInfoRequest.name
    }else{
        return ruleObjectAction.attributeInfoRequest.name
    }
}

const ReturnActionArgument=(ruleObjectAction,resultContext,sourceContext,triggerName,actionLHS)=>{
    let ActionArgumentString=""
    if(ruleObjectAction.parameterRequests.length===0){
        return ""
    }else{
        if(ruleObjectAction.parameterRequests.length===1){
            if(ruleObjectAction.parameterRequests[0].attributeArgumentRequests.length!==0){
                ActionArgumentString="("+ActionArgumentString;
                let ActionParameterObj=ruleObjectAction.parameterRequests[0]
                let ActionArgumentAttribute=(ActionParameterObj.data.value.startsWith(triggerName)||ActionParameterObj.data.value.startsWith(getRelatedContext(triggerName)))?ActionParameterObj.data.value.split(".").slice(1).join("."):ActionParameterObj.data.value
                ActionArgumentString+=`${ActionArgumentAttribute}(`
                let ActionArgumentsOfArgument=""
                const OrderedAttributeArgumentRequests=mapOrder(ActionParameterObj.attributeArgumentRequests,_.pluck(sourceContext[triggerName][ActionArgumentAttribute].arg, 'nm'),"name")

                !!OrderedAttributeArgumentRequests&&OrderedAttributeArgumentRequests.map((AttributeArgument,Index)=>{
                    if(AttributeArgument.name==="Index"&&Number(AttributeArgument.value.value)!==-1){
                        ActionArgumentsOfArgument+=`${AttributeArgument.value.value},`
                    }else{
                        if(AttributeArgument.name!=="Index"){
                            if(AttributeArgument.value.type=="STRING"){
                                if(Index===ActionParameterObj.attributeArgumentRequests.length-1){
                                    ActionArgumentsOfArgument+=`"${AttributeArgument.value.value}"`;
                                }else{
                                    ActionArgumentsOfArgument+=`"${AttributeArgument.value.value}",`;
                                }
                            }else if(AttributeArgument.value.type==="ATTRIBUTE"&&(AttributeArgument.value.value.startsWith(triggerName)||AttributeArgument.value.value.startsWith(getRelatedContext(triggerName)))){
                                if(Index===ActionParameterObj.attributeArgumentRequests.length-1){
                                    ActionArgumentsOfArgument+=`${AttributeArgument.value.value.split(".").slice(1).join(".")}`;
                                }else{
                                    ActionArgumentsOfArgument+=`${AttributeArgument.value.value.split(".").slice(1).join(".")},`;
                                }
                            }
                            else{
                                if(Index===ActionParameterObj.attributeArgumentRequests.length-1){
                                    ActionArgumentsOfArgument+=AttributeArgument.value.value;
                                }else{
                                    ActionArgumentsOfArgument+=`${AttributeArgument.value.value},`
                                }
                            }
                        }
                    }
                })
                ActionArgumentString+=`${ActionArgumentsOfArgument}))`
            }else{
                ActionArgumentString="("+ActionArgumentString;
                let ActionParameterObj=ruleObjectAction.parameterRequests[0]
                if(ActionParameterObj.data.type==="STRING"){
                    ActionArgumentString+=`"${ActionParameterObj.data.value}"`
                }else if(ActionParameterObj.data.type==="ATTRIBUTE"&&(ActionParameterObj.data.value.startsWith(triggerName)||ActionParameterObj.data.value.startsWith(getRelatedContext(triggerName)))){
                    ActionArgumentString+=`${ActionParameterObj.data.value.split(".").slice(1).join(".")}`
                }else{
                    ActionArgumentString+=`${ActionParameterObj.data.value}`
                }
                ActionArgumentString+=`)`
            }
        }else{
            ActionArgumentString="("+ActionArgumentString;
            let ActionParametersString=""
	    let ChangedActionLHS=actionLHS
            if(actionLHS.includes('[')) {
                ChangedActionLHS=actionLHS.replace(/\[[^\]]*\]/g, '');
            }
            const OrderedparameterRequests=mapOrder(ruleObjectAction.parameterRequests,_.pluck(resultContext[triggerName][ChangedActionLHS].par, 'nm'),"name")
            !!OrderedparameterRequests&&OrderedparameterRequests.map((Parameter,Index)=>{
                if(Parameter.name=="Index"&&Number(Parameter.data.value)!==-1){
                    ActionParametersString+=Parameter.data.value+","
                }else{
                    if(Parameter.name!=="Index"){
                        if(Parameter.data.type=="STRING"){
                            if(Index===ruleObjectAction.parameterRequests.length-1){
                                ActionParametersString+=`"${Parameter.data.value}"`;
                            }else{
                                ActionParametersString+=`"${Parameter.data.value}",`;
                            }
                        }else if(Parameter.data.type==="ATTRIBUTE"&&Parameter.attributeArgumentRequests.length===0&&(Parameter.data.value.startsWith(triggerName)||Parameter.data.value.startsWith(getRelatedContext(triggerName)))){
                            if(Index===ruleObjectAction.parameterRequests.length-1){
                                ActionParametersString+=`${Parameter.data.value.split(".").slice(1).join(".")}`;
                            }else{
                                ActionParametersString+=`${Parameter.data.value.split(".").slice(1).join(".")},`;
                            }
                        }else if(Parameter.data.type==="ATTRIBUTE"&&Parameter.attributeArgumentRequests.length!==0){
                            
                            let ActionAttribute=(Parameter.data.value.startsWith(triggerName)||Parameter.data.value.startsWith(getRelatedContext(triggerName)))?Parameter.data.value.split(".").slice(1).join("."):Parameter.data.value
                            let ActionAttributeWithoutSquareBrackets=ActionAttribute.replace(/\[[0-9]+\]/g,"")
                            let ActionAttributeWithArgumentsString=""
                            ActionAttributeWithArgumentsString+=`${ActionAttribute}(`
                            const OrderedAttributeRequests=mapOrder(Parameter.attributeArgumentRequests,_.pluck(sourceContext[triggerName][ActionAttributeWithoutSquareBrackets].arg, 'nm'),"name")
                            !!OrderedAttributeRequests&&OrderedAttributeRequests.map((Attribute,Index)=>{
                                if(Attribute.name==="Index"&&Number(Attribute.value.value)!==-1){
                                    ActionAttributeWithArgumentsString+=`${Attribute.value.value},`
                                }else{
                                    if(Attribute.name!=="Index"){
                                        if(Attribute.value.type=="STRING"){
                                            if(Index===Parameter.attributeArgumentRequests.length-1){
                                                ActionAttributeWithArgumentsString+=`"${Attribute.value.value}"`;
                                            }else{
                                                ActionAttributeWithArgumentsString+=`"${Attribute.value.value}",`;
                                            }
                                        }else if(Attribute.value.type==="ATTRIBUTE"&&(Attribute.value.value.startsWith(triggerName)||Attribute.value.value.startsWith(getRelatedContext(triggerName)))){
                                            if(Index===Parameter.attributeArgumentRequests.length-1){
                                                ActionAttributeWithArgumentsString+=`${Attribute.value.value.split(".").slice(1).join(".")}`;
                                            }else{
                                                ActionAttributeWithArgumentsString+=`${Attribute.value.value.split(".").slice(1).join(".")},`;
                                            }
                                        }
                                        else{
                                            if(Index===Parameter.attributeArgumentRequests.length-1){
                                                ActionAttributeWithArgumentsString+=Attribute.value.value;
                                            }else{
                                                ActionAttributeWithArgumentsString+=`${Attribute.value.value},`
                                            }
                                        }
                                    }
                                }
                            })
                            ActionParametersString+=ActionAttributeWithArgumentsString+")"
                            
                        }
                        else{
                            if(Index===ruleObjectAction.parameterRequests.length-1){
                                ActionParametersString+=Parameter.data.value;
                            }else{
                                ActionParametersString+=`${Parameter.data.value},`
                            }
                        }
                    }
                }
            })
            ActionArgumentString+=`${ActionParametersString})`

        }
    }
    return ActionArgumentString
}

export const ReverseRuleParser=(ruleObject,triggerName,sourceContext,resultContext)=>{
    let Operators = {
        "==" :               {op: "EQUAL",                    compat: "isAny"},
        "~=" :               {op: "EQUAL_IGNORE_CASE",        compat: "isString"},
        "!=" :               {op: "NOT_EQUAL",                compat: "isAny"},
        "!~=" :              {op: "NOT_EQUAL_IGNORE_CASE",    compat: "isString"},
        ">" :                {op: "GREATER_THAN",             compat: "isNumeric"},
        ">=" :               {op: "GREATER_THAN_OR_EQUAL",    compat: "isNumeric"},
        "<" :                {op: "LESS_THAN",                compat: "isNumeric"},
        "<=" :               {op: "LESS_THAN_OR_EQUAL",       compat: "isNumeric"},
        "present" :          {op: "PRESENT",                  compat: "isAny"},
        "!present" :         {op: "NOT_PRESENT",              compat: "isAny"},
        "match_substring" :  {op: "MATCH_SUBSTRING",          compat: "isString"},
        "!match_substring" : {op: "DOES_NOT_MATCH_SUBSTRING", compat: "isString"},
        "match_pattern" :    {op: "MATCH_PATTERN",            compat: "isString"},
        "!match_pattern" :   {op: "DOES_NOT_MATCH_PATTERN",   compat: "isString"},
    };
    
    let conditionLHS;
    let conditionOperator;
    let conditionRHS;
    let ConditionArg;
    let actionLHS;
    let ActionParam;

    let conditionRulesArray=[];
    let actionRulesArray=[];

    if(!!ruleObject.conditionContainer){
        ruleObject.conditionContainer.conditions.map((ruleObjectCond,indexofCond)=>{
            conditionLHS="";
            conditionOperator="";
            conditionRHS="";
            ConditionArg="";

            conditionOperator=_.keys(Operators).find(function(Operator){return Operators[Operator].op==ruleObjectCond.operator})
            conditionLHS=ReturnConditionLHS(ruleObjectCond,triggerName)
            conditionRHS=ReturnConditionRHS(ruleObjectCond,sourceContext,triggerName)
            ConditionArg=ReturnConditionArgument(ruleObjectCond,sourceContext,triggerName,conditionLHS)
            let ConditionContainerOperator=(indexofCond<ruleObject.conditionContainer.conditions.length-1&&ruleObject.conditionContainer.conditions.length>1)?ruleObject.conditionContainer.operator:"";

            conditionRulesArray.push(conditionLHS+ConditionArg+" "+conditionOperator+conditionRHS+ConditionContainerOperator)
        })
    }
    if(!!ruleObject.actions){
        ruleObject.actions.map((ruleObjectAction,indexOfAction)=>{
            actionLHS="";
            ActionParam="";

            actionLHS=ReturnActionLHS(ruleObjectAction,triggerName)
            
            ActionParam=ReturnActionArgument(ruleObjectAction,resultContext,sourceContext,triggerName,actionLHS)
            let ActionOperator=(indexOfAction<ruleObject.actions.length-1&&ruleObject.actions.length>1)?" AND":"";
            actionRulesArray.push(actionLHS+ActionParam+ActionOperator)
        })
    }
    
    

    
        let textResult=
            `${ruleObject.conditionContainer===null?"":"if "+conditionRulesArray.map((e,i)=>{
                if(i!==0){
                    return "   "+e+"\n"
                }else{
                    return e+"\n"
                }
            })}` +
            `${ruleObject.conditionContainer===null?"":"then "}`+actionRulesArray.map((e,i)=>{
                if(i!=0){
                    return `${ruleObject.conditionContainer===null?e+"\n":"     "+e+"\n"}`
                }else{
                    return e+"\n"
                }
            });
        let textResSplitArr=textResult.split("\n");
        textResSplitArr.map((e,i)=>{
            if(e[0]==","){
                textResSplitArr[i]=e.substring(1)
            }
        })
        return textResSplitArr.join("\n");
    

}
export const RuleObj= {
    "name": "",
    "description": "",
    "enabled": true,
    "conditionContainer": {
        "conditions": [
            {
                "criteriaAdjustValue": [],
                "adjustOperator": null,
                "operator": "",
                "value": null,
                "criteriaAdjustOperator": null,
                "adjustValue": [],
                "valueArguments": [],
                "criteriaArguments": [],
                "criteria": {
                    "sourceContext": "",
                    "name": ""
                }
            }
        ],
        "operator": "AND",
        "subContainers": []
    },
    "actions": [
        {
            "attributeInfoRequest": {
                "resultContext": "",
                "name": ""
            },
            "parameterRequests": [
                {
                    "adjustOperatorRequest": null,
                    "attributeArgumentRequests": [],
                    "name": "Data",
                    "adjustDataRequest": [],
                    "data": {
                        "type": "NO_VALUE",
                        "value": ""
                    }
                }
            ]
        }
    ]
}


export const Operators = {
    "==" :               {op: "EQUAL",                    compat: "isAny"},
    "~=" :               {op: "EQUAL_IGNORE_CASE",        compat: "isString"},
    "!=" :               {op: "NOT_EQUAL",                compat: "isAny"},
    "!~=" :              {op: "NOT_EQUAL_IGNORE_CASE",    compat: "isString"},
    ">" :                {op: "GREATER_THAN",             compat: "isNumeric"},
    ">=" :               {op: "GREATER_THAN_OR_EQUAL",    compat: "isNumeric"},
    "<" :                {op: "LESS_THAN",                compat: "isNumeric"},
    "<=" :               {op: "LESS_THAN_OR_EQUAL",       compat: "isNumeric"},
    "present" :          {op: "PRESENT",                  compat: "isAny"},
    "!present" :         {op: "NOT_PRESENT",              compat: "isAny"},
    "match_substring" :  {op: "MATCH_SUBSTRING",          compat: "isString"},
    "!match_substring" : {op: "DOES_NOT_MATCH_SUBSTRING", compat: "isString"},
    "match_pattern" :    {op: "MATCH_PATTERN",            compat: "isString"},
    "!match_pattern" :   {op: "DOES_NOT_MATCH_PATTERN",   compat: "isString"},
};
const NameAppendFunc=(Arr)=>{
    let Name="";
    for(let i=0;i<Arr.length;i++){
        Name+=Arr[i];
        if(i<Arr.length-1){
            Name+=".";
        }

    }
    return Name
}
export const ArrayOfIndexesForThen=(str)=>{
    let ArrayofInd=[];
    for(let i=0;i<str.length;i++){
        if(str[i]=="t"){
            ArrayofInd.push(i);
        }
    }
    return ArrayofInd;
}
export const IndexToSplitAtThen=(str,testStr)=>{
    let ind=0;
    ArrayOfIndexesForThen(str).map(e=>{
        if((str[e-1]==testStr)&&str[e+4]==" "){
            ind=e;

        }
    });
    return ind
}

const QuotesTrimmer=(str)=>{
    let res=str.substring(1, str.length - 1);
    return res
}

export const ruleParser=(name,editor,triggerName,sourceContextObj,resultContextObj,srcContextKeys,resContextKeys)=>{

    let rules= {
        "name": "",
        "description": "",
        "enabled": true,
        "conditionContainer": {
            "conditions": [],
            "operator": "AND",
            "subContainers": []
        },
        "actions": []
    }


    rules.name=name;
    let trimmedEditor=(editor.trim());

    if(trimmedEditor.includes("if ") && trimmedEditor.includes("then ")){
        trimmedEditor=trimmedEditor.slice(0,2)+"\n"+trimmedEditor.slice(2,trimmedEditor.search(/then /)+4)+"\n"+trimmedEditor.slice(trimmedEditor.search(/then /)+4)
    }else{
        trimmedEditor="if"+"\n"+"then"+"\n"+trimmedEditor
    }
    let splitArray=trimmedEditor.split("\n");
    splitArray = splitArray.map(el => el.trim());
        
    let ConditionsArray=splitArray.slice(1,splitArray.indexOf("then"))
    let ActionsArray=splitArray.slice(splitArray.indexOf("then")+1)
    if(ConditionsArray.length===0){
        rules.conditionContainer=null;
    }else{
        rules.conditionContainer.operator=ConditionsArray[0].includes(" OR")?"OR":"AND"
        ConditionsArray.map((condition)=>{
            condition=condition.includes(" AND")?condition.split(" AND")[0]:condition.includes(" OR")?condition.split(" OR")[0]:condition;
            let ConditionOperator
            let conditionEmptyObj={
                        "criteriaAdjustValue": [],
                        "adjustOperator": null,
                        "operator": "",
                        "value": null,
                        "criteriaAdjustOperator": null,
                        "adjustValue": [],
                        "valueArguments": [],
                        "criteriaArguments": [],
                        "criteria": {
                            "sourceContext": "",
                            "name": ""
                        }
                    }

            _.keys(Operators).map(function (Operator) {
                if (condition.includes(Operator)) {
                    ConditionOperator=Operator
                    return conditionEmptyObj.operator = Operators[Operator].op;
                }
            })
            let ConditionLHS=condition.split(ConditionOperator)[0].trim();
            let ConditionRHS=condition.split(ConditionOperator)[1].trim();
            
            let criteriaArray = !!ConditionLHS && ConditionLHS.includes("(")&&ConditionLHS.includes(")")?ConditionLHS.split("(")[0].split("."):ConditionLHS.split(".") ;

            if(srcContextKeys.includes(criteriaArray[0])){
                conditionEmptyObj.criteria.sourceContext = criteriaArray[0];
                conditionEmptyObj.criteria.name = NameAppendFunc(criteriaArray.slice(1));
            }else{
                 if((criteriaArray[0]==="Response"&&isRequestContext(triggerName)||criteriaArray[0]==="Request"&&isResponseContext(triggerName))){
                    conditionEmptyObj.criteria.sourceContext = getRelatedContext(triggerName);
                 }else{
                    conditionEmptyObj.criteria.sourceContext = triggerName;
                 }
                conditionEmptyObj.criteria.name = NameAppendFunc(criteriaArray);
            }
            if (ConditionLHS.includes("(")&&ConditionLHS.includes(")")) {
                let CriteriaArgumentString = ConditionLHS.slice(ConditionLHS.indexOf("(")+1,ConditionLHS.lastIndexOf(")"));
                let CriteriaArgumentsArray = CriteriaArgumentString.split(splitAtCommaOutsideDoubleQuotes);
		        CriteriaArgumentsArray=CriteriaArgumentsArray.map(CriteriaArgument=>CriteriaArgument.trim())
                let ConditionLHSBeforeRoundBracketsWithoutSquareBrackets = ConditionLHS.split("(")[0].trim().replace(/\[[0-9]+\]/g,"");

                        if(sourceContextObj[ConditionLHSBeforeRoundBracketsWithoutSquareBrackets]["arg"].length===CriteriaArgumentsArray.length){
                            CriteriaArgumentsArray.map((CriteriaArgument, Index) => {
                                let Obj = {
                                    "name": "",
                                    "valueArguments": [],
                                    "value": {
                                        "type": "",
                                        "value": ""
                                    }
                                }
                                Obj.name = sourceContextObj[ConditionLHSBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index]["nm"];
                                if (dataTypeCheck(CriteriaArgument)==="LONG") {
                                    Obj.value.value = Number(CriteriaArgument);
                                    Obj.value.type = "LONG"
                                } else if (dataTypeCheck(CriteriaArgument)==="BOOLEAN") {
                                    Obj.value.value = CriteriaArgument;
                                    Obj.value.type = "BOOLEAN"
                                } else if (dataTypeCheck(CriteriaArgument)==="STRING") {
                                    Obj.value.value = QuotesTrimmer(CriteriaArgument);
                                    Obj.value.type = "STRING"
                                } else if(isAttributeDataType(CriteriaArgument,sourceContextObj)){
                                     if((CriteriaArgument.startsWith("Response")&&isRequestContext(triggerName)||CriteriaArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                        Obj.value.value = `${getRelatedContext(triggerName)}.${CriteriaArgument}`; 
                                     }else if((CriteriaArgument.startsWith("Response")&&isResponseContext(triggerName)||CriteriaArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                        Obj.value.value = `${triggerName}.${CriteriaArgument}`;
                                     }else{
                                        Obj.value.value = `${CriteriaArgument}`;
                                     }
                                    Obj.value.type = "ATTRIBUTE"
                                }
                                conditionEmptyObj.criteriaArguments.push(Obj);
                            })
                        }else{
                            let ObjForIndex = {
                                "name": "Index",
                                "valueArguments": [],
                                "value": {
                                    "type": "LONG",
                                    "value": -1
                                }
                            }
                            conditionEmptyObj.criteriaArguments.push(ObjForIndex);
                            CriteriaArgumentsArray.map((CriteriaArgument, Index) => {
                                let Obj = {
                                    "name": "",
                                    "valueArguments": [],
                                    "value": {
                                        "type": "",
                                        "value": ""
                                    }
                                }
                                Obj.name = sourceContextObj[ConditionLHSBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index+1]["nm"];
                                if (dataTypeCheck(CriteriaArgument)==="LONG") {
                                    Obj.value.value = Number(CriteriaArgument);
                                    Obj.value.type = "LONG"
                                } else if (dataTypeCheck(CriteriaArgument)==="BOOLEAN") {
                                    Obj.value.value = CriteriaArgument;
                                    Obj.value.type = "BOOLEAN"
                                } else if (dataTypeCheck(CriteriaArgument)==="STRING") {
                                    Obj.value.value = QuotesTrimmer(CriteriaArgument);
                                    Obj.value.type = "STRING"
                                } else if(isAttributeDataType(CriteriaArgument,sourceContextObj)){
                                    if((CriteriaArgument.startsWith("Response")&&isRequestContext(triggerName)||CriteriaArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                       Obj.value.value = `${getRelatedContext(triggerName)}.${CriteriaArgument}`; 
                                    }else if((CriteriaArgument.startsWith("Response")&&isResponseContext(triggerName)||CriteriaArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                       Obj.value.value = `${triggerName}.${CriteriaArgument}`;
                                    }else{
                                        Obj.value.value = `${CriteriaArgument}`;
                                    }
                                   Obj.value.type = "ATTRIBUTE"
                               }
        
                                conditionEmptyObj.criteriaArguments.push(Obj);
                            })
                        }
                        

            }
            if (!condition.includes("present") && !condition.includes("!present")) {
                let obj = {
                    "value": "",
                    "type": ""
                }
                if(ConditionRHS.includes("(")&&ConditionRHS.endsWith(")")&&isAttributeDataType(ConditionRHS,sourceContextObj)){
                    let CriteriaArgumentString = ConditionRHS.slice(ConditionRHS.indexOf("(")+1,ConditionRHS.lastIndexOf(")"));
                    let CriteriaArgumentsArray = CriteriaArgumentString.split(splitAtCommaOutsideDoubleQuotes);
                    CriteriaArgumentsArray=CriteriaArgumentsArray.map(CriteriaArgument=>CriteriaArgument.trim())
                    let ConditionRHSBeforeRoundBracketsWithoutSquareBrackets = ConditionRHS.split("(")[0].trim().replace(/\[[0-9]+\]/g,"");
                    if((ConditionRHS.startsWith("Response")&&isRequestContext(triggerName)||ConditionRHS.startsWith("Request")&&isResponseContext(triggerName))){
                        obj.value = `${getRelatedContext(triggerName)}.${ConditionRHS.split("(")[0].trim()}`; 
                     }else if((ConditionRHS.startsWith("Response")&&isResponseContext(triggerName)||ConditionRHS.startsWith("Request")&&isRequestContext(triggerName))){
                        obj.value = `${triggerName}.${ConditionRHS.split("(")[0].trim()}`;
                     }else{
                        obj.value = `${ConditionRHS.split("(")[0].trim()}`;
                     }
                    obj.type = "ATTRIBUTE"
                    if(sourceContextObj[ConditionRHSBeforeRoundBracketsWithoutSquareBrackets]["arg"].length===CriteriaArgumentsArray.length){
                        CriteriaArgumentsArray.map((CriteriaArgument, Index) => {
                            let Obj = {
                                "name": "",
                                "valueArguments": [],
                                "value": {
                                    "type": "",
                                    "value": ""
                                }
                            }
                            Obj.name = sourceContextObj[ConditionRHSBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index]["nm"];
                            if (dataTypeCheck(CriteriaArgument)==="LONG") {
                                Obj.value.value = Number(CriteriaArgument);
                                Obj.value.type = "LONG"
                            } else if (dataTypeCheck(CriteriaArgument)==="BOOLEAN") {
                                Obj.value.value = CriteriaArgument;
                                Obj.value.type = "BOOLEAN"
                            } else if (dataTypeCheck(CriteriaArgument)==="STRING") {
                                Obj.value.value = QuotesTrimmer(CriteriaArgument);
                                Obj.value.type = "STRING"
                            } else if(isAttributeDataType(CriteriaArgument,sourceContextObj)){
                                 if((CriteriaArgument.startsWith("Response")&&isRequestContext(triggerName)||CriteriaArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                    Obj.value.value = `${getRelatedContext(triggerName)}.${CriteriaArgument}`; 
                                 }else if((CriteriaArgument.startsWith("Response")&&isResponseContext(triggerName)||CriteriaArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                    Obj.value.value = `${triggerName}.${CriteriaArgument}`;
                                 }else{
                                    Obj.value.value = `${CriteriaArgument}`;
                                 }
                                Obj.value.type = "ATTRIBUTE"
                            }
                            conditionEmptyObj.valueArguments.push(Obj);
                        })
                    }else{
                        let ObjForIndex = {
                            "name": "Index",
                            "valueArguments": [],
                            "value": {
                                "type": "LONG",
                                "value": -1
                            }
                        }
                        conditionEmptyObj.valueArguments.push(ObjForIndex);
                        CriteriaArgumentsArray.map((CriteriaArgument, Index) => {
                            let Obj = {
                                "name": "",
                                "valueArguments": [],
                                "value": {
                                    "type": "",
                                    "value": ""
                                }
                            }
                            Obj.name = sourceContextObj[ConditionRHSBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index+1]["nm"];
                            if (dataTypeCheck(CriteriaArgument)==="LONG") {
                                Obj.value.value = Number(CriteriaArgument);
                                Obj.value.type = "LONG"
                            } else if (dataTypeCheck(CriteriaArgument)==="BOOLEAN") {
                                Obj.value.value = CriteriaArgument;
                                Obj.value.type = "BOOLEAN"
                            } else if (dataTypeCheck(CriteriaArgument)==="STRING") {
                                Obj.value.value = QuotesTrimmer(CriteriaArgument);
                                Obj.value.type = "STRING"
                            } else if(isAttributeDataType(CriteriaArgument,sourceContextObj)){
                                if((CriteriaArgument.startsWith("Response")&&isRequestContext(triggerName)||CriteriaArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                   Obj.value.value = `${getRelatedContext(triggerName)}.${CriteriaArgument}`; 
                                }else if((CriteriaArgument.startsWith("Response")&&isResponseContext(triggerName)||CriteriaArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                   Obj.value.value = `${triggerName}.${CriteriaArgument}`;
                                }else{
                                    Obj.value.value = `${CriteriaArgument}`;
                                }
                               Obj.value.type = "ATTRIBUTE"
                           }
    
                            conditionEmptyObj.valueArguments.push(Obj);
                        })
                    }

                }else{
                    if (dataTypeCheck(ConditionRHS)==="LONG") {
                        obj.value = Number(ConditionRHS);
                        obj.type = "LONG"
                    } else if (dataTypeCheck(ConditionRHS)==="BOOLEAN") {
                        obj.value = ConditionRHS;
                        obj.type = "BOOLEAN"
                    } else if (dataTypeCheck(ConditionRHS)==="STRING"){
                        obj.value = QuotesTrimmer(ConditionRHS);
                        obj.type = "STRING"
                    } else if(isAttributeDataType(ConditionRHS,sourceContextObj)){
                        if((ConditionRHS.startsWith("Response")&&isRequestContext(triggerName)||ConditionRHS.startsWith("Request")&&isResponseContext(triggerName))){
                            obj.value = `${getRelatedContext(triggerName)}.${ConditionRHS}`; 
                         }else if((ConditionRHS.startsWith("Response")&&isResponseContext(triggerName)||ConditionRHS.startsWith("Request")&&isRequestContext(triggerName))){
                            obj.value = `${triggerName}.${ConditionRHS}`;
                         }else{
                            obj.value = `${ConditionRHS}`;
                         }
                         obj.type = "ATTRIBUTE"
                    }
                }
                
                conditionEmptyObj.value = obj;

            }
            rules.conditionContainer.conditions.push(conditionEmptyObj)
        })
    }

        
        ActionsArray.map((Action)=>{
                Action=Action.includes(" AND")?Action.split(" AND")[0].trim():Action.trim();
                let ActionObject={
                    "attributeInfoRequest": {
                        "resultContext": "",
                        "name": ""
                    },
                    "parameterRequests": []
                }

                if (Action.includes("(") && Action.endsWith(")")) {
                    let splitAtCommaOutsideQuotesAndParenthesis=/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/
                    let ActionBeforeRoundBrackets=Action.split("(")[0].trim()
                    let ActionBeforeRoundBracketsWithoutSquareBrackets=ActionBeforeRoundBrackets.replace(/\[[0-9]+\]/g,"")
                    let ActionArgumentsWithRoundBrackets=Action.slice(Action.indexOf("("),Action.lastIndexOf(")")+1)
                    let ActionArgumentsArray=ActionArgumentsWithRoundBrackets.slice(1,-1).split(splitAtCommaOutsideQuotesAndParenthesis)
                    ActionArgumentsArray=ActionArgumentsArray.map(Argument=>Argument.trim())
                    let ParamObj = {
                        "adjustOperatorRequest": null,
                        "attributeArgumentRequests": [],
                        "name": "",
                        "adjustDataRequest": [],
                        "data": {
                            "type": "",
                            "value": ""
                        }
                    }
                    let obj = {
                        "type": "",
                        "value": ""
                    }
                    
                    if(resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"].length===1&&resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].rvt!=="VOID"){
                        if(ActionArgumentsArray[0].includes("(")&&ActionArgumentsArray[0].includes(")")&&isAttributeDataType(ActionArgumentsArray[0],sourceContextObj)){
                            let ActionArgumentBeforeRoundBrackets=ActionArgumentsArray[0].split("(")[0].trim()
                            let ActionArgumentBeforeRoundBracketsWithoutSquareBrackets=ActionArgumentBeforeRoundBrackets.replace(/\[[0-9]+\]/g,"")
                            let ActionAttributeArray = ActionBeforeRoundBrackets.includes(".") == true ? ActionBeforeRoundBrackets.split(".") : [ActionBeforeRoundBrackets]
                            if(resContextKeys.includes(ActionAttributeArray[0])){
                                ActionObject.attributeInfoRequest.resultContext = ActionAttributeArray[0];
                                ActionObject.attributeInfoRequest.name = NameAppendFunc(ActionAttributeArray.slice(1));
                            }else{
                                ActionObject.attributeInfoRequest.resultContext = triggerName;
                                ActionObject.attributeInfoRequest.name = NameAppendFunc(ActionAttributeArray);
                            }
                            ParamObj.name = resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"][0]["nm"];

                            if((ActionArgumentBeforeRoundBrackets.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentBeforeRoundBrackets.startsWith("Request")&&isResponseContext(triggerName))){
                                ParamObj.data.value = `${getRelatedContext(triggerName)}.${ActionArgumentBeforeRoundBrackets}`; 
                            }else if((ActionArgumentBeforeRoundBrackets.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentBeforeRoundBrackets.startsWith("Request")&&isRequestContext(triggerName))){
                                ParamObj.data.value = `${triggerName}.${ActionArgumentBeforeRoundBrackets}`;
                            }else{
                                ParamObj.data.value = `${ActionArgumentBeforeRoundBrackets}`;
                            }
                            ParamObj.data.type="ATTRIBUTE"
                            let ActionArgumentArgumentsArray=ActionArgumentsArray[0].slice(ActionArgumentsArray[0].indexOf("(")+1,ActionArgumentsArray[0].lastIndexOf(")")).split(splitAtCommaOutsideDoubleQuotes)
                            ActionArgumentArgumentsArray=ActionArgumentArgumentsArray.map(ArgumentsArgument=>ArgumentsArgument.trim())
                            if(sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"].length===ActionArgumentArgumentsArray.length){
                                
                                ActionArgumentArgumentsArray.map((ActionArgumentArgument, Index) => {
                                    let attributeArgumentRequestObject = {
                                        "name": "",
                                        "valueArguments": [],
                                        "value": {
                                            "type": "",
                                            "value": ""
                                        }
                                    }
                                    attributeArgumentRequestObject.name = sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index]["nm"];
                                    if (dataTypeCheck(ActionArgumentArgument)==="LONG") {
                                        attributeArgumentRequestObject.value.value = Number(ActionArgumentArgument);
                                        attributeArgumentRequestObject.value.type = "LONG"
                                    } else if (dataTypeCheck(ActionArgumentArgument)==="BOOLEAN") {
                                        attributeArgumentRequestObject.value.value = ActionArgumentArgument;
                                        attributeArgumentRequestObject.value.type = "BOOLEAN"
                                    } else if (dataTypeCheck(ActionArgumentArgument)==="STRING") {
                                        attributeArgumentRequestObject.value.value = QuotesTrimmer(ActionArgumentArgument);
                                        attributeArgumentRequestObject.value.type = "STRING"
                                    } else if(isAttributeDataType(ActionArgumentArgument,sourceContextObj)){
                                         if((ActionArgumentArgument.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                            attributeArgumentRequestObject.value.value = `${getRelatedContext(triggerName)}.${ActionArgumentArgument}`; 
                                         }else if((ActionArgumentArgument.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                            attributeArgumentRequestObject.value.value = `${triggerName}.${ActionArgumentArgument}`;
                                         }else{
                                            attributeArgumentRequestObject.value.value = `${ActionArgumentArgument}`;
                                         }
                                         attributeArgumentRequestObject.value.type = "ATTRIBUTE"
                                    }
                                    ParamObj.attributeArgumentRequests.push(attributeArgumentRequestObject);
                                })
                                ActionObject.parameterRequests.push(ParamObj);
                            }else{
                                let ObjForIndex = {
                                    "name": "Index",
                                    "valueArguments": [],
                                    "value": {
                                        "type": "LONG",
                                        "value": -1
                                    }
                                }
                                ParamObj.attributeArgumentRequests.push(ObjForIndex);
                                ActionArgumentArgumentsArray.map((ActionArgumentArgument, Index) => {
                                    let attributeArgumentRequestObject = {
                                        "name": "",
                                        "valueArguments": [],
                                        "value": {
                                            "type": "",
                                            "value": ""
                                        }
                                    }
                                    attributeArgumentRequestObject.name = sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index+1]["nm"];
                                    if (dataTypeCheck(ActionArgumentArgument)==="LONG") {
                                        attributeArgumentRequestObject.value.value = Number(ActionArgumentArgument);
                                        attributeArgumentRequestObject.value.type = "LONG"
                                    } else if (dataTypeCheck(ActionArgumentArgument)==="BOOLEAN") {
                                        attributeArgumentRequestObject.value.value = ActionArgumentArgument;
                                        attributeArgumentRequestObject.value.type = "BOOLEAN"
                                    } else if (dataTypeCheck(ActionArgumentArgument)==="STRING") {
                                        attributeArgumentRequestObject.value.value = QuotesTrimmer(ActionArgumentArgument);
                                        attributeArgumentRequestObject.value.type = "STRING"
                                    } else if(isAttributeDataType(ActionArgumentArgument,sourceContextObj)){
                                        if((ActionArgumentArgument.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                            attributeArgumentRequestObject.value.value = `${getRelatedContext(triggerName)}.${ActionArgumentArgument}`; 
                                        }else if((ActionArgumentArgument.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                            attributeArgumentRequestObject.value.value = `${triggerName}.${ActionArgumentArgument}`;
                                        }else{
                                            attributeArgumentRequestObject.value.value = `${ActionArgumentArgument}`;
                                        }
                                        attributeArgumentRequestObject.value.type = "ATTRIBUTE"
                                   }
            
                                   ParamObj.attributeArgumentRequests.push(attributeArgumentRequestObject);
                                })
                                ActionObject.parameterRequests.push(ParamObj);
                            }

                        }else{
                            let ActionAttributeArray = ActionBeforeRoundBrackets.includes(".") == true ? ActionBeforeRoundBrackets.split(".") : [ActionBeforeRoundBrackets]
                            if(resContextKeys.includes(ActionAttributeArray[0])){
                                ActionObject.attributeInfoRequest.resultContext = ActionAttributeArray[0];
                                ActionObject.attributeInfoRequest.name = NameAppendFunc(ActionAttributeArray.slice(1));
                            }else{
                                ActionObject.attributeInfoRequest.resultContext = triggerName;
                                ActionObject.attributeInfoRequest.name = NameAppendFunc(ActionAttributeArray);
                            }
                            if (dataTypeCheck(ActionArgumentsArray[0])==="LONG") {
                                obj.value = Number(ActionArgumentsArray[0]);
                                obj.type = "LONG"
                            } else if (dataTypeCheck(ActionArgumentsArray[0])==="BOOLEAN") {
                                obj.value = ActionArgumentsArray[0];
                                obj.type = "BOOLEAN"
                            } else if (dataTypeCheck(ActionArgumentsArray[0])==="STRING") {
                                obj.value = QuotesTrimmer(ActionArgumentsArray[0]);
                                obj.type = "STRING"
                            } else if(isAttributeDataType(ActionArgumentsArray[0],sourceContextObj)){
                                if((ActionArgumentsArray[0].startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentsArray[0].startsWith("Request")&&isResponseContext(triggerName))){
                                    obj.value = `${getRelatedContext(triggerName)}.${ActionArgumentsArray[0]}`; 
                                 }else if((ActionArgumentsArray[0].startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentsArray[0].startsWith("Request")&&isRequestContext(triggerName))){
                                    obj.value = `${triggerName}.${ActionArgumentsArray[0]}`;
                                 }else{
                                    obj.value = `${ActionArgumentsArray[0]}`;
                                 }
                                 obj.type = "ATTRIBUTE"
                            }
                            ParamObj.data = obj;
                            ParamObj.name = resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"][0]["nm"];
                            ActionObject.parameterRequests.push(ParamObj);
                        }
                    }else if(resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"].length>1){
                        let ActionAttributeArray = ActionBeforeRoundBrackets.includes(".") == true ? ActionBeforeRoundBrackets.split(".") : [ActionBeforeRoundBrackets]
                        if(resContextKeys.includes(ActionAttributeArray[0])){
                            ActionObject.attributeInfoRequest.resultContext = ActionAttributeArray[0];
                            ActionObject.attributeInfoRequest.name = NameAppendFunc(ActionAttributeArray.slice(1));
                        }else{
                            ActionObject.attributeInfoRequest.resultContext = triggerName;
                            ActionObject.attributeInfoRequest.name = NameAppendFunc(ActionAttributeArray);
                        }
                        if(resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"].length==ActionArgumentsArray.length){
                            ActionArgumentsArray.map((ActionArgument, Index) => {
                                let ParamObj = {
                                    "adjustOperatorRequest": null,
                                    "attributeArgumentRequests": [],
                                    "name": "",
                                    "adjustDataRequest": [],
                                    "data": {
                                        "type": "",
                                        "value": ""
                                    }
                                }
                                if(ActionArgument.includes("(")&&ActionArgument.endsWith(")")&&isAttributeDataType(ActionArgument,sourceContextObj)){
                                    
                                    let ActionArgumentBeforeRoundBrackets=ActionArgument.split("(")[0].trim()
                                    let ActionArgumentBeforeRoundBracketsWithoutSquareBrackets=ActionArgumentBeforeRoundBrackets.replace(/\[[0-9]+\]/g,"")
                                    if((ActionArgumentBeforeRoundBrackets.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentBeforeRoundBrackets.startsWith("Request")&&isResponseContext(triggerName))){
                                        ParamObj.data.value = `${getRelatedContext(triggerName)}.${ActionArgumentBeforeRoundBrackets}`; 
                                     }else if((ActionArgumentBeforeRoundBrackets.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentBeforeRoundBrackets.startsWith("Request")&&isRequestContext(triggerName))){
                                        ParamObj.data.value = `${triggerName}.${ActionArgumentBeforeRoundBrackets}`;
                                     }else{
                                        ParamObj.data.value = `${ActionArgumentBeforeRoundBrackets}`;
                                     }
                                    ParamObj.data.type="ATTRIBUTE"
                                    let ActionArgumentArgumentsArray=ActionArgument.slice(ActionArgument.indexOf("(")+1,ActionArgument.lastIndexOf(")")).split(splitAtCommaOutsideDoubleQuotes)
                                    ActionArgumentArgumentsArray=ActionArgumentArgumentsArray.map(ArgumentsArgument=>ArgumentsArgument.trim())
                                    
                                    if(sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"].length===ActionArgumentArgumentsArray.length){
                         
                                        ActionArgumentArgumentsArray.map((ActionArgumentArgument, Index) => {
                                            let attributeArgumentRequestObject = {
                                                "name": "",
                                                "valueArguments": [],
                                                "value": {
                                                    "type": "",
                                                    "value": ""
                                                }
                                            }
                                            attributeArgumentRequestObject.name = sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index]["nm"];
                                            if (dataTypeCheck(ActionArgumentArgument)==="LONG") {
                                                attributeArgumentRequestObject.value.value = Number(ActionArgumentArgument);
                                                attributeArgumentRequestObject.value.type = "LONG"
                                            } else if (dataTypeCheck(ActionArgumentArgument)==="BOOLEAN") {
                                                attributeArgumentRequestObject.value.value = ActionArgumentArgument;
                                                attributeArgumentRequestObject.value.type = "BOOLEAN"
                                            } else if (dataTypeCheck(ActionArgumentArgument)==="STRING") {
                                                attributeArgumentRequestObject.value.value = QuotesTrimmer(ActionArgumentArgument);
                                                attributeArgumentRequestObject.value.type = "STRING"
                                            } else if(isAttributeDataType(ActionArgumentArgument,sourceContextObj)){
                                                 if((ActionArgumentArgument.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                                    attributeArgumentRequestObject.value.value = `${getRelatedContext(triggerName)}.${ActionArgumentArgument}`; 
                                                 }else if((ActionArgumentArgument.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                                    attributeArgumentRequestObject.value.value = `${triggerName}.${ActionArgumentArgument}`;
                                                 }else{
                                                    attributeArgumentRequestObject.value.value = `${ActionArgumentArgument}`;
                                                 }
                                                 attributeArgumentRequestObject.value.type = "ATTRIBUTE"
                                            }
                                            ParamObj.attributeArgumentRequests.push(attributeArgumentRequestObject);
                                        })
                                    }else{
                                        let ObjForIndex = {
                                            "name": "Index",
                                            "valueArguments": [],
                                            "value": {
                                                "type": "LONG",
                                                "value": -1
                                            }
                                        }
                                        ParamObj.attributeArgumentRequests.push(ObjForIndex);
                                        ActionArgumentArgumentsArray.map((ActionArgumentArgument, Index) => {
                                            let attributeArgumentRequestObject = {
                                                "name": "",
                                                "valueArguments": [],
                                                "value": {
                                                    "type": "",
                                                    "value": ""
                                                }
                                            }
                                            attributeArgumentRequestObject.name = sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index+1]["nm"];
                                            if (dataTypeCheck(ActionArgumentArgument)==="LONG") {
                                                attributeArgumentRequestObject.value.value = Number(ActionArgumentArgument);
                                                attributeArgumentRequestObject.value.type = "LONG"
                                            } else if (dataTypeCheck(ActionArgumentArgument)==="BOOLEAN") {
                                                attributeArgumentRequestObject.value.value = ActionArgumentArgument;
                                                attributeArgumentRequestObject.value.type = "BOOLEAN"
                                            } else if (dataTypeCheck(ActionArgumentArgument)==="STRING") {
                                                attributeArgumentRequestObject.value.value = QuotesTrimmer(ActionArgumentArgument);
                                                attributeArgumentRequestObject.value.type = "STRING"
                                            } else if(isAttributeDataType(ActionArgumentArgument,sourceContextObj)){
                                                if((ActionArgumentArgument.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                                    attributeArgumentRequestObject.value.value = `${getRelatedContext(triggerName)}.${ActionArgumentArgument}`; 
                                                }else if((ActionArgumentArgument.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                                    attributeArgumentRequestObject.value.value = `${triggerName}.${ActionArgumentArgument}`;
                                                }else{
                                                    attributeArgumentRequestObject.value.value = `${ActionArgumentArgument}`;
                                                }
                                                attributeArgumentRequestObject.value.type = "ATTRIBUTE"
                                           }
                    
                                           ParamObj.attributeArgumentRequests.push(attributeArgumentRequestObject);
                                        })
                                    }
                                    ParamObj.name = resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"][Index]["nm"];
                                    ActionObject.parameterRequests.push(ParamObj);
                                }else{
                                    if (dataTypeCheck(ActionArgument)==="LONG") {
                                        ParamObj.data.value = Number(ActionArgument);
                                        ParamObj.data.type = "LONG"
                                    } else if (dataTypeCheck(ActionArgument)==="BOOLEAN") {
                                        ParamObj.data.value = ActionArgument;
                                        ParamObj.data.type = "BOOLEAN"
                                    } else if (dataTypeCheck(ActionArgument)==="STRING") {
                                        ParamObj.data.value = QuotesTrimmer(ActionArgument);
                                        ParamObj.data.type = "STRING"
                                    } else if(isAttributeDataType(ActionArgument,sourceContextObj)){
                                        if((ActionArgument.startsWith("Response")&&isRequestContext(triggerName)||ActionArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                            ParamObj.data.value = `${getRelatedContext(triggerName)}.${ActionArgument}`; 
                                         }else if((ActionArgument.startsWith("Response")&&isResponseContext(triggerName)||ActionArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                            ParamObj.data.value = `${triggerName}.${ActionArgument}`;
                                         }else{
                                            ParamObj.data.value = `${ActionArgument}`;
                                         }
                                         ParamObj.data.type = "ATTRIBUTE"
                                    }
                                    ParamObj.name = resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"][Index]["nm"];
                                    ActionObject.parameterRequests.push(ParamObj);
                                }
                                
                            })
                        }else{
                            let ParamObjForEncoded
                            let ParamObjForUnique
                            if(ActionBeforeRoundBracketsWithoutSquareBrackets === "QueryParamAdd"||ActionBeforeRoundBracketsWithoutSquareBrackets === "QueryParamSet"){
                                ParamObjForEncoded={
                                    "adjustOperatorRequest": null,
                                    "attributeArgumentRequests": [],
                                    "name": "IsEncoded",
                                    "adjustDataRequest": [],
                                    "data": {
                                        "type": "BOOLEAN",
                                        "value": "false"
                                    }
                                }
                                ParamObjForUnique={
                                    "adjustOperatorRequest": null,
                                    "attributeArgumentRequests": [],
                                    "name": "IsUnique",
                                    "adjustDataRequest": [],
                                    "data": {
                                        "type": "BOOLEAN",
                                        "value": "true"
                                    }
                                }
                             }
                            else{
                                let ParamObjForIndex={
                                    "adjustOperatorRequest": null,
                                        "attributeArgumentRequests": [],
                                        "name": "Index",
                                        "adjustDataRequest": [],
                                        "data": {
                                            "type": "LONG",
                                            "value": -1
                                        }
                                }
                                ActionObject.parameterRequests.push(ParamObjForIndex);
                            }
        
                            ActionArgumentsArray.map((ActionArgument, Index) => {
                                let ParamObj = {
                                    "adjustOperatorRequest": null,
                                    "attributeArgumentRequests": [],
                                    "name": "",
                                    "adjustDataRequest": [],
                                    "data": {
                                        "type": "",
                                        "value": ""
                                    }
                                }
                                if(ActionArgument.includes("(")&&ActionArgument.endsWith(")")&&isAttributeDataType(ActionArgument,sourceContextObj)){
                                    
                                    let ActionArgumentBeforeRoundBrackets=ActionArgument.split("(")[0].trim()
                                    let ActionArgumentBeforeRoundBracketsWithoutSquareBrackets=ActionArgumentBeforeRoundBrackets.replace(/\[[0-9]+\]/g,"")
                                    if((ActionArgumentBeforeRoundBrackets.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentBeforeRoundBrackets.startsWith("Request")&&isResponseContext(triggerName))){
                                        ParamObj.data.value = `${getRelatedContext(triggerName)}.${ActionArgumentBeforeRoundBrackets}`; 
                                     }else if((ActionArgumentBeforeRoundBrackets.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentBeforeRoundBrackets.startsWith("Request")&&isRequestContext(triggerName))){
                                        ParamObj.data.value = `${triggerName}.${ActionArgumentBeforeRoundBrackets}`;
                                     }else{
                                        ParamObj.data.value = `${ActionArgumentBeforeRoundBrackets}`;
                                     }
                                     ParamObj.data.type = "ATTRIBUTE"
                                    
                                    let ActionArgumentArgumentsArray=ActionArgument.slice(ActionArgument.indexOf("(")+1,ActionArgument.lastIndexOf(")")).split(splitAtCommaOutsideDoubleQuotes)
                                    ActionArgumentArgumentsArray=ActionArgumentArgumentsArray.map(ArgumentsArgument=>ArgumentsArgument.trim())
                                    
                                    if(sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"].length===ActionArgumentArgumentsArray.length){
                         
                                        ActionArgumentArgumentsArray.map((ActionArgumentArgument, Index) => {
                                            let attributeArgumentRequestObject = {
                                                "name": "",
                                                "valueArguments": [],
                                                "value": {
                                                    "type": "",
                                                    "value": ""
                                                }
                                            }
                                            attributeArgumentRequestObject.name = sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index]["nm"];
                                            if (dataTypeCheck(ActionArgumentArgument)==="LONG") {
                                                attributeArgumentRequestObject.value.value = Number(ActionArgumentArgument);
                                                attributeArgumentRequestObject.value.type = "LONG"
                                            } else if (dataTypeCheck(ActionArgumentArgument)==="BOOLEAN") {
                                                attributeArgumentRequestObject.value.value = ActionArgumentArgument;
                                                attributeArgumentRequestObject.value.type = "BOOLEAN"
                                            } else if (dataTypeCheck(ActionArgumentArgument)==="STRING") {
                                                attributeArgumentRequestObject.value.value = QuotesTrimmer(ActionArgumentArgument);
                                                attributeArgumentRequestObject.value.type = "STRING"
                                            } else if(isAttributeDataType(ActionArgumentArgument,sourceContextObj)){
                                                 if((ActionArgumentArgument.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                                    attributeArgumentRequestObject.value.value = `${getRelatedContext(triggerName)}.${ActionArgumentArgument}`; 
                                                 }else if((ActionArgumentArgument.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                                    attributeArgumentRequestObject.value.value = `${triggerName}.${ActionArgumentArgument}`;
                                                 }else{
                                                    attributeArgumentRequestObject.value.value = `${ActionArgumentArgument}`;
                                                 }
                                                 attributeArgumentRequestObject.value.type = "ATTRIBUTE"
                                            }
                                            ParamObj.attributeArgumentRequests.push(attributeArgumentRequestObject);
                                        })
                                    }else{
                                        let ObjForIndex = {
                                            "name": "Index",
                                            "valueArguments": [],
                                            "value": {
                                                "type": "LONG",
                                                "value": -1
                                            }
                                        }
                                        ParamObj.attributeArgumentRequests.push(ObjForIndex);
                                        ActionArgumentArgumentsArray.map((ActionArgumentArgument, Index) => {
                                            let attributeArgumentRequestObject = {
                                                "name": "",
                                                "valueArguments": [],
                                                "value": {
                                                    "type": "",
                                                    "value": ""
                                                }
                                            }
                                            attributeArgumentRequestObject.name = sourceContextObj[ActionArgumentBeforeRoundBracketsWithoutSquareBrackets]["arg"][Index+1]["nm"];
                                            if (dataTypeCheck(ActionArgumentArgument)==="LONG") {
                                                attributeArgumentRequestObject.value.value = Number(ActionArgumentArgument);
                                                attributeArgumentRequestObject.value.type = "LONG"
                                            } else if (dataTypeCheck(ActionArgumentArgument)==="BOOLEAN") {
                                                attributeArgumentRequestObject.value.value = ActionArgumentArgument;
                                                attributeArgumentRequestObject.value.type = "BOOLEAN"
                                            } else if (dataTypeCheck(ActionArgumentArgument)==="STRING") {
                                                attributeArgumentRequestObject.value.value = QuotesTrimmer(ActionArgumentArgument);
                                                attributeArgumentRequestObject.value.type = "STRING"
                                            } else if(isAttributeDataType(ActionArgumentArgument,sourceContextObj)){
                                                if((ActionArgumentArgument.startsWith("Response")&&isRequestContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                                    attributeArgumentRequestObject.value.value = `${getRelatedContext(triggerName)}.${ActionArgumentArgument}`; 
                                                }else if((ActionArgumentArgument.startsWith("Response")&&isResponseContext(triggerName)||ActionArgumentArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                                    attributeArgumentRequestObject.value.value = `${triggerName}.${ActionArgumentArgument}`;
                                                }else{
                                                    attributeArgumentRequestObject.value.value = `${ActionArgumentArgument}`;
                                                }
                                                attributeArgumentRequestObject.value.type = "ATTRIBUTE"
                                           }
                    
                                           ParamObj.attributeArgumentRequests.push(attributeArgumentRequestObject);
                                        })
                                    }
                                    ParamObj.name = resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"][Index+1]["nm"];
                                    ActionObject.parameterRequests.push(ParamObj);
                                }else{
                                    if (dataTypeCheck(ActionArgument)==="LONG") {
                                        ParamObj.data.value = Number(ActionArgument);
                                        ParamObj.data.type = "LONG"
                                    } else if (dataTypeCheck(ActionArgument)==="BOOLEAN") {
                                        ParamObj.data.value = ActionArgument;
                                        ParamObj.data.type = "BOOLEAN"
                                    } else if (dataTypeCheck(ActionArgument)==="STRING") {
                                        ParamObj.data.value = QuotesTrimmer(ActionArgument);
                                        ParamObj.data.type = "STRING"
                                    } else if(isAttributeDataType(ActionArgument,sourceContextObj)){
                                        if((ActionArgument.startsWith("Response")&&isRequestContext(triggerName)||ActionArgument.startsWith("Request")&&isResponseContext(triggerName))){
                                            ParamObj.data.value = `${getRelatedContext(triggerName)}.${ActionArgument}`; 
                                         }else if((ActionArgument.startsWith("Response")&&isResponseContext(triggerName)||ActionArgument.startsWith("Request")&&isRequestContext(triggerName))){
                                            ParamObj.data.value = `${triggerName}.${ActionArgument}`;
                                         }else{
                                            ParamObj.data.value = `${ActionArgument}`;
                                         }
                                         ParamObj.data.type = "ATTRIBUTE"
                                    }
                                    if(ActionBeforeRoundBracketsWithoutSquareBrackets === "QueryParamAdd"||ActionBeforeRoundBracketsWithoutSquareBrackets === "QueryParamSet"){
                                        ParamObj.name = resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"][Index]["nm"];
                                    }
                                    else ParamObj.name = resultContextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"][Index+1]["nm"];
                                    ActionObject.parameterRequests.push(ParamObj);
                                }
                            })

                            if(ActionBeforeRoundBracketsWithoutSquareBrackets === "QueryParamAdd"){
                                if(ActionObject.parameterRequests.length === 2){
                                ActionObject.parameterRequests.push(ParamObjForEncoded)
                                ActionObject.parameterRequests.push(ParamObjForUnique)
                                }
                                else if(ActionObject.parameterRequests.length === 3){
                                    ActionObject.parameterRequests.push(ParamObjForUnique) 
                                }
                            }
                            else if (ActionBeforeRoundBracketsWithoutSquareBrackets === "QueryParamSet"){
                                ActionObject.parameterRequests.push(ParamObjForEncoded)
                            }


                        }
                    }
                    
                } else {
                    let ActionArray = Action.split(".");
                    if(resContextKeys.includes(ActionArray[0])){
                        ActionObject.attributeInfoRequest.resultContext = ActionArray[0];
                        ActionObject.attributeInfoRequest.name = NameAppendFunc(ActionArray.slice(1));
                    }else{
                        ActionObject.attributeInfoRequest.resultContext = triggerName;
                        ActionObject.attributeInfoRequest.name = NameAppendFunc(ActionArray);
                    }
                }

                rules.actions.push(ActionObject)
        })
    
    return rules

}

export const dataTypeCheck=(str)=>{
    str=str.trim();
        if(numberRegex.test(str)){
            return "LONG"
        }else if((str=="true"||str=="false")&&!str.startsWith("'")&&!str.startsWith("\"")&&!str.endsWith("'")&&!str.endsWith("\"")){
           return "BOOLEAN"
        }
        else if((str.startsWith("'")&&str.endsWith("'"))||(str.startsWith("\"")&&str.endsWith("\""))){
            return "STRING"
        }else{
            return "DEFAULT"
        }
}


export const AndOrRuleValidation=(RarrConditions,RarrActions)=>{
    let AndOrCondition=false;
    let AndOrRequiredCondition=true;
    let MultipleAndOrAbsentCondition=true;
    
    if(RarrConditions.length===1&&RarrActions.length===1){
		let AndOrinCondition= RarrConditions[0].split(" ").pop()
        let AndOrinAction=RarrActions[0].split(" ").pop()
        if(AndOrinCondition=="AND" || AndOrinCondition=="OR"||AndOrinAction=="AND" || AndOrinAction=="OR"){
            AndOrCondition=false;
        }else{
            AndOrCondition=true;
        }
    }
    else if(RarrConditions.length===0&&RarrActions.length===1){
        let AndOrinAction=RarrActions[0].split(" ").pop()
        if(AndOrinAction=="AND" || AndOrinAction=="OR"){
            AndOrCondition=false;
        }else{
            AndOrCondition=true;
        }
    }
    else if(RarrConditions.length===0&&RarrActions.length>1){
        let lastThenStatement=RarrActions[RarrActions.length-1].split(" ").pop()
        if(lastThenStatement=="AND"||lastThenStatement=="OR"){
            AndOrCondition=false;
        }else{
            let ActionAndCount=AndOrCount(RarrConditions,RarrActions)[2];
            let ActionOrCount=AndOrCount(RarrConditions,RarrActions)[3];
            let ModifiedRarr=[...RarrActions.slice(0,RarrActions.length-1)]
            ModifiedRarr.map((element)=>{
                if(!element.includes(" AND")&&!element.includes(" OR")){
                    AndOrRequiredCondition=AndOrRequiredCondition&&false
                }else{
                    AndOrRequiredCondition=AndOrRequiredCondition&&true
                }
                if(element.includes(" AND")&&element.split(" AND").length===2&&element.split(" AND")[1].trim()===""){
                    MultipleAndOrAbsentCondition=MultipleAndOrAbsentCondition&&true
                }else if(element.includes(" OR")&&element.split(" OR").length===2&&element.split(" OR")[1].trim()===""){
                    MultipleAndOrAbsentCondition=MultipleAndOrAbsentCondition&&true
                }else{
                    MultipleAndOrAbsentCondition=MultipleAndOrAbsentCondition&&false
                }
            })
            if(ActionOrCount===0&&ActionAndCount===RarrActions.length-1){
                AndOrCondition=true;
            }else{
                AndOrCondition=false
            }
        } 
    }
    else{
        let lastIfStatement=RarrConditions[RarrConditions.length-1].split(" ").pop()
        let lastThenStatement=RarrActions[RarrActions.length-1].split(" ").pop()
        if(lastIfStatement=="AND"||lastIfStatement=="OR"||lastThenStatement=="AND"||lastThenStatement=="OR"){
            AndOrCondition=false;
        }else{
            let ConditionAndCount=AndOrCount(RarrConditions,RarrActions)[0];
            let ConditionOrCount=AndOrCount(RarrConditions,RarrActions)[1];
            let ActionAndCount=AndOrCount(RarrConditions,RarrActions)[2];
            let ActionOrCount=AndOrCount(RarrConditions,RarrActions)[3];
            let ModifiedRarr=[...RarrConditions.slice(0,RarrConditions.length-1),...RarrActions.slice(0,RarrActions.length-1)]
            ModifiedRarr.map((element)=>{
                if(!element.includes(" AND")&&!element.includes(" OR")){
                    AndOrRequiredCondition=AndOrRequiredCondition&&false
                }else{
                    AndOrRequiredCondition=AndOrRequiredCondition&&true
                }
                if(element.includes(" AND")&&element.split(" AND").length===2&&element.split(" AND")[1].trim()===""){
                    MultipleAndOrAbsentCondition=MultipleAndOrAbsentCondition&&true
                }else if(element.includes(" OR")&&element.split(" OR").length===2&&element.split(" OR")[1].trim()===""){
                    MultipleAndOrAbsentCondition=MultipleAndOrAbsentCondition&&true
                }else{
                    MultipleAndOrAbsentCondition=MultipleAndOrAbsentCondition&&false
                }
            })
            if((ActionOrCount===0&&(ActionAndCount!==0||ActionAndCount===0))&&((ConditionAndCount!==0&&ConditionOrCount===0)||(ConditionAndCount===0&&ConditionOrCount!==0)||(ConditionAndCount===0&&ConditionOrCount===0))){
                AndOrCondition=true;
            }else{
                AndOrCondition=false
            }
        } 
    }
                
    return AndOrCondition&&AndOrRequiredCondition&&MultipleAndOrAbsentCondition
}

export const SetPriorityRangeValidation=(val)=>{
    if(dataTypeCheck(val)!=="LONG"||val<0||val>31){
        return false;
    }
    return true;
}

export const AndOrCount=(RarrConditions,RarrActions)=>{
    let ConditionAndCount=0;
    let ConditionOrCount=0;
    let ActionAndCount=0;
    let ActionOrCount=0;

    RarrConditions.map((element)=>{
        if(element.includes(" AND")){
            ConditionAndCount+=1;
        }else if(element.includes(" OR")){
            ConditionOrCount+=1;
        }
    })
    RarrActions.map((element)=>{
        if(element.includes(" AND")){
            ActionAndCount+=1;
        }else if(element.includes(" OR")){
            ActionOrCount+=1;
        }
    })
    return [ConditionAndCount,ConditionOrCount,ActionAndCount,ActionOrCount]
}

const isAttributeDataType=(value,sourceContext)=>{
    let valueWithoutBrackets=value.replace(/\[[0-9]+\]/g,"")
    if(value.includes("(")&&value.endsWith(")")){
        return !!sourceContext[valueWithoutBrackets.split("(")[0].trim()]&&BaseTypeWrongPositionCheckCondition(sourceContext,value.split("(")[0].trim(),"Source")&&BaseTypeCorrectPositionAbsentCondition(valueWithoutBrackets,sourceContext,value,"Source")
    }
    else{
        return !!sourceContext[valueWithoutBrackets.trim()]&&BaseTypeWrongPositionCheckCondition(sourceContext,value,"Source")&&BaseTypeCorrectPositionAbsentCondition(valueWithoutBrackets,sourceContext,value,"Source")
    }
}

const ActionArgumentsValidation=(ActionArguments,ActionBeforeRoundBracketsWithoutSquareBrackets,resultcontextObj,sourcecontextObj)=>{
    let splitAtCommaOutsideQuotesAndParenthesis=/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/
    let isActionArgumentsValid=true;
    let ActionArgumentsWithoutRoundBrackets=ActionArguments.slice(1,-1)
    let ActionArgumentsCountCheck=true;
    let ActionArgumentsArray=ActionArgumentsWithoutRoundBrackets.split(splitAtCommaOutsideQuotesAndParenthesis)
    !!ActionArgumentsArray&&ActionArgumentsArray.map((Argument,Index)=>{
        if(resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"].length===ActionArgumentsArray.length&& !(ActionBeforeRoundBracketsWithoutSquareBrackets==='QueryParamSet'||ActionBeforeRoundBracketsWithoutSquareBrackets==='QueryParamAdd')){
            if(Argument.includes("(")&&Argument.endsWith(")")){
                let ConditionArguments=Argument.slice(Argument.indexOf("("),Argument.lastIndexOf(")")+1)
                let ConditionBeforeRoundBracketsWithoutSquareBrackets=Argument.split("(")[0].trim().replace(/\[[0-9]+\]/g,"")
                isActionArgumentsValid=isActionArgumentsValid&&ConditionArgumentsValidation(ConditionArguments,ConditionBeforeRoundBracketsWithoutSquareBrackets,sourcecontextObj)&&isAttributeDataType(Argument,sourcecontextObj)&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index].vt===sourcecontextObj[Argument.split("(")[0].trim().replace(/\[[0-9]+\]/g,"")].att
            }else{
                isActionArgumentsValid=isActionArgumentsValid&&(dataTypeCheck(Argument)==resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index].vt||(isAttributeDataType(Argument,sourcecontextObj)&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index].vt===sourcecontextObj[Argument.replace(/\[[0-9]+\]/g,"")].att));
            }
            
            
        }

        else if (ActionBeforeRoundBracketsWithoutSquareBrackets==='QueryParamSet'||ActionBeforeRoundBracketsWithoutSquareBrackets==='QueryParamAdd')
            {
                ActionArgumentsCountCheck=ActionArgumentsCountCheck&&ActionArgumentsArray.length >= 2
                if(Argument.includes("(")&&Argument.endsWith(")")){
                    let ConditionArguments=Argument.slice(Argument.indexOf("("),Argument.lastIndexOf(")")+1)
                    let ConditionBeforeRoundBracketsWithoutSquareBrackets=Argument.split("(")[0].trim().replace(/\[[0-9]+\]/g,"")
                    isActionArgumentsValid=isActionArgumentsValid&&ConditionArgumentsValidation(ConditionArguments,ConditionBeforeRoundBracketsWithoutSquareBrackets,sourcecontextObj)&&isAttributeDataType(Argument,sourcecontextObj)&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index].vt===sourcecontextObj[Argument.split("(")[0].trim().replace(/\[[0-9]+\]/g,"")].att
                }else{
                    isActionArgumentsValid=isActionArgumentsValid&&(dataTypeCheck(Argument)==resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index].vt||(isAttributeDataType(Argument,sourcecontextObj)&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index].vt===sourcecontextObj[Argument.replace(/\[[0-9]+\]/g,"")].att));
                }
            }

        else if (ActionBeforeRoundBracketsWithoutSquareBrackets==='HttpHeaderGet'||ActionBeforeRoundBracketsWithoutSquareBrackets==='HttpHeaderSet'||ActionBeforeRoundBracketsWithoutSquareBrackets==='HttpHeaderRemove'||ActionBeforeRoundBracketsWithoutSquareBrackets==='HttpHeaderReplace')
        {
            ActionArgumentsCountCheck=ActionArgumentsCountCheck&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"].length===ActionArgumentsArray.length+1
            if(Argument.includes("(")&&Argument.endsWith(")")){
                let ConditionArguments=Argument.slice(Argument.indexOf("("),Argument.lastIndexOf(")")+1)
                let ConditionBeforeRoundBracketsWithoutSquareBrackets=Argument.split("(")[0].trim().replace(/\[[0-9]+\]/g,"")
                isActionArgumentsValid=isActionArgumentsValid&&ConditionArgumentsValidation(ConditionArguments,ConditionBeforeRoundBracketsWithoutSquareBrackets,sourcecontextObj)&&isAttributeDataType(Argument,sourcecontextObj)&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index+1].vt===sourcecontextObj[Argument.split("(")[0].trim().replace(/\[[0-9]+\]/g,"")].att
            }else{
                isActionArgumentsValid=isActionArgumentsValid&&(dataTypeCheck(Argument)==resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index+1].vt||(isAttributeDataType(Argument,sourcecontextObj)&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index+1].vt===sourcecontextObj[Argument.replace(/\[[0-9]+\]/g,"")].att));
            }
        }

        else{
            ActionArgumentsCountCheck=ActionArgumentsCountCheck&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]["par"].length===ActionArgumentsArray.length
            if(Argument.includes("(")&&Argument.endsWith(")")){
                let ConditionArguments=Argument.slice(Argument.indexOf("("),Argument.lastIndexOf(")")+1)
                let ConditionBeforeRoundBracketsWithoutSquareBrackets=Argument.split("(")[0].trim().replace(/\[[0-9]+\]/g,"")
                isActionArgumentsValid=isActionArgumentsValid&&ConditionArgumentsValidation(ConditionArguments,ConditionBeforeRoundBracketsWithoutSquareBrackets,sourcecontextObj)&&isAttributeDataType(Argument,sourcecontextObj)&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index+1].vt===sourcecontextObj[Argument.split("(")[0].trim().replace(/\[[0-9]+\]/g,"")].att
            }else{
                isActionArgumentsValid=isActionArgumentsValid&&(dataTypeCheck(Argument)==resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index+1].vt||(isAttributeDataType(Argument,sourcecontextObj)&&resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets].par[Index+1].vt===sourcecontextObj[Argument.replace(/\[[0-9]+\]/g,"")].att));
            }
        }
    })
    return isActionArgumentsValid&&ActionArgumentsCountCheck
}

const ConditionArgumentsValidation=(ConditionArguments,ConditionBeforeRoundBracketsWithoutSquareBrackets,sourceContext)=>{
    let isConditionArgumentsValid=true;
    let isArgumentsRequired=true
    let ConditionArgumentCheck=true;
    let ConditionArgumentsWithoutRoundBrackets=ConditionArguments.slice(1,-1)
    let ConditionArgumentsArray=ConditionArgumentsWithoutRoundBrackets.split(splitAtCommaOutsideDoubleQuotes)
    !!ConditionArgumentsArray&&ConditionArgumentsArray.map((Argument,Index)=>{
        if(sourceContext[ConditionBeforeRoundBracketsWithoutSquareBrackets]["arg"].length==ConditionArgumentsArray.length){
            isConditionArgumentsValid=isConditionArgumentsValid&&(dataTypeCheck(Argument)==sourceContext[ConditionBeforeRoundBracketsWithoutSquareBrackets].arg[Index].vt||(isAttributeDataType(Argument,sourceContext)&&sourceContext[ConditionBeforeRoundBracketsWithoutSquareBrackets].arg[Index].vt===sourceContext[Argument.replace(/\[[0-9]+\]/g,"")].att));            
        }else{
            ConditionArgumentCheck=ConditionArgumentCheck&&sourceContext[ConditionBeforeRoundBracketsWithoutSquareBrackets]["arg"].length===ConditionArgumentsArray.length+1
            isConditionArgumentsValid=isConditionArgumentsValid&&(dataTypeCheck(Argument)==sourceContext[ConditionBeforeRoundBracketsWithoutSquareBrackets].arg[Index+1].vt||isAttributeDataType(Argument,sourceContext));
        }
        if(isAttributeDataType(Argument,sourceContext)&&sourceContext[Argument.replace(/\[[0-9]+\]/g,"")].arg.length>0){
            if(Argument.includes("(")&&Argument.includes(")")){
                isArgumentsRequired=isArgumentsRequired&&true
            }else{
                isArgumentsRequired=isArgumentsRequired&&false
            }
        }
        
    })
    return isConditionArgumentsValid&&isArgumentsRequired&&ConditionArgumentCheck

}

const ConditionRHSValidation=(RarrConditions,operatorSymbols,MathematicalOperators,sourcecontextObj)=>{
    let isConditionOperatorValid=true;
    let isConditionRHSBaseTypeCheck=true;
    let isConditionRHSArgumentsValid=true;
    let isConditionRHSPresentInSrcContext=true;
    let isConditionRHSPresent=true;
    let isConditionRHSDataTypeValid=true
    let isGarbageValueAbsent=true

    RarrConditions.map((ConditionRule)=>{
        let ConditionRuleWithoutANDandOR=ConditionRule.includes(" AND")?ConditionRule.split(" AND")[0].trim():ConditionRule.includes(" OR")?ConditionRule.split(" OR")[0].trim():ConditionRule;
        let ConditionOperator;
        operatorSymbols.map(function (operator) {
            if (ConditionRuleWithoutANDandOR.includes(operator)) {
                ConditionOperator = operator;
            }
        })
        let ConditionLHS=ConditionRuleWithoutANDandOR.split(ConditionOperator)[0].trim()
        let ConditionRHS=ConditionRuleWithoutANDandOR.split(ConditionOperator)[1].trim()
        let ConditionLHSWithoutSquareBrackets=ConditionLHS.replace(/\[[0-9]+\]/g,"")
        let ConditionRHSWithoutSquareBrackets=ConditionRHS.replace(/\[[0-9]+\]/g,"")
        let ConditionLHSForReturnTypeCheck=ConditionLHSWithoutSquareBrackets.includes("(")&&ConditionLHSWithoutSquareBrackets.includes(")")?ConditionLHSWithoutSquareBrackets.split("(")[0].trim():ConditionLHSWithoutSquareBrackets
        let isConditionValueRequired=ConditionOperator!=="present"&&ConditionOperator!=="!present"

        if(isConditionValueRequired){
            isConditionRHSPresent=isConditionRHSPresent&&!!ConditionRHS
            
            if(isAttributeDataType(ConditionRHS,sourcecontextObj)){
                if(ConditionRHS.includes("(")&&ConditionRHS.includes(")")){
                    let ConditionRHSBeforeRoundBrackets=ConditionRHS.split("(")[0].trim()
                    let ConditionRHSArguments=ConditionRHS.slice(ConditionRHS.indexOf("("),ConditionRHS.lastIndexOf(")")+1)
                    let ConditionRHSBeforeRoundBracketsWithoutSquareBrackets=ConditionRHSBeforeRoundBrackets.replace(/\[[0-9]+\]/g,"")
                    isConditionRHSArgumentsValid=isConditionRHSArgumentsValid&&ConditionArgumentsValidation(ConditionRHSArguments,ConditionRHSBeforeRoundBracketsWithoutSquareBrackets,sourcecontextObj)
                    isConditionRHSPresentInSrcContext=isConditionRHSPresentInSrcContext&&!!sourcecontextObj[ConditionRHSBeforeRoundBracketsWithoutSquareBrackets]
                    isConditionRHSBaseTypeCheck=isConditionRHSBaseTypeCheck&&BaseTypeWrongPositionCheckCondition(sourcecontextObj,ConditionRHSBeforeRoundBrackets,"Source")&&BaseTypeCorrectPositionAbsentCondition(ConditionRHSBeforeRoundBracketsWithoutSquareBrackets,sourcecontextObj,ConditionRHSBeforeRoundBrackets,"Source")
                    isGarbageValueAbsent=isGarbageValueAbsent&&ConditionRHS.split(")")[1].trim().length===0
                    isConditionRHSDataTypeValid=isConditionRHSDataTypeValid&&sourcecontextObj[ConditionLHSForReturnTypeCheck].rvt===sourcecontextObj[ConditionRHSBeforeRoundBracketsWithoutSquareBrackets].att

                }else{
                    isConditionRHSArgumentsValid=isConditionRHSArgumentsValid&&sourcecontextObj[ConditionRHSWithoutSquareBrackets]["arg"].length===0
                    isConditionRHSPresentInSrcContext=isConditionRHSPresentInSrcContext&&!!sourcecontextObj[ConditionRHSWithoutSquareBrackets]
                    isConditionRHSBaseTypeCheck=isConditionRHSBaseTypeCheck&&BaseTypeWrongPositionCheckCondition(sourcecontextObj,ConditionRHS,"Source")&&BaseTypeCorrectPositionAbsentCondition(ConditionRHSWithoutSquareBrackets,sourcecontextObj,ConditionRHS,"Source")
                    isConditionRHSDataTypeValid=isConditionRHSDataTypeValid&&sourcecontextObj[ConditionLHSForReturnTypeCheck].rvt===sourcecontextObj[ConditionRHSWithoutSquareBrackets].att
                }
            }else{
                isConditionRHSDataTypeValid=isConditionRHSDataTypeValid&&sourcecontextObj[ConditionLHSForReturnTypeCheck].rvt===dataTypeCheck(ConditionRHS)
            }
            if((dataTypeCheck(ConditionRHS)==="STRING"||dataTypeCheck(ConditionRHS)==="BOOLEAN")&&MathematicalOperators.includes(ConditionOperator)){
                isConditionOperatorValid=isConditionOperatorValid&&false
            }else{
                isConditionOperatorValid=isConditionOperatorValid&&true
            }
        }else{
            isConditionRHSPresent=isConditionRHSPresent&&!ConditionRHS
        }

    })

    return isConditionOperatorValid&&isConditionRHSBaseTypeCheck&&isConditionRHSArgumentsValid&&isConditionRHSPresentInSrcContext&&isConditionRHSPresent&&isConditionRHSDataTypeValid&&isGarbageValueAbsent
}

const ConditionLHSValidation=(RarrConditions,operatorSymbols,sourcecontextObj)=>{
    let BaseTypeConditionsCheck=true;
    let isPresentInSrcContext=true;
    let isConditionArgumentsValid=true;
    let isGarbageValueAbsent=true

    RarrConditions.map((ConditionRule)=>{
        let ConditionRuleWithoutANDandOR=ConditionRule.includes(" AND")?ConditionRule.split(" AND")[0].trim():ConditionRule.includes(" OR")?ConditionRule.split(" OR")[0].trim():ConditionRule;
        let ConditionOperator;
        operatorSymbols.map(function (operator) {
            if (ConditionRuleWithoutANDandOR.includes(operator)) {
                ConditionOperator = operator;
            }
        })
        let ConditionLHS=ConditionRuleWithoutANDandOR.split(ConditionOperator)[0].trim()
        let ConditionLHSWithoutSquareBrackets=ConditionLHS.replace(/\[[0-9]+\]/g,"")
        if(ConditionLHS.includes("(")&&ConditionLHS.includes(")")){
            let ConditionBeforeRoundBrackets=ConditionLHS.split("(")[0].trim()
            let ConditionArguments=ConditionLHS.slice(ConditionLHS.indexOf("("),ConditionLHS.lastIndexOf(")")+1)
            let ConditionBeforeRoundBracketsWithoutSquareBrackets=ConditionBeforeRoundBrackets.replace(/\[[0-9]+\]/g,"")
            BaseTypeConditionsCheck=BaseTypeConditionsCheck&&BaseTypeWrongPositionCheckCondition(sourcecontextObj,ConditionBeforeRoundBrackets,"Source")&&BaseTypeCorrectPositionAbsentCondition(ConditionBeforeRoundBracketsWithoutSquareBrackets,sourcecontextObj,ConditionBeforeRoundBrackets,"Source")
            isPresentInSrcContext=isPresentInSrcContext&&Object.keys(sourcecontextObj).includes(ConditionBeforeRoundBracketsWithoutSquareBrackets)
            isConditionArgumentsValid=isConditionArgumentsValid&&ConditionArgumentsValidation(ConditionArguments,ConditionBeforeRoundBracketsWithoutSquareBrackets,sourcecontextObj)
            isGarbageValueAbsent=isGarbageValueAbsent&&ConditionLHS.split(")")[1].trim().length===0
        }else{
            BaseTypeConditionsCheck=BaseTypeConditionsCheck&&BaseTypeWrongPositionCheckCondition(sourcecontextObj,ConditionLHS,"Source")&&BaseTypeCorrectPositionAbsentCondition(ConditionLHSWithoutSquareBrackets,sourcecontextObj,ConditionLHS,"Source")
            isPresentInSrcContext=isPresentInSrcContext&&Object.keys(sourcecontextObj).includes(ConditionLHSWithoutSquareBrackets)
            isConditionArgumentsValid=isConditionArgumentsValid&&sourcecontextObj[ConditionLHSWithoutSquareBrackets]["arg"].length===0
        }
    })
    return BaseTypeConditionsCheck&&isPresentInSrcContext&&isConditionArgumentsValid&&isGarbageValueAbsent
}

export const ConditionValidation=(RarrConditions,operatorSymbols,MathematicalOperators,sourcecontextObj)=>{

        return ConditionLHSValidation(RarrConditions,operatorSymbols,sourcecontextObj)&&
               ConditionRHSValidation(RarrConditions,operatorSymbols,MathematicalOperators,sourcecontextObj)

}

export const ActionValidation=(RarrActions,resultcontextObj,sourcecontextObj)=>{
    let isPresentInResultContext=true;
    let BaseTypeConditionsCheck=true;
    let isGarbageValueAbsent=true;
    let isActionArgumentsValid=true;

    RarrActions.map((ActionRule)=>{
        let ActionRuleWithoutAND=ActionRule.includes(" AND")?ActionRule.split(" AND")[0].trim():ActionRule;
        let ActionWithoutSquareBrackets=ActionRuleWithoutAND.replace(/\[[0-9]+\]/g,"")
        if(ActionRule.includes("(")&&ActionRule.includes(")")){
            let ActionBeforeRoundBrackets=ActionRuleWithoutAND.split("(")[0].trim()
            let ActionBeforeRoundBracketsWithoutSquareBrackets=ActionWithoutSquareBrackets.split("(")[0].trim()
            isPresentInResultContext=isPresentInResultContext&&!!resultcontextObj[ActionBeforeRoundBracketsWithoutSquareBrackets]
            let ActionArguments=ActionRuleWithoutAND.slice(ActionRuleWithoutAND.indexOf("("),ActionRuleWithoutAND.lastIndexOf(")")+1)
            isActionArgumentsValid=isActionArgumentsValid&&ActionArgumentsValidation(ActionArguments,ActionBeforeRoundBracketsWithoutSquareBrackets,resultcontextObj,sourcecontextObj)
            isGarbageValueAbsent=isGarbageValueAbsent&&ActionRuleWithoutAND.slice(ActionRuleWithoutAND.lastIndexOf(")")+1).length===0
            BaseTypeConditionsCheck=BaseTypeConditionsCheck&&BaseTypeWrongPositionCheckCondition(resultcontextObj,ActionBeforeRoundBrackets,"Result")&&BaseTypeCorrectPositionAbsentCondition(ActionBeforeRoundBracketsWithoutSquareBrackets,resultcontextObj,ActionBeforeRoundBrackets,"Result")

        }else{
            isPresentInResultContext=isPresentInResultContext&&!!resultcontextObj[ActionWithoutSquareBrackets]
            isActionArgumentsValid=isActionArgumentsValid&&resultcontextObj[ActionWithoutSquareBrackets].rvt==="VOID"&&resultcontextObj[ActionWithoutSquareBrackets].par.length===1
            BaseTypeConditionsCheck=BaseTypeConditionsCheck&&BaseTypeWrongPositionCheckCondition(resultcontextObj,ActionRuleWithoutAND,"Result")&&BaseTypeCorrectPositionAbsentCondition(ActionWithoutSquareBrackets,resultcontextObj,ActionRuleWithoutAND,"Result")
        }
    })
    return isPresentInResultContext&&BaseTypeConditionsCheck&&isGarbageValueAbsent&&isActionArgumentsValid
}


export const BaseTypeWrongPositionCheckCondition=(ContextObj,OriString,ContextType)=>{
    let Sarr=OriString.split(/\[[0-9]+\]/g);
    let truth=true;
    let compareString="";
    let i;
    for(i=0;i<Sarr.length-1;i++){
        compareString+=Sarr[i];
        if(ContextType==="Source"){
            if(ContextObj[compareString].att!="BASE"){
                truth=false;
                break;
            }
        }else{
            if(ContextObj[compareString].rvt!="BASE"){
                truth=false;
                break;
            }
        }
        
    }
    return truth;
}

export const BaseTypeCorrectPositionAbsentCondition=(RefinedStr,ContextObj,OriString,ContextType)=>{
    let Sarr=RefinedStr.split(".");
    let truth=true;
    let compareString="";
    let i;
    for(i=0;i<Sarr.length;i++){
        if(compareString===""){
            compareString+=Sarr[i];
        }else{
            compareString=compareString+"."+Sarr[i];
        }
        if(ContextType==="Source"){
            if(_.keys(ContextObj).includes(compareString)&&ContextObj[compareString].att=="BASE"){
                if(!/\[[0-9]+\]/.test(OriString.slice(0,compareString.length+OriString.slice(compareString.length,OriString.indexOf("]",compareString.length)).length+1))){
                    truth=false;
                    break;
                }
            }
        }else{
            if(_.keys(ContextObj).includes(compareString)&&ContextObj[compareString].rvt=="BASE"){
                if(!/\[[0-9]+\]/.test(OriString.slice(0,compareString.length+OriString.slice(compareString.length,OriString.indexOf("]",compareString.length)).length+1))){
                    truth=false;
                    break;
                }
            }
        }        
    }
    return truth;
}

export const ModifyCustomContextObj=(OmittedObj)=>{
    let resultObj={}
    _.keys(OmittedObj).map(e=>{
        _.mapObject(OmittedObj[e], function(val, key) {
            resultObj[e+"."+key]=val
          });
    })
    return resultObj
}

export const getRelatedContext=(RuleTrigger)=>{
    if(RuleTrigger.endsWith("Request")){
        return RuleTrigger.replace("Request","Answer")
    }else if(RuleTrigger.endsWith("Answer")){
        return RuleTrigger.replace("Answer","Request")
    }else if(RuleTrigger.endsWith("request")){
        return RuleTrigger.replace("request","response")
    }else if(RuleTrigger.endsWith("response")){
        return RuleTrigger.replace("response","request")
    }
}

export const isRequestContext=(RuleTrigger)=>{
    return RuleTrigger.endsWith("Request")||RuleTrigger.endsWith("request")
}

export const isResponseContext=(RuleTrigger)=>{
    return RuleTrigger.endsWith("Answer")||RuleTrigger.endsWith("response")
}

export const ActionsWithoutData=(resultContextObj)=>{
    let keysArray=_.keys(resultContextObj)
    let result=[]
    keysArray.map(Key=>{ 
        if(resultContextObj[Key].rvt==="VOID"&&(resultContextObj[Key].par.length==1||resultContextObj[Key].par.length==0)){
            result.push(Key.split(".")[Key.split(".").length-1])
        }
    })
    return _.uniq(result)
}
