import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
// import {testRegex} from '../slfNfService/helperFunctions';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import '../../styles/slfnfprofile/PlmnComponent.css';



class IPHost extends Component{
    render(){
        const {Index,host,dialogType} = this.props
        return(
            <div className="plmnComponent">
                <TextInputCCFK
                    id={`host_${Index}`}
                    disabled={dialogType === "view"||dialogType === "edit"}
                    label="HOST"
                    // error={!testRegex(MCC_REGEX,mcc)}
                    // errorMsg={`Value must match the regular expression : ${MCC_REGEX}`}
                    value={host}
                    placeholder="Host"
                    onChange={this.props.handleHostChange}
                    onChangeArgs={["host",Index]}
                />
                <IconButtonCCFK
                    disabled={dialogType === "view"||dialogType === "edit"} 
                    onClick={()=>{this.props.deleteHost(Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
            </div>
        )
    }
}

export default IPHost;