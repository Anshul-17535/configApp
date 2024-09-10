import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import CardCCFK from "../../ccfk-components/CardCCFK";
import { createDestinationConfig,updateDestcConfig } from '../../actions/destinationprofile/commonservices';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setDestinationName4,setRmUseProxy,setRFIPvFQDN,setRFFQDN,setSSLShow2,setRMIPVersion,setRMServerIP,setRMServerPort,setRMSSL,setDialogState} from '../../actions/destinationprofile/index';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import ConfigType from './configType';
import CheckBoxCCFK from "../../ccfk-components/CheckBoxCCFK";
import Tooltip from '@nokia-csf-uxr/ccfk/Tooltip';
import KeystoreConfig from './keystoreConfig';
import TrustStoreConfig from './trustStore';
import { hostCheck,portCheck,fqdnCheck } from './helper';
import '../../styles/destinationtracing/httpserver.css'

const data1=["IPv4","IPv6"]

class RemoteFile extends React.Component {

    constructor(props){
        super(props)
        this.state={
            checkHostValid:false
        }
    }


    handleSaveClick=()=>{
        let {d} = this.props
        let usetype = this.props.usetype
        if((d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)){
            delete d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion
            delete d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort
            delete d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp

        }
        if(!!this.props.RFIpVFqdn && this.props.RFIpVFqdn ==='FQDN'){
            delete d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp
        }
        else{
            delete d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn
        }
        if(this.props.dialogType==="edit"){
            this.props.updateDestcConfig(d)
        }else{
            this.props.createDestinationConfig(d)
        }
        this.props.setDialogState(false)
    }

    handleIPVersion=(value)=>{
        if(!!value){
        this.props.setRMIPVersion(value)
    }
    }

    handleServerIPChange=(value)=>{
        this.props.setRMServerIP(value)
    }

    handleServerPortChange=(value)=>{
        this.props.setRMServerPort(value)
    }

    handleSSL=(value)=>{
        if(!!value){
        this.props.setRMSSL(value)
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

    handleDestinationName=(value)=>{
        this.props.setDestinationName4(value)
    }

    sslCard=()=>{
        return(
            <CardCCFK cardStyle={{height:"auto",padding:"1rem"}}>  
                <ConfigType/>
                {this.configType()}
            </CardCCFK>
        )
    }

    handleKafkaIPvFQDN=(value)=>{
        if(!!value){
            if(value ==='IP'){
                this.props.d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn = ''
            }
            else if(value ==='FQDN'){
                this.props.d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp = ''
            }
            this.props.setRFIPvFQDN(value)
        }
    }

    handleFqdnChange=(value)=>{
        this.props.setRFFQDN(value)
    }

    handleUseProxyChange=(value)=>{
        if(!!value){this.props.setRmUseProxy(value)}
    }
    
    render() {
        const {dialogType,d}=this.props
            return (
                <div>
                    <div className="SlfLookUpForm2">
                       <TextInputCCFK
                            id="Destination Name"
                            label="Destination Name"
                            required={true}
                            placeholder="Destination Name"
                            value={d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName}
                            disabled={dialogType === "edit" || dialogType === "view"}
                            onChange={this.handleDestinationName}
                            onChangeArgs={["d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName"]}
                        />
                        <RadioButtonGroupCCFK
                            label="Use L4 Proxy"
                            disabled={dialogType === "view"}
                            value={d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleUseProxyChange}
                            onChangeArgs={["d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy"]}
                        />
                        <SelectInputCCFK
                            label="Server IP Version"
                            required={this.props.RFIpVFqdn ==='FQDN'?false:true}
                            data={data1}
                            disabled={dialogType === "view" || this.props.RFIpVFqdn ==='FQDN'||(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion}
                            onChange={this.handleIPVersion}
                            onChangeArgs={["d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion"]}
                        />
                        <RadioButtonGroupCCFK
                            label="USE IP/FQDN"
                            required={true}
                            disabled={dialogType === "view"||(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={this.props.RFIpVFqdn}
                            radioButtons={[{ 'label': 'IP', 'value': 'IP' }, { 'label': 'FQDN', 'value': 'FQDN' }]}
                            onChange={this.handleKafkaIPvFQDN}
                            onChangeArgs={["this.props.RFIpVFqdn"]}
                        />
                        {this.props.RFIpVFqdn ==='FQDN'?
                        <TextInputCCFK
                        id="FQ"
                        label="FQDN"
                        required={true}
                        error={fqdnCheck(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn)}
                        errorMsg="Please Provide A Valid FQDN Value"
                        disabled={dialogType === "view"||(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                        placeholder={dialogType === "view"?"":"FQDN"}
                        value={d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn}
                        onChange={this.handleFqdnChange}
                        onChangeArgs={["d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn"]}
                        />:
                        <TextInputCCFK
                            id="IP"
                            label="Server IP"
                            error={hostCheck(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp,d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion)}
                            errorMsg={d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === "IPv6"?"Please Provide A Valid IPv6 Host Value":"Please Provide A Valid IPv4 Host Value"}
                            required={true}
                            disabled={dialogType === "view"||(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Server IP"
                            value={d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp}
                            onChange={this.handleServerIPChange}
                            onChangeArgs={["d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp"]}
                        />}
                        <TextInputCCFK
                            id="Port"
                            label="Server Port"
                            error={portCheck(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort)}
                            errorMsg="Please Provide A Valid Port Value"
                            placeholder="Server Port"
                            disabled={dialogType === "view"||(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort}
                            onChange={this.handleServerPortChange}
                            onChangeArgs={["d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort"]}
                        />
                    </div>
                        <RadioButtonGroupCCFK
                            label="Use SSL"
                            disabled={dialogType === "view"}
                            value={d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleSSL}
                            onChangeArgs={["d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL"]}
                        />
                    <div className="containerLookUp">
                    {!(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)?<ButtonCCFK text="SAVE"  
                        disabled={ portCheck(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort) 
                            || (this.props.RFIpVFqdn ==='IP' && hostCheck(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp,d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion))
                            || ( this.props.RFIpVFqdn ==='IP' &&  d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp === '') 
                            || ( this.props.RFIpVFqdn ==='IP' &&  d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === '' )
                            || (this.props.RFIpVFqdn ==='FQDN' && d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '') 
                            || (this.props.RFIpVFqdn ==='FQDN' && fqdnCheck(d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn))
                            || d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' 
                            ||  dialogType === 'view'}
                        onClick={this.handleSaveClick}  variant="call-to-action" />:<ButtonCCFK text="SAVE"  
                        disabled={ d.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
                        onClick={this.handleSaveClick} variant="call-to-action" />}
                    </div> 
                </div>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        dialogType:state.dstpnewEditDialog.dialogType,
        useVal:state.dstpnewEditDialog.usableBool2,
        usetype:state.dstpnewEditDialog.edrConfigType,
        an:state.dstpnewEditDialog.keyStoreConfig,
        bn:state.dstpnewEditDialog.trustStoreConfig,
        RFIpVFqdn:state.dstpnewEditDialog.RFIpVFqdn,
        useProxy:state.dstpnewEditDialog.useProxy
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setRMIPVersion,
        setRMServerIP,
        setRMServerPort,
        setRMSSL,
        createDestinationConfig,
        updateDestcConfig,
        setDialogState,
        setSSLShow2,
        setDestinationName4,
        setRFFQDN,
        setRFIPvFQDN,
        setRmUseProxy
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(RemoteFile);