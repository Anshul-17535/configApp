import axios from "axios";
import globals from "../../utils/config";
import messageInfo from "../../utils/resource_locale_default";
const url = `${globals.protocol}://${globals.host}/${globals.service}/${globals.messagefilterurl}`;
const contextListUrl=`${globals.protocol}://${globals.host}/${globals.service}/${globals.contextListUrl}`;
const url3 = `${globals.protocol}://${globals.host}/${globals.service}/${globals.traceByTypeProfileUrl}`;
const url4 = `${globals.protocol}://${globals.host}/${globals.service}/${globals.destNameUrl}`;

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
        type: "GET_ALL_MSGFILTER_RECORDS",
        payload: finalResponse
    }
}

export const setSuccessFlag = (setSuccessFlag) => {
    return {
        type: "SET_SUCCESS_FLAG",
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
        type: "FETCH_ERROR",
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
        type: "SET_SUCCESS_MESSAGE",
        payload: dataObject
    }
}

export const setErrorOnCall = (setErrorValue) => {
    return {
        type: "SET_ERROR_DIALOG",
        payload: setErrorValue
    }
}

export function createTracingConfig(tracingConfig){
    const ModifiedUrl=`${url}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'post',
            url: ModifiedUrl,
            data:tracingConfig,
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
        }).catch(({response}) => {
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

export function getDest1Name() {
    const ModifiedUrl=`${url3}/EDR`
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
                    type:"ALL_DATA_EDR_1",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
        });
   };
}

export function getDest3Name() {
    const ModifiedUrl=`${url3}/MIRROR`
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
                    type:"ALL_DATA_MIRROR",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
        });
   };
}

export function getDest2Name() {
    const ModifiedUrl=`${url3}/HEP3`
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
                    type:"ALL_DATA_HEP3_2" ,
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
        });
   };
}


export function updateTracingConfig(tracingConfig,configName){
    const ModifiedUrl=`${url}?profileName=${encodeURIComponent(configName)}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'put',
            url: ModifiedUrl,
            data:tracingConfig,
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
        }).catch(({response}) => {
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

export function setListContextForAttributes(){
    const ModifiedUrl=`${contextListUrl}/listcontextsforattrs?formname=tracing&advancedview=false`
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
                    type: "SET_LIST_CONTEXT_FOR_ATTRIBUTES",
                    payload: response.data
                })
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

export function setListContextForActions(){
    const ModifiedUrl=`${contextListUrl}/listcontextsforactions?formname=tracing&advancedview=false`
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
                    type: "SET_LIST_CONTEXT_FOR_ACTIONS",
                    payload: response.data
                })
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

export function setContextData(ContextName){
    const ModifiedUrl=`${contextListUrl}/context?formname=tracing&contextname=${encodeURIComponent(ContextName)}&advancedview=false`
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
                    type: "SET_CONTEXT_DATA",
                    payload: response.data,
                    ContextName
                })
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

export function getAllData() {
    const ModifiedUrl=`${url}`
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
                    type:"SET_ALL_TRACING_CONFIGS",
                    payload:response.data
                })
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
//Export One
//New API http://127.0.0.1:8082/config/scp/v1/msgtracingconfig/tracingConfigName
export function exportOne(tracingConfigName){
    const ModifiedUrl=`${url}/${encodeURIComponent(tracingConfigName)}`
    return (dispatch) => {
	dispatch(setSuccessFlag(false));
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(getAllData()),
                dispatch({
                    type: "EXPORT_ONE_DATA",
                    payload: response.data
                })
            ]).then(listOfResults => {
                dispatch({
                        type : 'SET_DIALOG_STATE',
                        payload:false

                })
            });
        }).catch(({response}) => {
            dispatch(getAllData());
            if(!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
    }
}
export function deleteRecord(tracingConfigName){
    const ModifiedUrl=`${url}/${encodeURIComponent(tracingConfigName)}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'delete',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode002";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData())
            ]).then(listOfResults => {
            });

        }).catch(({response}) => {
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
    }
}

export function activateOrInactivateConfig(tracingConfigName,state){
    const ModifiedUrl=`${url}/updateStatus?profileName=${encodeURIComponent(tracingConfigName)}&activate=${state}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'put',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData())
            ]).then(listOfResults => {
            });

        }).catch(({response}) => {
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
    }
}