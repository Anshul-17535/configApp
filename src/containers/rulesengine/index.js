import React, {Component} from 'react';
import ToolBar from "./toolBar";
import SplitScreen from "../splitScreenForm";
import {connect} from 'react-redux';
import Keycloak from 'keycloak-js';
import {setKeycloakDetails} from "../../actions/rulesengine";
import SnackbarCCFK from '../../ccfk-components/SnackBarCCFK';
import {bindActionCreators} from "redux";
import {setSuccessFlag} from "../../actions/rulesengine/commonServices";
import Loader from '../../Loader/Loader';

let srv;
class Index extends Component {

    constructor(props){
        super(props);
        srv=this;
        srv.actionFunc = srv.actionFunc.bind(this);
    }

    componentDidMount(){
        srv.props.setSuccessFlag(false);
    }

    componentWillMount() {
        console.log("window._env_: ", window._env_);
        var keycloakUrl = 'https://' + window.location.host + '/auth';
        var csdRealm = 'CSD';
        if (!!window._env_.REACT_APP_KEYCLOAK_REALM) {
           csdRealm = window._env_.REACT_APP_KEYCLOAK_REALM;
        }
        if (!!window._env_.REACT_APP_KEYCLOAK_IP && !!window._env_.REACT_APP_KEYCLOAK_PORT) {
                keycloakUrl = 'https://'+ window._env_.REACT_APP_KEYCLOAK_IP + ':'
                    + window._env_.REACT_APP_KEYCLOAK_PORT + '/auth';
        }
        const keycloak = Keycloak({
                url: keycloakUrl,
                realm: csdRealm,
                clientId: 'csd-client'
            }
        );
        if (!!window._env_.REACT_APP_KEYCLOAK_ENV && (window._env_.REACT_APP_KEYCLOAK_ENV == 'dev')) {
             global.authToken = 'bearer dummybearertoken';
             srv.props.setKeycloakDetails(keycloak);
             return;
        }
        keycloak.init({ onLoad: 'login-required'}).then(authenticated => {
            global.authToken = 'bearer '+ keycloak.token;
            srv.props.setKeycloakDetails(keycloak);
            console.log("121",keycloak)
        }).catch(function() {
            console.log('failed to initialize');
        });
}

    actionFunc = () => {
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
        if(!srv.props.keyCloakDetails){
            return (
            <div>
                <Loader scope={"grid"}/>
            </div>
            )}
       else {

	    return (
                <div className="app"  style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <ToolBar/>
                    <SplitScreen/>
                    {srv.props.successFlag && srv.snackBarMessage()}
                </div>
            )
      }

    }
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
        setSuccessFlag
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Index);