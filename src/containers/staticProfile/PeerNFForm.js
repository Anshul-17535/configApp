import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SpinnerCCFK from '../../ccfk-components/SpinnerCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import ChipsInputCCFK from '../../ccfk-components/ChipsInputCCFK';
import Label from '@nokia-csf-uxr/ccfk/Label';
import CardCCFK from "../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import NFServiceForm from '../../containers/staticProfile/nfServiceForm'
import {setIpv4Error,setIpv6Error,addServiceVexpiry,addServiceVapiFullVersion,addServiceVapiURL,addServiceIpEndpoint,addServiceIpPort,addServiceIpTransport,addServiceIpv4Address,addServiceFQDN,addServiceName,addServiceSetIdList,addServiceScheme,addServiceApiPrefix,addServiceStatus,addServicePriority,addServiceCapacity,addServiceInstanceId,nfSetIdChange,ipv6Change,ipv4Change,addNfCapacity,addNfLoad,addNfPriority,addNfFQDN,addNfInstanceName,addNfStatus,addNfType,addNfInstanceId,addNFService,deleteNfService,addEndPoints,addVersions,deleteIpEndPoints,deleteVersions} from '../../actions/staticProfile/index'
import { ipv4ArrayCheck,ipv6ArrayCheck,fqdnCheck,groupIdCheck } from './helperFunctions';
import '../../styles/peerNF/peerNfForm.css';

const statusData = ['REGISTERED','SUSPENDED']

const nfTypeData = ['NRF','UDM','AMF','SMF','AUSF','NEF','PCF','SMSF','NSSF','UDR','LMF','GMLC','5G_EIR','SEPP','UPF','N3IWF','AF','UDSF','BSF','CHF','NWDAF','PCSCF','CBCF','HSS','UCMF','SOR_AF','SPAF','MME','SCSAS','SCEF','SCP','CUSTOM','IMS_AS','NSSAF','ICSCF','SCSCF','DRA','AANF','NSACF','MFAF','EASDF','DCCF','TSCTSF','ADRF','CEF','MB_UPF','NSWOF','PKMF','MNPF','MBSF','MBSTF','PANF']

const nfTypeByGID = ['UDR','UDM','AUSF','PCF','CHF','HSS','UDSF','5G_EIR']

class PeerNFForm extends React.Component{

    componentWillMount=()=>{
        this.props.setIpv4Error(false)
        this.props.setIpv6Error(false)
    }
    
    addNewNFService = () =>{
        const newNfService = {
            "serviceInstanceId": "",
            "serviceName": "",
            "scheme": "",
            "apiPrefix": "",
            "fqdn":"",
            "nfServiceStatus": "",
            "priority": 1,
            "capacity": 100,
            "ipEndPoints": [],
            "versions": []
          }
        this.props.addNFService(newNfService)
    }

    addEndPoints = (value,index) =>{
        this.props.addEndPoints(value,index)
    }

    addVersions = (value,index)=>{
        this.props.addVersions(value,index)
    }

    deleteIpEndPoints=(indIp,indNFService)=>{
        this.props.deleteIpEndPoints(indIp,indNFService)
    }

    deleteVersions=(indIp,indNFService)=>{
        this.props.deleteVersions(indIp,indNFService)
    }
    
    deleteNfService = (value) =>{
        this.props.deleteNfService(value)
    }
    
    addNfInstanceId = (value) =>{
        this.props.addNfInstanceId(value)
    }

    addNfType = (value) =>{
        if(!!value){
            this.props.addNfType(value)
        }
    }

    addNfStatus = (value) =>{
        if(!!value){
            this.props.addNfStatus(value)
        }
    }

    addNfInstanceName = (value) =>{
        this.props.addNfInstanceName(value)
    }

    addNfFQDN = (value) =>{
        this.props.addNfFQDN(value)
    }

    addNfCapacity = (value) =>{
        this.props.addNfCapacity(value)
    }

    addNfPriority = (value) =>{
        this.props.addNfPriority(value)
    }

    addNfLoad = (value) =>{
        this.props.addNfLoad(value)
    }

    ipv4Change = (value,field)=>{
        this.props.setIpv4Error(ipv4ArrayCheck(value))
        this.props.ipv4Change(value,field)
    }

    ipv6Change = (value,field)=>{
        this.props.setIpv6Error(ipv6ArrayCheck(value))
        this.props.ipv6Change(value,field)
    }

    nfSetIdChange = (value,field)=>{
        this.props.nfSetIdChange(value,field)
    }

    addServiceInstanceId=(value,index)=>{
        this.props.addServiceInstanceId(value,index)
    }

    addServiceName=(value,index)=>{
        this.props.addServiceName(value,index)
    }
    addServiceFQDN=(value,index)=>{
        this.props.addServiceFQDN(value,index)
    }


    addServiceScheme=(value,index)=>{
        this.props.addServiceScheme(value,index)
    }

    addServiceApiPrefix=(value,index)=>{
        this.props.addServiceApiPrefix(value,index)
    }

    addServiceStatus=(value,index)=>{
        this.props.addServiceStatus(value,index)
    }

    addServicePriority=(value,index)=>{
        this.props.addServicePriority(value,index)
    }

    addServiceCapacity=(value,index)=>{
        this.props.addServiceCapacity(value,index)
    }

    addServiceSetIdList=(value,field,index)=>{
        this.props.addServiceSetIdList(value,field,index)
    }

    addServiceIpv4Address=(value,indexOfIP,indexOfNf)=>{
        this.props.addServiceIpv4Address(value,indexOfIP,indexOfNf)
    }

    addServiceIpTransport=(value,indexOfIP,indexOfNf)=>{
        this.props.addServiceIpTransport(value,indexOfIP,indexOfNf)
    }

    addServiceIpPort=(value,indexOfIP,indexOfNf)=>{
        this.props.addServiceIpPort(value,indexOfIP,indexOfNf)
    }

    addServiceIpEndpoint=(value,indexOfIP,indexOfNf)=>{
        this.props.addServiceIpEndpoint(value,indexOfIP,indexOfNf)
    }

    addServiceVapiURL=(value,indexOfIP,indexOfNf)=>{
        this.props.addServiceVapiURL(value,indexOfIP,indexOfNf)
    }

    addServiceVapiFullVersion=(value,indexOfIP,indexOfNf)=>{
        this.props.addServiceVapiFullVersion(value,indexOfIP,indexOfNf)
    }

    addServiceVexpiry=(value,indexOfIP,indexOfNf)=>{
        this.props.addServiceVexpiry(value,indexOfIP,indexOfNf)
    }

    haveDate=(value)=>{
        console.log(value)
    }

    render(){
        const {dialogType,newData}=this.props
        return (
            <>
                <div className='PeerNFForm'>
                        <TextInputCCFK
                            id="nfInstanceId"
                            label="NF Instance Id"
                            required={true}
                            placeholder="NF Instance Id"
                            value={newData.peerNfProfiles.peerNfProfile[0].nfInstanceId}
                            disabled={dialogType === "view"||dialogType === "edit"}
                            onChange={this.addNfInstanceId}
                            onChangeArgs={["newData.peerNfProfiles.peerNfProfile[0].nfInstanceId"]}
                        />
                        <SelectInputCCFK
                            label="NF Type"
                            required={true}
                            data={nfTypeData}
                            disabled={dialogType === "view"}
                            value={newData.peerNfProfiles.peerNfProfile[0].nfType}
                            onChange={this.addNfType}
                            onChangeArgs={["newData.peerNfProfiles.peerNfProfile[0].nfType"]}
                        />
                        <SelectInputCCFK
                            label="NF Status"
                            required={true}
                            data={statusData}
                            disabled={dialogType === "view"}
                            value={newData.peerNfProfiles.peerNfProfile[0].nfStatus}
                            onChange={this.addNfStatus}
                            onChangeArgs={["newData.peerNfProfiles.peerNfProfile[0].nfStatus"]}
                        />
                        <TextInputCCFK
                            id="groupid"
                            label="Group ID"
                            placeholder="Group ID"
                            value={newData.peerNfProfiles.peerNfProfile[0].groupId}
                            disabled={dialogType === "view" || groupIdCheck(nfTypeByGID,newData.peerNfProfiles.peerNfProfile[0].nfType)}
                            onChange={this.addNfInstanceName}
                            onChangeArgs={["newData.peerNfProfiles.peerNfProfile[0].groupId"]}
                        />               
                        <TextInputCCFK
                            id="fqdn"
                            label="FQDN"
                            error={fqdnCheck(newData.peerNfProfiles.peerNfProfile[0].fqdn)}
                            errorMsg="Please Provide A Valid FQDN Value"
                            placeholder="FQDN"
                            value={newData.peerNfProfiles.peerNfProfile[0].fqdn}
                            disabled={dialogType === "view"}
                            onChange={this.addNfFQDN}
                            onChangeArgs={["newData.peerNfProfiles.peerNfProfile[0].fqdn"]}
                        />
                    </div>
                <div className='PeerNFForm'>
                        <SpinnerCCFK
                            id="priority"
                            label="Priority"
                            min={0}
                            required
                            max={200000000}
                            value={newData.peerNfProfiles.peerNfProfile[0].priority}
                            step={1}
                            onChange={this.addNfPriority}
                        />
                        <SpinnerCCFK
                            id="capacity"
                            label="Capacity"
                            min={0}
                            required
                            max={200000000}
                            value={newData.peerNfProfiles.peerNfProfile[0].capacity}
                            step={1}
                            onChange={this.addNfCapacity}
                        />
                    </div>
                <div className='PeerNFForm2'>
                <Tooltip key="IPV4" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Please Press Enter To Store The Value">
                        <Label htmlFor="selectitem-component-input" verticalLayout ><span style={{color:"#737373",fontSize:"12px",fontFamily:"NokiaPureHeadline, sans-serif"}}>{"IPV4 Addresses"}</span>
                        <ChipsInputCCFK
                                    placeHolder="IPV4 Addresses"
                                    onChange={(value,field)=>{this.ipv4Change(value,field)}}
                                    checkMessage={'Enter Valid Ipv4 Adresses'}
                                    checkError={this.props.ipv4Error}
                                    disabled={dialogType === "view"}   
                                    size="medium"
                                    value={newData.peerNfProfiles.peerNfProfile[0].ipv4Addresses}
                                    onChangeArgs={["ipv4Addresses"]}
                                /></Label>
                    </Tooltip>
                    <Tooltip key="IPV6" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Please Press Enter To Store The Value">
                        <Label htmlFor="selectitem-component-input" verticalLayout ><span style={{color:"#737373",fontSize:"12px",fontFamily:"NokiaPureHeadline, sans-serif"}}>{"IPV6 Addresses"}</span>
                        <ChipsInputCCFK
                                    placeHolder="IPV6 Addresses"
                                    onChange={(value,field)=>{this.ipv6Change(value,field)}}
                                    checkMessage={'Enter Valid Ipv6 Adresses'}
                                    checkError={this.props.ipv6Error}
                                    disabled={dialogType === "view"}   
                                    size="medium"
                                    value={newData.peerNfProfiles.peerNfProfile[0].ipv6Addresses}
                                    onChangeArgs={["ipv6Addresses"]}
                                /></Label>
                    </Tooltip>
                    <Tooltip key="Set" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Please Press Enter To Store The Value">
                        <Label htmlFor="selectitem-component-input" verticalLayout ><span style={{color:"#737373",fontSize:"12px",fontFamily:"NokiaPureHeadline, sans-serif"}}>{"NF Set Id List"}</span>
                        <ChipsInputCCFK
                                    placeHolder="NF Set Id List"
                                    onChange={(value,field)=>{this.nfSetIdChange(value,field)}}
                                    disabled={dialogType === "view"}   
                                    size="medium"
                                    value={newData.peerNfProfiles.peerNfProfile[0].nfSetIdList}
                                    onChangeArgs={["nfSetIdList"]}
                                /></Label>
                        </Tooltip>
                        </div>
                        <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>NF Services</h2>
                                <IconButtonCCFK 
                                    variant='call-to-action'
                                    onClick={this.addNewNFService}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {newData.peerNfProfiles.peerNfProfile[0].nfServices.map((nfService,Index)=>{
                                return <NFServiceForm 
                                            key={`Allowed_nfservice_${Index}`} 
                                            nfService={nfService}
                                            addEndPoints={this.addEndPoints}
                                            addVersions={this.addVersions}
                                            addServiceInstanceId={this.addServiceInstanceId}
                                            addServiceName={this.addServiceName}
                                            addServiceFQDN={this.addServiceFQDN}
                                            addServiceScheme={this.addServiceScheme}
                                            addServiceApiPrefix={this.addServiceApiPrefix}
                                            addServiceStatus={this.addServiceStatus}
                                            addServicePriority={this.addServicePriority}
                                            addServiceCapacity={this.addServiceCapacity}
                                            addServiceSetIdList={this.addServiceSetIdList}
                                            addServiceIpv4Address={this.addServiceIpv4Address}
                                            addServiceIpTransport={this.addServiceIpTransport}
                                            addServiceIpPort={this.addServiceIpPort}
                                            addServiceIpEndpoint={this.addServiceIpEndpoint}
                                            addServiceVapiURL={this.addServiceVapiURL}
                                            addServiceVapiFullVersion={this.addServiceVapiFullVersion}
                                            addServiceVexpiry={this.addServiceVexpiry}
                                            deleteVersions={this.deleteVersions}
                                            deleteIpEndPoints={this.deleteIpEndPoints}
                                            dialogType={dialogType}
                                            deleteNfService={this.deleteNfService}
                                            Index={Index} />
                            })
                            }
                    </CardCCFK>
                    
            </>
        )
    }
}

function mapStateToProps(state) {
    return{
        ipv4Error:state.statprofnewEditDialog.ipv4Error,
        ipv6Error:state.statprofnewEditDialog.ipv6Error
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        addNFService,
        deleteNfService,
        addEndPoints,
        addVersions,
        deleteIpEndPoints,
        deleteVersions,
        addNfInstanceId,
        addNfCapacity,
        addNfPriority,
        addNfLoad,
        addNfFQDN,
        addNfInstanceName,
        addNfStatus,
        addNfType,
        ipv4Change,
        ipv6Change,
        nfSetIdChange,
        addServiceInstanceId,
        addServiceName,
        addServiceFQDN,
        addServiceScheme,
        addServiceApiPrefix,
        addServiceStatus,
        addServicePriority,
        addServiceCapacity,
        addServiceSetIdList,
        addServiceIpv4Address,
        addServiceIpEndpoint,
        addServiceIpPort,
        addServiceIpTransport,
        addServiceVexpiry,
        addServiceVapiFullVersion,
        addServiceVapiURL,
        setIpv4Error,
        setIpv6Error
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(PeerNFForm);