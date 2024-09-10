import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import "../../styles/peerConfig/peerConfigForm.css";
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import CardCCFK from "../../ccfk-components/CardCCFK";
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import EPHost from './epHost';
import EPReg from './epReg';
import { createPeerConfig,updatePeerConfig } from '../../actions/peerconfig/commonservices';
import { setEgHostAlert,setEPProfileName,setEPDefaultPeer,AddNewEPHost,updateEPHost,deleteEPHost,setDialogState,AddNewRegHost,deleteRegHost,updateRegHost,saveRank,saveHost} from '../../actions/peerconfig/index';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';


class EgressPeer extends React.Component {

    constructor(props){
        super(props)
        this.state={
            checkHostValid:false
        }
    }

    componentWillMount=()=>{
        this.props.setEgHostAlert(false)
    }


    componentWillMount=()=>{
        if(this.props.dialogType!=="edit")
        {
            this.props.arrayNew.data=[]
            this.props.arrayOld.data=[]
        }
    }


    handleSaveClick=()=>{
        switch (true) {
            case this.state.checkHostValid:
                if((this.props.arrayOld.data).length === 0 && (this.props.arrayNew.data).length === 0)this.props.setEgHostAlert(true)
                else{
                    const {egressData,arrayNew,arrayOld} = this.props
                    let saveData=[].concat(arrayNew.data,arrayOld.data)
                    egressData.peerAddress.address=saveData;
                    if(this.props.dialogType==="edit"){
                        delete egressData.id
                        delete egressData.creationTime
                        delete egressData.ingressProfileName
                        delete egressData.lastUpdateTime
                        delete egressData.schemaVersion
                        delete egressData.siteName
                        this.props.updatePeerConfig(egressData)
                    }else{
                        this.props.createPeerConfig(egressData)
                    }
                    this.props.setDialogState(false)
                }
                break;
        
            default:
                const {egressData,arrayNew,arrayOld} = this.props
                let saveData=[].concat(arrayNew.data,arrayOld.data)
                egressData.peerAddress.address=saveData;
                if(this.props.dialogType==="edit"){
                    delete egressData.id
                    delete egressData.creationTime
                    delete egressData.ingressProfileName
                    delete egressData.lastUpdateTime
                    delete egressData.schemaVersion
                    delete egressData.siteName
                    this.props.updatePeerConfig(egressData)
                }else{
                    this.props.createPeerConfig(egressData)
                }
                this.props.setDialogState(false)
                break;
        }
    }

    handleEgressProfileName=(value)=>{
        if(!!value){
        this.props.setEPProfileName(value)
    }
    }

    handleDefaultPeer=(value)=>{
        if(value === 'false') this.setState({checkHostValid:true})
        else this.setState({checkHostValid:false})
        this.props.setEPDefaultPeer(value)
    }

    handleHostChange=(value,field,Index)=>{
        this.props.updateEPHost(value,field,Index)
    }

    handleRegChange=(value,field,Index)=>{
        this.props.updateRegHost(value,field,Index)
    }
    
    deleteHost=(Index)=>{
        this.props.deleteEPHost(Index)
    }

    deleteReg=(Index)=>{
        this.props.deleteRegHost(Index)
    }

    AddNewHost=()=>{
        let NewHostObject= { "host":"","port":""}
        this.props.AddNewEPHost(NewHostObject)
    }

    AddNewReg=()=>{
        let NewRegObject= {"regEx":"","rank":""}
        this.props.AddNewRegHost(NewRegObject)
    }

    handleRanksave=()=>{
        this.props.saveRank(this.props.arrayNew.data)
    }
    
    handleHostsave=()=>{
        this.props.saveHost(this.props.arrayOld.data)
    }

    onErrorClose=()=>{
        this.props.setEgHostAlert(false)
    }
    
    showAlert=()=>{
        return (<ErrorDialogCCFK title={"Error!"} variant="ERROR" message={"Please Enter A Valid Host/Regex Value"} detailsText={""} onClose={this.onErrorClose}/>)
    }

    render() {
        const {dialogType,egressData,arrayNew,arrayOld}=this.props
            return (
                <div>
                    <div className="PeerConfigForm">
                        <SelectInputCCFK
                            label="Egress Profile  Name"
                            required={true}
                            data={!!this.props.data1?[...this.props.data1,"NONE"]:["NONE"]}
                            disabled={dialogType === "view"}
                            value={egressData.egressProfileName}
                            onChange={this.handleEgressProfileName}
                            onChangeArgs={["egressData.egressProfileName"]}
                        />
                        <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>Add Host And Port</h2>
                                <IconButtonCCFK 
                                    disabled={dialogType === "view"||this.props.dialogType === "edit"}
                                    onClick={this.AddNewHost}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {arrayOld.data.map((host,Index)=>{
                                return <EPHost key={`HOST_${Index}`} dialogType={dialogType} deleteHost={this.deleteHost} handleHostChange={this.handleHostChange} host={host.host} port={host.port} Index={Index}/>
                            })
                            }
                        </CardCCFK>
                        <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>Add Regex</h2>
                                <IconButtonCCFK 
                                    disabled={dialogType === "view"||this.props.dialogType === "edit"}
                                    onClick={this.AddNewReg}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {arrayNew.data.map((host,Index)=>{
                                return <EPReg key={`REG_${Index}`} dialogType={dialogType} deleteReg={this.deleteReg} handleRegChange={this.handleRegChange} regEx={host.regEx} rank={host.rank} Index={Index}/>
                            })
                            }
                        </CardCCFK>
                        <RadioButtonGroupCCFK
                            label="Default Peer"
                            disabled={dialogType === "view"||this.props.dialogType === "edit"}
                            value={egressData.defaultPeer}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleDefaultPeer}
                            onChangeArgs={["egressData.defaultPeer"]}
                        />

                    </div>
                    <div className="containerLookUp">
                        <ButtonCCFK text="SAVE"  onClick={this.handleSaveClick} disabled={egressData.defaultPeer === null || dialogType === "view"} variant="call-to-action" />
                    </div>
                    {this.props.showHostAlert && this.showAlert()}
                </div>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        dialogType:state.peernewEditDialog.dialogType,
        data1:state.peertoolbar.egreessprofilearray,
        arrayNew:state.peernewEditDialog.regPart,
        arrayOld:state.peernewEditDialog.hostPart,
        showHostAlert:state.peernewEditDialog.showEGHostAlert
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setEPProfileName,
        AddNewEPHost,
        updateEPHost,
        deleteEPHost,
        setEPDefaultPeer,
        createPeerConfig,
        updatePeerConfig,
        setDialogState,
        AddNewRegHost,
        deleteRegHost,
        updateRegHost,
        saveRank,
        saveHost,
        setEgHostAlert
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EgressPeer);