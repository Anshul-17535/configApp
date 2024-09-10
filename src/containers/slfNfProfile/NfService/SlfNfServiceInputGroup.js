import React,{Component} from 'react'
import {connect} from 'react-redux';
import TextInputCCFK from '../../../ccfk-components/TextInputCCFK';
import SpinnerCCFK from '../../../ccfk-components/SpinnerCCFK';
import MultiSelectwChipsCCFK from '../../../ccfk-components/MultiSelectwChipsCCFK';
import ChipsInputCCFK from '../../../ccfk-components/ChipsInputCCFK';
import CardCCFK from "../../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import SelectInputCCFK from '../../../ccfk-components/SelectInputCCFK';
import {bindActionCreators} from "redux";
import PlmnComponent from '../PlmnComponent';
import AllowedNssais from './allowedNssaisComponent';
import Versions from './VersionsComponent';
import ChfServiceInfo from './ChfServiceInfo';
import {testRegex} from './helperFunctions';
import DefaultNotificationSubscription from './DefaultNotificationSubscription';
import {SERVICE_INSTANCE_ID_REGEX,FQDN_REGEX,API_PREFIX_REGEX} from '../../slfNfService/validationRegexs';
import '../../../styles/slfnfservice/SlfNfServiceInputGroup.css';

const returnServiceNameDropdown=['nnrf-nfm', 'nnrf-disc', 'nudm-sdm', 'nudm-uecm', 'nudm-ueau', 'nudm-ee', 'nudm-pp', 'namf-comm', 'namf-evts', 'namf-mt', 'namf-loc', 'nsmf-pdusession', 'nsmf-event-exposure', 'nausf-auth', 'nausf-sorprotection', 'nnef-pfdmanagement', 'npcf-am-policy-control', 'nchf-convergedcharging', 'npcf-ue-policy-control', 'npcf-smpolicycontrol', 'npcf-policyauthorization', 'npcf-bdtpolicycontrol', 'nsmsf-sms', 'nnssf-nsselection', 'nnssf-nssaiavailability', 'nudr-dr', 'nlmf-loc', 'n5g-eir-eic', 'nbsf-management', 'nchf-spendinglimitcontrol', 'nnwdaf-eventssubscription', 'nnwdaf-analyticsinfo', 'ngmlc-loc', 'nucmf-provisioning', 'nucmf-uecapabilitymanagement', 'nhss-sdm', 'nhss-uecm', 'nhss-ueau', 'nhss-ims-sdm', 'nhss-ims-uecm', 'nhss-ims-ueau', 'nsepp-telescopic', 'nsoraf-sor', 'nspaf-secured-packet', 'custom-service']

const returnSchemeDropdown=["http","https"]

const returnNfServiceStatusDropdown=["REGISTERED","SUSPENDED","UNDISCOVERABLE"]

const returnAllowedNfTypesDropdown=['NRF', 'UDM', 'AMF', 'SMF', 'AUSF', 'NEF', 'PCF', 'SMSF', 'NSSF', 'UDR', 'LMF', 'GMLC', 'FIVEG_EIR', 'SEPP', 'UPF', 'N3IWF', 'AF', 'UDSF', 'BSF', 'CHF', 'NWDAF', 'PCSCF', 'CBCF', 'HSS', 'UCMF', 'SOR_AF', 'SPAF', 'MME', 'SCSAS', 'SCEF', 'SCP', 'CUSTOM']


class SlfNfServiceInputGroup extends Component{

    render(){
        const {serviceInstanceId,serviceName,nfServiceStatus,scheme,load,apiPrefix,interPlmnFqdn,capacity,fqdn,fqdnApiPrefix,priority,allowedNfTypes,recoveryTime,supportedFeatures,nfServiceSetIdList,allowedNfDomains} =this.props.nfServiceState
        return (
            <div className="SlfNfServiceInputGroupContainer">
                <TextInputCCFK
                    id="serviceInstanceId"
                    label="Service Instance Id"
                    required={true}
                    disabled={this.props.nfserviceTabType==="edit"}
                    error={!testRegex(SERVICE_INSTANCE_ID_REGEX,serviceInstanceId)}
                    errorMsg={`Value must match the regular expression : ${SERVICE_INSTANCE_ID_REGEX}`}
                    value={serviceInstanceId}
                    placeholder="Service Instance Id"
                    onChange={this.props.handleChange}
                    onChangeArgs={["serviceInstanceId"]}
                />
                <SelectInputCCFK
                    label="Service Name"
                    required={true}
                    data={returnServiceNameDropdown}
                    value={serviceName}
                    onChange={this.props.handleChange}
                    onChangeArgs={["serviceName"]}
                />
                <TextInputCCFK
                    id="apiPrefix"
                    label="Api Prefix"
                    error={!testRegex(API_PREFIX_REGEX,apiPrefix)}
                    errorMsg={`Value must match the regular expression : ${API_PREFIX_REGEX}`}
                    value={apiPrefix}
                    placeholder="Api Prefix"
                    onChange={this.props.handleChange}
                    onChangeArgs={["apiPrefix"]}
                />
                <div>
                    <TextInputCCFK
                        id="interPlmnFqdn"
                        label="Inter Plmn Fqdn"
                        error={!testRegex(FQDN_REGEX,interPlmnFqdn)}
                        errorMsg={`Value must match the regular expression : ${FQDN_REGEX}`}
                        value={interPlmnFqdn}
                        placeholder="Inter Plmn Fqdn"
                        onChange={this.props.handleChange}
                        onChangeArgs={["interPlmnFqdn"]}
                    />
                </div>
                <TextInputCCFK
                    id="fqdn"
                    label="FQDN"
                    required={true}
                    error={!testRegex(FQDN_REGEX,fqdn)}
                    errorMsg={`Value must match the regular expression : ${FQDN_REGEX}`}
                    value={fqdn}
                    placeholder="FQDN"
                    onChange={this.props.handleChange}
                    onChangeArgs={["fqdn"]}
                />
                <TextInputCCFK
                    id="fqdnApiPrefix"
                    label="FQDN ApiPrefix"
                    error={!testRegex(API_PREFIX_REGEX,fqdnApiPrefix)}
                    errorMsg={`Value must match the regular expression : ${API_PREFIX_REGEX}`}
                    value={fqdnApiPrefix}
                    placeholder="FQDN ApiPrefix"
                    onChange={this.props.handleChange}
                    onChangeArgs={["fqdnApiPrefix"]}
                />
                <MultiSelectwChipsCCFK
                    label="Allowed Nf Types"
                    data={returnAllowedNfTypesDropdown}
                    placeholder="Add Allowed NfTypes"
                    value={allowedNfTypes}
                    onChange={this.props.handleChange}
                    onChangeArgs={["allowedNfTypes"]}
                />
                <TextInputCCFK
                    id="recoveryTime"
                    label="Recovery Time"
                    value={recoveryTime}
                    placeholder="Recovery Time"
                    onChange={this.props.handleChange}
                    onChangeArgs={["recoveryTime"]}
                />
                <TextInputCCFK
                    id="supportedFeatures"
                    label="Supported Features"
                    value={supportedFeatures}
                    placeholder="Supported Features"
                    onChange={this.props.handleChange}
                    onChangeArgs={["supportedFeatures"]}
                />
                <div className="spinnerRadioGroup">
                    <SpinnerCCFK
                        label="Load"
                        min={0}
                        max={100}
                        value={load}
                        step={1}
                        onChange={this.props.handleChange}
                        onChangeArgs={["load"]}
                    />
                    <SpinnerCCFK
                        label="Priority"
                        min={0}
                        max={200000000}
                        value={priority}
                        step={1}
                        onChange={this.props.handleChange}
                        onChangeArgs={["priority"]}
                    />
                    <SpinnerCCFK
                        label="Capacity"
                        min={0}
                        max={200000000}
                        value={capacity}
                        step={1}
                        onChange={this.props.handleChange}
                        onChangeArgs={["capacity"]}
                    />
                    <SelectInputCCFK
                        label="NF Service Status"
                        required={true}
                        data={returnNfServiceStatusDropdown}
                        value={nfServiceStatus}
                        onChange={this.props.handleChange}
                        onChangeArgs={["nfServiceStatus"]}
                    />
                    <SelectInputCCFK
                        label="Scheme"
                        required={true}
                        data={returnSchemeDropdown}
                        value={scheme}
                        onChange={this.props.handleChange}
                        onChangeArgs={["scheme"]}
                    />
                    
                </div>
                <div className="nfserviceSetIdListField">
                <h5 className="nfserviceSetIdLabel">NFServiceSetId List</h5>
                <ChipsInputCCFK
                    placeHolder="Add NFServiceSetId"
                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                    onChange={this.props.handleChange}
                    size="medium"
                    value={nfServiceSetIdList}
                    onChangeArgs={["nfServiceSetIdList"]}
                />
                </div>
                <div className="allowedNfDomainsField">
                <h5 className="allowedNfDomainsLabel">Allowed NF Domains</h5>
                <ChipsInputCCFK
                    placeHolder="Add NF Domains"
                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                    onChange={this.props.handleChange}
                    size="medium"
                    value={allowedNfDomains}
                    onChangeArgs={["allowedNfDomains"]}
                />
                </div>
                <div className="chfServiceInfoComponent">
                    <CardCCFK
                        cardStyle={{height:"auto",padding:"1rem"}}
                    >
                            <div className="cardHeaderButtonGroup">
                                <h2>Chf Service Info</h2>
                            </div>
                            <ChfServiceInfo chfServiceInfoState={this.props.chfServiceInfoState} handleChfServiceInfoChange={this.props.handleChfServiceInfoChange}/>
                    </CardCCFK>
                </div>
                <div className="defaultNotificationSubscriptionsListComponent">
                    <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>Default Notification Subscriptions</h2>
                                <IconButtonCCFK 
                                    onClick={this.props.addDNS}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {this.props.DNSState.map((DNS,Index)=>{
                                return <DefaultNotificationSubscription key={`DNS_${Index}`} deleteDNS={this.props.deleteDNS} handleDNSChange={this.props.handleDNSChange} DNSObj={DNS} Index={Index}/>
                            })
                            }
                        </CardCCFK>
                </div>
                <div className="plmnListComponent">
                    <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>Allowed PLMNs</h2>
                                <IconButtonCCFK 
                                    onClick={this.props.addPlmnId}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {this.props.allowedPlmnsState.map((plmnId,Index)=>{
                                return <PlmnComponent key={`Allowed_PLMN_${Index}`} deletePlmn={this.props.deletePlmnId} handlePlmnChange={this.props.handleAllowedPlmnsChange} mcc={plmnId.mcc} mnc={plmnId.mnc} Index={Index}/>
                            })
                            }
                    </CardCCFK>
                </div>
                <div className="allowedNssaisListComponent">
                    <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>Allowed Nssais</h2>
                                <IconButtonCCFK 
                                    onClick={this.props.addNssais}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {this.props.allowedNssaisState.map((Nssais,Index)=>{
                                return <AllowedNssais key={`Allowed_NSSAIS_${Index}`} deleteNssais={this.props.deleteNssais} handleNssaisChange={this.props.handleNssaisChange} sst={Nssais.sst} sd={Nssais.sd} Index={Index}/>
                            })
                            }
                    </CardCCFK>
                </div>
                <div className="versionsListComponent">
                    <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>Versions</h2>
                                <IconButtonCCFK 
                                    onClick={this.props.addVersions}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {this.props.versionsState.map((Version,Index)=>{
                                return <Versions key={`versions_${Index}`} deleteVersions={this.props.deleteVersions} handleVersionsChange={this.props.handleVersionsChange} apiVersionInUri={Version.apiVersionInUri} apiFullVersion={Version.apiFullVersion} expiry={Version.expiry} Index={Index}/>
                            })
                            }
                    </CardCCFK>
                </div>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        nfserviceTabType:state.slfNfProfilenewEditDialog.nfserviceTabType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfNfServiceInputGroup);

