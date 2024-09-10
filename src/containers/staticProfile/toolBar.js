import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppToolbarIMPEXPCCFK from '../../ccfk-components/AppToolbarIMPEXPCCFK';
import {bindActionCreators} from "redux";
import AddEditDialog from '../../containers/staticProfile/addEditDialog';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import {getSplitScreenData,toggleSplitScreen} from '../../actions/splitScreenOptions';
import {getAllData} from '../../actions/staticProfile/commonservices';
import {getToolBarData,handleStatDelNfTypeChange,setExportErrorDialog,typeChanged,deleteAllStatic,setExportStatAllDialog,setDialogType,setDialogState,addNewStatProfData,handleStatNfTypeChange} from '../../actions/staticProfile';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import AlertMessage from "@nokia-csf-uxr/ccfk/Alert/AlertMessage"
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import CheckBoxCCFK from "../../ccfk-components/CheckBoxCCFK";
import {ExportAllStatData,deleteStatProfByNFtypeConfig} from '../../actions/staticProfile/commonservices';
import Import from './Import';
import {onSideClick} from '../../actions/rulesengine'


const nfTypeData = ['GLOBAL','NRF','UDM','AMF','SMF','AUSF','NEF','PCF','SMSF','NSSF','UDR','LMF','GMLC','5G_EIR','SEPP','UPF','N3IWF','AF','UDSF','BSF','CHF','NWDAF','PCSCF','CBCF','HSS','UCMF','SOR_AF','SPAF','MME','SCSAS','SCEF','SCP','CUSTOM','IMS_AS','NSSAF','ICSCF','SCSCF','DRA','AANF','NSACF','MFAF','EASDF','DCCF','TSCTSF','ADRF','CEF','MB_UPF','NSWOF','PKMF','MNPF','MBSF','MBSTF','PANF']


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
        this.props.addNewStatProfData();
        this.props.setDialogType('new');
        this.props.setDialogState(true);
    };

    componentWillMount() {
        this.props.getAllData()
        this.props.getSplitScreenData();
        this.props.toggleSplitScreen(false);
        this.props.setExportErrorDialog(false)
        this.props.deleteAllStatic(false)
    }

    onClose=()=>{
        this.props.setExportStatAllDialog(false);
    }

    onConfirm=()=>{
        const element = document.createElement('a');
        const file = new Blob ([JSON.stringify(this.props.ExportAllStatdata)],{type:"text/plain"});
        element.href =URL.createObjectURL(file);
        element.download = `${this.props.statNfType}_Static_Profiles.txt`;
        document.body.appendChild(element);
        element.click();
        this.props.setExportStatAllDialog(false);
    }

    renderFooter=()=>{
        return(
            <div>
                <ButtonCCFK text="SAVE" disabled={(!this.props.typeSelect)||(this.props.exportErrorMessage)}   onClick={this.onConfirm} variant="call-to-action" />
                <ButtonCCFK text="CANCEL" onClick={this.onClose}/>
            </div>
        )
    }

   onDelConfirm=()=>{
        this.props.deleteStatProfByNFtypeConfig(this.props.deleteNfType)
        this.props.deleteAllStatic(false);
   }

    renderDelFooter=()=>{
        return(
            <div>
                <ButtonCCFK text="DELETE"  onClick={this.onDelConfirm} variant="call-to-action" />
                <ButtonCCFK text="CANCEL" onClick={this.onDelClose}/>
            </div>
        )
    }

    errormessage=()=>{
        if(!this.props.exportErrorMessage){return(<AlertMessage message="Please Selet any NF Type And Check Ready To Export" />)}
        if(this.props.exportErrorMessage){
            return(<>
            <AlertMessage variant="WARNING"  message={<p>No Profile Found For Selected NF Type <br></br> Note: Please Uncheck Ready to Export Box</p>} />
            </>
        )}
        
    }

    exportDailogbox=()=>{
        return(
            <DialogCCFK
            title={"Please select the NFType for Export"}
            onClose={()=>{this.onClose()}}
            renderFooter={this.renderFooter}
            dialogStyle={{
                "content": {
                    "top":"20%",
                    "bottom":"20%",
                    "height": "60%",
                    "left": "20%",
                    "right": "20%",
                    "width": "60%"
                    }
            }}
            footerStyle={{"display":"flex","justifyContent":"center"}}
            >
            <div >
                <SelectInputCCFK
                    label="NF Type"
                    required={true}
                    data={nfTypeData}
                    value={this.props.statNfType}
                    onChange={this.handleStatNfTypeChange}
                    onChangeArgs={["{this.props.statNfType"]}
                />
                <br/>
                <br/>
                <CheckBoxCCFK
                    value={this.props.typeSelect}
                    label="Ready To Export"
                    disabled={this.props.statNfType === ''}
                    onChange={this.typeChanged}
                    isHorizontal
                />
                <br/>
                {this.errormessage()}
                </div>
        </DialogCCFK>
        )
    }

    deleteDailogbox=()=>{
        return(
            <DialogCCFK
            title={"Please select the NFType for Delete"}
            onClose={()=>{this.onDelClose()}}
            renderFooter={this.renderDelFooter}
            dialogStyle={{
                "content": {
                    "top":"25%",
                    "bottom":"25%",
                    "height": "60%",
                    "left": "20%",
                    "right": "20%",
                    "width": "50%"
                    }
            }}
            footerStyle={{"display":"flex","justifyContent":"center"}}
            >
            <div >
                <SelectInputCCFK
                    label="NF Type"
                    required={true}
                    data={nfTypeData}
                    value={this.props.deleteNfType}
                    onChange={this.handleStatDelNfTypeChange}
                    onChangeArgs={["{this.props.deleteNfType"]}
                />
                </div>
        </DialogCCFK>
        )
    }

    onDelClose=()=>{
        this.props.deleteAllStatic(false);
    }
    
    typeChanged=(value)=>{
        if(value){
            this.props.setExportErrorDialog(true)
            this.props.ExportAllStatData(this.props.statNfType);
        }
        console.log(value,typeof(value))
        if(value === false){
            this.props.setExportErrorDialog(false)
        }
        setTimeout(()=>{
            this.props.typeChanged(value)
        },1000)
    }

    handleStatNfTypeChange=(value)=>{
        if(!!value){
            this.props.handleStatNfTypeChange(value)
        }
    }
    
    handleStatDelNfTypeChange=(value)=>{
        if(!!value){
            this.props.handleStatDelNfTypeChange(value)
        }
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
    onSideClick = (value) =>{
        console.log('mid',value)
        if (value === true) {
            this.props.onSideClick(false);

        } else {
            this.props.onSideClick(true);
        }
    }
    ontoggleChange = (value) => {
        if (value === true) {
            this.props.toggleSplitScreen(false);

        } else {
            this.props.toggleSplitScreen(true);
        }
    };
    onDelete=()=>{
        this.props.deleteAllStatic(true)
    }
    render(){
        if (!this.props.toolBar.toolbarData ) {
            return (<div>Getting Data</div>)
        }
        else {
            const modal = this.props.newEditDialog.dialogState ? <AddEditDialog/> : false;
            const modal2 = this.props.importstate ? <Import/> : false;
            return (
                <div>
                    <AppToolbarIMPEXPCCFK
                        title={this.props.toolBar.toolbarData.pageTitle}
                        onToggle={this.ontoggleChange}
                        onClick= {this.onIconButtonClick}
                        onDelete={this.onDelete}
                        onSideClick={this.onSideClick}
                        formName='STATPROF'
                    />
                    {modal}
                    {modal2}
                    {this.props.exportstatallstate && this.exportDailogbox()}
                    {this.props.deleteAll && this.deleteDailogbox()}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return{
        toolBar: state.statproftoolbar,
        newEditDialog: state.statprofnewEditDialog,
        toggleState:state.statprofdataGrid.toggleState,
        exportstatallstate:state.statprofnewEditDialog.exportstatallstate,
        ExportAllStatdata:state.statprofnewEditDialog.ExportAllStatdata,
        statNfType:state.statprofnewEditDialog.statNfType,
        typeSelect:state.statprofnewEditDialog.typeSelect,
        importstate:state.statprofnewEditDialog.importdialog,
        exportErrorMessage:state.statprofnewEditDialog.exportErrorMessage,
        deleteAll:state.statprofnewEditDialog.deleteAll,
        deleteNfType:state.statprofnewEditDialog.deleteNfType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        setDialogType,
        getToolBarData,
        toggleSplitScreen,
        getSplitScreenData,
        addNewStatProfData,
        getAllData,
        setExportStatAllDialog,
        handleStatNfTypeChange,
        ExportAllStatData,
        typeChanged,
        setExportErrorDialog,
        deleteAllStatic,
        handleStatDelNfTypeChange,
        deleteStatProfByNFtypeConfig,
        onSideClick
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ToolBar);