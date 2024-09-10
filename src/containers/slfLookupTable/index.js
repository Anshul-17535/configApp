import React, {Component} from 'react';
import ToolBar from "./toolBar";
import SplitScreen from "../splitScreenForm";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import SnackbarCCFK from '../../ccfk-components/SnackBarCCFK';
import { setSuccessFlag } from "../../actions/slflookup/commonservices";
import { setDeleteDialogType } from '../../actions/slflookup/index'

let srv;
class Index extends Component {

    constructor(props){
        super(props);
        srv=this;
    }
    actionFunc = () => {
        srv.props.setSuccessFlag(false);
    }
    componentDidMount(){
        srv.props.setDeleteDialogType(false);
        srv.props.setSuccessFlag(false);
    }

    snackBarMessage = ( ) => {
        if (!srv.props.successFlag && !srv.props.successMessage) {
            return <div></div>
        }
        else {
            let snackBarMessage = srv.props.successMessage.mainTitle + '!' + srv.props.successMessage.description;
            return (
                <SnackbarCCFK
                    isOpen={srv.props.successFlag}
                    snackBarMessage={snackBarMessage}
                    onClick={srv.actionFunc}
                />
            );
        }
    }

    render(){
	    return (
                <div className="app" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <ToolBar/>
                    <SplitScreen />
                    {srv.props.successFlag && srv.snackBarMessage()}
                </div>
            )
       }
}

function mapStateToProps(state) {
    return{
        successFlag: state.slfLookUptoolbar.successFlag,
        successMessage: state.slfLookUptoolbar.successMessage
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setSuccessFlag,
        setDeleteDialogType
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Index);