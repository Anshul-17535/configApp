
export const getToolBarData = (pageTitleDisplay) => {
    return {
        type : 'GET_TOOLBAR_DATA',
        payload:{
            pageTitle:pageTitleDisplay,
            subTitle:""
        }
    }
}

export const setUseProxy = (value) => {
    return {
        type : 'SET_HTTP_USE_PROXY',
        payload: value
    }
}

export const sethep3UseProxy = (value) => {
    return {
        type : 'SET_HEP3_USE_PROXY',
        payload: value
    }
}

export const setkafkaUseProxy = (value) => {
    return {
        type : 'SET_KAFKA_USE_PROXY',
        payload: value
    }
}

export const setRmUseProxy = (value) => {
    return {
        type : 'SET_RM_USE_PROXY',
        payload: value
    }
}

export const setMirrorUseProxy = (value) => {
    return {
        type : 'SET_MIRROR_USE_PROXY',
        payload: value
    }
}

export const addHep3ProxyAddress = (proxy) =>{
    return {
        type : 'ADD_HEP3_PROXY_ADDRESS',
        payload: proxy
    }
}

export const addHep3ProxyPort = (proxy) =>{
    return {
        type : 'ADD_HEP3_PROXY_PORT',
        payload: proxy
    }
}

export const addHep3ProxyDialogBox = (proxy) =>{
    return {
        type : 'ADD_HEP3_PROXY_BOX',
        payload: proxy
    }
}


export const setType = (type)=> {
    return {
        type: "EDR_TYPE_CHANGE",
        payload:type
    }
}

export const setIPvFQDN = (value)=>{
    return {
        type: "IP_V_FQDN",
        payload:value
    }
}

export const setHep3IPvFQDN = (value)=>{
    return {
        type: "HEP3_IP_V_FQDN",
        payload:value
    }
}

export const setHttpIPvFQDN = (value)=>{
    return {
        type: "HTTP_IP_V_FQDN",
        payload:value
    }
}

export const setKafkaIPvFQDN = (value)=>{
    return {
        type: "KAFKA_IP_V_FQDN",
        payload:value
    }
}

export const setRFIPvFQDN = (value)=>{
    return {
        type: "RF_IP_V_FQDN",
        payload:value
    }
}


export const setConfigType = (type)=> {
    return {
        type: "EDR_CONFIG_TYPE_CHANGE",
        payload:type
    }
}

export const a = (type)=> {
    return {
        type: "A",
        payload:type
    }
}

export const b = (type)=> {
    return {
        type: "B",
        payload:type
    }
}

export const c = (type)=> {
    return {
        type: "C",
        payload:type
    }
}

export const d = (type)=> {
    return {
        type: "D",
        payload:type
    }
}


export const e = (type)=> {
    return {
        type: "E",
        payload:type
    }
}

export const f = (type)=> {
    return {
        type: "F",
        payload:type
    }
}

export const a1 = (type)=> {
    return {
        type: "A1",
        payload:type
    }
}

export const b1 = (type)=> {
    return {
        type: "B1",
        payload:type
    }
}

export const c1 = (type)=> {
    return {
        type: "C1",
        payload:type
    }
}

export const d1 = (type)=> {
    return {
        type: "D1",
        payload:type
    }
}


export const e1 = (type)=> {
    return {
        type: "E1",
        payload:type
    }
}

export const f1 = (type)=> {
    return {
        type: "F1",
        payload:type
    }
}

export const setSSLShow=(setSSL)=>{
    return {
        type : 'SET_SSL_SHOW',
        payload:setSSL
    }
}

export const setSSLShow2=(setSSL)=>{
    return {
        type : 'SET_SSL_SHOW_2',
        payload:setSSL
    }
}

export const setIngHostAlert = (type)=> {
    return {
        type: "HOST_ALERT_ING",
        payload:type
    }
}

export const setEgHostAlert = (type)=> {
    return {
        type: "HOST_ALERT_EG",
        payload:type
    }
}
// myy code hereee
export const setIPVersion = (type)=> {
    return {
        type: "DESTC_IP_VERSION",
        payload:type
    }
}

export const setDestinationName = (type)=> {
    return {
        type: "DESTC_DESTINATION_NAME",
        payload:type
    }
}

export const setDestinationName2 = (type)=> {
    return {
        type: "DESTC_DESTINATION_NAME_2",
        payload:type
    }
}


export const setDestinationName3 = (type)=> {
    return {
        type: "DESTC_DESTINATION_NAME_3",
        payload:type
    }
}

export const setDestinationName4 = (type)=> {
    return {
        type: "DESTC_DESTINATION_NAME_4",
        payload:type
    }
}


export const setServerIP = (type)=> {
    return {
        type: "DESTC_SERVER_IP",
        payload:type
    }
}

export const setServerPort = (type)=> {
    return {
        type: "DESTC_SERVER_PORT",
        payload:type
    }
}

export const setHep3IPVersion = (type)=> {
    return {
        type: "DESTC_HEP3_IP_VERSION",
        payload:type
    }
}

export const setHep3ServerIP = (type)=> {
    return {
        type: "DESTC_HEP3_SERVER_IP",
        payload:type
    }
}

export const setHep3ServerPort = (type)=> {
    return {
        type: "DESTC_HEP3_SERVER_PORT",
        payload:type
    }
}

export const setDestinationFolder = (type)=> {
    return {
        type: "DESTC_DESTINATION_FOLDER",
        payload:type
    }
}

export const setSSL = (type)=> {
    return {
        type: "DESTC_SSL",
        payload:type
    }
}

export const setMirrorDestinationName = (type)=> {
    return {
        type: "DESTC_MIRROR_DESTINATION_NAME",
        payload:type
    }
}

export const setMirrorIPVersion = (type)=> {
    return {
        type: "DESTC_MIRROR_IP_VERSION",
        payload:type
    }
}

export const setMirrorServerIP = (type)=> {
    return {
        type: "DESTC_MIRROR_SERVER_IP",
        payload:type
    }
}

export const setMirrorServerPort = (type)=> {
    return {
        type: "DESTC_MIRROR_SERVER_PORT",
        payload:type
    }
}

export const setMirrorFQDN = (type)=> {
    return {
        type: "DESTC_MIRROR_FQDN",
        payload:type
    }
}

export const setHep3FQDN = (type)=> {
    return {
        type: "DESTC_HEP3_FQDN",
        payload:type
    }
}

export const setHttpFQDN = (type)=> {
    return {
        type: "DESTC_HTTP_FQDN",
        payload:type
    }
}

export const setKafkaFQDN = (type)=> {
    return {
        type: "DESTC_KAFKA_FQDN",
        payload:type
    }
}

export const setRFFQDN = (type)=> {
    return {
        type: "DESTC_RF_FQDN",
        payload:type
    }
}

export const setMirrorSSL = (type)=> {
    return {
        type: "DESTC_MIRROR_SSL",
        payload:type
    }
}

export const setKafkaIPVersion = (type)=> {
    return {
        type: "DESTC_KAFKA_IP_VERSION",
        payload:type
    }
}

export const setKafkaServerIP = (type)=> {
    return {
        type: "DESTC_KAFKA_SERVER_IP",
        payload:type
    }
}

export const setKafkaServerPort = (type)=> {
    return {
        type: "DESTC_KAFKA_SERVER_PORT",
        payload:type
    }
}

export const setKafkaTopicName = (type)=> {
    return {
        type: "DESTC_KAFKA_TOPIC_NAME",
        payload:type
    }
}

export const setRMIPVersion = (type)=> {
    return {
        type: "DESTC_RM_IP_VERSION",
        payload:type
    }
}

export const setRMServerIP = (type)=> {
    return {
        type: "DESTC_RM_SERVER_IP",
        payload:type
    }
}

export const setRMServerPort = (type)=> {
    return {
        type: "DESTC_RM_SERVER_PORT",
        payload:type
    }
}

export const setRMSSL = (type)=> {
    return {
        type: "DESTC_RM_SSL",
        payload:type
    }
}

export const deleteHost=(Index)=>{
    return {
        type:"DELETE_IP_PEER_HOST",
        Index
    }
}

export const updateHost=(Value,Field,Index)=>{
    return {
        type:"UPDATE_IP_PEER_HOST",
        Value,Field,Index
    }
}

export const deleteEPHost=(Index)=>{
    return {
        type:"DELETE_EP_PEER_HOST",
        Index
    }
}

export const updateEPHost=(Value,Field,Index)=>{
    return {
        type:"UPDATE_EP_PEER_HOST",
        Value,Field,Index
    }
}

export const deleteRegHost=(Index)=>{
    return {
        type:"DELETE_EP_PEER_REG",
        Index
    }
}

export const updateRegHost=(Value,Field,Index)=>{
    return {
        type:"UPDATE_EP_PEER_REG",
        Value,Field,Index
    }
}

export const saveRank=(data)=>{
    return {
        type:"SAVE_REG",
        payload:data
    }
}

export const saveHost=(data)=>{
    return {
        type:"SAVE_HOST",
        payload:data
    }
}

export const AddNewHost = (hostobj)=> {
    return {
        type: "ADD_NEW_IP_PEER_HOST",hostobj
    }
}

export const AddNewEPHost = (hostobj)=> {
    return {
        type: "ADD_NEW_EP_PEER_HOST",hostobj
    }
}

export const AddNewRegHost = (abc)=> {
    return {
        type: "ADD_NEW_EP_PEER_REG",
        payload:abc
    }
}

export const setIPDefaultPeer = (type)=> {
    return {
        type: "PEER_IP_DEFAULT_PEER",
        payload:type
    }
}

export const setEPProfileName = (type)=> {
    return {
        type: "PEER_EP_PROFILE_PEER_NAME",
        payload:type
    }
}

export const setEPHost = (type)=> {
    return {
        type: "PEER_EP_PEER_HOST",
        payload:type
    }
}

export const setEPPort = (type)=> {
    return {
        type: "PEER_EP_PEER_PORT",
        payload:type
    }
}

export const setEPDefaultPeer = (type)=> {
    return {
        type: "PEER_EP_DEFAULT_PEER",
        payload:type
    }
}

export const setDialogType = (type) => {
    return {
        type: 'SET_DIALOG_DESTC_TYPE',
        payload :type
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_DESTC_STATE',
        payload:showDialog
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_DESTC_STATE',
        payload:showAlertDialog
    }
}

export const setCurrentDSTProfileDataOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_DST_PROFILE_EDIT',
        payload:ConfigName
    }
}


export const setCurrentDSTProfileDataOnView=(ConfigName)=>{
    return {
        type:'SET_CURRENT_DST_PROFILE_VIEW',
        payload:ConfigName
    }
}

export const addNewHttpServer=()=>{
    return {
        type : 'ADD_NEW_HTTP_SERVER',
        payload:{
            "tracingDestinationDetailsConfigs": {
                "tracingDestinationDetailsConfig": [{
                    "destinationType": "HTTP SERVER",
                    "destinationName": "",
                    "serverIpVersion": "",
                    "serverIp": "",
                    "serverPort": "",
                    "fqdn": "",
                    "destinationFolder": "",
                    "useSSL": false,
                    "useProxy": false
                }]
            }
        }
        }
}

export const addKeyStore=()=>{
    return {
        type : 'ADD_KEY_STORE',
        payload : {
                "location": "",
                "password": "",
                "passwordEnvVariable": "",
                "passwordFile": "",
                "type": "",
                "keyManagerFactoryAlgo": ""       
        }
    }
}

export const addTrustStore=()=>{
    return {
        type : 'ADD_TRUST_STORE',
        payload : {
                "location": "",
                "password": "",
                "passwordEnvVariable": "",
                "passwordFile": "",
                "type": "",
                "trustManagerFactoryAlgo": ""
        }
    }
}

export const addNewHep3Server=()=>{
    return {
        type : 'ADD_NEW_HEP3_SERVER',
        payload:{
            "tracingDestinationDetailsConfigs": {
                "tracingDestinationDetailsConfig": [{
                    "destinationType": "HEP3 SERVER",
                    "destinationName": "",
                    "serverIpVersion": "",
                    "serverIp": "",
                    "serverPort": "",
                    "fqdn": "",
                    "useSSL": false,
                    "useProxy": false
                }]
            }
        }
        }
}

export const addNewKafkaCluster=()=>{
    return {
        type : 'ADD_NEW_KAFKA_CLUSTER',
        payload:{
            "tracingDestinationDetailsConfigs": {
                "tracingDestinationDetailsConfig": [{
                    "destinationType": "KAFKA",
                    "destinationName": "",
                    "topicName": "",
                    "clusterIpVersion": "",
                    "clusterIp": "" ,
                    "fqdn": "",
                    "clusterPort":"" ,
                    "useProxy": false    
                }]
            }
        }
    }
}

export const addNewRemoteFile=()=>{
    return {
        type : 'ADD_NEW_REMOTE_FILE',
        payload:{
            "tracingDestinationDetailsConfigs": {
                "tracingDestinationDetailsConfig": [{
                    "destinationType": "REMOTE FILE",
                    "destinationName": "",
                    "serverIpVersion": "",
                    "serverIp": "",
                    "serverPort": "",
                    "fqdn": "",
                    "useSSL": false,
                    "useProxy": false
                }]
            }
        }
        }
}

export const addMirrorServer=()=>{
    return {
        type : 'ADD_NEW_MIRROR_SERVER',
        payload:{
            "tracingDestinationDetailsConfigs": {
                "tracingDestinationDetailsConfig": [{
                    "destinationType": "MIRROR SERVER",
                    "destinationName": "",
                    "serverIpVersion": "",
                    "serverIp": "",
                    "serverPort": "",
                    "fqdn": "",
                    "useSSL": false,
                    "useProxy": false
                }]
            }
        }
        }
}

export const editIPData=(val)=>{
    return {
        type:"EDIT_IP_DATA",
        payload:val
    }
}

export const editEPData=(val)=>{  
    return {
        type:"EDIT_EP_DATA",
        payload:val
    }
}


export const setIngressValue=(Val)=>{
    return {
        type:'SET_INGRESS_PEER_VALUE',
        payload:Val
    }
}

export const setEgressValue=(Val)=>{
    return {
        type:"SET_EGRESS_PEER_VALUE",
        payload:Val
    }
}

export const setPTValue=(Val)=>{
    return {
        type:"SET_PT_PEER_VALUE",
        payload:Val
    }
}

export const setHep3SSL=(Val)=>{
    return {
        type:"SET_HEP3_SSL_VALUE",
        payload:Val
    }
}



export const setSlfLookupTableName=(Val)=>{
    return {
        type:"SET_SLF_LOOKUP_TABLE_PEER_NAME",
        payload:Val
    }
}

export const setCurrentThrScalarDataOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_SLF_CONFIG_DATA_ON_PEER_EDIT',
        payload:ConfigName
    }
}


export const updateDestinationToBeSet=(Val)=>{
    return {
        type:"UPDATE_DESTINATION_TO_BE_PEER_SET",
        payload:Val
    }
}