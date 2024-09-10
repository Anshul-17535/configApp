
import rulesData from './messageFilterGridData.json';

export const columnDefs = () => {
    let innerFieldArray = [];
    !!rulesData && rulesData.Fields.forEach( value => {
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
       return {headerName:data.label, field: data.name,width:data.width}
   });
   return finalArray;
}


export const gridOptions = {
    columnDefs:columnDefs(),
    enableCellChangeFlash: true,
    moreHeaderMenuOptions:{
        hideExportToCsv:true
    },
    rowAction: {
        disableToolTips: false,
        rowNodeId: "id",
        refreshCells: true,
        getRowNodeId(){
            return null;
        },
        types: [
            {
                name: 'Edit',
                icon: 'ic_edit',
            },
            {
                name: 'Delete',
                icon: 'ic_delete'
            }
        ],
        disable() {
            return false;
        }
    },
    showToggleActionColumn: true,
    toggleAction: {
        icon: 'ic_check',
        headerName: 'Active',
        width: 100,
        minWidth: 40,
        maxWidth: 100,
        index: 1,
        field: 'state',
        suppressMenu: false,
        suppressFilter: false,
    },
};


export default gridOptions;