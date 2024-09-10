import React from 'react';
import { createRoot } from "react-dom/client"
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Rulesengine from './components/rulesengine';
import { Provider} from 'react-redux';
import allReducers from "./reducers/index";
import NrfpRulesengine from './components/nrfprulesengine';
import SlfConfiguration from './components/slfConfiguration';
import SlfDestinationMap from './components/slfDestinationMap';
import SlfNfService from './components/slfNfService';
import SlfLookUp from './components/slfLookUp';
import SlfNfProfile from './components/slfNfProfile';
import Messagefilter from './components/messagefilter';
import AdvancedTheme from '@nokia-csf-uxr/ccfk/AdvancedTheme';
import MediationProfile from './components/mediationProfile';
import FieldDefination from './components/fieldDefination';
import StaticProfile from './components/staticProfile';
import ProbeStatus from './components/probestatus'
import Throttling from './components/throttling';
import ThrottlingConfig from './components/throttlingConfig';
import PeerConfig from './components/peerConfig';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import '@nokia-csf-uxr/nokia-design-system-tokens/css/_variables.css';
import { ComponentsContextProvider } from '@nokia-csf-uxr/ccfk/common/components-context-provider';
import Tracingprofile from './components/tracingprofile';
import DestinationTracing from './components/destinationtracing';

const store = createStore(
    allReducers,applyMiddleware(thunk)
);

const app = document.getElementById("root");

const root = createRoot(app);

root.render(
    <Provider store={store}>
        <Router>
            <AdvancedTheme advancedTheme="CCFK FreeForm - Light">
                <ComponentsContextProvider direction={{ RTL: false }} disableAnimation={false}>
                        <div>
                            <Switch>
                                <Route exact path='/gui/nscp/' component={Rulesengine} />
                                <Route exact path='/gui/nnrfp/' component={NrfpRulesengine} />
                                <Route exact path='/gui/nmf/' component={Messagefilter} />
                                <Route exact path='/gui/nslfconfig/' component={SlfConfiguration} />
                                <Route exact path='/gui/nslfdestinationmap/' component={SlfDestinationMap} />
                                <Route exact path='/gui/nslflookup/' component={SlfLookUp} />
                                <Route exact path='/gui/nslfnfservice' component={SlfNfService}/>
                                <Route  exact path='/gui/nslfnfprofile' component={SlfNfProfile}/>
                                <Route exact path='/gui/tcp/' component={Tracingprofile}/>
                                <Route exact path='/gui/destc/' component={DestinationTracing}/>
                                <Route exact path='/gui/mpc/' component={MediationProfile}/>
                                <Route exact path='/gui/fdc/' component={FieldDefination}/>
                                <Route exact path='/gui/prbst/' component={ProbeStatus}/>
                                <Route exact path='/gui/thrp/' component={Throttling} />
                                <Route exact path='/gui/peerconfig/' component={PeerConfig}/>
                                <Route exact path='/gui/thrconfig/' component={ThrottlingConfig}/>
                                <Route exact path='/gui/statprof/' component={StaticProfile}/>
                            </Switch>
                        </div>
                </ComponentsContextProvider>
            </AdvancedTheme>
        </Router>
    </Provider>
)

//serviceWorker();
