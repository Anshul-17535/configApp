import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import ChipsInputCCFK from '../../ccfk-components/ChipsInputCCFK';
import CardCCFK from "../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import {updateAddressRanges,deleteAddressRange,addAddressRange,updateChipsList} from '../../actions/slfnfprofile';
import RangesComponent from './RangesComponent';
import {IPV4_REGEX,IPV6_PREFIX_REGEX} from '../slfNfService/validationRegexs';
import '../../styles/slfnfprofile/SlfNfProfileInputGroup.css';


class BsfInfoForm extends Component{

    handleRangeChange=(value,type,field,Index)=>{
        this.props.updateAddressRanges(value,type,field,Index)
    }

    deleteRange=(type,Index)=>{
        this.props.deleteAddressRange(type,Index)
    }

    addRange=(type)=>{
        let newRangeObj={"start":"","end":""}
        this.props.addAddressRange(type,newRangeObj)
    }
    handleListChange=(value,field)=>{
        this.props.updateChipsList(value,field)
    }

    render(){
        const {bsfInfo} = this.props.slfNfProfileConfig
        return (
            <div className="bsfInfoFormContainer">
                <div className="ipv4AddressRangesComponent">
                    <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2 className='bsfinfo_h2'>Ipv4 Prefix Ranges</h2>
                                <IconButtonCCFK 
                                    onClick={()=>this.addRange("ipv4AddressRanges")}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {bsfInfo.ipv4AddressRanges.map((Range,Index)=>{
                                return <RangesComponent key={`ipv4AddressRanges_${Index}`} validationRegex={IPV4_REGEX} validationError="Invalid Ipv4Address" type="ipv4AddressRanges" deleteRange={this.deleteRange} handleRangeChange={this.handleRangeChange} start={Range.start} end={Range.end} Index={Index}/>
                            })}
                        </CardCCFK>
                </div>
                <div className="ipv6PrefixRangesComponent">
                    <CardCCFK
                            cardStyle={{height:"auto",padding:"1rem"}}
                        >
                            <div className="cardHeaderButtonGroup">
                                <h2 className='bsfinfo_h2'>Ipv6 Prefix Ranges</h2>
                                <IconButtonCCFK 
                                    onClick={()=>this.addRange("ipv6PrefixRanges")}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {bsfInfo.ipv6PrefixRanges.map((Range,Index)=>{
                             return <RangesComponent key={`ipv6PrefixRanges_${Index}`} validationRegex={IPV6_PREFIX_REGEX} validationError="Invalid Ipv6Prefix" type="ipv6PrefixRanges" deleteRange={this.deleteRange} handleRangeChange={this.handleRangeChange} start={Range.start} end={Range.end} Index={Index}/>
                            })}
                        </CardCCFK>
                </div>
                <div className="dnnListField">
                <h5 className="dnnListLabel">DNN List</h5>
                    <ChipsInputCCFK
                        placeHolder="Add DNN List"
                        style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                        onChange={this.handleListChange}
                        size="medium"
                        value={bsfInfo.dnnList}
                        onChangeArgs={["dnnList"]}
                    />
                </div>
                <div className="ipDomainListField">
                <h5 className="ipDomainListLabel">IP Domain List</h5>
                    <ChipsInputCCFK
                        placeHolder="Add IP Domain List"
                        style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                        onChange={this.handleListChange}
                        size="medium"
                        value={bsfInfo.ipDomainList}
                        onChangeArgs={["ipDomainList"]}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        slfNfProfileConfig:state.slfNfProfilenewEditDialog.currentSlfNfProfileConfig
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        updateAddressRanges,
        deleteAddressRange,
        addAddressRange,
        updateChipsList
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(BsfInfoForm);

