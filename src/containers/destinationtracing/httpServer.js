import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import CardCCFK from "../../ccfk-components/CardCCFK";
import "../../styles/peerConfig/peerConfigForm.css";
import { createDestinationConfig,updateDestcConfig } from '../../actions/destinationprofile/commonservices';
import { setDestinationName,setIPVersion,setServerIP,setServerPort,setHttpIPvFQDN,setHttpFQDN,setDestinationFolder,setSSL,setDialogState,setUseProxy,setSSLShow} from '../../actions/destinationprofile/index';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import CheckBoxCCFK from "../../ccfk-components/CheckBoxCCFK";
import ConfigType from './configType';
import KeystoreConfig from './keystoreConfig';
import TrustStoreConfig from './trustStore';
import { hostCheck,portCheck,fqdnCheck } from './helper';
import '../../styles/destinationtracing/httpserver.css'

const data1=["IPv4","IPv6"]

class HTTPServer extends React.Component {

    constructor(props){
        super(props)
        this.state={
            cardC:false
        }
    }
    
    handleSaveClick=()=>{
        let a = this.props.a
        if((a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)){
            delete a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion
            delete a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort
            delete a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp
            delete a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationFolder
        }
        
        if(!!this.props.HttpIpVFqdn && this.props.HttpIpVFqdn ==='FQDN'){
            delete a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp
        }
        else{
            delete a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn
        }
        if(this.props.dialogType==="edit"){
            this.props.updateDestcConfig(a)
        }else{
            this.props.createDestinationConfig(a)
        }
        this.props.setDialogState(false)
    }

    handleIPVersion=(value)=>{
        if(!!value){
        this.props.setIPVersion(value)
    }
    }

    handleDestinationName=(value)=>{
        this.props.setDestinationName(value)
    }
    

    handleServerIPChange=(value)=>{
        this.props.setServerIP(value)
    }

    handleServerPortChange=(value)=>{
        this.props.setServerPort(value)
    }

    handleDestinationFolderChange=(value)=>{
        this.props.setDestinationFolder(value)
    }

    handleSSL=(value)=>{
        if(!!value){
        this.props.setSSL(value)
    }
    }

    
    configType=()=>{
        const an = this.props.an
        const bn = this.props.bn
        switch(this.props.usetype){
            case 'KeyStore Configuration' :
                return (<KeystoreConfig an={an}/>)
            case 'TrustStore Configuration':
                return (<TrustStoreConfig bn={bn}/>)
            default:
                return <></>
        }
    }

    sslCard=()=>{
        return(
            <CardCCFK cardStyle={{height:"auto",padding:"1rem"}}>  
                <ConfigType/>
                {this.configType()}
            </CardCCFK>
        )
    }

    handleFqdnChange=(value)=>{
        this.props.setHttpFQDN(value)
    }

    handleHttpIPvFQDN=(value)=>{
        if(!!value){
            if(value ==='IP'){
                this.props.a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn = ''
            }
            else if(value ==='FQDN'){
                this.props.a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp = ''
            }
            this.props.setHttpIPvFQDN(value)
        }
    }

    handleProxyChange =(value)=> {
        if(!!value){this.props.setUseProxy(value)}
    }

    render() {
        const {dialogType,a}=this.props
            return (
                <div>
                    <div className="SlfLookUpForm">
                        <TextInputCCFK
                            id="Destination Name"
                            label="Destination Name"
                            required={true}
                            placeholder="Destination Name"
                            value={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName}
                            disabled={dialogType === "edit" || dialogType === "view"}
                            onChange={this.handleDestinationName}
                            onChangeArgs={["a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName"]}
                        />
                        <RadioButtonGroupCCFK
                            label="Use L4 Proxy"
                            disabled={dialogType === "view"}
                            value={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleProxyChange}
                            onChangeArgs={["a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy"]}
                        />
                        <SelectInputCCFK
                            label="Server IP Version"
                            required={this.props.HttpIpVFqdn ==='FQDN'?false:true}
                            data={data1}
                            disabled={dialogType === "view" || this.props.HttpIpVFqdn ==='FQDN'||(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion}
                            onChange={this.handleIPVersion}
                            onChangeArgs={["a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion"]}
                        />
                        <RadioButtonGroupCCFK
                            label="USE IP/FQDN"
                            required={true}
                            disabled={dialogType === "view"||(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={this.props.HttpIpVFqdn}
                            radioButtons={[{ 'label': 'IP', 'value': 'IP' }, { 'label': 'FQDN', 'value': 'FQDN' }]}
                            onChange={this.handleHttpIPvFQDN}
                            onChangeArgs={["this.props.HttpIpVFqdn"]}
                        />
                        {this.props.HttpIpVFqdn ==='FQDN'?
                        <TextInputCCFK
                        id="FQ"
                        label="FQDN"
                        required={true}
                        error={fqdnCheck(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn)}
                        errorMsg="Please Provide A Valid FQDN Value"
                        disabled={dialogType === "view"||(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                        placeholder={dialogType === "view"?"":"FQDN"}
                        value={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn}
                        onChange={this.handleFqdnChange}
                        onChangeArgs={["a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn"]}
                        />:
                        <TextInputCCFK
                        id="IP"
                        label="Server IP"
                        required={true}
                        error={hostCheck(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp,a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion)}
                        errorMsg={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === "IPv6"?"Please Provide A Valid IPv6 Host Value":"Please Provide A Valid IPv4 Host Value"}
                        disabled={dialogType === "view"||(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                        placeholder="Server IP"
                        value={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp}
                        onChange={this.handleServerIPChange}
                        onChangeArgs={["a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp"]}
                    />}
                        <TextInputCCFK
                            id="Port"
                            label="Server Port"
                            required={true}
                            error={portCheck(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort)}
                            errorMsg="Please Provide A Valid Port Value"
                            disabled={dialogType === "view"||(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Server Port"
                            value={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort}
                            onChange={this.handleServerPortChange}
                            onChangeArgs={["a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort"]}
                        />
                        <TextInputCCFK
                            id="DF"
                            label="Destination Folder"
                            required={true}
                            disabled={dialogType === "view"||(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Destination Folder"
                            value={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationFolder}
                            onChange={this.handleDestinationFolderChange}
                            onChangeArgs={["a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationFolder"]}
                        />
                    </div>
                        <RadioButtonGroupCCFK
                            label="Use SSL"
                            disabled={dialogType === "view"}
                            value={a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleSSL}
                            onChangeArgs={["a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL"]}
                        />
                    <div className="containerLookUp">
                    {!(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)?<ButtonCCFK text="SAVE"  
                         disabled={ portCheck(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort) 
                            || ( this.props.HttpIpVFqdn ==='IP' && hostCheck(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp,a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion)) 
                            || a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationFolder === '' 
                            || a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort === '' 
                            || ( this.props.HttpIpVFqdn ==='IP' && a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp === '') 
                            || ( this.props.HttpIpVFqdn !=='FQDN' && a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === '' )
                            || (this.props.HttpIpVFqdn ==='FQDN' && a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '') 
                            || (this.props.HttpIpVFqdn ==='FQDN' && fqdnCheck(a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn))
                            || a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
                       onClick={this.handleSaveClick} variant="call-to-action" />:<ButtonCCFK text="SAVE"  
                       disabled={ a.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
                       onClick={this.handleSaveClick} variant="call-to-action" />}
                    </div> 
                </div>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        dialogType:state.dstpnewEditDialog.dialogType,
        use:state.dstpnewEditDialog.currentHttpServer,
        useVal:state.dstpnewEditDialog.usableBool,
        usetype:state.dstpnewEditDialog.edrConfigType,
        an:state.dstpnewEditDialog.keyStoreConfig,
        HttpIpVFqdn:state.dstpnewEditDialog.HttpIpVFqdn,
        bn:state.dstpnewEditDialog.trustStoreConfig,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setIPVersion,
        setServerIP,
        setServerPort,
        setDestinationFolder,
        setSSL,
        setSSLShow,
        createDestinationConfig,
        updateDestcConfig,
        setDialogState,
        setHttpIPvFQDN,
        setDestinationName,
        setHttpFQDN,
        setUseProxy
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HTTPServer);