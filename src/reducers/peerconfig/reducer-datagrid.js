const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_PEER_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_PEER_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_PEER_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'GET_ALL_PEER_RECORDS': {
            let rowDataCopy=[]
            let adrressCopy=[]
            !!action.payload&&action.payload.map(data=>{
                if(!!data.peerAddress.address)
                {
                    adrressCopy.push(data.peerAddress.address)
                }
            })
            !!adrressCopy&&adrressCopy.map(data=>{
                data.map(mid=>{
                    if(mid.regEx===null&&mid.rank===0)
                    {
                        delete mid.regEx 
                        delete mid.rank
                    }
                    else if(mid.host===null && mid.port===null)
                    {
                        delete mid.host
                        delete mid.port
                    }
                })

            })
            !!action.payload&&action.payload.map(data=>{
                if(data.peerAddress.peerAddressType==="INGRESS_PEER")
                {
                    rowDataCopy=[...rowDataCopy,{"profileName":data.ingressProfileName,"peerAddressType":data.peerAddress.peerAddressType}]}
                else if(data.peerAddress.peerAddressType==="EGRESS_PEER")
                {
                    rowDataCopy=[...rowDataCopy,{"profileName":data.egressProfileName,"peerAddressType":data.peerAddress.peerAddressType}]}
            })
            console.log("19",rowDataCopy)
            return {...state, rowData:rowDataCopy}
        }
        default:
            return state;
    }
}