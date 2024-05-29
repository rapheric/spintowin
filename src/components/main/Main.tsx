import React from 'react'
import styled from '@emotion/styled';
import Footer from '../footer/Footer'
import Card from '../Card/Card'

const Main = () => {
  return (
    <CardContainer>
    <Card/>
    <Footer/>
    </CardContainer>
  )
}
const CardContainer = styled.div`
// display:flex;
// flex-direction:column;
width:100%;
max-width:660px;
width:100%;
margin:0px;
padding:0px;
max-width:1000px;
align-items:center;
justify-content:center;
// margin-left:50px;
`
export default Main;