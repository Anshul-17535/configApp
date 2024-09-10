import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import {setDialogState} from '../../actions/slfconfiguration';
import SlfConfigurationForm from './slfConfigurationForm'
import {bindActionCreators} from "redux";
import {isFieldsEmpty} from './validationFunctions';
import {createSlfConfig,updateSlfConfig,getAllData} from '../../actions/slfconfiguration/commonservices'

let _ = require('underscore');

class AddEditDialog extends Component{

    handleRenderFooterCancelClick=()=>{
        this.props.getAllData()
        this.props.setDialogState(false)
    }

    handleRenderFooterSaveClick=()=>{
        const {slfConfigData} = this.props
        if(this.props.dialogType==="edit"){
            this.props.updateSlfConfig(slfConfigData)
        }else{
            this.props.createSlfConfig(slfConfigData)
        }
        this.props.setDialogState(false)
    }

    renderFooter=()=>{
        return <div>
            <ButtonCCFK text="SAVE" disabled={isFieldsEmpty(this.props.slfConfigData)} onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
        </div>
    }

    render(){
        const slfServerConfigData=this.props.slfConfigData.slfConfig.SLFConfiguration[0].slfServerConfigs
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} SLF Configuration`}
                onClose={this.handleRenderFooterCancelClick}
                renderFooter={this.renderFooter}
                dialogStyle={{
                    "content": {
                    "top":"15%",
                    "bottom":"1%",
                    "height": "70%",
                    "left": "11%",
                    "right": "1%",
                    "width": "78%"
                    }
                }}
                footerStyle={{"display":"flex","justifyContent":"center"}}
            >
                <SlfConfigurationForm slfServerConfigData={slfServerConfigData}/>
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        slfConfigData:state.slfConfignewEditDialog.currentSlfConfig,
        dialogType:state.slfConfignewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        createSlfConfig,
        updateSlfConfig,
        getAllData
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);