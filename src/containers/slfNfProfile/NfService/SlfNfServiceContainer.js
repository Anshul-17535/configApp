import React,{Component} from 'react'
import {connect} from 'react-redux';
import TabGroupCCFK from "../../../ccfk-components/TabGroupCCFK";
import SlfNfServiceInputGroup from './SlfNfServiceInputGroup'
import IpEndpointsList from './IpEndpointsList';
import {bindActionCreators} from "redux";
let _ = require('underscore');


class SlfNfServiceContainer extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedIndex: 0
        }
    }

    componentWillMount(){
        const {selectedNfServiceConfig}=this.props
        if(!_.isEmpty(selectedNfServiceConfig)){
            let currentNfServiceConfigCopy={...selectedNfServiceConfig}
            let nfServiceSetIdListCopy=!!currentNfServiceConfigCopy.nfServiceSetIdList?currentNfServiceConfigCopy.nfServiceSetIdList.slice():[]
            let allowedNfDomainsCopy=!!currentNfServiceConfigCopy.allowedNfDomains?currentNfServiceConfigCopy.allowedNfDomains.slice():[]
            currentNfServiceConfigCopy.nfServiceSetIdList=nfServiceSetIdListCopy
            currentNfServiceConfigCopy.allowedNfDomains=allowedNfDomainsCopy
            this.setState({ipEndPoints:!!currentNfServiceConfigCopy.ipEndPoints?currentNfServiceConfigCopy.ipEndPoints:[]})
            this.setState({allowedPlmns:!!currentNfServiceConfigCopy.allowedPlmns?currentNfServiceConfigCopy.allowedPlmns:[]})
            this.setState({allowedNssais:!!currentNfServiceConfigCopy.allowedNssais?currentNfServiceConfigCopy.allowedNssais:[]})
            this.setState({defaultNotificationSubscriptions:!!currentNfServiceConfigCopy.defaultNotificationSubscriptions?currentNfServiceConfigCopy.defaultNotificationSubscriptions:[]})
            this.setState({versions:!!currentNfServiceConfigCopy.versions?currentNfServiceConfigCopy.versions:[]})
            if(!currentNfServiceConfigCopy.chfServiceInfo){
                currentNfServiceConfigCopy.chfServiceInfo={"primaryChfServiceInstance":"","secondaryChfServiceInstance":""}
            }
            if(!currentNfServiceConfigCopy.interPlmnFqdn){
                currentNfServiceConfigCopy.interPlmnFqdn=""
            }
            this.setState({NFServiceMap:_.omit(currentNfServiceConfigCopy, 'ipEndPoints','allowedPlmns')})
        }else{
            let NFServiceMapObj={
                serviceInstanceId:"",
                serviceName: "",
                nfServiceStatus: "",
                scheme: "",
                load: 0,
                apiPrefix: "",
                interPlmnFqdn: "",
                capacity: 0,
                fqdn: "",
                fqdnApiPrefix: "",
                allowedNfTypes:[],
                allowedNfDomains:[],
                recoveryTime:"",
                supportedFeatures:"",
                chfServiceInfo:{"primaryChfServiceInstance":"","secondaryChfServiceInstance":""},
                priority: 0,
                nfServiceSetIdList:[]
            }
            let ipEndPointsList=[]
            let allowedPlmnsList=[]
            let allowedNssaisList=[]
            let versionsList=[]
            let DNSList=[]
            this.setState({ipEndPoints:ipEndPointsList})
            this.setState({allowedPlmns:allowedPlmnsList})
            this.setState({allowedNssais:allowedNssaisList})
            this.setState({versions:versionsList})
            this.setState({defaultNotificationSubscriptions:DNSList})
            this.setState({NFServiceMap:NFServiceMapObj})
        }
    }

    handleChange=(value,name)=>{
        let NFServiceMap={...this.state.NFServiceMap}
        NFServiceMap[name] = value
        this.setState({
            NFServiceMap
        })
    }

    handleClick = ( value ) => {
        this.setState({ selectedIndex: value });
    }

    handleIpEndpointsChange=(Value,Index)=>{
        let ipEndPointsCopy=this.state.ipEndPoints.slice()
        ipEndPointsCopy[Index]= Value
        this.setState({ipEndPoints:ipEndPointsCopy})
    }

    handleAllowedPlmnsChange=(value,field,Index)=>{
        let allowedPlmnsCopy=this.state.allowedPlmns.slice()
        allowedPlmnsCopy[Index][field]= value
        this.setState({allowedPlmns:allowedPlmnsCopy})
    }

    handleVersionsChange=(value,field,Index)=>{
        let allowedVersionsCopy=this.state.versions.slice()
        allowedVersionsCopy[Index][field]= value
        this.setState({versions:allowedVersionsCopy})
    }

    handleNssaisChange=(value,field,Index)=>{
        let allowedNssaisCopy=this.state.allowedNssais.slice()
        allowedNssaisCopy[Index][field]= value
        this.setState({allowedNssais:allowedNssaisCopy})
    }

    handleDNSChange=(value,field,Index)=>{
        let DNSCopy=this.state.defaultNotificationSubscriptions.slice()
        DNSCopy[Index][field]= value
        this.setState({defaultNotificationSubscriptions:DNSCopy})
    }

    handleChfServiceInfoChange=(value,field)=>{
        let NFServiceMapCopy={...this.state.NFServiceMap}
        NFServiceMapCopy.chfServiceInfo[field]=value
        this.setState({NFServiceMap:NFServiceMapCopy})
    }

    addPlmnId=()=>{
        const newPlmnIdObj={
            mcc: "",
            mnc: ""
        }
        let allowedPlmnsCopy=this.state.allowedPlmns.slice()
        allowedPlmnsCopy=[...allowedPlmnsCopy,newPlmnIdObj]
        this.setState({allowedPlmns:allowedPlmnsCopy})
    }

    addNssais=()=>{
        const newNssaisObj={
            sst: "",
            sd: ""
        }
        let allowedNssaisCopy=this.state.allowedNssais.slice()
        allowedNssaisCopy=[...allowedNssaisCopy,newNssaisObj]
        this.setState({allowedNssais:allowedNssaisCopy})
    }

    addVersions=()=>{
        const newVersionsObj={
            apiVersionInUri: "",
            apiFullVersion: "",
            expiry:""
        }
        let allowedVersionsCopy=this.state.versions.slice()
        allowedVersionsCopy=[...allowedVersionsCopy,newVersionsObj]
        this.setState({versions:allowedVersionsCopy})
    }

    addDNS=()=>{
        const newDNSObj={
            notificationType: "",
            callbackUri: "",
            n1MessageClass:"",
            versions:[],
            n2InformationClass:""
        }
        let DNSCopy=this.state.defaultNotificationSubscriptions.slice()
        DNSCopy=[...DNSCopy,newDNSObj]
        this.setState({defaultNotificationSubscriptions:DNSCopy})
    }

    addIpEndPoint=()=>{
        const newIpEndPointObj={
            ipv4Address: "",
            ipv6Address: "",
            transport: "",
            port: 0,
            apiPrefix: ""
        }
        let ipEndPointsCopy=this.state.ipEndPoints.slice()
        ipEndPointsCopy=[...ipEndPointsCopy,newIpEndPointObj]
        this.setState({ipEndPoints:ipEndPointsCopy})
    }

    deletePlmnId=(Index)=>{
        let allowedPlmnsCopy=this.state.allowedPlmns.slice()
        allowedPlmnsCopy.splice(Index,1)
        this.setState({allowedPlmns:allowedPlmnsCopy})
    }

    deleteNssais=(Index)=>{
        let allowedNssaisCopy=this.state.allowedNssais.slice()
        allowedNssaisCopy.splice(Index,1)
        this.setState({allowedNssais:allowedNssaisCopy})
    }

    deleteDNS=(Index)=>{
        let DNSCopy=this.state.defaultNotificationSubscriptions.slice()
        DNSCopy.splice(Index,1)
        this.setState({defaultNotificationSubscriptions:DNSCopy})
    }

    deleteVersions=(Index)=>{
        let allowedVersionsCopy=this.state.versions.slice()
        allowedVersionsCopy.splice(Index,1)
        this.setState({versions:allowedVersionsCopy})
    }

    deleteIpEndPoint=(Index)=>{
        let ipEndPointsCopy=this.state.ipEndPoints.slice()
        ipEndPointsCopy.splice(Index,1)
        this.setState({ipEndPoints:ipEndPointsCopy})
    }

    render(){
        const {NFServiceMap,ipEndPoints,allowedPlmns,allowedNssais,versions,defaultNotificationSubscriptions}=this.state
        return(
            <TabGroupCCFK
                onChange={this.handleClick}
                tabsLabelArray={[{"label":"SLF NFSERVICE","disabled":false},{"label":"IP ENDPOINTS","disabled":false}]}
                tabsAlignment='left'
                tabContentArray={
                    [
                    <SlfNfServiceInputGroup DNSState={defaultNotificationSubscriptions} handleDNSChange={this.handleDNSChange} deleteDNS={this.deleteDNS} addDNS={this.addDNS} chfServiceInfoState={this.state.NFServiceMap.chfServiceInfo} handleChfServiceInfoChange={this.handleChfServiceInfoChange} versionsState={versions} deleteVersions={this.deleteVersions} addVersions={this.addVersions} handleVersionsChange={this.handleVersionsChange} allowedNssaisState={allowedNssais} deleteNssais={this.deleteNssais} addNssais={this.addNssais} handleNssaisChange={this.handleNssaisChange} allowedPlmnsState={allowedPlmns} handleAllowedPlmnsChange={this.handleAllowedPlmnsChange} addPlmnId={this.addPlmnId} deletePlmnId={this.deletePlmnId} nfServiceState={NFServiceMap} handleChange={this.handleChange}/>,
                    <IpEndpointsList deleteIpEndPoint={this.deleteIpEndPoint} addIpEndPoint={this.addIpEndPoint} handleIpEndpointsChange={this.handleIpEndpointsChange} ipEndPointsState={ipEndPoints}/>
                ]}
            />
        )
    }
}

function mapStateToProps(state) {
    return{
        selectedNfServiceConfig:state.slfNfProfilenewEditDialog.selectedNfServiceConfig
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps,null,{forwardRef: true})(SlfNfServiceContainer);