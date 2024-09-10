import React,{Component} from 'react'
import {connect} from 'react-redux';
import TabGroupCCFK from "../../ccfk-components/TabGroupCCFK";
import SlfNfProfileForm from './SlfNfProfileForm';
import BsfInfoForm from './BsfInfoForm';
import NfServiceGrid from './NfServiceGrid';
import NfServiceForm from './NfServiceForm';
import {setNfServiceTabState,setTabIndex} from '../../actions/slfnfprofile';
import {bindActionCreators} from "redux";
import '../../styles/slfnfprofile/SlfNfProfileInputGroup.css';


class NfProfileContainer extends Component{

    handleClick = (value) => {
        if(this.props.nfserviceTabState&&value!==3){
            this.props.setTabIndex(value)
            this.props.setNfServiceTabState(false)
        }else{
            this.props.setTabIndex(value)
        }
    }

    returnTabLabelArray=()=>{
        if(this.props.nfserviceTabState){
            return [{"label":"SLF NFPROFILE","disabled":false},{"label":"BSF INFO","disabled":false},{"label":"NF SERVICES","disabled":false},{"label":"NF SERVICE FORM","disabled":false}]
        }
        return [{"label":"SLF NFPROFILE","disabled":false},{"label":"BSF INFO","disabled":false},{"label":"NF SERVICES","disabled":false}]
    }

    returnTabContentArray=()=>{
        if(this.props.nfserviceTabState){
            return [<SlfNfProfileForm/>,<BsfInfoForm/>,<NfServiceGrid/>,<NfServiceForm nfServiceRef={this.props.nfServiceRef}/>]
        }
        return [<SlfNfProfileForm/>,<BsfInfoForm/>,<NfServiceGrid/>]
    }

    render(){
        return (
            <TabGroupCCFK
                onChange={this.handleClick}
                tabsLabelArray={this.returnTabLabelArray()}
                tabsAlignment='left'
                tabContentArray={this.returnTabContentArray()}
                selectedItem={this.props.tabIndex}
            />
        )
    }
}

function mapStateToProps(state) {
    return{
        nfserviceTabState:state.slfNfProfilenewEditDialog.nfserviceTabState,
        tabIndex:state.slfNfProfilenewEditDialog.nfprofileTabIndex
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setNfServiceTabState,
        setTabIndex
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(NfProfileContainer);

