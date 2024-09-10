import { object } from 'underscore';
import config from '../../utils/config';

let _ = require('underscore');

export default function (state={ipVfqdn:'IP',HttpIpVFqdn:'IP',Hep3IpVFqdn:'IP',KafkaIpVFqdn:'IP',RFIpVFqdn:'IP',newEditData:[],currentMirrorServer:[],currentPeerIPConfig:{},keyStoreConfig: {},trustStoreConfig: {},currentPeerEPConfig:{},peerEditData:[]}, action){
    switch(action.type) {
        case 'SET_DIALOG_DESTC_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_DESTC_STATE':
            return {...state, dialogState:action.payload}
        case 'ADD_NEW_HTTP_SERVER':{
            return {...state,currentHttpServer:action.payload}
        }
        case 'ADD_NEW_MIRROR_SERVER':{
            return {...state,currentMirrorServer:action.payload}
        }
        case 'L4_PROXY_STATUS': {
            return {...state,useProxy:action.payload}
        }
        case 'ADD_NEW_HEP3_SERVER':{
            return {...state,currentHep3Server:action.payload}
        }
        case 'ADD_NEW_KAFKA_CLUSTER':{
            return {...state,currentKafkaCluster:action.payload}
        }
        case 'ADD_NEW_REMOTE_FILE':{
            return {...state,currentRemotefile:action.payload}
        }
        case 'SET_SSL_SHOW':{
            return {...state,usableBool:action.payload}
        }
        case 'SET_SSL_SHOW_2':{
            return {...state,usableBool2:action.payload}
        }
        case 'ADD_KEY_STORE':{
            return {...state,keyStoreConfig:action.payload}
        }
        case 'ADD_TRUST_STORE':{
            return {...state,trustStoreConfig:action.payload}
        }
        case 'EDR_TYPE_CHANGE':{
            return {...state,edrType:action.payload}
        }
        case 'IP_V_FQDN':{
            return {...state,ipVfqdn:action.payload}
        }
        case 'HEP3_IP_V_FQDN':{
            return {...state,Hep3IpVFqdn:action.payload}
        }
        case 'HTTP_IP_V_FQDN':{
            return {...state,HttpIpVFqdn:action.payload}
        }
        case 'KAFKA_IP_V_FQDN':{
            return {...state,KafkaIpVFqdn:action.payload}
        }
        case 'RF_IP_V_FQDN':{
            return {...state,RFIpVFqdn:action.payload}
        }
        case 'EDR_CONFIG_TYPE_CHANGE':{
            return {...state,edrConfigType:action.payload}
        }
        case 'A':{
            const keyStoreConfigCopy = {...state.keyStoreConfig}
            keyStoreConfigCopy.location=action.payload
            return {...state,keyStoreConfig:keyStoreConfigCopy}
        }
        case 'B':{
            const keyStoreConfigCopy = {...state.keyStoreConfig}
            keyStoreConfigCopy.password=action.payload
            return {...state,keyStoreConfig:keyStoreConfigCopy}
        }
        case 'C':{
            const keyStoreConfigCopy = {...state.keyStoreConfig}
            keyStoreConfigCopy.passwordEnvVariable=action.payload
            return {...state,keyStoreConfig:keyStoreConfigCopy}
        }
        case 'D':{
            const keyStoreConfigCopy = {...state.keyStoreConfig}
            keyStoreConfigCopy.passwordFile=action.payload
            return {...state,keyStoreConfig:keyStoreConfigCopy}
        }
        case 'E':{
            const keyStoreConfigCopy = {...state.keyStoreConfig}
            keyStoreConfigCopy.type=action.payload
            return {...state,keyStoreConfig:keyStoreConfigCopy}
        }
        case 'F':{
            const keyStoreConfigCopy = {...state.keyStoreConfig}
            keyStoreConfigCopy.keyManagerFactoryAlgo=action.payload
            return {...state,keyStoreConfig:keyStoreConfigCopy}
        }

        case 'A1':{
            const keyStoreConfigCopy = {...state.trustStoreConfig}
            keyStoreConfigCopy.location=action.payload
            return {...state,trustStoreConfig:keyStoreConfigCopy}
        }
        case 'B1':{
            const keyStoreConfigCopy = {...state.trustStoreConfig}
            keyStoreConfigCopy.password=action.payload
            return {...state,trustStoreConfig:keyStoreConfigCopy}
        }
        case 'C1':{
            const keyStoreConfigCopy = {...state.trustStoreConfig}
            keyStoreConfigCopy.passwordEnvVariable=action.payload
            return {...state,trustStoreConfig:keyStoreConfigCopy}
        }
        case 'D1':{
            const keyStoreConfigCopy = {...state.trustStoreConfig}
            keyStoreConfigCopy.passwordFile=action.payload
            return {...state,trustStoreConfig:keyStoreConfigCopy}
        }
        case 'E1':{
            const keyStoreConfigCopy = {...state.trustStoreConfig}
            keyStoreConfigCopy.type=action.payload
            return {...state,trustStoreConfig:keyStoreConfigCopy}
        }
        case 'F1':{
            const keyStoreConfigCopy = {...state.trustStoreConfig}
            keyStoreConfigCopy.trustManagerFactoryAlgo=action.payload
            return {...state,trustStoreConfig:keyStoreConfigCopy}
        }

        case 'DESTC_IP_VERSION':{
            const currentHttpServerCopr={...state.currentHttpServer}
            currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=action.payload
            return {...state,currentHttpServer:currentHttpServerCopr}
        }
        case 'DESTC_DESTINATION_NAME':{
            const currentHttpServerCopr={...state.currentHttpServer}
            currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=action.payload
            return {...state,currentHttpServer:currentHttpServerCopr}
        }
        case 'DESTC_SERVER_IP':{
            const currentHttpServerCopr={...state.currentHttpServer}
            currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=action.payload
            return {...state,currentHttpServer:currentHttpServerCopr}
        }
        case 'DESTC_SERVER_PORT':{
            const currentHttpServerCopr={...state.currentHttpServer}
            currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=action.payload
            return {...state,currentHttpServer:currentHttpServerCopr}
        }
        case 'DESTC_DESTINATION_FOLDER':{
            const currentHttpServerCopr={...state.currentHttpServer}
            currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationFolder=action.payload
            return {...state,currentHttpServer:currentHttpServerCopr}
        }
        case 'DESTC_SSL':{
            const currentHttpServerCopr={...state.currentHttpServer}
            currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=action.payload
            return {...state,currentHttpServer:currentHttpServerCopr}
        }
        case 'SET_HTTP_USE_PROXY': {
            const currentHttpServerCopr={...state.currentHttpServer}
            currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=action.payload
            return {...state,currentHttpServer:currentHttpServerCopr}
        }
        case 'SET_MIRROR_USE_PROXY': {
            const currentMirrorServerCopy={...state.currentMirrorServer}
            currentMirrorServerCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=action.payload
            return {...state,currentMirrorServer:currentMirrorServerCopy}
        }
        case 'SET_HEP3_USE_PROXY': {
            const currentHep3ServerCopy={...state.currentHep3Server}
            currentHep3ServerCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopy}
        }
        case 'SET_KAFKA_USE_PROXY': {
            const currentKafkaClusterCopy={...state.currentKafkaCluster}
            currentKafkaClusterCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=action.payload
            return {...state,currentKafkaCluster:currentKafkaClusterCopy}
        }
        case 'SET_RM_USE_PROXY': {
            const currentRemotefileCopy={...state.currentRemotefile}
            currentRemotefileCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=action.payload
            return {...state,currentRemotefile:currentRemotefileCopy}
        }
        case 'DESTC_MIRROR_IP_VERSION':{
            const currentMirrorServerCopr={...state.currentMirrorServer}
            currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=action.payload
            return {...state,currentMirrorServer:currentMirrorServerCopr}
        }
        case 'DESTC_MIRROR_DESTINATION_NAME':{
            const currentMirrorServerCopr={...state.currentMirrorServer}
            currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=action.payload
            return {...state,currentMirrorServer:currentMirrorServerCopr}
        }
        case 'DESTC_MIRROR_SERVER_IP':{
            const currentMirrorServerCopr={...state.currentMirrorServer}
            currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=action.payload
            return {...state,currentMirrorServer:currentMirrorServerCopr}
        }
        case 'DESTC_MIRROR_SERVER_PORT':{
            const currentMirrorServerCopr={...state.currentMirrorServer}
            currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=action.payload
            return {...state,currentMirrorServer:currentMirrorServerCopr}
        }
        case 'DESTC_MIRROR_FQDN':{
            const currentMirrorServerCopr={...state.currentMirrorServer}
            currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=action.payload
            return {...state,currentMirrorServer:currentMirrorServerCopr}
        }
        case 'DESTC_MIRROR_SSL':{
            const currentMirrorServerCopr={...state.currentMirrorServer}
            currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=action.payload
            return {...state,currentMirrorServer:currentMirrorServerCopr}
        }
        case 'DESTC_HEP3_IP_VERSION':{
            const currentHep3ServerCopr={...state.currentHep3Server}
            currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopr}
        }
        case 'DESTC_HEP3_FQDN':{
            const currentHep3ServerCopy={...state.currentHep3Server}
            currentHep3ServerCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopy}
        }
        case 'DESTC_HTTP_FQDN':{
            const currentHttpserverCopy={...state.currentHttpServer}
            currentHttpserverCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=action.payload
            return {...state,currentHttpServer:currentHttpserverCopy}
        }
        case 'DESTC_KAFKA_FQDN':{
            const currentKafkaserverCopy={...state.currentKafkaCluster}
            currentKafkaserverCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=action.payload
            return {...state,currentKafkaCluster:currentKafkaserverCopy}
        }
        case 'DESTC_RF_FQDN':{
            const currentRFserverCopy={...state.currentRemotefile}
            currentRFserverCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=action.payload
            return {...state,currentRemotefile:currentRFserverCopy}
        }
        case 'DESTC_DESTINATION_NAME_2':{
            const currentHep3ServerCopr={...state.currentHep3Server}
            currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopr}
        }
        case 'DESTC_HEP3_SERVER_IP':{
            const currentHep3ServerCopr={...state.currentHep3Server}
            currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopr}
        }
        case 'DESTC_HEP3_SERVER_PORT':{
            const currentHep3ServerCopr={...state.currentHep3Server}
            currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopr}
        }
        case 'ADD_HEP3_PROXY_BOX':{
            return {...state,proxyBox:action.payload}
        }
        case 'ADD_HEP3_PROXY_ADDRESS':{
            const currentHep3ServerCopr={...state.currentHep3Server}
            currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].proxyAddress=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopr}
        }
        case 'ADD_HEP3_PROXY_PORT':{
            const currentHep3ServerCopr={...state.currentHep3Server}
            currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].proxyPort=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopr}
        }
        case 'DESTC_KAFKA_IP_VERSION':{
            const currentKafkaClusterCopr={...state.currentKafkaCluster}
            currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion=action.payload
            return {...state,currentKafkaCluster:currentKafkaClusterCopr}
        }
        case 'DESTC_DESTINATION_NAME_3':{
            const currentKafkaClusterCopr={...state.currentKafkaCluster}
            currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=action.payload
            return {...state,currentKafkaCluster:currentKafkaClusterCopr}
        }
        case 'DESTC_KAFKA_SERVER_IP':{
            const currentKafkaClusterCopr={...state.currentKafkaCluster}
            currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp=action.payload
            return {...state,currentKafkaCluster:currentKafkaClusterCopr}
        }
        case 'DESTC_KAFKA_SERVER_PORT':{
            const currentKafkaClusterCopr={...state.currentKafkaCluster}
            currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort=action.payload
            return {...state,currentKafkaCluster:currentKafkaClusterCopr}
        }
        case 'DESTC_KAFKA_TOPIC_NAME':{
            const currentKafkaClusterCopr={...state.currentKafkaCluster}
            currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].topicName=action.payload
            return {...state,currentKafkaCluster:currentKafkaClusterCopr}
        }
        case 'DESTC_RM_IP_VERSION':{
            const currentRemotefileCopr={...state.currentRemotefile}
            currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=action.payload
            return {...state,currentRemotefile:currentRemotefileCopr}
        }
        case 'DESTC_DESTINATION_NAME_4':{
            const currentRemotefileCopr={...state.currentRemotefile}
            currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=action.payload
            return {...state,currentRemotefile:currentRemotefileCopr}
        }
        case 'DESTC_RM_SERVER_IP':{
            const currentRemotefileCopr={...state.currentRemotefile}
            currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=action.payload
            return {...state,currentRemotefile:currentRemotefileCopr}
        }
        case 'DESTC_RM_SERVER_PORT':{
            const currentRemotefileCopr={...state.currentRemotefile}
            currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=action.payload
            return {...state,currentRemotefile:currentRemotefileCopr}
        }
        case 'DESTC_RM_SSL':{
            const currentRemotefileCopr={...state.currentRemotefile}
            currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=action.payload
            return {...state,currentRemotefile:currentRemotefileCopr}
        }

        case 'SET_HEP3_SSL_VALUE':{
            const currentHep3ServerCopy={...state.currentHep3Server}
            currentHep3ServerCopy.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=action.payload
            return {...state,currentHep3Server:currentHep3ServerCopy}
        }

        case 'SET_ALL_DESTC_DATA':{
            return {...state,newEditData:action.payload}
        }
        case 'SET_CURRENT_DST_PROFILE_EDIT':{
            const currentNameCopy=action.payload
            let productCopy
            let newEditDataCopy=JSON.parse(JSON.stringify(state.newEditData))
            if(!!newEditDataCopy)
            {
                let product=newEditDataCopy.filter(config=>{
                    return config.destinationName === currentNameCopy
                })
                productCopy=product[0]
            }        
            switch(productCopy.destinationType)
                {   
                    case 'HTTP SERVER':{
                        let currentHttpIPvFQDNCopy={...state.HttpIpVFqdn} 
                        const currentHttpServerCopr={...state.currentHttpServer}
                        let edrConfigTypeCopy
                        let trustStoreConfigCopy={...state.trustStoreConfig}
                        let keyStoreConfigCopy={...state.keyStoreConfig}
                        let usableBoolCopy={...state.usableBool}
                        usableBoolCopy=false
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=productCopy.serverIpVersion
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=productCopy.serverIp
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=productCopy.serverPort
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationFolder=productCopy.destinationFolder
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=productCopy.useSSL?'true':'false'
                        if(currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentHttpIPvFQDNCopy = 'IP'
                        }
                        else{
                            currentHttpIPvFQDNCopy = 'FQDN'    
                        }
                        if(productCopy.useSSL){
                            usableBoolCopy=true
                            if(productCopy['keyStoreConfig'] === null)
                            {
                                trustStoreConfigCopy=productCopy.trustStoreConfig
                                edrConfigTypeCopy='TrustStore Configuration'
                            }
                            else
                            {
                                keyStoreConfigCopy=productCopy.keyStoreConfig
                                edrConfigTypeCopy='KeyStore Configuration'
                            }
                        }
                        return {...state,usableBool:usableBoolCopy,HttpIpVFqdn:currentHttpIPvFQDNCopy,trustStoreConfig:trustStoreConfigCopy,keyStoreConfig:keyStoreConfigCopy,currentHttpServer:currentHttpServerCopr,edrConfigType:edrConfigTypeCopy,edrType:'HTTP Server'}
                    }
                    case 'MIRROR SERVER':{
                        let currentIPvFQDNCopr={...state.ipVfqdn}
                        const currentMirrorServerCopr={...state.currentMirrorServer}
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=productCopy.serverIpVersion
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=productCopy.serverIp
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=productCopy.serverPort
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=productCopy.useSSL?'true':'false'
                        if(currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentIPvFQDNCopr = 'IP'
                        }
                        else{
                            currentIPvFQDNCopr = 'FQDN'    
                        }
                        return {...state,currentMirrorServer:currentMirrorServerCopr,ipVfqdn:currentIPvFQDNCopr,edrType:'Message Mirror'}
                    }
                    case 'REMOTE FILE':{
                        const currentRemotefileCopr={...state.currentRemotefile}
                        let currentRFIPvFQDNCopy={...state.RFIpVFqdn} 
                        let edrConfigTypeCopy
                        let trustStoreConfigCopy={...state.trustStoreConfig}
                        let keyStoreConfigCopy={...state.keyStoreConfig}
                        let usableBoolCopy={...state.usableBool}
                        usableBoolCopy=false
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=productCopy.serverIpVersion
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=productCopy.serverIp
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=productCopy.serverPort
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=productCopy.useSSL?'true':'false'
                        if(currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentRFIPvFQDNCopy = 'IP'
                        }
                        else{
                            currentRFIPvFQDNCopy = 'FQDN'    
                        }
                        if(productCopy.useSSL){
                            usableBoolCopy=true
                            if(productCopy['keyStoreConfig'] === null)
                            {
                                trustStoreConfigCopy=productCopy.trustStoreConfig
                                edrConfigTypeCopy='TrustStore Configuration'
                            }
                            else
                            {
                                keyStoreConfigCopy=productCopy.keyStoreConfig
                                edrConfigTypeCopy='KeyStore Configuration'
                            }
                        }
                        return {...state,usableBool:usableBoolCopy,RFIpVFqdn:currentRFIPvFQDNCopy,trustStoreConfig:trustStoreConfigCopy,keyStoreConfig:keyStoreConfigCopy,currentRemotefile:currentRemotefileCopr,edrConfigType:edrConfigTypeCopy,edrType:'Remote File'}
                    
                    }
                    
                    case 'HEP3 SERVER':{
                        let currentHep3IPvFQDNCopy={...state.Hep3IpVFqdn}
                        const currentHep3ServerCopr={...state.currentHep3Server}
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=productCopy.serverIpVersion
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=productCopy.serverIp
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=productCopy.serverPort
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=productCopy.useSSL?'true':'false'
                        if(currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentHep3IPvFQDNCopy = 'IP'
                        }
                        else{
                            currentHep3IPvFQDNCopy = 'FQDN'    
                        }
                        return {...state,currentHep3Server:currentHep3ServerCopr,Hep3IpVFqdn:currentHep3IPvFQDNCopy,edrType:'HEP3 Server'}
                    }

                    case 'KAFKA':{
                        const currentKafkaClusterCopr={...state.currentKafkaCluster} 
                        let currentKafkaIPvFQDNCopy={...state.KafkaIpVFqdn} 
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].topicName=productCopy.topicName
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion=productCopy.clusterIpVersion
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp=productCopy.clusterIp
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort=productCopy.clusterPort
                        if(currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentKafkaIPvFQDNCopy = 'IP'
                        }
                        else{
                            currentKafkaIPvFQDNCopy = 'FQDN'    
                        }
                        return {...state,currentKafkaCluster:currentKafkaClusterCopr,KafkaIpVFqdn:currentKafkaIPvFQDNCopy,edrType:'Kafka Cluster'}          
                    }

                    default :{
                        return {...state,newEditData:action.payload}
                    }

                }   
        }

        case 'SET_CURRENT_DST_PROFILE_VIEW':{
            const currentNameCopy=action.payload
            let productCopy
            let newEditDataCopy=JSON.parse(JSON.stringify(state.newEditData))
            if(!!newEditDataCopy)
            {
                let product=newEditDataCopy.filter(config=>{
                    return config.destinationName === currentNameCopy
                })
                productCopy=product[0]
            }        
            switch(productCopy.destinationType)
                {   
                    case 'HTTP SERVER':{
                        let currentHttpIPvFQDNCopy={...state.HttpIpVFqdn} 
                        const currentHttpServerCopr={...state.currentHttpServer}
                        let edrConfigTypeCopy
                        let trustStoreConfigCopy={...state.trustStoreConfig}
                        let keyStoreConfigCopy={...state.keyStoreConfig}
                        let usableBoolCopy={...state.usableBool}
                        usableBoolCopy=false
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=productCopy.serverIpVersion
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=productCopy.serverIp
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=productCopy.serverPort
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationFolder=productCopy.destinationFolder
                        currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=productCopy.useSSL?'true':'false'
                        if(currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentHttpServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentHttpIPvFQDNCopy = 'IP'
                        }
                        else{
                            currentHttpIPvFQDNCopy = 'FQDN'    
                        }
                        if(productCopy.useSSL){
                            usableBoolCopy=true
                            if(productCopy['keyStoreConfig'] === null)
                            {
                                trustStoreConfigCopy=productCopy.trustStoreConfig
                                edrConfigTypeCopy='TrustStore Configuration'
                            }
                            else
                            {
                                keyStoreConfigCopy=productCopy.keyStoreConfig
                                edrConfigTypeCopy='KeyStore Configuration'
                            }
                        }
                        return {...state,usableBool:usableBoolCopy,HttpIpVFqdn:currentHttpIPvFQDNCopy,trustStoreConfig:trustStoreConfigCopy,keyStoreConfig:keyStoreConfigCopy,currentHttpServer:currentHttpServerCopr,edrConfigType:edrConfigTypeCopy,edrType:'HTTP Server'}
                    }
                    case 'MIRROR SERVER':{
                        let currentIPvFQDNCopr={...state.ipVfqdn}
                        const currentMirrorServerCopr={...state.currentMirrorServer}
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=productCopy.serverIpVersion
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=productCopy.serverIp
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=productCopy.serverPort
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=productCopy.useSSL?'true':'false'
                        if(currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentMirrorServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentIPvFQDNCopr = 'IP'
                        }
                        else{
                            currentIPvFQDNCopr = 'FQDN'    
                        }
                        return {...state,currentMirrorServer:currentMirrorServerCopr,ipVfqdn:currentIPvFQDNCopr,edrType:'Message Mirror'}
                    }
                    case 'REMOTE FILE':{
                        const currentRemotefileCopr={...state.currentRemotefile}
                        let currentRFIPvFQDNCopy={...state.RFIpVFqdn} 
                        let edrConfigTypeCopy
                        let trustStoreConfigCopy={...state.trustStoreConfig}
                        let keyStoreConfigCopy={...state.keyStoreConfig}
                        let usableBoolCopy={...state.usableBool}
                        usableBoolCopy=false
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=productCopy.serverIpVersion
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=productCopy.serverIp
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=productCopy.serverPort
                        currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=productCopy.useSSL?'true':'false'
                        if(currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentRemotefileCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentRFIPvFQDNCopy = 'IP'
                        }
                        else{
                            currentRFIPvFQDNCopy = 'FQDN'    
                        }
                        if(productCopy.useSSL){
                            usableBoolCopy=true
                            if(productCopy['keyStoreConfig'] === null)
                            {
                                trustStoreConfigCopy=productCopy.trustStoreConfig
                                edrConfigTypeCopy='TrustStore Configuration'
                            }
                            else
                            {
                                keyStoreConfigCopy=productCopy.keyStoreConfig
                                edrConfigTypeCopy='KeyStore Configuration'
                            }
                        }
                        return {...state,usableBool:usableBoolCopy,RFIpVFqdn:currentRFIPvFQDNCopy,trustStoreConfig:trustStoreConfigCopy,keyStoreConfig:keyStoreConfigCopy,currentRemotefile:currentRemotefileCopr,edrConfigType:edrConfigTypeCopy,edrType:'Remote File'}
                    
                    }
                    
                    case 'HEP3 SERVER':{
                        let currentHep3IPvFQDNCopy={...state.Hep3IpVFqdn}
                        const currentHep3ServerCopr={...state.currentHep3Server}
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIpVersion=productCopy.serverIpVersion
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverIp=productCopy.serverIp
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].serverPort=productCopy.serverPort
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useSSL=productCopy.useSSL?'true':'false'
                        if(currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentHep3ServerCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentHep3IPvFQDNCopy = 'IP'
                        }
                        else{
                            currentHep3IPvFQDNCopy = 'FQDN'    
                        }
                        return {...state,currentHep3Server:currentHep3ServerCopr,Hep3IpVFqdn:currentHep3IPvFQDNCopy,edrType:'HEP3 Server'}
                    }

                    case 'KAFKA':{
                        const currentKafkaClusterCopr={...state.currentKafkaCluster} 
                        let currentKafkaIPvFQDNCopy={...state.KafkaIpVFqdn} 
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=productCopy.destinationName
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].topicName=productCopy.topicName
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIpVersion=productCopy.clusterIpVersion
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterIp=productCopy.clusterIp
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn=productCopy.fqdn
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].useProxy=productCopy.useProxy?'true':'false'
                        currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].clusterPort=productCopy.clusterPort
                        if(currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === '' || currentKafkaClusterCopr.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].fqdn === null){
                            currentKafkaIPvFQDNCopy = 'IP'
                        }
                        else{
                            currentKafkaIPvFQDNCopy = 'FQDN'    
                        }
                        return {...state,currentKafkaCluster:currentKafkaClusterCopr,KafkaIpVFqdn:currentKafkaIPvFQDNCopy,edrType:'Kafka Cluster'}          
                    }

                    default :{
                        return {...state,newEditData:action.payload}
                    }

                }   
        }
        default:
            return state;
    }
}