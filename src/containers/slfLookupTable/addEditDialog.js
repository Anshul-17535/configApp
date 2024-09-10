import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import {setDialogState} from '../../actions/slflookup';
import SlfTabModule from './slfTabModule';
import {bindActionCreators} from "redux";

class AddEditDialog extends Component{

    onClose=()=>{
        this.props.setDialogState(false);
        return;
    }
    
    render(){
        return(
            <DialogCCFK
                title="SLF LookUp table"
                onClose={this.onClose}
                renderFooter={()=>{}}
                dialogStyle={{
                    "content": {
                    "top":"1%",
                    "bottom":"1%",
                    "height": "98%",
                    "left": "1%",
                    "right": "1%",
                    "width": "98%"
                    }
                }}
            >
                <SlfTabModule/>
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.slflookUpnewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);