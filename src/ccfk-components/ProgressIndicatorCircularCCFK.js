import React from 'react';
import styled from 'styled-components';
import CircularProgressIndicatorIndeterminate, { CircularProgressIndicatorIndeterminateOverlay } from '@nokia-csf-uxr/ccfk/CircularProgressIndicatorIndeterminate';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: inline;
  padding-right: 50px;
  margin: auto;
  text-align: center;
`;
const OverlayWrapper = styled.div`
    width: ${(props) => `${props.circleSize}px`};
    height: ${(props) => `${props.circleSize}px`};
`;

const returnIndicatorBasedOnSizeNoOverlay=(size)=>{
    switch(size){
        case "small":return [20,6]
        case "medium":return [24,6]
        case "large":return [32,5]
        case "xlarge":return [54,5]
        case "xxlarge":return [96,3]
        default: return [24,6]
    }
}

const returnIndicatorBasedOnSizeOverlay=(size)=>{
    switch(size){
        case "small":return [26,6]
        case "medium":return [30,6]
        case "large":return [38,5]
        case "xlarge":return [48,5]
        case "xxlarge":return [102,3]
        default: return [30,6]
    }
}
const ProgressIndicatorCircularCCFK = ({size="medium",overlay=false}) => {
    if (overlay) {
        return (
          <ContentWrapper>
            <Wrapper id={size}>
              <CircularProgressIndicatorIndeterminateOverlay overlaySize={returnIndicatorBasedOnSizeOverlay(size)[0]}>
                <CircularProgressIndicatorIndeterminate strokeWidth={returnIndicatorBasedOnSizeOverlay(size)[1]} fade={false} />
              </CircularProgressIndicatorIndeterminateOverlay>
            </Wrapper>
          </ContentWrapper>
        );
    }    
  return (
    <ContentWrapper>
      <Wrapper id={size}>
        <OverlayWrapper circleSize={returnIndicatorBasedOnSizeNoOverlay(size)[0]}>
          <CircularProgressIndicatorIndeterminate strokeWidth={returnIndicatorBasedOnSizeNoOverlay(size)[1]} fade={false} />
        </OverlayWrapper>
      </Wrapper>
    </ContentWrapper>
  );
};
export default ProgressIndicatorCircularCCFK;
