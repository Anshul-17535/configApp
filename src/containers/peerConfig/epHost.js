import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
// import {testRegex} from '../slfNfService/helperFunctions';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import '../../styles/slfnfprofile/PlmnComponent.css';



class EPHost extends Component{
    render(){
        const {Index,host,port,dialogType} = this.props
        return(
            <div className="plmnComponent">
                <TextInputCCFK
                    id={`host_${Index}`}
                    label="HOST"
                    disabled={dialogType === "view"||dialogType === "edit"}
                    // error={!testRegex(MCC_REGEX,mcc)}
                    // errorMsg={`Value must match the regular expression : ${MCC_REGEX}`}
                    value={host}
                    placeholder="Host"
                    onChange={this.props.handleHostChange}
                    onChangeArgs={["host",Index]}
                />
                <TextInputCCFK
                    id={`port_${Index}`}
                    label="PORT"
                    disabled={dialogType === "view"||dialogType === "edit"}
                    // error={!testRegex(MCC_REGEX,mcc)}
                    // errorMsg={`Value must match the regular expression : ${MCC_REGEX}`}
                    value={port}
                    placeholder="Port"
                    onChange={this.props.handleHostChange}
                    onChangeArgs={["port",Index]}
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

export default EPHost;