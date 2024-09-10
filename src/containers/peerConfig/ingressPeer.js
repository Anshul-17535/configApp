import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import "../../styles/peerConfig/peerConfigForm.css";
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import CardCCFK from "../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import IPHost from './ipHost';
import { createPeerConfig,updatePeerConfig } from '../../actions/peerconfig/commonservices';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setIngHostAlert,setIPProfileName,setIPDefaultPeer,AddNewHost,deleteHost,updateHost,setDialogState} from '../../actions/peerconfig/index';


class IngressPeer extends React.Component {

    constructor(props){
        super(props)
        this.state={
            checkHostValid:false
        }
    }

    componentWillMount=()=>{
        this.props.setIngHostAlert(false)
    }

    handleSaveClick=()=>{
        switch (true) {
            case this.state.checkHostValid:
                if((this.props.data.peerAddress.address).length === 0)this.props.setIngHostAlert(true)
                else{
                    const {data} = this.props
                    if(this.props.dialogType==="edit"){
                        delete data.id
                        delete data.creationTime
                        delete data.egressProfileName
                        delete data.lastUpdateTime
                        delete data.schemaVersion
                        delete data.siteName
                    this.props.updatePeerConfig(data)
                    }else{
                    this.props.createPeerConfig(data)
                    }
                    this.props.setDialogState(false)
                }
                break;
        
            default:
                const {data} = this.props
                if(this.props.dialogType==="edit"){
                    delete data.id
                    delete data.creationTime
                    delete data.egressProfileName
                    delete data.lastUpdateTime
                    delete data.schemaVersion
                    delete data.siteName
                this.props.updatePeerConfig(data)
                }else{
                this.props.createPeerConfig(data)
                }
                this.props.setDialogState(false)
                break;
        }        
    }

    handleIngressProfileName=(value)=>{
        if(!!value){
        this.props.setIPProfileName(value)
    }
    }

    handleDefaultPeer=(value)=>{
        if(value === 'false') this.setState({checkHostValid:true})
        else this.setState({checkHostValid:false})
        this.props.setIPDefaultPeer(value)
    }

    
    handleHostChange=(value,field,Index)=>{
        this.props.updateHost(value,field,Index)
    }
    
    deleteHost=(Index)=>{
        this.props.deleteHost(Index)
    }

    AddNewHost=()=>{
        let NewHostObject={  "host":"" }
        this.props.AddNewHost(NewHostObject)
    }

    onErrorClose=()=>{
        this.props.setIngHostAlert(false)
    }

    showAlert=()=>{
        return (<ErrorDialogCCFK title={"Error!"} variant="ERROR" message={"Please Enter A Valid Host"} detailsText={""} onClose={this.onErrorClose}/>)
    }

    render() {
        const {dialogType,ingressData}=this.props
            return (
                <div>
                    <div className="PeerConfigForm">
                        <SelectInputCCFK
                            label="Ingress Profile  Name"
                            required={true}
                            data={!!this.props.data1?[...this.props.data1,"NONE"]:["NONE"]}
                            disabled={dialogType === "view"}
                            value={ingressData.ingressProfileName}
                            onChange={this.handleIngressProfileName}
                            onChangeArgs={["ingressData.ingressProfileName"]}
                        />
                        <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>Add Host</h2>
                                <IconButtonCCFK 
                                    disabled={dialogType === "view"||this.props.dialogType === "edit"}
                                    onClick={this.AddNewHost}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {ingressData.peerAddress.address.map((host,Index)=>{
                                return <IPHost key={`HOST_${Index}`} dialogType={dialogType} deleteHost={this.deleteHost} handleHostChange={this.handleHostChange} host={host.host} Index={Index}/>
                            })
                            }
                        </CardCCFK>
                        <RadioButtonGroupCCFK
                            label="Default Peer"
                            disabled={dialogType === "view"||this.props.dialogType === "edit"}
                            value={ingressData.defaultPeer}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleDefaultPeer}
                            onChangeArgs={["ingressData.defaultPeer"]}
                        />

                    </div>
                    <div className="containerLookUp">
                        <ButtonCCFK text="SAVE"  onClick={this.handleSaveClick} disabled={ingressData.defaultPeer === null || dialogType === "view" } variant="call-to-action" />
                    </div>
                    {this.props.showHostAlert && this.showAlert()}
                </div>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        dialogType:state.peernewEditDialog.dialogType,
        data:state.peernewEditDialog.currentPeerIPConfig,
        data1:state.peertoolbar.ingreessprofilearray,
        showHostAlert:state.peernewEditDialog.showHostAlert
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setIPProfileName,
        setIPDefaultPeer,
        AddNewHost,
        deleteHost,
        updateHost,
        createPeerConfig,
        updatePeerConfig,
        setDialogState,
        setIngHostAlert
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(IngressPeer);