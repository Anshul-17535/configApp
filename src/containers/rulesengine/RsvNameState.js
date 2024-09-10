import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {addNewRecord,createRsv,ActivateState,assignRuleSetNames,GetRulePluginSequence} from "../../actions/rulesengine/commonServices";
import {addRSVname,addRSVstate,RsvOnSaveBtnClick,UpdateRuleSetNamesArray,RsvNameErrorState,ModifiedSourceContext,ModifiedResultContext} from '../../actions/rulesengine'
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import "../../styles/rulesEngine/RsvNameState.css";

let srv;
class RsvNameState extends Component{
    constructor(props){
        super(props);
        srv=this;
    }

    HandleRsvNameChange=(value)=>{
        srv.props.addRSVname(value)
    }
    HandleRsvStateChange=(value)=>{
        if(!!value){
            if(this.props.currentRsvState!==value){
                this.props.handleRsvStateValue(true)
            }else{
                this.props.handleRsvStateValue(false)
            }
        }
    }
    RSVnameonSave=()=>{
        let postRsvName = {};
        postRsvName.rsvName = srv.props.rsvName;
        // srv.props.RsvOnSaveBtnClick(true)
        srv.props.createRsv(postRsvName);

    }

    componentDidMount=()=>{
        srv.props.RsvNameErrorState(false)
        srv.props.GetRulePluginSequence()
    }

    render(){
        return(
            <div className="RsvInputrow">
                <TextInputCCFK
                    id="TextInputID"
                    label="RSV Name"
                    required={true}
                    errorMsg="Rsv Name Already Exists"
                    error={srv.props.RsvNameErrStateVal}
                    disabled={srv.props.rsvSaveState}
                    value={srv.props.rsvName}
                    placeholder="RSV Name"
                    onChange={this.HandleRsvNameChange}
                />
                <SelectInputCCFK
                    label="RSV STATE"
                    disabled={srv.props.viewmode===true||srv.props.dialogTypeVal==="new"}
                    data={['ACTIVE','INACTIVE']}
                    value={!!srv.props.rsvState?srv.props.rsvState:"INACTIVE"}
                    onChange={this.HandleRsvStateChange}
                />

                {!srv.props.rsvSaveState?<div className="RSVnamebuttons">
                        <ButtonCCFK text="SAVE" disabled={!srv.props.rsvName||srv.props.rsvName.length<1||!srv.props.rsvState||srv.props.rsvName.toLowerCase()==="default"} onClick={this.RSVnameonSave} variant="call-to-action" />
                    </div>:null}

                </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        rsvName: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].rsvName : "",
        rsvState: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].state :"",
        rsvSaveState: state.renewEditDialog.RsvSaveState,
        viewmode: state.renewEditDialog.viewMode,
        dialogTypeVal:state.renewEditDialog.dialogType,
        RsvNameErrStateVal:state.renewEditDialog.RsvNameErrState



    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        addRSVname,
        addRSVstate,
        RsvOnSaveBtnClick,
        UpdateRuleSetNamesArray,
        ModifiedSourceContext,
        ModifiedResultContext,
        addNewRecord,
        assignRuleSetNames,
        createRsv,
        ActivateState,
        RsvNameErrorState,
        GetRulePluginSequence

    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RsvNameState);
