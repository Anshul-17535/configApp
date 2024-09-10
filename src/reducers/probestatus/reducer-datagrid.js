const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_PBS_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_PBS_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'GET_ALL_PBS_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {nfType,whiteListedEndPoints,blackListedEndPoints} = data
                let whiteListCount = !!whiteListedEndPoints?whiteListedEndPoints.length:0
                let blackListCount = !!blackListedEndPoints?blackListedEndPoints.length:0
                //For Whitelist
                if(blackListCount > 1){
                    blackListedEndPoints.map(value=>{
                        rowDataCopy=[...rowDataCopy,{"nfType":nfType,"whiteListedEndPoints":"","blackListedEndPoints":value}]  
                    })
                }else if(blackListCount === 1){
                        rowDataCopy=[...rowDataCopy,{"nfType":nfType,"whiteListedEndPoints":"","blackListedEndPoints":blackListedEndPoints}]
                }

                if(whiteListCount > 1){
                    whiteListedEndPoints.map(value=>{
                        rowDataCopy=[...rowDataCopy,{"nfType":nfType,"whiteListedEndPoints":value,"blackListedEndPoints":""}]  
                    })
                }else if(whiteListCount === 1){
                    rowDataCopy=[...rowDataCopy,{"nfType":nfType,"whiteListedEndPoints":whiteListedEndPoints,"blackListedEndPoints":""}]
            }
                                
            })
        
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}