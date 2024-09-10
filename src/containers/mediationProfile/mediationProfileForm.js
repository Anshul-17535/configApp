import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import CardCCFK from "../../ccfk-components/CardCCFK";
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import "../../styles/mediationForm/mediation.css"
import ChipsInputCCFK from '../../ccfk-components/ChipsInputCCFK';
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import {handleMpcPatternChange,handleMpc2PatternChange,handleMpc3PatternChange,MGchange,MG2change,MG3change} from '../../actions/mediationProfile/index'


const abc=["REQUEST","RESPONSE"]
const bcd=["CONSTANT","CURRENT_TIME","BODY","HEADER"]

class MediationProfileForm extends React.Component{    
    handlen=(value,field)=>{
        this.props.MGchange(value,field)
    }
    handlen2=(value,field)=>{
        this.props.MG2change(value,field)
    }
    handlen3=(value,field)=>{
        this.props.MG3change(value,field)
    }
    handlePatternChange=(value)=>{
        this.props.handleMpcPatternChange(value)
    }
    handlePattern2Change=(value)=>{
        this.props.handleMpc2PatternChange(value)
    }
    handlePattern3Change=(value)=>{
        this.props.handleMpc3PatternChange(value)
    }

    ShowData=()=>{
        switch(this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].sourceType){
            case 'HEADER' :{
                return(<h3>Pattern Data</h3>)
            }
            case 'BODY' :{
                return(<h3>Pattern Data</h3>)
            }
            case 'CONSTANT' :{
                return(<h3>Constant Data</h3>)
            }
            case 'CURRENT_TIME' :{
                return(<h3>Current Time Data</h3>)
            }
            default :
                return(<></>)
        }
    }

    TypeDataChange=()=>{
        const {dialogType}=this.props
        switch(this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].sourceType){
            case'HEADER': {
                return(
                <>
                                <TextInputCCFK
                                    id="pattern"
                                    label="Pattern"
                                    required={true}
                                    placeholder="Pattern"
                                    value={this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].patternData.pattern}
                                    disabled={dialogType === "view"}   
                                    onChange={this.handlePatternChange}
                                    onChangeArgs={["this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].patternData.pattern"]}
                                />
                                <Tooltip key="export" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                                tooltip="Please Press Enter To Add  Value in Matching Groups">
                                <ChipsInputCCFK
                                    placeHolder="Matching Groups"
                                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                                    onChange={this.handlen}
                                    disabled={dialogType === "view"}   
                                    size="medium"
                                    value={this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].patternData.matchingGroups}
                                    onChangeArgs={["matchingGroups"]}
                                />
                                </Tooltip>
            
                </>
                 )}
            case'BODY': {
                return(
                <>
                                <TextInputCCFK
                                    id="pattern"
                                    label="Pattern"
                                    required={true}
                                    placeholder="Pattern"
                                    disabled={dialogType === "view"}   
                                    value={this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].patternData.pattern}
                                    onChange={this.handlePatternChange}
                                    onChangeArgs={["this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].patternData.pattern"]}
                                />
                                <Tooltip key="export" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                                tooltip="Please Press Enter To Add  Value in Matching Groups">
                                <ChipsInputCCFK
                                    placeHolder="Matching Groups"
                                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                                    onChange={this.handlen}
                                    disabled={dialogType === "view"}   
                                    size="medium"
                                    value={this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].patternData.matchingGroups}
                                    onChangeArgs={["matchingGroups"]}
                                />
                                </Tooltip>
                </>
                     )}  
            case'CONSTANT': {
                return(
                <>
                                <TextInputCCFK
                                    id="value"
                                    label="Value"
                                    required={true}
                                    disabled={dialogType === "view"}   
                                    placeholder="Value"
                                    value={this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].constantData.value}
                                    onChange={this.handlePattern2Change}
                                    onChangeArgs={["this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].constantData.value"]}
                                />
                                <Tooltip key="export" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                                tooltip="Please Press Enter To Add  Value in Matching Groups">
                                <ChipsInputCCFK
                                    placeHolder="Matching Groups"
                                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                                    onChange={this.handlen2}
                                    size="medium"
                                    disabled={dialogType === "view"}   
                                    value={this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].constantData.matchingGroups}
                                    onChangeArgs={["matchingGroups"]}
                                />
                                </Tooltip>
                        </>
                         )}
            case'CURRENT_TIME': {
                return(
                <>
                                <TextInputCCFK
                                    id="format"
                                    label="Format"
                                    required={true}
                                    placeholder="Format"
                                    disabled={dialogType === "view"}   
                                    value={this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].timeData.format}
                                    onChange={this.handlePattern3Change}
                                    onChangeArgs={["this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].timeData.format"]}
                                />
                                <Tooltip key="export" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                                tooltip="Please Press Enter To Add  Value in Matching Groups">
                                <ChipsInputCCFK
                                    placeHolder="Matching Groups"
                                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                                    onChange={this.handlen3}
                                    disabled={dialogType === "view"}   
                                    size="medium"
                                    value={this.props.newData.mediationProfileConfigs.mediationProfileCfg[0].timeData.matchingGroups}
                                    onChangeArgs={["matchingGroups"]}
                                />
                                </Tooltip>
                </>
                     )}   
            default:
                return(<></>)
        }
        
    }


    render(){
        const {dialogType,newData}=this.props
        return (
            <>
            <div className="SlfLookUpForm">
                        <TextInputCCFK
                            id="Profile Id"
                            label="Profile ID"
                            required={true}
                            placeholder="Profile ID"
                            value={newData.mediationProfileConfigs.mediationProfileCfg[0].id}
                            disabled={dialogType === "edit" || dialogType === "view"}
                            onChange={this.props.handleNameChange}
                            onChangeArgs={["newData.mediationProfileConfigs.mediationProfileCfg[0].id"]}
                        />
                        <SelectInputCCFK
                            label="Message Type"
                            required={true}
                            data={abc}
                            disabled={dialogType === "view"}                            
                            value={newData.mediationProfileConfigs.mediationProfileCfg[0].messageType}
                            onChange={this.props.handleProfileChange}
                            onChangeArgs={["newData.mediationProfileConfigs.mediationProfileCfg[0].messageType"]}
                        />
                        <SelectInputCCFK
                            label="Source Type"
                            required={true}
                            data={bcd}
                            disabled={dialogType === "view"}
                            value={newData.mediationProfileConfigs.mediationProfileCfg[0].sourceType}
                            onChange={this.props.handleSourceTypeChange}
                            onChangeArgs={["newData.mediationProfileConfigs.mediationProfileCfg[0].sourceType"]}
                        />
                        <TextInputCCFK
                            id="Source"
                            label="Source"
                            required={newData.mediationProfileConfigs.mediationProfileCfg[0].sourceType === 'BODY' || newData.mediationProfileConfigs.mediationProfileCfg[0].sourceType === 'HEADER'}
                            disabled={dialogType === "view"}   
                            placeholder="Source"
                            value={newData.mediationProfileConfigs.mediationProfileCfg[0].source}
                            onChange={this.props.handlesource}
                            onChangeArgs={["newData.mediationProfileConfigs.mediationProfileCfg[0].source"]}
                        />
                    </div>
                <div>
                    <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            {/* <h3> MEDIATION SOURCE TYPE DATA </h3> */}
                            {this.ShowData()}
                            <div className='MEDIATION'>
                            {this.TypeDataChange()}
                            </div>
                            
                    </CardCCFK>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.mpcnewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        handleMpcPatternChange,
        handleMpc2PatternChange,
        handleMpc3PatternChange,
        MGchange,
        MG2change,
        MG3change
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(MediationProfileForm);