import axios from "axios";
import globals from "../../utils/config";
import messageInfo from "../../utils/resource_locale_default";
import {setDialogState,setDialogStateKeyPair,setDialogType,enableKeyPairForm } from "./index";
const url = `${globals.protocol}://${globals.host}/${globals.service}/${globals.slflookupurl}`;
const keyPairUrl = `${globals.protocol}://${globals.host}/${globals.service}/${globals.slfkeypairurl}`;
const destinationMapUrl = `${globals.protocol}://${globals.host}/${globals.service}/${globals.destinationmapurl}`;
const nfprofileurl=`${globals.protocol}://${globals.host}/${globals.service}/${globals.nfprofileurl}`


export const dataFetched = (responseData) => {

    let finalResponse = [];
    if(!!responseData) {
        Object.assign(responseData).forEach(element => {
            let objectFormed = {};
            Object.keys(element).forEach(function (key) {
                objectFormed[key] = element[key];
            });
            finalResponse.push(objectFormed);
        });
    }
    else {
        finalResponse = responseData;
    }
    return {
        type: "GET_ALL_SLF_RECORDS",
        payload: finalResponse
    }
}

export const dataFetchedKeyPair = (responseData) => {

    let finalResponse = [];
    if(!!responseData) {
        Object.assign(responseData).forEach(element => {
            let objectFormed = {};
            Object.keys(element).forEach(function (key) {
                objectFormed[key] = element[key];
            });
            finalResponse.push(objectFormed);
        });
    }
    else {
        finalResponse = responseData;
    }
    return {
        type: "GET_ALL_KEYPAIR_RECORDS",
        payload: finalResponse
    }
}
export const createDestinationIdMap = (responseData) => {
    let resultDestinationArray = [];
    if(!!responseData) {
        resultDestinationArray = responseData.reduce(function (acc, obj) {
            let key = obj['mapPattern'];
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj['destinationId']);
            return acc
        }, {});
    }
    return {
        type: "SET_ALL_DESTINATION_MAP_DATA",
        payload: resultDestinationArray
    }
}
export const createNfProfileMap = (responseData) => {
    let resultDestinationArray = responseData.map((ele) => (ele.nfProfileCache.nfInstanceId));
    return {
        type: "SET_NF_PROFILE_MAP_DATA",
        payload: resultDestinationArray
    }
}
export const setSuccessFlag = (setSuccessFlag) => {
    return {
        type: "SET_SUCCESS_FLAG_SLF",
        payload: setSuccessFlag
    }
}

export const groupFetchErrored = (errorId) => {

    let dataObject;
    if(!!errorId) {
        if(!!errorId.title) {
            dataObject = messageInfo.find(function (element) {
                return errorId.title.toLowerCase() === element.responseCode.toLowerCase();
            });
        }
        let concatenatedMessage = " ";
        if (!!errorId.invalidParams && errorId.invalidParams.length > 0 && !!dataObject) {
            errorId.invalidParams.forEach(function (elt) {
                let messageFromFile = messageInfo.find(function (element) {
                    return elt.errorcode.toLowerCase() === element.responseCode.toLowerCase();
                });
                if (!!messageFromFile) {
                    concatenatedMessage = concatenatedMessage + '\n' + elt.param + ":  " + messageFromFile.description;
                }
            });
            dataObject.moreDetails = concatenatedMessage;
        }
        if(dataObject === undefined){
            if(!!errorId.detail) {
                dataObject = {
                    "responseCode": errorId.title,
                    "mainTitle": errorId.detail,
                    "description": errorId.cause,
                    "moreDetails": ""
                }
                if (!!errorId.invalidParams && errorId.invalidParams.length > 0) {
                    errorId.invalidParams.forEach(function (elt) {
                        concatenatedMessage = concatenatedMessage + '\n' + elt.param + ":  " + elt.reason;
                    });
                }
                dataObject.moreDetails = concatenatedMessage;
            }
            else {
                dataObject = {
                    "responseCode": "SM_0123",
                    "mainTitle":"Unknown Error from Server",
                    "description":"",
                    "moreDetails": ""
                }
            }
        }
    }
    if (dataObject === undefined && errorId === undefined ) {
        dataObject = {
            "responseCode": "SM_0123",
            "mainTitle":"Unknown Error from Server",
            "description":"",
            "moreDetails": ""
        }
    }
    return {
        type: "FETCH_ERROR_SLF",
        payload: dataObject
    }
}

export const setSuccessMessage = (setsuccessCode) => {
    let dataObject = messageInfo.find(function(element) {
        return setsuccessCode === element.responseCode ;
    });
    if(dataObject === ""){
        dataObject = {
            "responseCode": "SM_0123",
            "mainTitle":"Unknown Error from Server",
            "description":"",
            "moreDetails": ""
        }
    }
    return {
        type: "SET_SUCCESS_MESSAGE_SLF",
        payload: dataObject
    }
}

export const setErrorOnCall = (setErrorValue) => {
    return {
        type: "SET_ERROR_DIALOG_SLF",
        payload: setErrorValue
    }
}

export function getAllData() {
    return (dispatch) => {
        axios({
                method: 'get',
                url: url,
                headers: {'Content-type':'application/json',
                    'Accept': 'application/json',
                    'Authorization':  global.authToken,
                    'RequestSource':"GUI",
                    'IpAddress':globals.host,
                    'User':localStorage.getItem('userInfo')
                },
                timeout: 30000,
                withCredentials: false, // default
                maxContentLength: 2000
            }
        ).then(response => {
            return Promise.all([
                dispatch(dataFetched(response.data))
            ])
        }).catch(({response}) => {
            if(!!response) {
               dispatch(groupFetchErrored(response.data));
               dispatch(setErrorOnCall(true));
            }
            else {
               dispatch(setErrorOnCall(true));
               dispatch(groupFetchErrored());
           }
	});
    };
}

export function getAllKeyPairData(slfLookUpName) {
    return (dispatch) => {
        axios({
                method: 'get',
                url: keyPairUrl+'?slfLookUpName='+slfLookUpName,
                headers: {'Content-type':'application/json',
                    'Accept': 'application/json',
                    'Authorization':  global.authToken,
                    'RequestSource':"GUI",
                    'IpAddress':globals.host,
                    'User':localStorage.getItem('userInfo')
                },
                timeout: 30000,
                withCredentials: false, // default
                maxContentLength: 2000
            }
        ).then(response => {
            return Promise.all([
                dispatch(dataFetchedKeyPair(response.data))
            ])
        }).catch(({response}) => {
            return Promise.all([
                dispatch(dataFetchedKeyPair([]))
            ])
        });
    };
}
export function createSlfLookUp(slfLookUpData){
    let slfLookUpApiData = {
            "slfLookUp":{
            "SLFMap":[slfLookUpData]
            }};
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'post',
            url: url,
            data:slfLookUpApiData,
            headers: {'Content-type':'application/json',
                'Accept': 'application/json',
                'Authorization':  global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
                },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(setDialogType("edit")),
		        dispatch(enableKeyPairForm(true)),
                dispatch(getAllData())
                ])
        }).catch(({response})=> {
            if(!!response && response.status === 403){
                let errorResponse = {
                     title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            else if(!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
   };
}

export function updateSlfLookUp(slfLookUpData){
    const requiredUpdateParams = (({slfLookupId, lookupType, lookupTypeName,mapSetEnabled }) => ({ slfLookupId, lookupType, lookupTypeName,mapSetEnabled}))(slfLookUpData);
    let slfLookUpApiData = {
        "slfLookUp":{
            "SLFMap":[requiredUpdateParams]
        }};
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'put',
            url: url,
            data:slfLookUpApiData,
            headers: {'Content-type':'application/json',
                'Accept': 'application/json',
                'Authorization':  global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
                },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(setDialogState(false)),
                dispatch(getAllData())
                ])
        }).catch(({response})=> {
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            else if(!!response) {
                dispatch(groupFetchErrored(response));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
   };
}

export function deleteSlfLookUp(slfLookUpId){
    
    const ModifiedUrl=`${url}/${slfLookUpId}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'delete',
            url: ModifiedUrl,
            headers: {'Content-type':'application/json',
                'Accept': 'application/json',
                'Authorization':  global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
                },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode002";
            if(!!response) {
                dispatch({
                    type:"SET_SLF_LOOKUP_DELETE_MESSAGE",
                    payload:response.data
                })
                dispatch({
                    type:"SET_SLF_LOOKUP_DELETE_BOX",
                    payload:true
                })
            }
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(setDialogState(false)),
                dispatch(getAllData())
                ])
        }).catch(({response})=> {
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            else if(!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
   };
}

export function createSlfKeyPair(keyPairData){
    let slfKeyPairData = {
        "keyMap":{
            "KeyLookUpMap":[keyPairData]
        }};
    const ModifiedUrl=`${keyPairUrl}?operation=POST`;
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'post',
            url: ModifiedUrl,
            data:slfKeyPairData,
            headers: {'Content-type':'application/json',
                'Accept': 'application/json',
                'Authorization':  global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
                },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(setDialogStateKeyPair(false)),
                dispatch(getAllKeyPairData(this.slfKeyPairData.lookupTypeName)),
                dispatch({
                    type:"SET_DIALOG_STATE_KEYPAIR",
                    payload:false
                })
            ])
        }).catch(({response})=> {
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            else if(!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
    };
}

export function updateSlfKeyPair(keyPairData){
    const requiredUpdateParams = (({pattern, lookupTypeName, slfLookUpType,destinationType,destinationId,rank,customTag1,customTag2,customTag3}) =>
        ({ pattern, lookupTypeName, slfLookUpType,destinationType, destinationId,rank,customTag1,customTag2,customTag3}))(keyPairData);
    let slfKeyPairData = {
        "keyMap":{
            "KeyLookUpMap":[requiredUpdateParams]
        }};
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'put',
            url: keyPairUrl,
            data:slfKeyPairData,
            headers: {'Content-type':'application/json',
                'Accept': 'application/json',
                'Authorization':  global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
                },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(setDialogStateKeyPair(false)),
                dispatch(getAllKeyPairData(this.slfKeyPairData.lookupTypeName)),
                dispatch({
                    type:"SET_DIALOG_STATE_KEYPAIR",
                    payload:false
                })
            ])
        }).catch(({response})=> {
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            else if(!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
    };
}

export function deleteSlfKeyPair(KeyPairData) {
    const requiredUpdateParams = (({pattern, lookupTypeName, slfLookUpType,destinationType,destinationId,rank,customTag1,customTag2,customTag3}) =>
        ({pattern,lookupTypeName, slfLookUpType,destinationType, destinationId,rank,customTag1,customTag2,customTag3}))(KeyPairData);
    let slfKeyPairData = {
        "keyMap":{
            "KeyLookUpMap":[requiredUpdateParams]
        }};
    const ModifiedUrl=`${keyPairUrl}?operation=DELETE`;
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'post',
            url: ModifiedUrl,
            data:slfKeyPairData,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
            },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode002";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch((!!this.slfLookUpData.lookupTypeName?getAllKeyPairData(this.slfLookUpData.lookupTypeName):console.log("error")))
            ])
        }).catch(({response})=> {
            if (!!response && response.status === 403) {
                let errorResponse = {
                    title: "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            else if (!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
    };
}
export function getAllDestinationData() {
    return (dispatch) => {
        axios({
                method: 'get',
                url: destinationMapUrl ,
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': global.authToken,
                    'RequestSource':"GUI",
                    'IpAddress':globals.host,
                    'User':localStorage.getItem('userInfo')
                },
                timeout: 30000,
                withCredentials: false, // default
                maxContentLength: 2000
            }
        ).then(response => {
            return Promise.all([
                dispatch(createDestinationIdMap(response.data.destinationMap.DestMapList))
            ])
        }).catch(({response}) => {
             return Promise.all([
                dispatch(createDestinationIdMap([]))
            ]);
        });
    }
}

export const getAllNfProfileData=()=>{
    const ModifiedUrl=`${nfprofileurl}`;
    return (dispatch) => {
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {'Content-type':'application/json',
                    'Accept': 'application/json',
                    'Authorization':  global.authToken,
                    'RequestSource':"GUI",
                    'IpAddress':globals.host,
                    'User':localStorage.getItem('userInfo')
                },
                timeout: 30000,
                withCredentials: false, // default
                maxContentLength: 2000
            }
        ).then(response => {
            return Promise.all([
                dispatch(createNfProfileMap(response.data))
            ])
        }).catch(({response})=> {
            return Promise.all([
                dispatch(createNfProfileMap([]))
            ]);
        });
    }
}
