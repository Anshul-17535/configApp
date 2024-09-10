import React, { Component,useState } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import "../../styles/rulesEngine/Import.css";
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import { setExportDialog } from '../../actions/messagefilter';


class ExportBox extends Component
{
    
    
    onClose=()=>{
        this.props.setExportDialog(false);
    }
    onConfirm=()=>{
        const element = document.createElement('a');
        const file = new Blob ([JSON.stringify(this.props.exportData)],{type:"text/plain"});
        console.log(file);
        element.href =URL.createObjectURL(file);
        element.download = "MessageFilter.txt";
        document.body.appendChild(element);
        element.click();
        this.props.setExportDialog(false);
    }
    render(){
        return(  
        <ErrorDialogCCFK
                    title={'EXPORT'}
                    variant="CONFIRM"
                    confirmationButtonLabel="CONFIRM"
                    message={'Are you sure , you wish to Export Tracing Config ?'}
                    onClose={this.onClose}
                    onConfirm={this.onConfirm}
                />
    )}
}

function mapStateToProps(state) {
    return{
        exportData:state.mfnewEditDialog.ExportOnedata,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setExportDialog
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ExportBox);