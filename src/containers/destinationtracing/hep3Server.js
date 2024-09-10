import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import "../../styles/peerConfig/peerConfigForm.css";
import { createDestinationConfig,updateDestcConfig } from '../../actions/destinationprofile/commonservices';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import { hostCheck,portCheck,fqdnCheck } from './helper';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import {setDestinationName2,sethep3UseProxy,setHep3FQDN,setHep3IPVersion,setHep3ServerIP,setHep3ServerPort,setDialogState,setHep3SSL,setHep3IPvFQDN,addHep3ProxyDialogBox,addHep3ProxyPort,addHep3ProxyAddress} from '../../actions/destinationprofile/index';
import '../../styles/destinationtracing/httpserver.css'


const data1=["IPv4","IPv6"]

class HEP3Server extends React.Component {

    constructor(props){
        super(props)
        this.state={
            checkHostValid:false
        }
    }

    handleSaveClick=()=>{
        const {b} = this.props
        if((b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)){
            delete b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion
            delete b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort
            delete b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp

        }
        if(!!this.props.Hep3IpVFqdn && this.props.Hep3IpVFqdn ==='FQDN'){
            delete b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp
        }
        else{
            delete b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn
        }
        if(this.props.dialogType==="edit"){
            this.props.updateDestcConfig(b)
        }else{
            this.props.createDestinationConfig(b)
        }
        this.props.setDialogState(false)
    }

    handleIPVersion=(value)=>{
        if(!!value){
        this.props.setHep3IPVersion(value)
    }
    }

    handleHep3SSL=(value)=>{
        if(!!value){
        this.props.setHep3SSL(value)
        }
    }

    handleServerIPChange=(value)=>{
        this.props.setHep3ServerIP(value)
    }

    handleServerPortChange=(value)=>{
        this.props.setHep3ServerPort(value)
    }
  
    handleDestinationName=(value)=>{
        this.props.setDestinationName2(value)
    }

    handleHep3IPvFQDN=(value)=>{
        if(!!value){
            if(value ==='IP'){
                this.props.b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn = ''
            }
            else if(value ==='FQDN'){
                this.props.b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp = ''
            }
            this.props.setHep3IPvFQDN(value)
        }
    }

    handleFqdnChange=(value)=>{
        this.props.setHep3FQDN(value)
    }

    handleUseProxyChange=(value)=>{
        if(!!value){this.props.sethep3UseProxy(value)}
    }

    render() {
        const {dialogType,b}=this.props
            return (
                <div>
                     <div className="SlfLookUpForm">
                         <TextInputCCFK
                            id="Destination Name"
                            label="Destination Name"
                            required={true}
                            placeholder="Destination Name"
                            value={b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName}
                            disabled={dialogType === "edit" || dialogType === "view"}
                            onChange={this.handleDestinationName}
                            onChangeArgs={["b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName"]}
                        />
                        <RadioButtonGroupCCFK
                            label="Use L4 Proxy"
                            disabled={dialogType === "view"}
                            value={b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleUseProxyChange}
                            onChangeArgs={["b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy"]}
                        />
                        <SelectInputCCFK
                            label="Server IP Version"
                            required={this.props.Hep3IpVFqdn ==='FQDN'?false:true}
                            data={data1}
                            disabled={dialogType === "view"|| this.props.Hep3IpVFqdn ==='FQDN'||(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion}
                            onChange={this.handleIPVersion}
                            onChangeArgs={["b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion"]}
                        />
                        <RadioButtonGroupCCFK
                            label="USE IP/FQDN"
                            required={true}
                            disabled={dialogType === "view"||(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={this.props.Hep3IpVFqdn}
                            radioButtons={[{ 'label': 'IP', 'value': 'IP' }, { 'label': 'FQDN', 'value': 'FQDN' }]}
                            onChange={this.handleHep3IPvFQDN}
                            onChangeArgs={["this.props.Hep3IpVFqdn"]}
                        />
                        {this.props.Hep3IpVFqdn ==='FQDN'?
                        <TextInputCCFK
                        id="FQ"
                        label="FQDN"
                        required={true}
                        error={fqdnCheck(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn)}
                        errorMsg="Please Provide A Valid FQDN Value"
                        disabled={dialogType === "view"||(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                        placeholder={dialogType === "view"?"":"FQDN"}
                        value={b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn}
                        onChange={this.handleFqdnChange}
                        onChangeArgs={["b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn"]}
                        />:
                        <TextInputCCFK
                            id="IP"
                            label="Server IP"
                            required={true}
                            error={hostCheck(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp,b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion)}
                            errorMsg={b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === "IPv6"?"Please Provide A Valid IPv6 Host Value":"Please Provide A Valid IPv4 Host Value"}
                            disabled={dialogType === "view"||(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Server IP"
                            value={b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp}
                            onChange={this.handleServerIPChange}
                            onChangeArgs={["b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp"]}
                        />}
                        <TextInputCCFK
                            id="Port"
                            label="Server Port"
                            required={true}
                            error={portCheck(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort)}
                            errorMsg="Please Provide A Valid Port Value"
                            disabled={dialogType === "view"||(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Server Port"
                            value={b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort}
                            onChange={this.handleServerPortChange}
                            onChangeArgs={["b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort"]}
                        />
                        <RadioButtonGroupCCFK
                            label="Use SSL"
                            disabled={dialogType === "view"}
                            value={b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleHep3SSL}
                            onChangeArgs={["b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL"]}
                        />
                        
                    </div>
                    <div className="containerLookUp">
                    {!(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)?<ButtonCCFK text="SAVE"  
                        disabled={ portCheck(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort) 
                            || ( this.props.Hep3IpVFqdn ==='IP' &&  hostCheck(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp,b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion)) 
                            || b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort === '' 
                            || ( this.props.Hep3IpVFqdn ==='IP' && b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp === '') 
                            || (this.props.Hep3IpVFqdn !=='FQDN' && b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === '') 
                            || (this.props.Hep3IpVFqdn ==='FQDN' && b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '') 
                            || (this.props.Hep3IpVFqdn ==='FQDN' && fqdnCheck(b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn))
                            || b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
                        onClick={this.handleSaveClick} variant="call-to-action" />:<ButtonCCFK text="SAVE"  
                        disabled={ b.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
                        onClick={this.handleSaveClick} variant="call-to-action" />}
                    </div>  
                </div>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        dialogType:state.dstpnewEditDialog.dialogType,
        Hep3IpVFqdn:state.dstpnewEditDialog.Hep3IpVFqdn,
        proxyBox:state.dstpnewEditDialog.proxyBox
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setHep3IPVersion,
        setHep3ServerIP,
        setHep3ServerPort,
        createDestinationConfig,
        updateDestcConfig,
        setDialogState,
        setDestinationName2,
        setHep3SSL,
        setHep3IPvFQDN,
        setHep3FQDN,
        addHep3ProxyDialogBox,
        addHep3ProxyAddress,
        addHep3ProxyPort,
        sethep3UseProxy
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HEP3Server);