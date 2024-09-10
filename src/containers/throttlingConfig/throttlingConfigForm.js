import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SpinnerCCFK from '../../ccfk-components/SpinnerCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import "../../styles/throttlingconfig/throttlingForm.css"


class ThrottingConfigForm extends React.Component{
    
    render(){
        const {dialogType,newData,dataList}=this.props
        return (
            <>
            <div className="SlfLookUpForm">
                        <TextInputCCFK
                            id="Name"
                            label="Name"
                            required={true}
                            placeholder="Name"
                            value={newData.name}
                            disabled={dialogType === "edit"}
                            onChange={this.props.handleNameChange}
                            onChangeArgs={["newData.name"]}
                        />
                        <SpinnerCCFK
                            id="consecutiveThrottledIntervalsBeforeAlarm"
                            label="Consecutive Throttling Interval Before Alarm"
                            min={0}
                            required
                            disabled={newData.alarmsEnabled === 'true'?false:true}
                            max={200000000}
                            value={newData.consecutiveThrottledIntervalsBeforeAlarm}
                            step={1}
                            onChange={this.props.handleCTIBA}
                        />
                        <SelectInputCCFK
                            label="Inbound Profile  Name"
                            required={true}
                            data={dataList}
                            disabled={dialogType === "edit"}
                            value={newData.inboundProfileName}
                            onChange={this.props.handleProfileChange}
                            onChangeArgs={["newData.inboundProfileName"]}
                        />
                        <RadioButtonGroupCCFK
                            label="Alarms Enabled"
                            value={newData.alarmsEnabled}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.props.handleAlarmChange}
                            onChangeArgs={["newData.alarmsEnabled"]}
                        />

                    </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.thcnewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ThrottingConfigForm);