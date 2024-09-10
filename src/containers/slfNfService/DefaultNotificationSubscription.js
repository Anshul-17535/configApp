import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import ChipsInputCCFK from '../../ccfk-components/ChipsInputCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import '../../styles/slfnfservice/defaultNotificationSubscription.css';

const returnNotificationTypeDropDown=["N1_MESSAGES","N2_INFORMATION","LOCATION_NOTIFICATION","DATA_REMOVAL_NOTIFICATION","DATA_CHANGE_NOTIFICATION","LOCATION_UPDATE_NOTIFICATION","NSSAA_REAUTH_NOTIFICATION","NSSAA_REVOC_NOTIFICATION"]

const returnn1MessageClassDropDown=["5GMM","SM","LPP","SMS","UPDP"]

const returnn2InformationClassDropDown=["SM","NRPPa","PWS","PWS-BCAL","PWS-RF","RAN"]

class DefaultNotificationSubscription extends Component{

    render(){
        const {Index,DNSObj}=this.props
        return (
            <div className="defaultNotificationSubscriptionComponent">
                <SelectInputCCFK
                    label="Notification Type"
                    data={returnNotificationTypeDropDown}
                    value={DNSObj.notificationType}
                    onChange={this.props.handleDNSChange}
                    onChangeArgs={["notificationType",Index]}
                />
                <SelectInputCCFK
                    label="N1 Message Class"
                    data={returnn1MessageClassDropDown}
                    value={DNSObj.n1MessageClass}
                    onChange={this.props.handleDNSChange}
                    onChangeArgs={["n1MessageClass",Index]}
                />
                <SelectInputCCFK
                    label="N2 Information Class"
                    data={returnn2InformationClassDropDown}
                    value={DNSObj.n2InformationClass}
                    onChange={this.props.handleDNSChange}
                    onChangeArgs={["n2InformationClass",Index]}
                />
                <TextInputCCFK
                    label="Callback Uri"
                    placeholder="callbackUri"
                    value={DNSObj.callbackUri}
                    id={`callbackUri_${Index}`}
                    onChange={this.props.handleDNSChange}
                    onChangeArgs={["callbackUri",Index]}
                />
                <div className="DNSVersionField">
                <h5 className="DNSVersionLabel">Versions</h5>
                    <ChipsInputCCFK
                        placeHolder="Add version"
                        style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                        onChange={this.props.handleDNSChange}
                        size="small"
                        value={DNSObj.versions}
                        onChangeArgs={["versions",Index]}
                    />
                </div>
                <IconButtonCCFK 
                    onClick={()=>{this.props.deleteDNS(Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
            </div>
        )
    }
}

export default DefaultNotificationSubscription;

