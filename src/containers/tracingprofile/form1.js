import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import {setDialogState2} from '../../actions/tracingprofile';
import {bindActionCreators} from "redux";
import MultiSelectCCFK from '../../ccfk-components/MultiSelectCCFK';


class Form1 extends Component{

    onClose=()=>{
        this.props.setDialogState2(false);
        return;
    }
    
    render(){
        const {request}= this.props
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
                                dataList={request} 
                                title='REQUEST FIELDS'
                                onChange={this.props.handleMulti}
                            />
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        request:state.tcpnewEditDialog.dataBundle1,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState2
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Form1);