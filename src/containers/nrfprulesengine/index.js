import React, {Component} from 'react';
import ToolBar from "../rulesengine/toolBar";
import SplitScreen from "../splitScreenForm";
import {connect} from 'react-redux';
import Keycloak from 'keycloak-js';
import {setKeycloakDetails} from "../../actions/rulesengine";
import SnackbarCCFK from '../../ccfk-components/SnackBarCCFK';
import {bindActionCreators} from "redux";
import {getToolBarData} from '../../actions/rulesengine';
import {setSuccessFlag} from "../../actions/rulesengine/commonServices";
let srv;
class Index extends Component {

    constructor(props){
        super(props);
        srv=this;
        srv.actionFunc = srv.actionFunc.bind(this);
    }
    actionFunc = () => {
        srv.props.setSuccessFlag(false);
    }

    componentDidMount(){
        srv.props.setSuccessFlag(false);
    }

    snackBarMessage = ( ) => {
        if (!srv.props.successFlag && !srv.props.successMessage) {
            return <div></div>
        }
        else {
            let snackBarMessage = srv.props.successMessage.mainTitle + '!' +srv.props.successMessage.description;
            return (<SnackbarCCFK
                isOpen={srv.props.successFlag}
                snackBarMessage={snackBarMessage}
                onClick={srv.actionFunc}
            /> );
        }
    }
    render(){
    //     if(!srv.props.keyCloakDetails){
    //         return (<div>Getting Data</div>)
    //     }
    //    else {
	    return (
                <div className="app" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <ToolBar/>
                    <SplitScreen />
                    {srv.props.successFlag && srv.snackBarMessage()}
                </div>
            )
       }
    // }

}

function mapStateToProps(state) {
    return{
        keyCloakDetails: state.retoolbar.keyCloakDetails,
        successFlag: state.retoolbar.successFlag,
        successMessage: state.retoolbar.successMessage
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setKeycloakDetails,
        setSuccessFlag,
        getToolBarData
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Index);