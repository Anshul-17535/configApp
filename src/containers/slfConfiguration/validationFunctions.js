export const isFieldsEmpty=(slfConfigData)=>{
    let isFieldsEmpty=false;
    let data=slfConfigData.slfConfig.SLFConfiguration[0].slfServerConfigs;
    let arrayOfValues=Object.values(data);
    arrayOfValues.map(element=>{
        if(typeof(element)!=="boolean"&&!element){
            isFieldsEmpty=true;
        }
        else if(typeof(element)==="string"){
            if(element===""){
                isFieldsEmpty=true;
            }
        }else if(typeof(element)==="object"){
            if(!!element&&(element.length===0||element[0]==="")){
                isFieldsEmpty=true;
            }
        }
    })
    return isFieldsEmpty
}
