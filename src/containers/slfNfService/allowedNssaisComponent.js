import React,{Component} from 'react'
import IconButtonCCFK from "../../ccfk-components/IconButtonCCFK";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import { SST_REGEX , SD_REGEX} from './validationRegexs';
import { testRegex } from './helperFunctions';
import '../../styles/slfnfservice/allowedNssaisComponent.css';


class AllowedNssais extends Component{
    render(){
        const {Index,sst,sd}=this.props
        return (
            <div className="allowedNssaisComponent">
                <TextInputCCFK
                    label="SST"
                    error={!testRegex(SST_REGEX,sst)}
                    errorMsg="Value must be in the range 0 - 255"
                    placeholder="sst"
                    value={sst}
                    id={`sst_${Index}`}
                    onChange={this.props.handleNssaisChange}
                    onChangeArgs={["sst",Index]}
                />
                <TextInputCCFK
                    label="SD"
                    error={!testRegex(SD_REGEX,sd)}
                    errorMsg={`Value must match the regular expression : ${SD_REGEX}`}
                    placeholder="sd"
                    value={sd}
                    id={`sd_${Index}`}
                    onChange={this.props.handleNssaisChange}
                    onChangeArgs={["sd",Index]}
                />
                <div style={{"marginTop":"1rem","alignSelf":"center"}}>
                    <IconButtonCCFK 
                        onClick={()=>{this.props.deleteNssais(Index)}}>
                        <DeleteIcon/>
                    </IconButtonCCFK>
                </div>
            </div>
        )
    }
}

export default AllowedNssais;

