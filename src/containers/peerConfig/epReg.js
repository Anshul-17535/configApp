import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
// import {testRegex} from '../slfNfService/helperFunctions';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import '../../styles/slfnfprofile/PlmnComponent.css';



class EPReg extends Component{
    render(){
        const {Index,regEx,rank,dialogType} = this.props
        return(
            <div className="plmnComponent">
                <TextInputCCFK
                    id={`reg_${Index}`}
                    label="REGEX"
                    disabled={dialogType === "view"||dialogType === "edit"}
                    // error={!testRegex(MCC_REGEX,mcc)}
                    // errorMsg={`Value must match the regular expression : ${MCC_REGEX}`}
                    value={regEx}
                    placeholder="Regex"
                    onChange={this.props.handleRegChange}
                    onChangeArgs={["regEx",Index]}
                />
                <TextInputCCFK
                    id={`rank_${Index}`}
                    label="RANK"
                    disabled={dialogType === "view"||dialogType === "edit"}
                    // error={!testRegex(MCC_REGEX,mcc)}
                    // errorMsg={`Value must match the regular expression : ${MCC_REGEX}`}
                    value={rank}
                    placeholder="Rank"
                    onChange={this.props.handleRegChange}
                    onChangeArgs={["rank",Index]}
                />
                <IconButtonCCFK 
                    disabled={dialogType === "view"||dialogType === "edit"}
                    onClick={()=>{this.props.deleteReg(Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
            </div>
        )
    }
}

export default EPReg;