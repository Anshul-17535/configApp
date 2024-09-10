import React,{Component} from "react";
import ToggleButton from '@nokia-csf-uxr/ccfk/ToggleButton';
import CheckIcon from '@nokia-csf-uxr/ccfk-assets/legacy/CheckIcon';

class StateToggleCellRenderer extends Component{
    
    render(){
        return(
            <div className="BtnCell">
                <ToggleButton
                    aria-label="settings"
                    onClick={(event) => {
                        event.persist();
                        this.props.onToggleClick(this.props.data)
                    }}
                    active={this.props.data.state}
                    >
                    <CheckIcon />
                </ToggleButton>
            </div>
        )
    }
}


export default StateToggleCellRenderer;

