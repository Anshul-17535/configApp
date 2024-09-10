import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import FloatingActionButtonCCFK from '../../../ccfk-components/FloatingActionButtonCCFK';
import IndIpEndPoint from './IndIpEndPoint';
import '../../../styles/slfnfservice/SlfNfServiceInputGroup.css';


class IpEndpointsList extends Component{

    render(){
        const {ipEndPointsState,handleIpEndpointsChange,addIpEndPoint,deleteIpEndPoint} = this.props
        return (
            <div className="ipEndPointList">
                {ipEndPointsState.map((ipEndPoint,Index)=>{
                    return <IndIpEndPoint ipEndPointsList={ipEndPointsState} deleteIpEndPoint={deleteIpEndPoint} handleIpEndpointsChange={handleIpEndpointsChange} ipEndPoint={ipEndPoint} key={`IndIpEnpoint_${Index}`} Index={Index}/>
                })}
                <FloatingActionButtonCCFK style={{position: "fixed", right: "24px", bottom:
                "24px",background: "rgb(3, 208, 255)"}} onClick={()=>addIpEndPoint()} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(IpEndpointsList);

