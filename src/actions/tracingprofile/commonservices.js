import axios from "axios";
import globals from "../../utils/config";
import messageInfo from "../../utils/resource_locale_default";
const url = `${globals.protocol}://${globals.host}/${globals.service}/${globals.tracingProfileUrl}`;
const url2 = `${globals.protocol}://${globals.host}/${globals.service}/${globals.tracingFieldurl}`;
const url3 = `${globals.protocol}://${globals.host}/${globals.service}/${globals.destNameUrl}`;
const urlForDel = `${globals.protocol}://${globals.host}/${globals.service}/${globals.delForTracingProfile}`;
// https://outlook.office365.com/mail/inbox/id/AAQkADEwYTYzODUyLTIwZmMtNDhhNi05OWZkLTU4M2MzOTI2ZWRjZQAQABRCNBsX0U%2FepYr8MPNGmK0%3D#:~:text=http%3A//127.0.0.1%3A8082/config/scp/v1/edrTracingProfileConfigs/%3Foperation%3DDELETE%26resume_marker_key%3D21.8%26resume_marker_value%3D1472

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
        type: "GET_ALL_THRP_RECORDS",
        payload: finalResponse
    }
}

export const setSuccessFlag = (setSuccessFlag) => {
    return {
        type: "SET_SUCCESS_THRP_FLAG",
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
        type: "FETCH_THRP_ERROR",
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
        type: "SET_SUCCESS_THRP_MESSAGE",
        payload: dataObject
    }
}

export const setErrorOnCall = (setErrorValue) => {
    return {
        type: "SET_ERROR_THRP_DIALOG",
        payload: setErrorValue
    }
}

export function getAllData() {
    const ModifiedUrl=`${url}/?operation=ADD`
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
                dispatch(dataFetched(response.data)),
                dispatch({
                    type:"SET_ALL_THRP_CONFIG_DATA",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
	    const abc=[]
            if(!!response) {
                if(response.data.title === 'SMErr006') {
                    return Promise.all([
                        dispatch(dataFetched(abc)),
                        dispatch({
                            type:"SET_ALL_THRP_CONFIG_DATA",
                            payload:abc
                        })
                    ])
                }
                else{
                    dispatch(groupFetchErrored(response.data));
                    dispatch(setErrorOnCall(true));
                }
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
   };
}
// \http://127.0.0.1:8082/config/scp/v1/edrTracingProfileConfigs/?operation=ADD&resume_marker_key=22.0&resume_marker_value=123

export function createThrConfig(thrConfig){
    const ModifiedUrl=`${url}/?operation=ADD`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'post',
            url: ModifiedUrl,
            data:thrConfig,
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

// curl -k --header "Content-Type:application/json" --header "Accept:application/json" --request GET --data '' 
//  http://127.0.0.1:8082/config/scp/v1/edrtracingconfig/getSupportedEdrFields

export function getEDRFieldByType() {
    const ModifiedUrl=`${url2}`
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
                dispatch({
                    type:"ALL_DATA_PROFILEAMES",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
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

export function getDest1Name() {
    const ModifiedUrl=`${url3}/HTTP SERVER`
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
                dispatch({
                    type:"ALL_DATA_1",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
            // if(!!response) {
            //     dispatch(groupFetchErrored(response.data));
            //     dispatch(setErrorOnCall(true));
            // }
            // else {
            //     dispatch(setErrorOnCall(true));
            //     dispatch(groupFetchErrored());
            // }
        });
   };
}

export function getDest2Name() {
    const ModifiedUrl=`${url3}/KAFKA`
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
                dispatch({
                    type:"ALL_DATA_2",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
        });
   };
}

export function getDest3Name() {
    const ModifiedUrl=`${url3}/REMOTE FILE`
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
                dispatch({
                    type:"ALL_DATA_3",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
        });
   };
}

export function getDest4Name() {
    const ModifiedUrl=`${url3}/HEP3 SERVER`
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
                dispatch({
                    type:"ALL_DATA_4",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
        });
   };
}

export function getDest5Name() {
    const ModifiedUrl=`${url3}/MIRROR SERVER`
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
                dispatch({
                    type:"ALL_DATA_5",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
        });
   };
}

export function updateThrConfig(thrConfig){
    const ModifiedUrl=`${url}/?operation=ADD`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'put',
            url: ModifiedUrl,
            data:thrConfig,
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
// http://127.0.0.1:8082/config/scp/v1/edrTracingProfileConfigs/?operation=DELETE&resume_marker_key=21.8&resume_marker_value=1472

export function deleteThrConfig(dstcConfig){

    const ModifiedUrl=`${urlForDel}/${dstcConfig}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'delete',
            url: ModifiedUrl,
            data: dstcConfig,
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
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
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
