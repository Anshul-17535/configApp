import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SpinnerCCFK from '../../ccfk-components/SpinnerCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
// import CardCCFK from "../../ccfk-components/CardCCFK";
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import "../../styles/fieldDefination/mediation.css"
import CardCCFK from "../../ccfk-components/CardCCFK";
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';


const abc=["REQUEST","RESPONSE"]
const bcd=["BODY","HEADER"]

class FieldProfileForm extends React.Component{    

    AddOnNow=()=>{
        return(
            <CardCCFK cardStyle={{height:"auto",padding:"1rem"}}>
                <div className='MEDIATION'>   
                <TextInputCCFK
                            id="prefix"
                            label="Prefix"
                            placeholder="Prefix"
                            disabled={this.props.dialogType === "view"}
                            value={this.props.newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns.prefix}
                            onChange={this.props.handlePrefixChange}
                            onChangeArgs={["this.props.newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns.prefix"]}
                        />
                <TextInputCCFK
                            id="suffix"
                            label="Suffix"
                            disabled={this.props.dialogType === "view"}
                            placeholder="Suffix"
                            value={this.props.newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns.suffix}
                            onChange={this.props.handleSuffixChange}
                            onChangeArgs={["this.props.newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns.suffix"]}
                        /></div>
            </CardCCFK>
        )
    }

    render(){
        const {dialogType,newData,addCheck}=this.props
        return (
            <>
            <div className="SlfLookUpForm">
                        <TextInputCCFK
                            id="Field ID"
                            label="Field ID"
                            required={true}
                            placeholder="Field ID"
                            value={newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].id}
                            disabled={dialogType === "edit" || dialogType === "view"}
                            onChange={this.props.handleNameChange}
                            onChangeArgs={["newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].id"]}
                        />
                        <SelectInputCCFK
                            label="Message Type"
                            required={true}
                            data={abc}
                            disabled={dialogType === "view"}
                            value={newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].messageType}
                            onChange={this.props.handleMessageType}
                            onChangeArgs={["newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].messageType"]}
                        />
                        <SelectInputCCFK
                            label="Field Type"
                            required={true}
                            data={bcd}
                            disabled={dialogType === "view"}
                            value={newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].fieldType}
                            onChange={this.props.handleFieldTypeChange}
                            onChangeArgs={["newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].fieldType"]}
                        />
                        <TextInputCCFK
                            id="Definition"
                            label="Definition"
                            required={true}
                            placeholder="Definition"
                            disabled={dialogType === "view"}
                            value={newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].definition}
                            onChange={this.props.handleDefination}
                            onChangeArgs={["newData.fieldDefinitionConfigs.fieldDefinitionCfg[0].definition"]}
                        />
                        <RadioButtonGroupCCFK
                            label="ADD ONs"
                            value={addCheck}
                            disabled={dialogType === "view"}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.props.handleAddOns}
                            onChangeArgs={["addCheck"]}
                        />
                        
                    </div>
                    <div >
                    {(addCheck === 'true'? true:false) && this.AddOnNow()}
                    </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.fdcnewEditDialog.dialogType,
        addCheck:state.fdcnewEditDialog.addCheck

    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(FieldProfileForm);