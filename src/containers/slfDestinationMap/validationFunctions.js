import _ from "underscore";
export const isFieldsEmpty=(slfDestinationMapData)=>{
    let isFieldsEmpty=false;
    let data=slfDestinationMapData.destinationMap.DestMapList[0];
    let arrayOfValues=Object.values(data);
    arrayOfValues.map(element=>{
        if(typeof(element)==="string"){
            if(element===""){
                isFieldsEmpty=true;
            }
        }else{
            element.map(mapObj=>{
                if(Object.values(_.omit(mapObj,"apiPrefix")).includes("")){
                    isFieldsEmpty=true;
                }
            })
        }
    })
    return isFieldsEmpty
}
