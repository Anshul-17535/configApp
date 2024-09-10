import React from 'react';
import SplitScreen from '@nokia-csf-uxr/ccfk/SplitScreen';
import Pane from '@nokia-csf-uxr/ccfk/SplitScreen/Pane';

const SplitScreenCCFK = ({leftChildren,rightChildren,defaultSplitRatio=50,toggleScreen,primaryPanel="right",style={}}) => {
  return (
    <div style={style}>
      <SplitScreen
        data-test="splitScreen"
        splitScreenType="temporary"
        toggleTemporary={toggleScreen}
        defaultSplitRatio={defaultSplitRatio}
        primaryPanel={primaryPanel}
      >
        <Pane>
          {leftChildren}
        </Pane>
        <Pane>
          {rightChildren}
        </Pane>
      </SplitScreen>
    </div>
  );
}
export default SplitScreenCCFK;