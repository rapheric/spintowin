import React from 'react';
import styled from '@emotion/styled';

interface GenProps{
  backGroundColor: string ;
}
interface NavProps {
  imageUrlFire: string;
  generatedRandomNumbers: Array<number>
  imageUrlCold:string;
}
const Navbar: React.FC<NavProps> = ({ imageUrlFire, generatedRandomNumbers,imageUrlCold }) => {

  const changeBackground = (n:number) =>{
    const blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
    const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    if(blackNumbers.includes(n)){
      return "black";
    }
    if(redNumbers.includes(n)){
      return "red"
    }
   
    return "green"
  }

  return (
    <NavbarContainer>
      <NavItemOne>
      {generatedRandomNumbers.length>0 ?
         generatedRandomNumbers.map((n) => (
        <GenRandom key={n} backGroundColor={changeBackground(n)}> 
        {n}
        </GenRandom>
      )) : <div>Statistics not available yet..</div>
      }
      </NavItemOne>
      <DivContainer>
          <FireNumbers>
            <StatImage src={imageUrlFire} />
            <StatsDiv>6</StatsDiv>
            <StatsDiv>16</StatsDiv>
            <StatsDiv>3 </StatsDiv>
            <StatsDiv>12</StatsDiv>
            <StatsDiv>13</StatsDiv>
          </FireNumbers>
          <ColdNumbers>
            <StatsDivR>36</StatsDivR>
            <StatsDivR>35</StatsDivR>
            <StatsDivR>34</StatsDivR>
            <StatsDivR>33</StatsDivR>
            <StatsDivR>32</StatsDivR>
            <StatImage src={imageUrlCold} />
          </ColdNumbers>
      </DivContainer>
    </NavbarContainer>
  );
};
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, .35);
  color: #fff;
   width:100%;
  top:0px;
  max-width:940px;
  max-height:360px;
  height:100%;
  margin-bottom:25px;
  margin-top:-66px;
  box-shadow:border-box;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const NavItemOne = styled.div`
display:flex;
align-items:center;
max-width: 550px;
height: 36px;
padding-left: 6px;
font-family: Adamina;
border-radius: 3px;
`;
const ColdNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 179px;
  height: 31px;
  margin-right: 3px;
  padding-bottom:2px;
  color: #005383;
  background: -webkit-gradient(linear, left top, left bottom, from(#7eccff), to(#d3fffc));
  background: linear-gradient(180deg, #7eccff 0, #d3fffc 100%);
  border-radius: 3px;
  
`;
const FireNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 180px;
  height: 31px;
  padding-bottom:2px;
  padding-left: 9px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 24, 59, 0)), color-stop(55.08%, #ff3131), to(#ff7e31));
  background: linear-gradient(180deg, rgba(0, 24, 59, 0) 0, #ff3131 55.08%, #ff7e31 100%);
    border-radius: 0 0 3px 3px;
`;
const StatsDivR = styled.div`
  border-radius: 50%;
  font-size:16px;
  font-weight:700;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-right: 3px;
  color: #005383;
  width: 24px;
  height: 24px;
  padding: 0 3px;
  margin-right: 5px;
  font-size: 16px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .5);
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .5)
  background: -webkit-gradient(linear, left top, left bottom, from(#7eccff), to(#d3fffc));
  background: linear-gradient(180deg, #7eccff 0, #d3fffc 100%);
  border-radius: 13px;
`;
const StatsDiv = styled.div`
  border-radius: 50%;
  align-items:center;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  padding: 0 3px;
  margin-right: 5px;
  font-size: 16px;
  // border-radius: 5px;
  -webkit-box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .5);
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .5);
  `;

const StatImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  filter: none;
  border-radius:50%;
  width: 24px;
    height: 24px;
  `
const DivContainer = styled.div`
display:flex;
gap:5px;
width: 354px;
 height: 36px;
 font-family: Adamina;
`
const GenRandom = styled.div<GenProps>`
width:23px;
height:23px;
padding:3px;
color:white;
font-size:16px;
font-weight:500;
display:flex;
justify-content:center;
align-items:center;
border-radius:5px;
margin-right:3px;
background-color:${(props) => (props.backGroundColor)};
`
export default Navbar;
