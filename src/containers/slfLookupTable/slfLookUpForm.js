import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import "../../styles/slflookup/slfLookUpForm.css";

const lookUpTypeList = ['Exact', 'IP Subnet', 'Numeric Range', 'Regular Expression']

class SlfLookUpForm extends React.Component {

    render() {
        const { dialogType } = this.props;
        if (!this.props.slfLookUpData) {
            return <div></div>
        } else {
            return (
                <div>
                    <div className="SlfLookUpForm">
                        <TextInputCCFK
                            id="lookupTypeName"
                            label="SLF LookUp  Name"
                            required={true}
                            placeholder="SLF Look Up Name"
                            value={this.props.slfLookUpData.lookupTypeName}
                            disabled={dialogType === "edit"}
                            onChange={this.props.handleLookUpNameChange}
                            onChangeArgs={["this.props.slfLookUpData.lookupTypeName"]}
                        />
                        <SelectInputCCFK
                            label="SLF Look Up Type"
                            required={true}
                            data={lookUpTypeList}
                            disabled={dialogType === "edit"}
                            value={this.props.slfLookUpData.lookupType}
                            onChange={this.props.handleSlfLookUpTypeChange}
                            onChangeArgs={["this.props.slfLookUpData.lookupType"]}
                        />
                        <RadioButtonGroupCCFK
                            label="Map Set Enabled"
                            value={this.props.slfLookUpData.mapSetEnabled}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.props.handleSlfMapChange}
                            onChangeArgs={["this.props.slfLookUpData.mapSetEnabled"]}
                        />

                    </div>
                    <div className="containerLookUp">
                        <ButtonCCFK text="SAVE" disabled={this.props.slfLookUpData.lookupTypeName === "" || this.props.slfLookUpData.lookupType === ""} onClick={this.props.handleSaveClick} variant="call-to-action" /></div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        dialogType: state.slflookUpnewEditDialog.dialogType,
        slfLookUpData: state.slflookUpnewEditDialog.slfLookUpData
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SlfLookUpForm);