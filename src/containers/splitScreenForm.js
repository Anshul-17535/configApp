/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import { withRouter } from 'react-router-dom';
import ReDatagrid from './rulesengine/ReDatagrid';
import PropTypes from 'prop-types';
import MfDatagrid from './messagefilter/MfDatagrid';
import THDatagrid from './throttling/THDatagrid';
import ThrConfigDataGrid from './throttlingConfig/thrConfigDatagrid';
import PeerConfigDataGrid from './peerConfig/peerConfigDatagrid';
import ProbingDataGrid from './probeStatus/probeDatagrid'
import StaticProfDataGrid from './staticProfile/staticProfDatagrid'
import MpcProfileDataGrid from './mediationProfile/mpcProfileDatagrid';
import FdcDataGrid from './fieldDefination/FdcDatagrid'
import CompactSideBarCCFK from "../ccfk-components/CompactSideBarCCFK"
import SlfConfigDatagrid from './slfConfiguration/slfConfigDatagrid';
import ProbeDatagrid from './probeStatus/probeDatagrid';
import SlfDestinationMapDatagrid from './slfDestinationMap/SlfDestinationMapDatagrid';
import SlfNfServiceDatagrid from './slfNfService/SlfNfServiceDatagrid';
import SlfNfProfileDatagrid from './slfNfProfile/SlfNfProfileDatagrid';
import TraceProfileDataGrid from './tracingprofile/traceProfileDatagrid';
import DestinationConfigDatagrid from './destinationtracing/destinationConfigDatagrid';
import SlfLookUp from "./slfLookupTable/slfLookUpDataGrid";
// import SplitScreenCCFK from '../ccfk-components/SplitScreenCCFK';
import {getSplitScreenData,toggleSplitScreen} from '../actions/splitScreenOptions';
import {getToolBarData} from '../actions/rulesengine';
import "../styles/splitScreen.css";
import Loader from '../Loader/Loader';
let srv;

let selectedNode = ''
let carriedIndex = 0
export let nfType="scp"

class SplitScreenForm extends Component {
    static propTypes = {
        defaultSplitRatio: PropTypes.number
    }
    static defaultProps = {
        defaultSplitRatio:0
    };

    constructor(props) {
        super(props);
        srv = this;
    }

    componentDidMount(){
        srv.props.toggleSplitScreen(true);
    }
    getDataGrid(nfType){
        console.log("32",nfType)
        switch(nfType){
            case "scp":
                return (
                    <div>
                        <ReDatagrid/>
                    </div>
                );
            case "nrfp":
                return ( 
                    <div>
                        <ReDatagrid/>
                    </div>
                );
            case "nmf":
                return(
                    <div>
                        <MfDatagrid/>
                    </div>
                );
            case 'slfconfiguration':
                return(
                    <div>
                        <SlfConfigDatagrid/>
                    </div>
                ) 
            case 'slfdestinationmap':
                return(
                    <div>
                        <SlfDestinationMapDatagrid/>
                    </div>
                )
            case 'slflookup':
                return(
                    <div>
                        <SlfLookUp/>
                    </div>
                )
            case 'slfnfservice':
                return(
                    <div>
                        <SlfNfServiceDatagrid/>
                    </div>
                )
            case 'slfnfprofile':
                return(
                    <div>
                        <SlfNfProfileDatagrid/>
                    </div>
                )
            case "tracingprofile":
                return (
                    <div>                            
                        <TraceProfileDataGrid/>
                    </div>
                )
            case "destinationtracing":
                return (
                    <div>                            
                        <DestinationConfigDatagrid />
                    </div>
                    )
            case "mediationconfig":
                return (
                    <div>                            
                        <MpcProfileDataGrid />
                    </div>
                    )
            case "fieldconfig":
                return (
                    <div>                            
                        <FdcDataGrid />
                    </div>
                    )
            case "probstat":
                return (
                    <div>                            
                        <ProbingDataGrid />
                    </div>
                    )
            case "throttling":
                return (
                    <div>
                        <THDatagrid />
                    </div>
                )
            case "peerconfig":
                return (
                    <div>                            
                        <PeerConfigDataGrid />
                    </div>
                )
            case "throttlingconfig":
                return (
                    <div>                            
                        <ThrConfigDataGrid />
                    </div>
                    )
            case "probstat":
                return(
                    <div>
                        <ProbeDatagrid/>
                    </div>
                )
            case "statprof":
                return (
                    <div>                            
                        <StaticProfDataGrid />
                    </div>
                    )
            default :
                return (
                    <div>
                        <ReDatagrid/>
                    </div>
                );
        }
        
    }

    onTreeClick = (event,cIndex) => {
        selectedNode = event
        carriedIndex = cIndex
        if(event === 'ScpRulesengine') {
            if(this.props.location.pathname!=="/gui/nscp/"){
                    srv.props.history.push('/gui/nscp/');
                    srv.props.getToolBarData("SCP -> Rules Engine");
                    nfType="scp"
            }
        }else if(event === 'NrfpRulesengine'){
            if(this.props.location.pathname!=="/gui/nnrfp/"){
                srv.props.history.push('/gui/nnrfp/');
                srv.props.getToolBarData("NRFP -> Rules Engine");
                nfType="nrfp"
            }
        }else if(event === 'MessageFilter'){
            if(this.props.location.pathname!=="/gui/nmf/"){
                srv.props.history.push('/gui/nmf/');
                srv.props.getToolBarData("SCP -> Tracing Config");
                nfType="nmf"
            }
        }else if(event === 'SlfConfiguration'){
            if(this.props.location.pathname!=="/gui/nslfconfig/"){
                srv.props.history.push('/gui/nslfconfig/');
                srv.props.getToolBarData("SCP -> SLF Configuration");
                nfType="slfconfiguration"
            }
        }else if(event==='SlfDestinationMap'){
            if(this.props.location.pathname!=="/gui/nslfdestinationmap/"){
                srv.props.history.push('/gui/nslfdestinationmap/');
                srv.props.getToolBarData("SCP -> SLF Destination Map");
                nfType="slfdestinationmap"
            }
        }else if(event==='SlfLookUp'){
            if(this.props.location.pathname!=="/gui/nslflookup/"){
                srv.props.history.push('/gui/nslflookup/');
                srv.props.getToolBarData("SCP -> SLF Look Up");
                nfType="slflookup"
            }
        }else if(event ==='SlfNfService'){
            if(this.props.location.pathname!=="/gui/nslfnfservice/"){
                srv.props.history.push('/gui/nslfnfservice/');
                srv.props.getToolBarData("SCP -> SLF NFService");
                nfType="slfnfservice"
            }
        }
        else if(event ==='SlfNfProfile'){
            if(this.props.location.pathname!=="/gui/nslfnfprofile/"){
                srv.props.history.push('/gui/nslfnfprofile/');
                srv.props.getToolBarData("SCP -> SLF NFProfile");
                nfType="slfnfprofile"
            }
        }
        else if(event === 'Tracing Profile'){
            if(this.props.location.pathname!=="/gui/tcp/"){
                srv.props.history.push('/gui/tcp/');
                srv.props.getToolBarData("SCP -> Tracing Profile");
                nfType="tracingprofile";
            }
        }
        else if(event === 'Destination Tracing'){
            if(this.props.location.pathname!=="/gui/destc/"){
                srv.props.history.push('/gui/destc/');
                srv.props.getToolBarData("SCP -> Tracing Destination");
                nfType="destinationtracing";
            }
        }
        else if(event === 'Mediation Profile Config'){
            if(this.props.location.pathname!=="/gui/mpc/"){
                srv.props.history.push('/gui/mpc/');
                srv.props.getToolBarData("SCP -> Mediation Profile Config");
                nfType="mediationconfig";
            }
        }
        else if(event === 'Field Definition Config'){
            if(this.props.location.pathname!=="/gui/fdc/"){
                srv.props.history.push('/gui/fdc/');
                srv.props.getToolBarData("SCP -> Field Definition Config");
                nfType="fieldconfig";
            }
        }else if(event === 'Throttling Profile'){
            if(this.props.location.pathname!=="/gui/thrp/"){
                srv.props.history.push('/gui/thrp/');
                srv.props.getToolBarData("SCP -> Throttling Profile");
                nfType="throttling";
            }
        }
        else if(event === 'Peer Config'){
            if(this.props.location.pathname!=="/gui/peerconfig/"){
                srv.props.history.push('/gui/peerconfig/');
                srv.props.getToolBarData("SCP -> Peer Config");
                nfType="peerconfig";
            }
        }
        else if(event === 'Throttling Config'){
            if(this.props.location.pathname!=="/gui/thrconfig/"){
                srv.props.history.push('/gui/thrconfig/');
                srv.props.getToolBarData("SCP -> Throttling Config");
                nfType="throttlingconfig";
            }
        }
        else if(event === 'Probing Statistics'){
            if(this.props.location.pathname!=="/gui/prbst/"){
                srv.props.history.push('/gui/prbst/');
                srv.props.getToolBarData("SCP -> Probing Statistics");
                nfType="probstat";
            }
        }
        else if(event === 'StaticProfile'){
            if(this.props.location.pathname!=="/gui/statprof/"){
                srv.props.history.push('/gui/statprof/');
                srv.props.getToolBarData("SCP -> Static Peer NF Config");
                nfType="statprof";
            }
        }
    }

    render() {
        if (!srv.props.splitScreen.splitScreenData) {
            return (<div>
                <Loader scope={"grid"}/>
            </div>)
        }
        else {
            return (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <CompactSideBarCCFK
                                  nodeRecieved={selectedNode} 
                                  indexRecieved={carriedIndex}
                                  routeClick={(id,cIndex) => this.onTreeClick(id,cIndex)}
                                  sideProp={this.props.sideProp}/>
                            </div>
                        <div style={{ marginLeft:"5%" }}>
                            {this.getDataGrid(nfType)}
                        </div>
                        </div> 
            ) 
        }
    }
}
function mapStateToProps(state){
    return {
        sideProp : state.renewEditDialog.sideProp,
        toggleState : state.splitScreen.toggleState,
        splitScreen: state.splitScreen,
        splitScreenData: state.splitScreen.splitScreenData
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        toggleSplitScreen,
        getSplitScreenData,
        getToolBarData
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(withRouter(SplitScreenForm));