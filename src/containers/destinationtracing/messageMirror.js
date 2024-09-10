import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import CardCCFK from "../../ccfk-components/CardCCFK";
import "../../styles/peerConfig/peerConfigForm.css";
import { createDestinationConfig,updateDestcConfig } from '../../actions/destinationprofile/commonservices';
import { setMirrorDestinationName,setMirrorIPVersion,setMirrorServerIP,setMirrorServerPort,setIPvFQDN,setMirrorFQDN,setMirrorSSL,setDialogState,setSSLShow,setMirrorUseProxy, e} from '../../actions/destinationprofile/index';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import ConfigType from './configType';
import KeystoreConfig from './keystoreConfig';
import CheckBoxCCFK from "../../ccfk-components/CheckBoxCCFK";
import Tooltip from '@nokia-csf-uxr/ccfk/Tooltip';
import TrustStoreConfig from './trustStore';
import { hostCheck,portCheck,fqdnCheck } from './helper';
import '../../styles/destinationtracing/httpserver.css'

const data1=["IPv4"]

class MessageMirror extends React.Component {

    constructor(props){
        super(props)
        this.state={
            cardC:false
        }
    }

    handleSaveClick=()=>{
        let e = this.props.e
        let usetype = this.props.usetype
        if((e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)){
            delete e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion
            delete e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp
            delete e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort
        }
        if(!!this.props.useVal){if(usetype === 'KeyStore Configuration'){
            e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].keyStoreConfig=this.props.an
            delete e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].trustStoreConfig
        }
        else{
            e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].trustStoreConfig=this.props.bn
            delete e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].keyStoreConfig
        }}
        if(!!this.props.ipvfqdn && this.props.ipvfqdn ==='FQDN'){
            delete e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp
        }
        else{
            delete e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn
        }
        if(this.props.dialogType==="edit"){
            this.props.updateDestcConfig(e)
        }else{
            this.props.createDestinationConfig(e)
        }
        this.props.setDialogState(false)
    }

    handleIPVersion=(value)=>{
        if(!!value){
        this.props.setMirrorIPVersion(value)
    }
    }

    handleDestinationName=(value)=>{
        this.props.setMirrorDestinationName(value)
    }
    

    handleServerIPChange=(value)=>{
        this.props.setMirrorServerIP(value)
    }

    handleServerPortChange=(value)=>{
        this.props.setMirrorServerPort(value)
    }

    handleDestinationFolderChange=(value)=>{
        this.props.setMirrorFQDN(value)
    }

    handleSSL=(value)=>{
        if(!!value){
        this.props.setSSLShow(value === 'true'?true:false)
        this.props.setMirrorSSL(value)
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

    handleIPvFQDN=(value)=>{
        if(!!value){
            if(value ==='IP'){
                this.props.e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn = ''
            }
            else if(value ==='FQDN'){
                this.props.e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp = ''
            }
            this.props.setIPvFQDN(value)
        }
    }

    handleUseProxyChange=(value)=>{
        if(!!value){this.props.setMirrorUseProxy(value)}
    }


    render() {
        const {dialogType,e}=this.props
            return (
                <div>
                    <div className="SlfLookUpForm">
                        <TextInputCCFK
                            id="Destination Name"
                            label="Destination Name"
                            required={true}
                            placeholder="Destination Name"
                            value={e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName}
                            disabled={dialogType === "edit" || dialogType === "view"}
                            onChange={this.handleDestinationName}
                            onChangeArgs={["e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName"]}
                        />
                        <RadioButtonGroupCCFK
                            label="Use L4 Proxy"
                            disabled={dialogType === "view"}
                            value={e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleUseProxyChange}
                            onChangeArgs={["e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy"]}
                        />
                        <SelectInputCCFK
                            label="Server IP Version"
                            required={this.props.ipvfqdn ==='FQDN'?false:true}
                            data={data1}
                            disabled={dialogType === "view" || this.props.ipvfqdn ==='FQDN'||(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion}
                            onChange={this.handleIPVersion}
                            onChangeArgs={["e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion"]}
                        />
                        <RadioButtonGroupCCFK
                            label="USE IP/FQDN"
                            required={true}
                            disabled={dialogType === "view"||(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={this.props.ipvfqdn}
                            radioButtons={[{ 'label': 'IP', 'value': 'IP' }, { 'label': 'FQDN', 'value': 'FQDN' }]}
                            onChange={this.handleIPvFQDN}
                            onChangeArgs={["this.props.ipvfqdn"]}
                        />
                        {this.props.ipvfqdn ==='FQDN'?
                        <TextInputCCFK
                        id="FQ"
                        label="FQDN"
                        required={true}
                        error={fqdnCheck(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn)}
                        errorMsg="Please Provide A Valid FQDN Value"
                        disabled={dialogType === "view"||(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                        placeholder={dialogType === "view"?"":"FQDN"}
                        value={e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn}
                        onChange={this.handleDestinationFolderChange}
                        onChangeArgs={["e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn"]}
                        />:
                        <TextInputCCFK
                            id="IP"
                            label="Server IP"
                            required={true}
                            error={hostCheck(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp,e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion)}
                            errorMsg={e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === "IPv6"?"Please Provide A Valid IPv6 Host Value":"Please Provide A Valid IPv4 Host Value"}
                            disabled={dialogType === "view"||(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Server IP"
                            value={e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp}
                            onChange={this.handleServerIPChange}
                            onChangeArgs={["e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp"]}
                        />}
                        <TextInputCCFK
                            id="Port"
                            label="Server Port"
                            required={true}
                            error={portCheck(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort)}
                            errorMsg="Please Provide A Valid Port Value"
                            disabled={dialogType === "view"||(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Server Port"
                            value={e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort}
                            onChange={this.handleServerPortChange}
                            onChangeArgs={["e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort"]}
                        />
                    </div>
                        <RadioButtonGroupCCFK
                            label="Use SSL"
                            required={true}
                            disabled={dialogType === "view"}
                            value={e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleSSL}
                            onChangeArgs={["e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL"]}
                        />
                    <div className="containerLookUp">
                    {!(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)?<ButtonCCFK text="SAVE"  
                         disabled={ 
                            (this.props.ipvfqdn ==='IP' && e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp === '') 
                         || e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort === '' 
                         || (this.props.ipvfqdn ==='IP' && hostCheck(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp,e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion)) 
                         || (this.props.ipvfqdn ==='FQDN' && e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '') 
                         || (this.props.ipvfqdn ==='FQDN' && fqdnCheck(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn))
                         || portCheck(e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort) 
                         || (this.props.ipvfqdn !=='FQDN' && e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === '')
                         || e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
                       onClick={this.handleSaveClick} variant="call-to-action" />:<ButtonCCFK text="SAVE"  
                       disabled={ e.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
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
        bn:state.dstpnewEditDialog.trustStoreConfig,
        ipvfqdn:state.dstpnewEditDialog.ipVfqdn,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setMirrorIPVersion,
        setMirrorServerIP,
        setMirrorServerPort,
        setMirrorFQDN,
        setMirrorSSL,
        setSSLShow,
        createDestinationConfig,
        updateDestcConfig,
        setDialogState,
        setMirrorDestinationName,
        setIPvFQDN,
        setMirrorUseProxy
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MessageMirror);