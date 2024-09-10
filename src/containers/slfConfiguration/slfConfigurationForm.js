import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import CheckBoxCCFK from "../../ccfk-components/CheckBoxCCFK";
import {setSlfConfigName,setSlfIdentityAttribute,setSlfIdentityLocation,setSlfLookupTableName,updateDestinationToBeSet} from '../../actions/slfconfiguration';
import "../../styles/slfconfiguration/slfConfigurationForm.css";


const returnIdentityLocationList=["body","header","custom_header"]

class SlfConfigurationForm extends React.Component{

    handleConfigNameChange=(value)=>{
        this.props.setSlfConfigName(value)
    }

    handleSlfIdentityAttributeChange=(value)=>{
        this.props.setSlfIdentityAttribute(value)
    }

    handleSlfIdentityLocationSelectChange=(value)=>{
        this.props.setSlfIdentityLocation(value)
    }

    handleSlfLookupTableNameSelectChange=(value)=>{
        this.props.setSlfLookupTableName(value)
    }
    toggleDestionationToBeSet=(value)=>{
        this.props.updateDestinationToBeSet(value)
    }
    render(){
        const {dialogType,slfServerConfigData}=this.props
        return (
            <>
            <div className="SlfConfigurationForm">
                <TextInputCCFK
                    id="SlfConfigNameInput"
                    label="Config Name"
                    required={true}
                    disabled={dialogType==="edit"}
                    value={slfServerConfigData.serverConfigName}
                    placeholder="SLF Config Name"
                    onChange={this.handleConfigNameChange}
                />
                <TextInputCCFK
                    id="SlfIdentityAttribute"
                    label="Identity Attribute"
                    required={true}
                    value={slfServerConfigData.identityAttr[0]}
                    placeholder="Identity Attribute"
                    onChange={this.handleSlfIdentityAttributeChange}
                />
                <SelectInputCCFK
                    label="Identity Location"
                    required={true}
                    data={returnIdentityLocationList}
                    value={slfServerConfigData.identityLocation}
                    onChange={this.handleSlfIdentityLocationSelectChange}
                />
                <SelectInputCCFK
                    label="SLF Lookup Table"
                    required={true}
                    data={this.props.slfLookupTableList}
                    value={slfServerConfigData.slfLookupTableName}
                    onChange={this.handleSlfLookupTableNameSelectChange}
                />
                </div>
                <div className="exempt">
                    <CheckBoxCCFK
                        value={slfServerConfigData.destinationToBeSet}
                        label="DestinationToBeSet"
                        onChange={this.toggleDestionationToBeSet}
                        isHorizontal
                    />
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.slfConfignewEditDialog.dialogType,
        slfLookupTableList:state.slfConfignewEditDialog.slfLookupTables,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setSlfConfigName,
        setSlfIdentityAttribute,
        setSlfIdentityLocation,
        setSlfLookupTableName,
        updateDestinationToBeSet
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfConfigurationForm);