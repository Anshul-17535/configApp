import React, {Component} from 'react';
import {connect} from 'react-redux';
import RefreshAppToolbarCCFK from '../../ccfk-components/RefreshAppToolbarCCFK';
import {bindActionCreators} from "redux";
import {getSplitScreenData,toggleSplitScreen} from '../../actions/splitScreenOptions';
import {getAllData} from '../../actions/probeStatus/commonservices';
import {getToolBarData,setDialogType,setDialogState} from '../../actions/probeStatus';
import {onSideClick} from '../../actions/rulesengine'

class ToolBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalActive: false,
            text: ''
        };
        this.onIconButtonClick = this.onIconButtonClick.bind(this);
        this.ontoggleChange = this.ontoggleChange.bind(this);
    }
    componentWillMount() {
        this.props.getAllData()
        this.props.getSplitScreenData();
        this.props.toggleSplitScreen(false);
    }

    onIconButtonClick(){
        this.props.getAllData()
    }
    onSideClick = (value) =>{
        console.log('mid',value)
        if (value === true) {
            this.props.onSideClick(false);

        } else {
            this.props.onSideClick(true);
        }
    }
    ontoggleChange = (value) => {
        if (value === true) {
            this.props.toggleSplitScreen(false);

        } else {
            this.props.toggleSplitScreen(true);
        }
    };
    render(){
        if (!this.props.toolBar.toolbarData ) {
            return (<div>Getting Data</div>)
        }
        else {
            return (
                <div>
                    <RefreshAppToolbarCCFK
                        title={this.props.toolBar.toolbarData.pageTitle}
                        onToggle={this.ontoggleChange}
                        onClick= {this.onIconButtonClick}
                        onSideClick={this.onSideClick}
                    />
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return{
        toolBar: state.pbstoolbar,
        newEditDialog: state.pbsnewEditDialog,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        setDialogType,
        getToolBarData,
        toggleSplitScreen,
        getSplitScreenData,
        getAllData,
        onSideClick
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ToolBar);