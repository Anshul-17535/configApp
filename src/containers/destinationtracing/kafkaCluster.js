import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import RadioButtonGroupCCFK from '../../ccfk-components/RadioButtonGroupCCFK';
import "../../styles/peerConfig/peerConfigForm.css";
import { createDestinationConfig,updateDestcConfig } from '../../actions/destinationprofile/commonservices';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setDestinationName3,setkafkaUseProxy,setKafkaIPvFQDN,setKafkaFQDN,setKafkaIPVersion,setKafkaServerIP,setKafkaServerPort,setKafkaTopicName,setDialogState} from '../../actions/destinationprofile/index';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import CheckBoxCCFK from "../../ccfk-components/CheckBoxCCFK";
import { hostCheck,portCheck,fqdnCheck } from './helper';
import '../../styles/destinationtracing/httpserver.css'


const data1=["IPv4","IPv6"]

class KafkaServer extends React.Component {

    constructor(props){
        super(props)
        this.state={
            checkHostValid:false
        }
    }

    handleSaveClick=()=>{
        const {c} = this.props
        if((c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)){
            delete c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion
            delete c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp
            delete c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort
            delete c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].topicName
        }
        if(!!this.props.KafkaIpVFqdn && this.props.KafkaIpVFqdn ==='FQDN'){
            delete c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp
        }
        else{
            delete c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn
        }
        if(this.props.dialogType==="edit"){
            this.props.updateDestcConfig(c)
        }else{
            this.props.createDestinationConfig(c)
        }
        this.props.setDialogState(false)
    }

    handleIPVersion=(value)=>{
        if(!!value){
        this.props.setKafkaIPVersion(value)
    }
    }

    handleServerIPChange=(value)=>{
        this.props.setKafkaServerIP(value)
    }

    handleServerPortChange=(value)=>{
        this.props.setKafkaServerPort(value)
    }

    handleTopicNameChange=(value)=>{
        this.props.setKafkaTopicName(value)
    }

    handleDestinationName=(value)=>{
        this.props.setDestinationName3(value)
    }
    
    handleKafkaIPvFQDN=(value)=>{
        if(!!value){
            if(value ==='IP'){
                this.props.c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn = ''
            }
            else if(value ==='FQDN'){
                this.props.c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp = ''
            }
            this.props.setKafkaIPvFQDN(value)
        }
    }

    handleFqdnChange=(value)=>{
        this.props.setKafkaFQDN(value)
    }

    handleUseProxyChange=(value)=>{
        if(!!value){this.props.setkafkaUseProxy(value)}
    }
    
    render() {
        const {dialogType,c}=this.props
            return (
                <div>
                    <div className="SlfLookUpForm">
                        <TextInputCCFK
                            id="Destination Name"
                            label="Destination Name"
                            required={true}
                            placeholder="Destination Name"
                            value={c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName}
                            disabled={dialogType === "edit" || dialogType === "view"}
                            onChange={this.handleDestinationName}
                            onChangeArgs={["c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName"]}
                        />
                        <RadioButtonGroupCCFK
                            label="Use L4 Proxy"
                            disabled={dialogType === "view"}
                            value={c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy}
                            radioButtons={[{ 'label': 'True', 'value': 'true' }, { 'label': 'False', 'value': 'false' }]}
                            onChange={this.handleUseProxyChange}
                            onChangeArgs={["c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy"]}
                        />
                        <SelectInputCCFK
                            label="Cluster IP Version"
                            required={this.props.KafkaIpVFqdn ==='FQDN'?false:true}
                            data={data1}
                            disabled={dialogType === "view"|| this.props.KafkaIpVFqdn ==='FQDN'||(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion}
                            onChange={this.handleIPVersion}
                            onChangeArgs={["c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion"]}
                        />
                        <RadioButtonGroupCCFK
                            label="USE IP/FQDN"
                            required={true}
                            disabled={dialogType === "view"||(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            value={this.props.KafkaIpVFqdn}
                            radioButtons={[{ 'label': 'IP', 'value': 'IP' }, { 'label': 'FQDN', 'value': 'FQDN' }]}
                            onChange={this.handleKafkaIPvFQDN}
                            onChangeArgs={["this.props.KafkaIpVFqdn"]}
                        />
                        {this.props.KafkaIpVFqdn ==='FQDN'?
                        <TextInputCCFK
                        id="FQ"
                        label="FQDN"
                        required={true}
                        error={fqdnCheck(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn)}
                        errorMsg="Please Provide A Valid FQDN Value"
                        disabled={dialogType === "view"||(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                        placeholder={dialogType === "view"?"":"FQDN"}
                        value={c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn}
                        onChange={this.handleFqdnChange}
                        onChangeArgs={["c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn"]}
                        />:
                        <TextInputCCFK
                            id="IP"
                            label="Cluster IP"
                            required={true}
                            error={hostCheck(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp,c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion)}
                            errorMsg={c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion === "IPv6"?"Please Provide A Valid IPv6 Host Value":"Please Provide A Valid IPv4 Host Value"}
                            disabled={dialogType === "view"||(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Cluster IP"
                            value={c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp}
                            onChange={this.handleServerIPChange}
                            onChangeArgs={["c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp"]}
                        />}
                        <TextInputCCFK
                            id="Port"
                            label="Cluster Port"
                            required={true}
                            error={portCheck(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort)}
                            errorMsg="Please Provide A Valid Port Value"
                            disabled={dialogType === "view"||(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Cluster Port"
                            value={c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort}
                            onChange={this.handleServerPortChange}
                            onChangeArgs={["c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort"]}
                        />
                        <TextInputCCFK
                            id="DF"
                            label="Topic Name"
                            required={true}
                            disabled={dialogType === "view"||(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)}
                            placeholder="Topic Name"
                            value={c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].topicName}
                            onChange={this.handleTopicNameChange}
                            onChangeArgs={["c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].topicName"]}
                        />
                    </div>
                    <div className="containerLookUp">
                    {!(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy === 'true'?true:false)?<ButtonCCFK text="SAVE" 
                        disabled={ portCheck(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort) 
                            || (this.props.KafkaIpVFqdn ==='IP' && hostCheck(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp,c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion) )
                            || c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].topicName === '' 
                            || c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort === '' 
                            ||(this.props.KafkaIpVFqdn ==='IP' &&   c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp === '')
                            || ( this.props.KafkaIpVFqdn ==='IP' &&  c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion === '' )
                            || (this.props.KafkaIpVFqdn ==='FQDN' && c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '') 
                            || (this.props.KafkaIpVFqdn ==='FQDN' && fqdnCheck(c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn))
                            || c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
                      onClick={this.handleSaveClick}  variant="call-to-action" />:<ButtonCCFK text="SAVE"  
                      disabled={ c.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName === '' || dialogType === 'view'}
                      onClick={this.handleSaveClick} variant="call-to-action" />}
                    </div> 
                    {/* {this.props.showHostAlert && this.showAlert()} */}
                </div>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        dialogType:state.dstpnewEditDialog.dialogType,
        KafkaIpVFqdn:state.dstpnewEditDialog.KafkaIpVFqdn,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({

        setKafkaIPVersion,
        setKafkaServerIP,
        setKafkaServerPort,
        setKafkaTopicName,
        createDestinationConfig,
        updateDestcConfig,
        setDialogState,
        setDestinationName3,
        setKafkaIPvFQDN,
        setKafkaFQDN,
        setkafkaUseProxy
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(KafkaServer);