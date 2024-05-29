import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  padding: 10px;
  color: #fff;
  background-color:blue;
  margin-top:40px;
`;

const BalanceAmount = styled.div`
font-size: 18px;
font-weight: 600;
line-height: 27px;
color: #2d2d2d;
text-transform: none;
`;

const BalanceTitle = styled.div`
    padding-bottom: 5px;
    font-size: 11px;
    line-height: 13px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #4a4a4a;
`;


const Button = styled.button`
  cursor: pointer;
  width: 180px;
  height: 60px;
  color: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 0 6px 6px 0 rgba(0, 0, 0, .5);
  font-family: Roboto;
  font-size: 16px;
  text-transform: initial;
  background-color:	#FFE5B4;

`;
const StakeBalance = styled.div`
    display: inline-block;
    width: 122px;
    height: 60px;
    padding: 3px 0 0 3px;
    font-family: Roboto;
    text-align: left;
    background: #efefef;
    border: 2px solid #d9d9d9;
    border-radius: 3px;
    margin-right: 3px;
}
`
// const OuterDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
// `;

// const InnerDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;


// const Span = styled.span`
//     font-family: Roboto;
//     font-size: 11px;
//     font-weight: 700;
//     line-height: 15px;
//     color: #fff;
//     text-transform: none;
// `;


const OuterDiv = styled.div`
  width: 270px;
  height:80px;
  display: flex;
  justify-content: space-between;
  items: center;
`;

const InnerDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  display: flex;
  flex-direction: column;
`;

const Span = styled.span`
  font-family: Roboto;
    font-size: 10px;
      font-weight: 600;
      line-height: 15px;
      color: #fff;
      text-transform: none;
`;
const ChildDiv = styled.div`
 margin-bottom: 5px;
 cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #007bff;
`
const ActionDiv = styled.div`
width:250px;
height:50px;
`
const RightDiv = styled.div`
display:flex;
gap:30px;
`
const ButtonDiv = styled.div`

`

const Stake: React.FC = () => {
  return (
    <FooterContainer>
        <div>
       <StakeBalance>
        <BalanceTitle>TOTAL BET</BalanceTitle>
        <BalanceAmount>KSh0.00</BalanceAmount>
       </StakeBalance>
       </div>
     <RightDiv>
      <ActionDiv>
       <OuterDiv>
      <InnerDiv>
        <ChildDiv />
        <Span>KSh500</Span>
      </InnerDiv>
      <InnerDiv>
        <ChildDiv />
        <Span>KSh400</Span>
      </InnerDiv>
      <InnerDiv>
        <ChildDiv />
        <Span>KSh200</Span>
      </InnerDiv>
      <InnerDiv>
        <ChildDiv></ChildDiv>
        <Span>KSh100</Span>
      </InnerDiv>
      <InnerDiv>
        <ChildDiv />
        <Span>KSh50</Span>
      </InnerDiv>
      <InnerDiv>
        <ChildDiv></ChildDiv>
        <Span>KSh10</Span>
      </InnerDiv>
    </OuterDiv>
    </ActionDiv>
      <ButtonDiv>
        <Button>Login to place bets</Button>
      </ButtonDiv>
      </RightDiv>
    </FooterContainer>
   
  );
};



    // const getDefaultRandomNumberOccurences = ()=>{
    //     let oc: RandomNuberOccurrences[] = [];
    //     Array.from({ length: 37 }, (value, index) => index)
    //         .map(x=> {
    //             oc.push({randomNumer: x, occurrence: 0})
    //         });

    //         console.log(oc);
            
    //     return oc;
    // }

    // const [randomNumberOccurrences, setRandomNumberOccurrences] = useState<RandomNuberOccurrences[]>([]);

    
    // const resetRandomNumberOccurrences = () => {

    //     Array.from({ length: 37 }, (value, index) => index)
    //     .map(x=> {
    //         let indexR = randomNumberOccurrences.findIndex(y=> y.randomNumber === x);
    //         if(indexR === -1){
    //             randomNumberOccurrences.push({randomNumber: x, occurrence: 0})
    //         }
    //     });


    //     generatedRandomNumbers.forEach(x=>{
    //         let index = randomNumberOccurrences.findIndex(y=> y.randomNumber === x);
    //         if(index >=0)
    //         randomNumberOccurrences[index].occurrence += 1;
    //     else{
    //         randomNumberOccurrences.push({randomNumber: x, occurrence: 1})
    //     }
    //     });

    //     setRandomNumberOccurrences(randomNumberOccurrences.sort((a,b)=> a.occurrence-b.occurrence));

    //     console.log('randomNumberOccurrences: ',randomNumberOccurrences);
    //     console.log('generatedRandomNumbers: ',generatedRandomNumbers);
    // }

export default Stake;

