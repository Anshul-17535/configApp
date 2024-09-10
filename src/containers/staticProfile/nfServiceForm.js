import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import SpinnerCCFK from '../../ccfk-components/SpinnerCCFK';
import ChipsInputCCFK from '../../ccfk-components/ChipsInputCCFK';
import Label from '@nokia-csf-uxr/ccfk/Label';
import CardCCFK from "../../ccfk-components/CardCCFK";
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import IPEndPoints from './ipEndPoints'
import { ipv4ArrayCheck,ipv6ArrayCheck,fqdnCheck,hostCheck } from './helperFunctions';
import Versions from './versions'

const statusData = ['REGISTERED','SUSPENDED']
const schemeData = ['http','https']
const serviceNameData = [
    "nnrf-nfm",
    "nnrf-disc",
    "nudm-sdm",
    "nudm-uecm",
    "nudm-ueau",
    "nudm-ee",
    "nudm-mt",
    "nudm-pp",
    "namf-comm",
    "namf-evts",
    "namf-mt",
    "namf-loc",
    "nsmf-pdusession",
    "nsmf-event-exposure",
    "nausf-auth",
    "nausf-sorprotection",
    "nnef-pfdmanagement",
    "npcf-am-policy-control",
    "nchf-convergedcharging",
    "npcf-ue-policy-control",
    "npcf-smpolicycontrol",
    "npcf-policyauthorization",
    "npcf-bdtpolicycontrol",
    "nsmsf-sms",
    "nnssf-nsselection",
    "nnssf-nssaiavailability",
    "nudr-dr",
    "nlmf-loc",
    "n5g-eir-eic",
    "nbsf-management",
    "nchf-spendinglimitcontrol",
    "nnwdaf-eventssubscription",
    "nnwdaf-analyticsinfo",
    "ngmlc-loc",
    "nucmf-provisioning",
    "nucmf-uecapabilitymanagement",
    "nhss-sdm",
    "nhss-uecm",
    "nhss-ueau",
    "nhss-ims-sdm",
    "nhss-ims-uecm",
    "nhss-ims-ueau",
    "nsepp-telescopic",
    "nsoraf-sor",
    "nspaf-secured-packet",
    "custom-service",
    "nnrf-oauth2",
    "nudm-niddau",
    "nsmf-nidd",
    "nausf-upuprotection",
    "nnef-smcontext",
    "nnef-eventexposure",
    "nchf-offlineonlycharging",
    "npcf-eventexposure",
    "nudr-group-id-map",
    "nhss-ee",
    "nudsf-dr",
    "nnssaaf-nssaa",
    "nudm-ssau",
    "nudm-rsds",
    "namf-mbs-comm",
    "namf-mbs-bc",
    "nnef-eas-deployment-info",
    "npcf-am-policyauthorization",
    "nnwdaf-datamanagement",
    "nnwdaf-mlmodelprovision",
    "nhss-gba-sdm",
    "nhss-gba-ueau",
    "nspaf-secured-packed",
    "nudsf-timer",
    "nnssaaf-aiw",
    "naanf-akma",
    "nmfaf-3dadm",
    "nmfaf-3cadm",
    "neasdf-dnscontext",
    "neasdf-baselinednspattern",
    "ndccf-dm",
    "ndccf-cm",
    "nnsacf-nsac",
    "nnsacf-slice-ee",
    "nadrf-dm",
    "ntsctsf-time-sync",
    "ntsctsf-qos-tscai",
    "ntsctsf-asti",
    "npkmf-keyrequest",
    "nmnpf-npstatus",
    "nmbsf-mbsuserserv",
    "nmbsf-mbsuserdataing",
    "nmbstf-distsession",
    "npanf-prosekey"
];

class NFServiceForm extends Component{

    addNewIpEndPoints = () =>{
        const newIpEndPoints = {
            ipv6Address:"",
            ipv4Address: "",
            transport: "TCP",
            port: ""
        }
        this.props.addEndPoints(newIpEndPoints,this.props.Index)
    }

    addNewVersions = () =>{
        const newIpEndPoints = {
            apiVersionInUri: "",
            apiFullVersion: "",
            expiry: null
        }
        this.props.addVersions(newIpEndPoints,this.props.Index)
    }

    deleteIpEndPoints = (indexOfIp) =>{
        this.props.deleteIpEndPoints(indexOfIp,this.props.Index)
    }

    addServiceIpv4Address = (value,indexOfIp) =>{
        this.props.addServiceIpv4Address(value,indexOfIp,this.props.Index)
    }

    addServiceIpTransport = (value,indexOfIp) =>{
        this.props.addServiceIpTransport(value,indexOfIp,this.props.Index)
    }

    addServiceIpPort = (value,indexOfIp) =>{
        this.props.addServiceIpPort(value,indexOfIp,this.props.Index)
    }

    addServiceIpEndpoint = (value,indexOfIp) =>{
        this.props.addServiceIpEndpoint(value,indexOfIp,this.props.Index)
    }

    addServiceVapiURL = (value,indexOfIp) =>{
        this.props.addServiceVapiURL(value,indexOfIp,this.props.Index)
    }

    addServiceVapiFullVersion = (value,indexOfIp) =>{
        this.props.addServiceVapiFullVersion(value,indexOfIp,this.props.Index)
    }

    addServiceVexpiry = (value,indexOfIp) =>{
        if(!!value){this.props.addServiceVexpiry(value,indexOfIp,this.props.Index)}
    }

    deleteVersions = (indexOfIp) =>{
        this.props.deleteVersions(indexOfIp,this.props.Index)
    }

    addServiceInstanceId=(value)=>{
        this.props.addServiceInstanceId(value,this.props.Index)
    }

    addServiceName=(value)=>{
        if(!!value){this.props.addServiceName(value,this.props.Index)}
    }

    addServiceFQDN=(value)=>{
        this.props.addServiceFQDN(value,this.props.Index)
    }

    addServiceScheme=(value)=>{
        if(!!value){
            this.props.addServiceScheme(value,this.props.Index)
        }
    }

    addServiceApiPrefix=(value)=>{
        this.props.addServiceApiPrefix(value,this.props.Index)
    }

    addServiceStatus=(value)=>{
        if(!!value){
            this.props.addServiceStatus(value,this.props.Index)
        }
    }

    addServicePriority=(value)=>{
        this.props.addServicePriority(value,this.props.Index)
    }

    addServiceCapacity=(value)=>{
        this.props.addServiceCapacity(value,this.props.Index)
    }

    addServiceSetIdList=(value,field)=>{
        this.props.addServiceSetIdList(value,field,this.props.Index)
    }

    render(){
        const {nfService,dialogType,Index}=this.props
        return (
            <>
            <div className="nfForm">
                <TextInputCCFK
                    id={`${Index}serviceInstanceId`}
                    label="Service Instance Id"
                    required={true}
                    placeholder="Service Instance Id"
                    value={nfService.serviceInstanceId}
                    disabled={dialogType === "view"}
                    onChange={this.addServiceInstanceId}
                    onChangeArgs={["nfService.serviceInstanceId"]}
                />
                 <SelectInputCCFK
                        id={`${Index}serviceName`}
                        label="Service Name"
                        required={true}
                        data={serviceNameData}
                        disabled={dialogType === "view"}
                        value={nfService.serviceName}
                        onChange={this.addServiceName}
                        onChangeArgs={["nfService.serviceName"]}
                    />
                <TextInputCCFK
                    id="fqdn"
                    label="FQDN"
                    error={fqdnCheck(nfService.fqdn)}
                    errorMsg="Please Provide A Valid FQDN Value"
                    placeholder="FQDN"
                    value={nfService.fqdn}
                    disabled={dialogType === "view"}
                    onChange={this.addServiceFQDN}
                    onChangeArgs={["nfService.fqdn"]}
                />
                <div style={{width:"5rem"}}>
                    <SelectInputCCFK
                        id={`${Index}scheme`}
                        label="Scheme"
                        required={true}
                        data={schemeData}
                        disabled={dialogType === "view"}
                        value={nfService.scheme}
                        onChange={this.addServiceScheme}
                        onChangeArgs={["nfService.scheme"]}
                    />
                </div>
                <TextInputCCFK
                    id={`${Index}apiPrefix`}
                    label="API Prefix"
                    placeholder="API Prefix"
                    value={nfService.apiPrefix}
                    disabled={dialogType === "view"}
                    onChange={this.addServiceApiPrefix}
                    onChangeArgs={["nfService.apiPrefix"]}
                />
                <div style={{width:"8rem"}}>
                    <SelectInputCCFK
                        id={`${Index}nfServiceStatus`}
                        label="NF Service Status"
                        required={true}
                        data={statusData}
                        disabled={dialogType === "view"}
                        value={nfService.nfServiceStatus}
                        onChange={this.addServiceStatus}
                        onChangeArgs={["nfService.nfServiceStatus"]}
                    />
                </div>
                <SpinnerCCFK
                    id={`${Index}priority`}
                    label="Priority"
                    min={0}
                    required
                    max={200000000}
                    value={nfService.priority}
                    step={1}
                    onChange={this.addServicePriority}
                />
                <SpinnerCCFK
                    id={`${Index}capacity`}
                    label="Capacity"
                    min={0}
                    required
                    max={200000000}
                    value={nfService.capacity}
                    step={1}
                    onChange={this.addServiceCapacity}
                />
                <div style={{width:"20px",marginLeft:'43%',padding:'20px'}}>
                <IconButtonCCFK 
                    onClick={()=>{this.props.deleteNfService(Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
                </div>
                </div>
                <CardCCFK
                            cardStyle={{height:"auto",padding:"0.5rem",marginTop:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>IP End Points</h2>
                                <IconButtonCCFK 
                                    variant='call-to-action'
                                    onClick={this.addNewIpEndPoints}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {nfService.ipEndPoints.map((ipEndPoint,Index)=>{
                                return (
                                <IPEndPoints 
                                            key={`Allowed_ipEndPoints_${Index}`} 
                                            ipEndPoint={ipEndPoint}
                                            dialogType={dialogType}
                                            addServiceIpv4Address={this.addServiceIpv4Address}
                                            addServiceIpTransport={this.addServiceIpTransport}
                                            addServiceIpPort={this.addServiceIpPort}
                                            addServiceIpEndpoint={this.addServiceIpEndpoint}
                                            deleteIpEndPoints={this.deleteIpEndPoints}
                                            Index={Index} />
                                            )
                            })
                            }
                </CardCCFK>
                <CardCCFK
                        cardStyle={{height:"auto",padding:"0.5rem"}}
                    >
                        <div className="cardHeaderButtonGroup">
                            <h2>Versions *</h2>
                            <IconButtonCCFK 
                                variant='call-to-action'
                                onClick={this.addNewVersions}>
                                <AddIcon/>
                            </IconButtonCCFK>
                        </div>
                        {nfService.versions.map((versions,Index)=>{
                            return (
                            <Versions 
                                        key={`Allowed_versions_${Index}`} 
                                        versions={versions}
                                        dialogType={dialogType}
                                        addServiceVapiURL={this.addServiceVapiURL}
                                        addServiceVapiFullVersion={this.addServiceVapiFullVersion}
                                        addServiceVexpiry={this.addServiceVexpiry}
                                        deleteVersions={this.deleteVersions}
                                        Index={Index} />
                                        )
                        })
                        }
                </CardCCFK>
                <hr style={{ border: 'none', borderTop: '7px solid #ccc', margin: '1rem 0' }} />
           </>
            
        )
    }
}


export default NFServiceForm;

