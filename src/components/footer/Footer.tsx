import React from 'react';
import styled from '@emotion/styled';
import {faQuestion,faDollarSign,faChartSimple} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OuterDiv = styled.div`
  // border: 1px solid #ccc;
  // padding: 3px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:961px;
  height:28px;
  // margin:0px;
  font-family: Roboto;
  font-size: 13px;
  color:white;
  margin-bottom:-67px;
    background-color: #013b93;

    @media (max-width: 768px) {
      padding: 10px;
      font-size: 0.9rem;
    }
}
`;

const FirstCol = styled.div`
box-sizing: border-box;
max-width: 100%;
-webkit-box-flex: 1;
-ms-flex: 1 1 0%;
flex: 1 1 0%;
padding: 0;
padding-right: 30px;
text-align: center;
color:white;
font-size:14px;
font-weight:400;
`;
const SecondCol = styled.div`
box-sizing: border-box;
max-width: 100%;
-webkit-box-flex: 1;
-ms-flex: 1 1 0%;
flex: 1 1 0%;
padding: 0;
font-size:14px;
font-weight:400;
`
const ThirdCol = styled.div`
-webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    margin-left: auto;
`

const BlueButton = styled.button`
  color: #fff;
  width:58px;
  height: 24px;
  margin-left: 3px;
  font-size: 12px;
  cursor: pointer;
  background-color: #1967ff;
  border-radius: 2px;
  border:none;
`;
const StyledAnchor = styled.a`
    // font-style: normal;
    // font-weight: 400;
margin: auto;
font-size: 12px;
height: 12px;;
 width:12px;
//  border-radius:50%;
// margin-left: 3px;
color:gray;
// font-size: 12px;
cursor: pointer;
background-color: white;
// border-radius: 20px;
&:hover {
    background-color: gray;  
}
`
 const StyledSpan = styled.span`
    box-sizing: border-box;
    width:12px;
    height: 12px;
    margin-left: 3px;
    font-size: 12px;
    cursor: pointer;
    background-color: #1967ff;
    border-radius: 2px;
    font-family: icons-system;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    cursor: pointer;
    text-transform: none;
 `

const Footer: React.FC = () => {
  return (
    <OuterDiv>
      <FirstCol>
        <div>Bet limits: KSh10.00 - KSh10,000.00</div>
      </FirstCol>
      <SecondCol>
        <div>Maximum payout: 50,000.00</div>
      </SecondCol>
      <ThirdCol>
        <div>
          <BlueButton> 
          <StyledSpan>
            <StyledAnchor href="https://virtual-games.virtustec.com/desktop-v4/default/assets/rules/en-GB/casinogame/how_to_play_casinogame_spin2win_deluxe_en-GB.pdf" target="_blank">
                <FontAwesomeIcon icon={faQuestion} />
            </StyledAnchor>
            </StyledSpan>
          </BlueButton>
          <BlueButton><StyledSpan><FontAwesomeIcon icon={faDollarSign} /></StyledSpan></BlueButton>
          <BlueButton><FontAwesomeIcon icon={faChartSimple} /></BlueButton>
        </div>
      </ThirdCol>
    </OuterDiv>
  );
};

export default Footer;
