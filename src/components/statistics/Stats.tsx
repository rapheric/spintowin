import React from 'react'
import styled from '@emotion/styled'


const Stats: React.FC  = () => {
  return (
    <StyledEvent>
        <p>Event #498</p>
    </StyledEvent>
  )
}
const StyledEvent = styled.div`
margin-top: 30px;
margin-left: 10px;
font-size: 13px;
font-family: Roboto;
text-transform: capitalize;
position: absolute;
top: 30px;
font-size:14px;
font-weight:500;
color:white;
`
export default Stats
