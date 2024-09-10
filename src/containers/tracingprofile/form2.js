import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import {setDialogState3} from '../../actions/tracingprofile';
import {bindActionCreators} from "redux";
import MultiSelectCCFK from '../../ccfk-components/MultiSelectCCFK';


class Form2 extends Component{

    onClose=()=>{
        this.props.setDialogState3(false);
        return;
    }
    
    render(){
        const {response}= this.props
        return(
            <DialogCCFK
                title=""
                onClose={this.onClose}
                renderFooter={()=>{}}
                dialogStyle={{
                    "content": {
                        "top":"10%",
                        "bottom":"10%",
                        "height": "80%",
                        "left": "10%",
                        "right": "10%",
                        "width": "80%"
                        }
                }}
            >
                <MultiSelectCCFK 
                                dataList={response} 
                                title='RESPONSE FIELDS'
                                onChange={this.props.handleMulti2}
                            />
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        response:state.tcpnewEditDialog.dataBundle2,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState3
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Form2);