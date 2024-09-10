
import peerConfigData from './peerConfigGridData.json';

export const columnDefs = () => {
    let innerFieldArray = [];
    !!peerConfigData && peerConfigData.Fields.forEach( value => {
        if(value.gridDisplay === true) {
            if (value.hasInnerFields === true) {
                value.innerFields.forEach((valueInner) => {
                    innerFieldArray.push(valueInner);
                });
            }
            else {
                innerFieldArray.push(value);
            }
        }
    });
   let finalArray= innerFieldArray.map(function (data, id) {
       return {headerName:data.label, field: data.name,width:data.width,filter:'agTextColumnFilter'}
   });
   return finalArray;
}


export const gridOptions = {
    columnDefs:columnDefs()
};


export default gridOptions;