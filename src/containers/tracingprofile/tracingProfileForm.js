import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SpinnerCCFK from '../../ccfk-components/SpinnerCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import "../../styles/throttlingconfig/throttlingForm.css"
import Form1 from './form1';
import Form2 from './form2';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import {setHepInterface,setDialogState2,setDialogState3,setedrRequestFields,setedrResponseFields} from '../../actions/tracingprofile';
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";

const abc=["EDR","HEP3","MIRROR"]
const bcd=["HTTP SERVER","KAFKA","REMOTE FILE"]
const bced=["HEP3 Server"]
const bed=["Mirror Server"]
const news = ["CSV"]
let selectedLabelsString
let selectedLabelsString2
const hepInterfaceOptions = ['SST','vTAP']

class TracingProfileForm extends React.Component{

    componentWillMount=()=>{
        selectedLabelsString=""
        selectedLabelsString2=""
        if(this.props.dialogType === "edit" || this.props.dialogType === "view")
        {
            selectedLabelsString=this.props.requestValue
            selectedLabelsString2=this.props.respondValue
        }
    }

    handleMulti=(value)=>{
        let set=value.filter(config=>{
            return config.selected === true
        })
        const selectedLabels = set.filter((item) => item.selected === true).map((item) => item.label);
        selectedLabelsString = selectedLabels.join(',');
        this.props.setedrRequestFields(selectedLabelsString)
        
    }
    handleMulti2=(value)=>{
        let set=value.filter(config=>{
            return config.selected === true
        })
        const selectedLabels = set.filter((item) => item.selected === true).map((item) => item.label);
        selectedLabelsString2 = selectedLabels.join(',');
        this.props.setedrResponseFields(selectedLabelsString2)
    }

    handleHepInterface=(value)=>{
        if(!!value){
            this.props.setHepInterface(value)
        }
    }

    AddRequest=()=>{
        this.props.setDialogState2(true)
    }

    AddResponse=()=>{
        this.props.setDialogState3(true)
    }

    requestList=()=>{
        if(!!selectedLabelsString){const myArray = selectedLabelsString.split(",");
        return (
                <ul style={{ listStyle: "none", padding: 0 ,marginRight:"20%" }}>
                <p> SELECTED REQUEST FIELDS </p>
                {myArray.map((item) => (
                    <li
                    key={item}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "#f7f7f7",
                    }}
                    >
                    {item}
                    </li>
                ))}
                </ul>
          );}
    }

    responsetList=()=>{
        if(!!selectedLabelsString2){const myArray = selectedLabelsString2.split(",");
        return (
                <ul style={{ listStyle: "none", padding: 0 ,marginRight:"20%" }}>
                <p> SELECTED RESPONSE FIELDS </p>

                {myArray.map((item) => (
                    <li
                    key={item}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "#f7f7f7",
                    }}
                    >
                    {item}
                    </li>
                ))}
                </ul>
          );}
    }
    
    render(){
        const {dialogType,newData,showList}=this.props
        const multi1 = this.props.selectstate1 ? <Form1 handleMulti={this.handleMulti}/> : false
        const multi2 = this.props.selectstate2 ? <Form2 handleMulti2={this.handleMulti2}/> : false
    
        return (
            <>
            <div className="SlfLookUpForm">
                        <TextInputCCFK
                            id="Name"
                            label="Name"
                            required={true}
                            placeholder="Name"
                            value={newData.tracingProfileConfigs.tracingProfileConfig[0].name}
                            disabled={dialogType === "edit"||dialogType === "view"}
                            onChange={this.props.handleNameChange}
                            onChangeArgs={["newData.tracingProfileConfigs.tracingProfileConfig[0].name"]}
                        />
                        <SelectInputCCFK
                            label="Profile Type"
                            required={true}
                            data={abc}
                            disabled={dialogType === "view"}
                            value={newData.tracingProfileConfigs.tracingProfileConfig[0].profileType}
                            onChange={this.props.handleProfileChange}
                            onChangeArgs={["newData.tracingProfileConfigs.tracingProfileConfig[0].profileType"]}
                        />
                        <SpinnerCCFK
                            id="Sample Rate"
                            label="Sample Rate"
                            min={1}
                            required={true}
                            disabled={dialogType === "view"}
                            max={100}
                            value={newData.tracingProfileConfigs.tracingProfileConfig[0].samplingRate}
                            step={1}
                            onChange={this.props.handleSR}
                        />
                        <SelectInputCCFK
                            label="Output Format"
                            required={newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'EDR'}
                            disabled={dialogType === "view" || newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'HEP3' || newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'MIRROR'}
                            data={news}
                            value={newData.tracingProfileConfigs.tracingProfileConfig[0].outputFormat}
                            onChange={this.props.handleOutputFormat}
                            onChangeArgs={["newData.tracingProfileConfigs.tracingProfileConfig[0].outputFormat"]}
                        />
                        <SelectInputCCFK
                            label="Output Destination"
                            required={true}
                            disabled={dialogType === "view"}
                            data={(newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'EDR')?bcd:(newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'MIRROR')?bed:bced}
                            value={newData.tracingProfileConfigs.tracingProfileConfig[0].outputDestination}
                            onChange={this.props.handleOutputDestination}
                            onChangeArgs={["newData.tracingProfileConfigs.tracingProfileConfig[0].outputDestination"]}
                        />
                        <SelectInputCCFK
                            label="Destination Name"
                            required={true}
                            data={showList}
                            disabled={dialogType === "view"||newData.tracingProfileConfigs.tracingProfileConfig[0].outputDestination === ""}
                            value={newData.tracingProfileConfigs.tracingProfileConfig[0].destinationName}
                            onChange={this.props.handleDestinationName}
                            onChangeArgs={["newData.tracingProfileConfigs.tracingProfileConfig[0].destinationName"]}
                        />
                        {newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'HEP3'?
                        dialogType === "edit"?<Tooltip key="hepInterface" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                        tooltip="Please add a new Profile to enable this">
                            <SelectInputCCFK
                            label="HEP3 Interface"
                            required={true}
                            data={hepInterfaceOptions}
                            disabled={dialogType === "view"||dialogType === "edit"}
                            value={newData.tracingProfileConfigs.tracingProfileConfig[0].hepInterface}
                            onChange={this.handleHepInterface}
                            onChangeArgs={["newData.tracingProfileConfigs.tracingProfileConfig[0].hepInterface"]}
                        />    
                        </Tooltip>:<SelectInputCCFK
                            label="HEP3 Interface"
                            required={true}
                            data={hepInterfaceOptions}
                            disabled={dialogType === "view"||dialogType === "edit"}
                            value={newData.tracingProfileConfigs.tracingProfileConfig[0].hepInterface}
                            onChange={this.handleHepInterface}
                            onChangeArgs={["newData.tracingProfileConfigs.tracingProfileConfig[0].hepInterface"]}
                        />  
                        :<></>}
                    <ButtonCCFK disabled={dialogType === "view" || newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'HEP3' || newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'MIRROR'} text="ADD REQUEST FIELDS" iconDirection="left" Icon={<AddIcon color="#ffffff"/>} onClick={this.AddRequest} variant="call-to-action"/>
                    <ButtonCCFK disabled={dialogType === "view" || newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'HEP3' || newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'MIRROR'} text="ADD RESPONSE FIELDS" iconDirection="left" Icon={<AddIcon color="#ffffff"/>} onClick={this.AddResponse} variant="call-to-action"/>
                    {multi1}
                    {newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'EDR' && this.requestList()}
                    {multi2}
                    {newData.tracingProfileConfigs.tracingProfileConfig[0].profileType === 'EDR' && this.responsetList()}
                    </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.tcpnewEditDialog.dialogType,
        selectstate1:state.tcpnewEditDialog.dialogState2,
        selectstate2:state.tcpnewEditDialog.dialogState3,
        requestValue:state.tcpnewEditDialog.requestValue,
        respondValue:state.tcpnewEditDialog.respondValue
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState2,
        setDialogState3,
        setedrRequestFields,
        setedrResponseFields,
        setHepInterface
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(TracingProfileForm);