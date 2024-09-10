import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppToolbarIMPEXPCCFK from '../../ccfk-components/AppToolbarIMPEXPCCFK';
import {bindActionCreators} from "redux";
import RulesEngine from '../../actions/rulesengine/RulesEngine';
import AddEditDialog from '../../containers/rulesengine/addEditDialog';
import {getAllData,ExportAllData,resultContextData,sourceContextData} from '../../actions/rulesengine/commonServices';
import {getSplitScreenData,toggleSplitScreen} from '../../actions/splitScreenOptions';
import {onSideClick,getToolBarData ,RuleIndex,ViewMode,newDialogLabels,addNewRSVData,setDialogType,setDialogState,newRecordData,updateRecordData} from '../../actions/rulesengine';
import {setImportDialog,importAlertState,saveState} from '../../actions/rulesengine/index';
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import { GetHttpHeader } from '../../actions/rulesengine/commonServices';
import { setExportAllDialog } from '../../actions/rulesengine';
import Import from './Import';


let value=true;
class ToolBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalActive: false,
            text: ''
        };
        this.onIconButtonClick = this.onIconButtonClick.bind(this);
        this.activateModal = this.activateModal.bind(this);
        this.ontoggleChange = this.ontoggleChange.bind(this);
    }

    activateModal = () => {
        
        this.props.setDialogType('new');
        this.props.newRecordData(Object.assign(RulesEngine));
        this.props.newDialogLabels();
        this.props.setDialogState(true);
        this.props.addNewRSVData();
        this.props.RuleIndex(0);
        this.props.ViewMode(false);

    };

    componentWillMount() {
        this.props.setExportAllDialog(false);
        this.props.saveState(false);
        this.props.GetHttpHeader();
        this.props.getAllData();
        this.props.importAlertState(false);
        this.props.ExportAllData();
        this.props.updateRecordData(RulesEngine);
        this.props.getSplitScreenData();
        this.props.toggleSplitScreen(false);
        this.props.setImportDialog(false);
    }

    onIconButtonClick(itemClicked){
        switch (itemClicked){
            case 'Add':{
                this.activateModal();
                break;
            }
            default:{
                break;
            }
        }
    }

    onClose=()=>{
        this.props.setExportAllDialog(false);
    }

    onConfirm=()=>{
        const element = document.createElement('a');
        const file = new Blob ([JSON.stringify(this.props.ExportAlldata)],{type:"text/plain"});
        element.href =URL.createObjectURL(file);
        element.download = "ALLRSV.txt";
        document.body.appendChild(element);
        element.click();
        this.props.setExportAllDialog(false);
    }

    exportDailogbox=()=>{
        return(
            <ErrorDialogCCFK
                    title={'EXPORT'}
                    variant="CONFIRM"
                    confirmationButtonLabel="CONFIRM"
                    message={'Are you sure , you wish to Export All The RSV\'s'}
                    onClose={this.onClose}
                    onConfirm={this.onConfirm}
                />
        )
    }
    
    ontoggleChange = (value) => {
        if (value === true) {
            this.props.toggleSplitScreen(false);

        } else {
            this.props.toggleSplitScreen(true);
        }
    };

    onSideClick = (value) =>{
        console.log('mid',value)
        if (value === true) {
            this.props.onSideClick(false);

        } else {
            this.props.onSideClick(true);
        }
    }

    render(){
        if (!this.props.toolBar.toolbarData ) {
            return (<div>Getting Data</div>)
        }
        else {
            const modal = this.props.renewEditDialog.dialogState ? <AddEditDialog/> : false;
            const modal2 = this.props.importstate ? <Import/> : false;
            return (
                <div>
                    <AppToolbarIMPEXPCCFK
                        title={this.props.toolBar.toolbarData.pageTitle}
                        onToggle={this.ontoggleChange}
                        onClick= {this.onIconButtonClick}
                        onSideClick={this.onSideClick}
                    />
                    {modal}
                    {modal2}
                    {this.props.exportallstate && this.exportDailogbox()}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return{
        toolBar: state.retoolbar,
        ExportAlldata: state.renewEditDialog.ExportAlldata,
        renewEditDialog: state.renewEditDialog,
        importstate: state.renewEditDialog.importdialog,
        toggleState:state.redataGrid.toggleState,
        exportallstate: state.renewEditDialog.exportAlldialog
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getToolBarData,
        saveState,
        newDialogLabels,
        setDialogState,
        setImportDialog,
        setDialogType,
        importAlertState,
        newRecordData,
        addNewRSVData,
        updateRecordData,
        getAllData,
        toggleSplitScreen,
        getSplitScreenData,
        RuleIndex,
        resultContextData,
        ViewMode,
        sourceContextData,
        GetHttpHeader,
        ExportAllData,
        setExportAllDialog,
        onSideClick
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ToolBar);