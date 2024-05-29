import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes} from '@emotion/react';

const numbers = [
  { value: 0, color: 'green' },
  { value: 1, color: 'red' },
  { value: 2, color: 'black' },
  { value: 3, color: 'red' },
  { value: 4, color: 'black' },
  { value: 5, color: 'red' },
  { value: 6, color: 'black' },
  { value: 7, color: 'red' },
  { value: 8, color: 'black' },
  { value: 9, color: 'red' },
  { value: 10, color: 'black' },
  { value: 11, color: 'black' },
  { value: 12, color: 'red' },
  { value: 13, color: 'black' },
  { value: 14, color: 'red' },
  { value: 15, color: 'black' },
  { value: 16, color: 'red' },
  { value: 17, color: 'black' },
  { value: 18, color: 'red' },
  { value: 19, color: 'red' },
  { value: 20, color: 'black' },
  { value: 21, color: 'red' },
  { value: 22, color: 'black' },
  { value: 23, color: 'red' },
  { value: 24, color: 'black' },
  { value: 25, color: 'red' },
  { value: 26, color: 'black' },
  { value: 27, color: 'red' },
  { value: 28, color: 'black' },
  { value: 29, color: 'black' },
  { value: 30, color: 'red' },
  { value: 31, color: 'black' },
  { value: 32, color: 'red' },
  { value: 33, color: 'black' },
  { value: 34, color: 'red' },
  { value: 35, color: 'black' },
  { value: 36, color: 'red' },
];

interface WheelProps{
  currentNumber?:number|null;
  randomNumber?:number|null;
}

const SpinnerWheel: React.FC<WheelProps> = ({currentNumber,randomNumber}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(0);

  const drawWheel = (ctx: CanvasRenderingContext2D) => {
    const radius = 200;
    const centerX = 250;
    const centerY = 250;
    const anglePerSegment = (2 * Math.PI) / numbers.length;

    numbers.forEach((num, index) => {
      const startAngle = index * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = num.color;
      ctx.fill();

      ctx.strokeStyle = '#000';
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment);
      ctx.textAlign = 'start';
      ctx.fillStyle = 'white';
      ctx.font = '14px Arial ';
      ctx.fillText(num.value.toString(), radius / 2, 0);
      ctx.restore();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel(context);
        setAngle(angle);
      }
    }
  }, [angle]);
  
  return (
    <Wrapper>
      <WheelWrapper>
        <canvas ref={canvasRef} width={500} height={500} style={{ transform: `rotate(${angle}deg)` }} />
        <Button> {currentNumber !== null ? currentNumber : randomNumber}</Button>
        <Pointer />
      </WheelWrapper>
    </Wrapper>
  );
};

const spin = keyframes`
        0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
`;

const Wrapper = styled.div`
position: absolute;
top:8%;
left:20%;
z-index:3;
animation: ${spin} 2s linear infinite;

@media (max-width: 768px) {
  padding: 10px;
  font-size: 0.9rem;
}
`;

const WheelWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
`;

const Pointer = styled.div`
  position: absolute ;
  top: 40%;
  left: 50%;
  width: 10;
  height: 10;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid red;
  transform: translate(-100%,-50%);
  z-index: 3;
`;

const Button = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
  font-size: 35px;
  color:white;
  font-weight:500;
  cursor: pointer;
  position: absolute;
  top: 40%;
  left: 40%;
  z-index: 1;
  width:100px;
  height:100px;
  border-radius:50%;
  background-color:black;

`;

export default SpinnerWheel;
