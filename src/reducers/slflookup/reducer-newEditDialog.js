export default function (state={slfLookUpData:{}}, action){
    switch(action.type) {
        case 'SET_DIALOG_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_STATE':
            return {...state, dialogState:action.payload}
        case 'ADD_NEW_SLF_LOOKUP_DATA':{
            return {...state,slfLookUpData:action.payload}
        }
        case 'SET_SLF_LOOKUP_NAME':{
            const slfDataLookUpNameCopy={...state.slfLookUpData};
            slfDataLookUpNameCopy.lookupTypeName = action.payload;
            return {...state,slfLookUpData:slfDataLookUpNameCopy}
        }
        case 'SET_SLF_LOOKUP_TYPE':{
            const slfDataCopy={...state.slfLookUpData}
            slfDataCopy.lookupType = action.payload;
            return {...state,slfLookUpData:slfDataCopy}
        }
        case 'SET_SLF_LOOKUP_MAPFLAG':{
            const slfDataCopy={...state.slfLookUpData}
            slfDataCopy.mapSetEnabled = action.payload;
            return {...state,slfLookUpData:slfDataCopy}
        }
        case 'SET_CURRENT_SLF_LOOKUP_DATA_ON_EDIT':{
            return {...state,slfLookUpData:action.payload}
        }

        case 'SET_ALL_DESTINATION_MAP_DATA':{
            return {...state,slfDestinationData:action.payload}
        }

        case 'SET_DIALOG_TYPE_KEYPAIR' :
            return {...state, dialogTypeKeyPair: action.payload}
        case 'SET_DIALOG_STATE_KEYPAIR':
            return {...state, dialogStateKeyPair:action.payload}
        case 'ADD_NEW_KEYPAIR_DATA':{
            return {...state,slfKeyPairData:action.payload}
        }
        case 'SET_SLF_LOOKUP_KEYPAIR_DATA':{
            const slfDataLookUpNameCopy={...state.slfKeyPairData};
            slfDataLookUpNameCopy.lookupTypeName = action.payload.lookupTypeName;
            slfDataLookUpNameCopy.slfLookUpType = action.payload.lookupType;
            return {...state,slfKeyPairData:slfDataLookUpNameCopy}
        }
        case 'SET_KEYPAIR_DESTINATION_TYPE':{
            const keyPairDataCopy={...state.slfKeyPairData};
            keyPairDataCopy.destinationType = action.payload;
            return {...state,slfKeyPairData:keyPairDataCopy}
        }
        case 'SET_KEYPAIR_DESTINATION_ID':{
            const keyPairDataCopy={...state.slfKeyPairData};
            keyPairDataCopy.destinationId = action.payload;
            return {...state,slfKeyPairData:keyPairDataCopy}
        }
        case 'SET_KEYPAIR_PATTERN':{
            const keyPairDataCopy={...state.slfKeyPairData};
            keyPairDataCopy.pattern = action.payload;
            return {...state,slfKeyPairData:keyPairDataCopy}
        }
        case 'SET_KEYPAIR_RANK':{
            const keyPairDataCopy={...state.slfKeyPairData};
            keyPairDataCopy.rank = action.payload;
            return {...state,slfKeyPairData:keyPairDataCopy}
        }
        case 'SET_KEYPAIR_TAG1':{
            const keyPairDataCopy={...state.slfKeyPairData};
            keyPairDataCopy.customTag1 = action.payload;
            return {...state,slfKeyPairData:keyPairDataCopy}
        }
        case 'SET_KEYPAIR_TAG2':{
            const keyPairDataCopy={...state.slfKeyPairData};
            keyPairDataCopy.customTag2 = action.payload;
            return {...state,slfKeyPairData:keyPairDataCopy}
        }
        case 'SET_KEYPAIR_TAG3':{
            const keyPairDataCopy={...state.slfKeyPairData};
            keyPairDataCopy.customTag3 = action.payload;
            return {...state,slfKeyPairData:keyPairDataCopy}
        }
        case 'SET_KEYPAIR_DESTINATION_ID_OPTIONS':{
            return {...state,slfDestinationIdOptions:action.payload}
        }
        case 'SET_KEYPAIR_ON_EDIT':{
            return {...state,slfKeyPairData:action.payload}
        }
        case 'SET_NF_PROFILE_MAP_DATA':{
            return {...state,slfNFProfileOptions:action.payload}
        }
        default:
            return state;
    }
}