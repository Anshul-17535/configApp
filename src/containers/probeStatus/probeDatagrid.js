import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import {setDialogType,setDialogState} from '../../actions/probeStatus';
import {setErrorOnCall} from '../../actions/probeStatus/commonservices';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import "../../styles/messageFilter/ReDataGrid.css";
import rulesData from '../../actions/probeStatus/probingStatusDatagrid.json';
let _ = require('underscore');

let srv;
class ProbingDataGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
    }

    columnDefs = () => {
        let innerFieldArray = [];
        !!rulesData && rulesData.Fields.forEach( value => {
            if(value.gridDisplay === true) {
                if (value.hasInnerFields === true) {
                    value.innerFields.forEach((valueInner) => {
                        innerFieldArray.push(valueInner);
                    });
                }
                else {
                    innerFieldArray.push(value);
                }
            }
        });
       let finalArray= innerFieldArray.map(function (data, id) {
           return {headerName:data.label,field: data.name,width:data.width,filter:'agTextColumnFilter'}
       });
       return finalArray;
    }

    gridOptions={
        columnDefs:this.columnDefs()
    }

    getInlineRowActions=(e)=>{
        return [          
            ]
    }

    returnRowActionColumn=()=>{
        return {
        }
    }

    onErrorClose = () =>{
        srv.props.setErrorOnCall(false);
    }

    alertErrorPopup = ( ) => {
        if (!srv.props.apiError) {
            return <div></div>
        }
        else {
            return (<ErrorDialogCCFK 
                title={srv.props.apiError.mainTitle} 
                variant="ERROR" 
                message={srv.props.apiError.description} 
                detailsText={srv.props.apiError.moreDetails} 
                onClose={srv.onErrorClose}/>)
        }
    }

    render(){

        return (
            <div style={{height: '595px'}}>
                <DataGridCCFK 
                    gridOption={this.gridOptions} 
                    returnRowActionColumn={this.returnRowActionColumn} 
                    gridData={this.props.rowData ? this.props.rowData.slice() : []}
                    // defaultGridActionsPosition="right"
                />
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.pbsdataGrid.rowData,
        dataGrid : state.pbsdataGrid,
        apiError: state.pbsdataGrid.apiError,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogType,
        setDialogState,
        setErrorOnCall,
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(ProbingDataGrid);