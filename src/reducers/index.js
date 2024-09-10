/* eslint-disable */
import {combineReducers} from 'redux';
import ToolBarReducerRE from './rulesengine/reducer-toolbar';
import DataGridReducerRE from './rulesengine/reducer-datagrid';
import NewEditDialogReducerRE from './rulesengine/reducer-newEditDialog';

import ToolBarReducerMF from './messagefilter/reducer-toolbar';
import NewEditDialogReducerMF from './messagefilter/reducer-newEditDialog';
import DataGridReducerMF from './messagefilter/reducer-datagrid';

import ToolbarTracingProfileReducer from './tracingprofile/reducer-toolbar'; 
import NewEditDialogTracingProfileReducer from './tracingprofile/reducer-newEditDialog'; 
import DatagridTracingProfileReducer from './tracingprofile/reducer-datagrid';

import ToolbarDestinationTracingReducer from './destinationtracing/reducer-toolbar'; 
import NewEditDialogDestinationTracingReducer from './destinationtracing/reducer-newEditDialog'; 
import DatagridDestinationTracingReducer from './destinationtracing/reducer-datagrid';

import ToolbarMediationReducer from './mediationProfile/reducer-toolbar'; 
import NewEditDialogMediationReducer from './mediationProfile/reducer-newEditDialog'; 
import DatagridMediationReducer from './mediationProfile/reducer-datagrid';

import ToolbarFieldReducer from './fieldDefination/reducer-toolbar'; 
import NewEditDialogFieldReducer from './fieldDefination/reducer-newEditDialog'; 
import DatagridFieldReducer from './fieldDefination/reducer-datagrid';

import ToolbarProfReducer from './staticProfile/reducer-toolbar'; 
import NewEditDialogProfReducer from './staticProfile/reducer-newEditDialog'; 
import DatagridProfReducer from './staticProfile/reducer-datagrid';


import DataGridThrReducer from './throttling/reducer-datagrid';
import DialogThrReducer from './throttling/reducer-newEditDialog';
import ToolbarThrReducer from './throttling/reducer-toolbar';
import ToolbarPeerReducer from './peerconfig/reducer-toolbar'; 
import NewEditDialogPeerReducer from './peerconfig/reducer-newEditDialog'; 
import DatagridPeerReducer from './peerconfig/reducer-datagrid';
import ToolbarProbeReducer from './probestatus/reducer-toolbar'; 
import NewEditDialogProbeReducer from './probestatus/reducer-newEditDialog'; 
import DatagridProbeReducer from './probestatus/reducer-datagrid';
import ToolbarThrConfigReducer from './throttlingconfig/reducer-toolbar'; 
import DatagridThrConfigReducer from './throttlingconfig/reducer-datagrid';
import NewEditDialogThrConfigReducer from './throttlingconfig/reducer-newEditDialog';

import ToolBarReducerSlfConfiguration from './slfconfiguration/reducer-toolbar';
import ToolBarReducerSlfLookUp from './slflookup/reducer-toolbar';
import ToolBarReducerSlfDestinationMap from './slfdestinationmap/reducer-toolbar';
import ToolBarReducerSlfNfService from './slfnfservice/reducer-toolbar';
import ToolBarReducerSlfNfProfile from './slfnfprofile/reducer-toolbar';
import DataGridReducerSlfConfiguration from './slfconfiguration/reducer-datagrid';
import DataGridReducerSlfLookUp from './slflookup/reducer-datagrid';
import DataGridReducerSlfDestinationMap from './slfdestinationmap/reducer-datagrid';
import DataGridReducerSlfNfService from './slfnfservice/reducer-datagrid';
import DataGridReducerSlfNfProfile from './slfnfprofile/reducer-datagrid';
import NewEditDialogReducerSlfConfiguration from './slfconfiguration/reducer-newEditDialog';
import NewEditDialogReducerSlfLookUp from './slflookup/reducer-newEditDialog';
import NewEditDialogReducerSlfDestinationMap from './slfdestinationmap/reducer-newEditDialog';
import NewEditDialogReducerSlfNfService from './slfnfservice/reducer-newEditDialog';
import NewEditDialogReducerSlfNfProfile from './slfnfprofile/reducer-newEditDialog';



import SplitScreen from './reducer-splitscreen';

const allReducers = combineReducers({
    splitScreen : SplitScreen,
    retoolbar : ToolBarReducerRE,
    redataGrid : DataGridReducerRE,
    renewEditDialog : NewEditDialogReducerRE,

    mftoolbar:ToolBarReducerMF,
    mfdataGrid:DataGridReducerMF,
    mfnewEditDialog:NewEditDialogReducerMF,

    mpctoolbar:ToolbarMediationReducer,
    mpcnewEditDialog:NewEditDialogMediationReducer,
    mpcdataGrid:DatagridMediationReducer,

    fdctoolbar:ToolbarFieldReducer,
    fdcnewEditDialog:NewEditDialogFieldReducer,
    fdcdataGrid:DatagridFieldReducer,

    statproftoolbar:ToolbarProfReducer,
    statprofnewEditDialog:NewEditDialogProfReducer,
    statprofdataGrid:DatagridProfReducer,

    thtoolbar:ToolbarThrReducer,
    thdataGrid:DataGridThrReducer,
    thnewEditDialog:DialogThrReducer,
    thctoolbar:ToolbarThrConfigReducer,
    thcnewEditDialog:NewEditDialogThrConfigReducer,
    thcdataGrid:DatagridThrConfigReducer,
    peertoolbar:ToolbarPeerReducer,
    peernewEditDialog:NewEditDialogPeerReducer,
    peerdataGrid:DatagridPeerReducer,
    pbstoolbar:ToolbarProbeReducer,
    pbsnewEditDialog:NewEditDialogProbeReducer,
    pbsdataGrid:DatagridProbeReducer,

    tcptoolbar:ToolbarTracingProfileReducer,
    tcpnewEditDialog:NewEditDialogTracingProfileReducer,
    tcpdataGrid:DatagridTracingProfileReducer,
    dstptoolbar:ToolbarDestinationTracingReducer,
    dstpnewEditDialog:NewEditDialogDestinationTracingReducer,
    dstpdataGrid:DatagridDestinationTracingReducer,

    slfConfigtoolbar :ToolBarReducerSlfConfiguration,
    slfConfigdataGrid :DataGridReducerSlfConfiguration,
    slfConfignewEditDialog :NewEditDialogReducerSlfConfiguration,
    slfLookUptoolbar :ToolBarReducerSlfLookUp,
    slfLookUpdataGrid :DataGridReducerSlfLookUp,
    slflookUpnewEditDialog :NewEditDialogReducerSlfLookUp,
    slfDestinationMaptoolbar: ToolBarReducerSlfDestinationMap,
    slfDestinationMapdataGrid: DataGridReducerSlfDestinationMap,
    slfDestinationMapnewEditDialog: NewEditDialogReducerSlfDestinationMap,
    slfNfServicetoolbar: ToolBarReducerSlfNfService,
    slfNfServicedataGrid: DataGridReducerSlfNfService,
    slfNfServicenewEditDialog: NewEditDialogReducerSlfNfService,
    slfNfProfiletoolbar: ToolBarReducerSlfNfProfile,
    slfNfProfiledataGrid: DataGridReducerSlfNfProfile,
    slfNfProfilenewEditDialog: NewEditDialogReducerSlfNfProfile
})

export default allReducers;