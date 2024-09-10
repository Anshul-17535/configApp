import React,{Component} from 'react'
import {connect} from 'react-redux';
import {updateCurrentSlfNfProfileConfig,updatePlmn,deletePlmn,addPlmn} from '../../actions/slfnfprofile';
import ChipsInputCCFK from '../../ccfk-components/ChipsInputCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import CardCCFK from "../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import SpinnerCCFK from '../../ccfk-components/SpinnerCCFK';
import {bindActionCreators} from "redux";
import PlmnComponent from './PlmnComponent';
import {SERVICE_INSTANCE_ID_REGEX,FQDN_REGEX,UDM_INFO_REGEX,IPV4_REGEX,IPV6_REGEX} from '../slfNfService/validationRegexs';
import {testRegex} from './NfService/helperFunctions';
import '../../styles/slfnfprofile/SlfNfProfileInputGroup.css';


const returnNfTypeDropdown=['SCP', 'CHF', 'NRF', 'FIVEG_EIR', 'AUSF', 'UPF', 'SOR_AF', 'SEPP', 'N3IWF', 'BSF', 'NSSF', 'AMF', 'GMLC', 'UDM', 'UDSF', 'UDR', 'LMF', 'UCMF', 'HSS', 'SMF', 'SMSF', 'NEF', 'SCEF', 'PCF', 'SCSAS', 'NWDAF', 'CBCF', 'PCSCF', 'MME', 'CUSTOM', 'SPAF', 'AF']

const returnNfStatusDropdown=["REGISTERED","UNDISCOVERABLE"]

class SlfNfProfileForm extends Component{

    handleChange=(value,name)=>{
        if(name==="udmInfo"){
            this.props.updateCurrentSlfNfProfileConfig({"groupId":value},name)
        }
        else{
            if(!!value){
                this.props.updateCurrentSlfNfProfileConfig(value,name)
            }
        }
    }

    addPlmn=()=>{
        let newPlmnObj={"mcc":"","mnc":""}
        this.props.addPlmn(newPlmnObj)
    }

    handlePlmnChange=(value,field,Index)=>{
        this.props.updatePlmn(value,field,Index)
    }

    deletePlmn=(Index)=>{
        this.props.deletePlmn(Index)
    }

    render(){
        const {nfInstanceId,nfType,nfStatus,fqdn,interPlmnFqdn,udmInfo,heartBeatTimer,priority,capacity,load,ipv4Addresses,ipv6Addresses,nfSetIdList,plmnList}=this.props.slfNfProfileConfig
        return (
            <div>
                <div className="slfnfprofileform">
                    <TextInputCCFK
                        id="nfInstanceId"
                        label="NF Instance Id"
                        required
                        disabled={this.props.dialogType==="edit"}
                        error={!testRegex(SERVICE_INSTANCE_ID_REGEX,nfInstanceId)}
                        errorMsg={`Value must match the regular expression : ${SERVICE_INSTANCE_ID_REGEX}`}
                        value={nfInstanceId}
                        placeholder="NF Instance Id"
                        onChange={this.handleChange}
                        onChangeArgs={["nfInstanceId"]}
                    />
                    <SelectInputCCFK
                        label="NF Type"
                        required
                        data={returnNfTypeDropdown}
                        value={nfType}
                        onChange={this.handleChange}
                        onChangeArgs={["nfType"]}
                    />
                    <SelectInputCCFK
                        label="NF Status"
                        required
                        data={returnNfStatusDropdown}
                        value={nfStatus}
                        onChange={this.handleChange}
                        onChangeArgs={["nfStatus"]}
                    />
                    <TextInputCCFK
                        id="fqdn"
                        label="FQDN"
                        required
                        error={!testRegex(FQDN_REGEX,fqdn)}
                        errorMsg={`Value must match the regular expression : ${FQDN_REGEX}`}
                        value={fqdn}
                        placeholder="FQDN"
                        onChange={this.handleChange}
                        onChangeArgs={["fqdn"]}
                    />
                    <TextInputCCFK
                        id="udmInfo"
                        label="UDM Info ( Group Id )"
                        error={!testRegex(UDM_INFO_REGEX,udmInfo.groupId)}
                        errorMsg={`Value must match the regular expression : ${UDM_INFO_REGEX}`}
                        value={udmInfo.groupId}
                        placeholder="Group Id"
                        onChange={this.handleChange}
                        onChangeArgs={["udmInfo"]}
                    />
                    <TextInputCCFK
                        id="interPlmnFqdn"
                        label="Inter PLMN FQDN"
                        error={!testRegex(FQDN_REGEX,interPlmnFqdn)}
                        errorMsg={`Value must match the regular expression : ${FQDN_REGEX}`}
                        value={interPlmnFqdn}
                        placeholder="Inter PLMN FQDN"
                        onChange={this.handleChange}
                        onChangeArgs={["interPlmnFqdn"]}
                    />
                <SpinnerCCFK
                    label="HeartBeat Timer"
                    min={0}
                    max={200000000}
                    value={heartBeatTimer}
                    step={1}
                    onChange={this.handleChange}
                    onChangeArgs={["heartBeatTimer"]}
                />
                <SpinnerCCFK
                    label="Priority"
                    min={0}
                    max={200000000}
                    value={priority}
                    step={1}
                    onChange={this.handleChange}
                    onChangeArgs={["priority"]}
                />
                <SpinnerCCFK
                    label="Capacity"
                    min={0}
                    max={200000000}
                    value={capacity}
                    step={1}
                    onChange={this.handleChange}
                    onChangeArgs={["capacity"]}
                />
                <SpinnerCCFK
                    label="Load"
                    min={0}
                    max={200000000}
                    value={load}
                    step={1}
                    onChange={this.handleChange}
                    onChangeArgs={["load"]}
                />
                </div>
                <div className="nfprofileotherinputs">
                <div className="ipv4AddressListField">
                <h5 className="ipv4AddressesLabel">Ipv4 Addresses</h5>
                <ChipsInputCCFK
                    placeHolder="Add Ipv4 Address"
                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                    onChange={this.handleChange}
                    ErrConditionRegex={IPV4_REGEX}
                    ErrorMsg="Duplicate or Invalid Ipv4 Address Values"
                    size="medium"
                    value={ipv4Addresses}
                    onChangeArgs={["ipv4Addresses"]}
                />
                </div>
                <div className="ipv6AddressListField">
                <h5 className="ipv6AddressesLabel">Ipv6 Addresses</h5>
                <ChipsInputCCFK
                    placeHolder="Add Ipv6 Address"
                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                    onChange={this.handleChange}
                    ErrConditionRegex={IPV6_REGEX}
                    ErrorMsg="Duplicate or Invalid Ipv4 Address Values"
                    size="medium"
                    value={ipv6Addresses}
                    onChangeArgs={["ipv6Addresses"]}
                />
                </div>
                <div className="nfSetIdListField">
                <h5 className="nfSetIdListLabel">NfSetId List</h5>
                <ChipsInputCCFK
                    placeHolder="Add NFSet Id"
                    style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                    onChange={this.handleChange}
                    size="medium"
                    value={nfSetIdList}
                    onChangeArgs={["nfSetIdList"]}
                />
                </div>
                <div className="plmnListComponent">
                    <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2>PLMN List</h2>
                                <IconButtonCCFK 
                                    onClick={this.addPlmn}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {plmnList.map((plmn,Index)=>{
                                return <PlmnComponent key={`PLMN_${Index}`} deletePlmn={this.deletePlmn} handlePlmnChange={this.handlePlmnChange} mcc={plmn.mcc} mnc={plmn.mnc} Index={Index}/>
                            })
                            }
                        </CardCCFK>
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        slfNfProfileConfig:state.slfNfProfilenewEditDialog.currentSlfNfProfileConfig,
        dialogType:state.slfNfServicenewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        updateCurrentSlfNfProfileConfig,
        updatePlmn,
        deletePlmn,
        addPlmn
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfNfProfileForm);

