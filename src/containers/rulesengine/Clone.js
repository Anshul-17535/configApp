import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import "../../styles/rulesEngine/Import.css";
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import { setCloneDialog } from '../../actions/rulesengine';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import { importrsv } from '../../actions/rulesengine/commonServices';
import {addCloneRSVname} from '../../actions/rulesengine';
import {RsvNameErrorState} from '../../actions/rulesengine';
import { getAllData } from '../../actions/rulesengine/commonServices';

let AllData =[];
let srv;
class Clone extends Component
{
    constructor(props) {
        super(props);
        srv = this;
        srv.handleRsvNameChange = srv.handleRsvNameChange.bind(this);
        srv.handleSave = srv.handleSave.bind(this);
        srv.state={
        currentExportData:"",
        currentRsvCloneName:""
        }
    }
    componentWillMount() {
        this.props.getAllData();
    }
    componentWillReceiveProps(props) {
        this.setState({
            currentExportData: this.props.exportData,
            currentRsvCloneName: this.props.RsvCloneName,
        })
    }
    componentDidMount=()=>{
        srv.props.RsvNameErrorState(false)
    }
    handleRsvNameChange=(value)=>{
        this.props.addCloneRSVname(value)
    }
    onClose=()=>{
        this.props.setCloneDialog(false);
        this.setState({ RsvCloneNameState: '' });
    }

    handleSave=()=>{
        console.log("Data",this.state.currentExportData)
        console.log("RSV Name --", this.props.RsvCloneName )
        this.state.currentExportData.rsvName =this.props.RsvCloneName
        const element = document.createElement('a');
        console.log("RSV NAme", this.state.currentExportData)
        const file = new Blob ([JSON.stringify(this.state.currentExportData)],{type:"text/plain"});
        let reader=new FileReader();
        reader.readAsText(file);
        let ans=reader.result;
        ans='['+[JSON.stringify(this.state.currentExportData)]+']';
        AllData=JSON.parse(ans)
        console.log("Data",AllData)
        this.props.importrsv(AllData);
        this.setState({ RsvCloneNameState: '' });
        this.props.setCloneDialog(false);
    }

    renderFooter=()=>{
        return(
            <div>
                 {!srv.props.rsvSaveState?
                <ButtonCCFK text="SAVE"  disabled={!srv.props.RsvCloneName||srv.props.RsvCloneName.length<1||srv.props.RsvCloneName.toLowerCase()==="default"}onClick={this.handleSave} variant="call-to-action" />
               :null}
                <ButtonCCFK text="CANCEL" onClick={this.onClose}/>
            </div>
        )
    }
    render(){
        return(
            <DialogCCFK
            title={"Please rename the RSV for Cloning"}
            onClose={()=>{this.onClose()}}
            renderFooter={this.renderFooter}
            dialogStyle={{
                "content": {
                    "top":"30%",
                    "bottom":"10%",
                    "height": "40%",
                    "left": "30%",
                    "right": "35%",
                    "width": "40%"
                    }
            }}
            footerStyle={{"display":"flex","justifyContent":"center"}}
            >
            <div className="RsvInputrow" >
                <TextInputCCFK
                    id="TextInputID"
                    label="RSV Name"
                    required={true}
                    errorMsg="Rsv Name Already Exists"
                    error={srv.props.RsvNameErrStateVal}
                    disabled={srv.props.rsvSaveState}
                    value={srv.state.RsvCloneNameState}
                    placeholder="RSV Name"
                    onChange={this.handleRsvNameChange}
                />
                </div>
        </DialogCCFK>
        )}
        }

function mapStateToProps(state) {
    return{
        exportData:state.renewEditDialog.ExportOnedata,
        RsvNameErrStateVal:state.renewEditDialog.RsvNameErrState,
        rsvSaveState: state.renewEditDialog.RsvSaveState,
        RsvCloneName:state.renewEditDialog.RsvCloneNameState,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setCloneDialog,
        addCloneRSVname,
        importrsv,
        getAllData,
        RsvNameErrorState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Clone);