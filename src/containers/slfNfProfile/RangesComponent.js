import React,{Component} from 'react'
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import {testRegex} from '../slfNfService/helperFunctions';
import '../../styles/slfnfprofile/RangesComponent.css';


class RangesComponent extends Component{
    render(){
        const {Index,start,end,type,validationRegex,validationError}=this.props
        return (
            <div className="rangesComponent">
                <TextInputCCFK
                    id={`${type}_start_${Index}`}
                    label="Start"
                    error={!testRegex(validationRegex,start)}
                    errorMsg={validationError}
                    value={start}
                    placeholder="start"
                    onChange={this.props.handleRangeChange}
                    onChangeArgs={[type,"start",Index]}
                />
                <TextInputCCFK
                    id={`${type}_end_${Index}`}
                    label="End"
                    error={!testRegex(validationRegex,end)}
                    errorMsg={validationError}
                    value={end}
                    placeholder="end"
                    onChange={this.props.handleRangeChange}
                    onChangeArgs={[type,"end",Index]}
                />
                <IconButtonCCFK 
                    onClick={()=>{this.props.deleteRange(type,Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
            </div>
        )
    }
}


export default RangesComponent;

