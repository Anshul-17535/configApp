import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import {testRegex} from '../slfNfService/helperFunctions';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import {MCC_REGEX,MNC_REGEX} from '../slfNfService/validationRegexs';
import '../../styles/slfnfprofile/PlmnComponent.css';


class PlmnComponent extends Component{
    render(){
        const {Index,mcc,mnc}=this.props
        return (
            <div className="plmnComponent">
                <TextInputCCFK
                    id={`mcc_${Index}`}
                    label="MCC"
                    error={!testRegex(MCC_REGEX,mcc)}
                    errorMsg={`Value must match the regular expression : ${MCC_REGEX}`}
                    value={mcc}
                    placeholder="mcc"
                    onChange={this.props.handlePlmnChange}
                    onChangeArgs={["mcc",Index]}
                />
                <TextInputCCFK
                    id={`mnc_${Index}`}
                    label="MNC"
                    error={!testRegex(MNC_REGEX,mnc)}
                    errorMsg={`Value must match the regular expression : ${MNC_REGEX}`}
                    value={mnc}
                    placeholder="mnc"
                    onChange={this.props.handlePlmnChange}
                    onChangeArgs={["mnc",Index]}
                />
                <IconButtonCCFK 
                    onClick={()=>{this.props.deletePlmn(Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
            </div>
        )
    }
}


export default PlmnComponent;

