import React, { useState,useRef,useEffect } from 'react';
import styled from '@emotion/styled';
// import { keyframes } from '@emotion/react';
import { faArrowRotateRight, faRotateLeft, faTrashCan ,faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../Nav/Nav';
import Stats from '../statistics/Stats';
 import imageUrlO from '../../assets/orange.png';
import imageUrlP from '../../assets/purple.png';
import imageUrlB from '../../assets/blue.png';
import imageUrlBL from '../../assets/black.png';
import imageUrlG from '../../assets/green.png';
import imageUrlR from '../../assets/red.png';
import imageUrlFire from '../../assets/download.svg';
import imageUrlWin from '../../assets/spin2win-dolly (3).svg';
import imageUrlCold from '../../assets/download (1).svg'
import imageUrlLion from '../../assets/spin2win-royale-lion.c24f2de95fb5e09bb485 (1).svg'

import SpinnerWheel from "../SpinnerWheel/SpinnerWheel";

interface DivProps {
    variant?: 'primary' | 'secondary';
    blink: true | false;
}
interface ListProps {
    blink: true | false;
}

interface ImageProps {
    showBorder?: true |false;
} 

interface PlacedBet {
    Option: string;
    BetAmount: number;
}

interface DiamondProps {
    color: string;
    width: number;
    height: number;
}

// interface RandomNuberOccurrences {
//     randomNumber: number;
//     occurrence: number;
// }



const Card: React.FC =() => {
    const [betAmount, setBetAmount] = useState<number>(10);
    const [payoutAmount, setPayOutAmount] = useState<number>(0);
    const [mouseOverOption, setMouseOverOption] = useState<string>('');
    const [placedBetAmount, setPlacedBetAmount] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [result, setResult] = useState<'win' | 'lose' | null>(null);
    const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
    const [previousPlacedBets, setPreviousPlacedBets] = useState<PlacedBet[]>([]);
    const [openOption, setOpenOption] = useState<boolean>(false);
    // const [creditOpenOption, setCreditOpenOption] = useState<boolean>(false);
    const [spinning, setSpinning] = useState(false);
    const [generatedRandomNumbers, setGeneratedRandomNumbers] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [generatedNumber, setGeneratedNumber] = useState<number | null>(null);
    const [wonOpenOption , setWonOpenOption] = useState<boolean>(false);

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
    };

    const getOptionOdd = (o: string): number => {
        if (o === 'even' || o === 'odd' || o === 'black' || o === 'red' || o === 'low' || o === 'high') {
            return 2;
        }
        else if (o === 'range12' || o === 'range1324' || o === 'range2536') {
            return 3;
        }
        else if (o === '1' || o === '2' || o === '3' || o === '4' || o === '5' || o === '6' || o === '7' ||
            o === '8' || o === '9' || o === '10' || o === '11' || o === '12' || o === '13' || o === '14' || o === '15' ||
            o === '16' || o === '17' || o === '18' || o === '19' || o === '20' || o === '21' || o === '22' || o === '23' ||
            o === '24' || o === '25' || o === '26' || o === '27' || o === '28' || o === '29' || o === '30' || o === '31'
            || o === '32' || o === '33' || o === '34' || o === '35' || o === '36'
        ) {
            return 36;
        }
        return 1;
    }

    useEffect(() => {
        if (spinning) {
          intervalRef.current = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 37);
            setCurrentNumber(randomNum);
          }, 100);
        } else if (!spinning && intervalRef.current) {
          clearInterval(intervalRef.current);
          setCurrentNumber(generatedNumber);
        }

        // setCurrentNumber(randomNumber);
        // setGeneratedNumber(randomNumber)
    
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }, [spinning, randomNumber,generatedNumber]);
    

    const handleSpin = () => {


        setOpenOption(!openOption)
        setSpinning(true);
        const randomNumber = Math.floor(Math.random() * 37);
        
        
        setTimeout(() => {
         
            setSpinning(false);
            setRandomNumber(randomNumber);
            setOpenOption(false);
            setWonOpenOption(true);
        setGeneratedRandomNumbers([...generatedRandomNumbers, randomNumber]);
        //resetRandomNumberOccurrences();
        setPreviousPlacedBets(placedBets.slice())   
        }, 10000);
       

        let hasWon = false;
        let payoutAmount = 0;
        switch (randomNumber) {
            case 0:
                hasWon = placedBets.findIndex(x => x.Option === 'zero') !== -1;
            if (hasWon) {
                payoutAmount = placedBets.filter(x => x.Option === 'zero')
                    .map(c => c.BetAmount * getOptionOdd(c.Option))
                    .reduce((sum, current) => sum + current);
                setPayOutAmount(payoutAmount)

            }
            break;
            case 1:
                hasWon = placedBets.findIndex(x => x.Option === '1' || x.Option === 'odd' ||
                    x.Option === 'low' || x.Option === 'red' || x.Option === 'range12') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '1' || x.Option === 'odd' ||
                        x.Option === 'low' || x.Option === 'red' || x.Option === 'range12')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 2:
                hasWon = placedBets.findIndex(x => x.Option === '2' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '2' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 3:
                hasWon = placedBets.findIndex(x => x.Option === '3' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '3' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 4:
                hasWon = placedBets.findIndex(x => x.Option === '4' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '4' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 5:
                hasWon = placedBets.findIndex(x => x.Option === '5' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '5' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 6:
                hasWon = placedBets.findIndex(x => x.Option === '6' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '6' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 7:
                hasWon = placedBets.findIndex(x => x.Option === '7' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '7' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 8:
                hasWon = placedBets.findIndex(x => x.Option === '8' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '8' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 9:
                hasWon = placedBets.findIndex(x => x.Option === '9' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range12' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '9' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range12' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 10:
                hasWon = placedBets.findIndex(x => x.Option === '10' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '10' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 11:
                hasWon = placedBets.findIndex(x => x.Option === '11' || x.Option === 'odd' ||
                    x.Option === 'black' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '11' || x.Option === 'odd' ||
                        x.Option === 'black' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 12:
                hasWon = placedBets.findIndex(x => x.Option === '12' || x.Option === 'even' ||
                    x.Option === 'red' || x.Option === 'range12' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '12' ||
                        x.Option === 'even' || x.Option === 'red' || x.Option === 'range12' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 13:
                hasWon = placedBets.findIndex(x => x.Option === '13' || x.Option === 'odd' ||
                    x.Option === 'range1324' || x.Option === 'black' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '13' || x.Option === 'odd' ||
                        x.Option === 'range1324' || x.Option === 'black' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 14:
                hasWon = placedBets.findIndex(x => x.Option === '14' || x.Option === 'even' ||
                    x.Option === 'red' || x.Option === 'range1324' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '14' ||
                        x.Option === 'even' || x.Option === 'red' || x.Option === 'range1324' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 15:
                hasWon = placedBets.findIndex(x => x.Option === '15' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range1324' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '15' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range1324' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 16:
                hasWon = placedBets.findIndex(x => x.Option === '16' || x.Option === 'even' ||
                    x.Option === 'red' || x.Option === 'range1324' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '16' ||
                        x.Option === 'even' || x.Option === 'red' || x.Option === 'range1324' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 17:
                hasWon = placedBets.findIndex(x => x.Option === '17' || x.Option === 'odd' ||
                    x.Option === 'black' || x.Option === 'range1324' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '17' || x.Option === 'odd' ||
                        x.Option === 'black' || x.Option === 'range1324' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 18:
                hasWon = placedBets.findIndex(x => x.Option === '18' || x.Option === 'even' ||
                    x.Option === 'red' || x.Option === 'range1324' || x.Option === 'low') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '18' ||
                        x.Option === 'even' || x.Option === 'red' || x.Option === 'range1324' || x.Option === 'low')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 19:
                hasWon = placedBets.findIndex(x => x.Option === '19' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range1324' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '19' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range1324' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 20:
                hasWon = placedBets.findIndex(x => x.Option === '20' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range1324' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '20' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range1324' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 21:
                hasWon = placedBets.findIndex(x => x.Option === '21' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range1324' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '21' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range1324' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 22:
                hasWon = placedBets.findIndex(x => x.Option === '22' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range1324' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '22' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range1324' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 23:
                hasWon = placedBets.findIndex(x => x.Option === '23' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range1324' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '23' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range1324' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 24:
                hasWon = placedBets.findIndex(x => x.Option === '24' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range1324' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '24' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range1324' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 25:
                hasWon = placedBets.findIndex(x => x.Option === '25' || x.Option === 'odd' ||
                    x.Option === 'range2536' || x.Option === 'red' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '25' || x.Option === 'odd' ||
                        x.Option === 'range2536' || x.Option === 'red' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 26:
                hasWon = placedBets.findIndex(x => x.Option === '26' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '26' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 27:
                hasWon = placedBets.findIndex(x => x.Option === '27' || x.Option === 'odd' ||
                    x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '27' || x.Option === 'odd' ||
                        x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 28:
                hasWon = placedBets.findIndex(x => x.Option === '28' || x.Option === 'even' ||
                    x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '28' ||
                        x.Option === 'even' || x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 29:
                hasWon = placedBets.findIndex(x => x.Option === '29' || x.Option === 'odd' ||
                    x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '29' || x.Option === 'odd' ||
                        x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 30:
                hasWon = placedBets.findIndex(x => x.Option === '30' || x.Option === 'even' ||
                    x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '30' ||
                        x.Option === 'even' || x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 31:
                hasWon = placedBets.findIndex(x => x.Option === '31' || x.Option === 'odd' ||
                    x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '31' || x.Option === 'odd' ||
                        x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 32:
                hasWon = placedBets.findIndex(x => x.Option === '32' || x.Option === 'even' ||
                    x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '32' ||
                        x.Option === 'even' || x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 33:
                hasWon = placedBets.findIndex(x => x.Option === '33' || x.Option === 'odd' ||
                    x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '33' || x.Option === 'odd' ||
                        x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 34:
                hasWon = placedBets.findIndex(x => x.Option === '34' || x.Option === 'even' ||
                    x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '34' ||
                        x.Option === 'even' || x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 35:
                hasWon = placedBets.findIndex(x => x.Option === '35' || x.Option === 'odd' ||
                    x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '35' || x.Option === 'odd' ||
                        x.Option === 'black' || x.Option === 'range2536' || x.Option === 'high')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;
            case 36:
                hasWon = placedBets.findIndex(x => x.Option === '36' || x.Option === 'even' ||
                    x.Option === 'red' || x.Option === 'range2536' || x.Option === 'high' || x.Option === 'high') !== -1;
                if (hasWon) {
                    payoutAmount = placedBets.filter(x => x.Option === '36' ||
                        x.Option === 'even' || x.Option === 'red' || x.Option === 'high' || x.Option === 'range2536')
                        .map(c => c.BetAmount * getOptionOdd(c.Option))
                        .reduce((sum, current) => sum + current);
                    setPayOutAmount(payoutAmount)

                }
                break;



        }

        console.log('Payut amount', payoutAmount);

        setResult(hasWon ? 'win' : 'lose');
    };

    
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setWonOpenOption(true);
//     }, 10050);


//     return () => clearTimeout(timeoutId);
//   }, []); 

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWonOpenOption(false);
    }, 12050);


    return () => clearTimeout(timeoutId);
  }, [wonOpenOption]); 


    const setPlacedAmont = () => {
        let amount = 0;
        placedBets.forEach(x => {
            amount += x.BetAmount;
        });

        setPlacedBetAmount(amount)
    }
    
    const getShowBorder = (n:number) =>{
        return betAmount === n;
    }

    const getMouseOverImage = () => {
        let img = imageUrlBL;
        if (betAmount === 10) {
            img = imageUrlBL;
        }

        if (betAmount === 50) {
            img = imageUrlR;
        }

        if (betAmount === 100) {
            img = imageUrlG;
        }

        if (betAmount === 200) {
            img = imageUrlO;
        }
        if (betAmount === 400) {
            img = imageUrlB;
        }

        if (betAmount === 500) {
            img = imageUrlP;
        }
        console.log('IMG:', img);

        return img;
    }

    const getDisplayImage = (option: string) => {
        let betAmount = placedBets.slice().reverse().find(x => x.Option === option)?.BetAmount;
        let img = '';
        if (betAmount === 10) {
            img = imageUrlBL;
        }

        if (betAmount === 50) {
            img = imageUrlR;
        }

        if (betAmount === 100) {
            img = imageUrlG;
        }

        if (betAmount === 200) {
            img = imageUrlO;
        }
        if (betAmount === 400) {
            img = imageUrlB;
        }

        if (betAmount === 500) {
            img = imageUrlP;
        }
        console.log('IMG:', img);

        return img;
    }

    const getBlinkState = (s: string) => {
        let hasWon = false;
        switch (randomNumber) {
            case 0: 
            hasWon = (s === 'zero');
            break;
            case 1:
                hasWon = (s === '1' || s === 'odd' || s === 'low' || s === 'red' || s === 'range12');

                break;
            case 2:
                hasWon = (s === '2' || s === 'even' ||   s === 'black' || s === 'range12' || s === 'low');
                break;

            case 3:
                hasWon = (s === '3' || s === 'odd' ||  s === 'red' || s === 'range12' || s === 'low');
                break;

            case 4:
                hasWon = (s === '4' || s === 'even' ||
                    s === 'black' || s === 'range12' || s === 'low');
                break;

            case 5:
                hasWon = (s === '5' || s === 'odd' ||   s === 'red' || s === 'range12' || s === 'low');
                break;

            case 6:
                hasWon = (s === '6' || s === 'even' ||  s === 'black' || s === 'range12' || s === 'low');
                break;

            case 7:
                hasWon = (s === '7' || s === 'odd' ||  s === 'red' || s === 'range12' || s === 'low');
                break;

            case 8:
                hasWon = (s === '8' || s === 'even' || s === 'black' || s === 'range12' || s === 'low');
                break;

            case 9:
                hasWon = (s === '9' || s === 'odd' || s === 'red' || s === 'range12' || s === 'low');
                break;

            case 10:
                hasWon = (s === '10' || s === 'even' ||  s === 'black' || s === 'range12' || s === 'low');
                break;

            case 11:
                hasWon = (s === '11' || s === 'odd' ||
                    s === 'red' || s === 'range12' || s === 'low');
                break;

            case 12:
                hasWon = (s === '12' || s === 'even' ||
                    s === 'black' || s === 'range12' || s === 'low');
                break;

            case 13:
                hasWon = (s === '13' || s === 'odd' ||
                    s === 'black' || s === 'range1324' || s === 'low');
                break;

            case 14:
                hasWon = (s === '14' || s === 'even' ||
                    s === 'red' || s === 'range1324' || s === 'low');
                break;

            case 15:
                hasWon = (s === '15' || s === 'odd' ||
                    s === 'black' || s === 'range1324' || s === 'low');
                break;

            case 16:
                hasWon = (s === '16' || s === 'even' ||
                    s === 'red' || s === 'range1324' || s === 'low');
                break;

            case 17:
                hasWon = (s === '17' || s === 'odd' ||
                    s === 'black' || s === 'range1324' || s === 'low');
                break;

            case 18:
                hasWon = (s === '18' || s === 'even' ||
                    s === 'red' || s === 'range1324' || s === 'low');
                break;

            case 19:
                hasWon = (s === '19' || s === 'odd' ||
                    s === 'red' || s === 'range1324' || s === 'high');
                break;

            case 20:
                hasWon = (s === '20' || s === 'even' ||
                    s === 'black' || s === 'range1324' || s === 'high');
                break;

            case 21:
                hasWon = (s === '21' || s === 'odd' ||
                    s === 'red' || s === 'range1324' || s === 'high');
                break;

            case 22:
                hasWon = (s === '22' || s === 'even' ||
                    s === 'black' || s === 'range1324' || s === 'high');
                break;

            case 23:
                hasWon = (s === '23' || s === 'odd' ||
                    s === 'red' || s === 'range1324' || s === 'high');
                break;

            case 24:
                hasWon = (s === '24' || s === 'even' ||
                    s === 'black' || s === 'range1324' || s === 'high');
                break;

            case 25:
                hasWon = (s === '25' || s === 'odd' ||
                    s === 'red' || s === 'range2536' || s === 'high');
                break;

            case 26:
                hasWon = (s === '26' || s === 'even' ||
                    s === 'black' || s === 'range2536' || s === 'high');
                break;

            case 27:
                hasWon = (s === '27' || s === 'odd' ||
                    s === 'red' || s === 'range2536' || s === 'high');
                break;

            case 28:
                hasWon = (s === '28' || s === 'even' ||
                    s === 'black' || s === 'range2536' || s === 'high');
                break;

            case 29:
                hasWon = (s === '29' || s === 'odd' ||
                    s === 'black' || s === 'range2536' || s === 'high');
                break;

            case 30:
                hasWon = (s === '30' || s === 'even' ||
                    s === 'red' || s === 'range2536' || s === 'high');
                break;

            case 31:
                hasWon = (s === '31' || s === 'odd' ||
                    s === 'black' || s === 'range2536' || s === 'high');
                break;
            case 32:
                hasWon = (s === '32' || s === 'even' ||
                    s === 'red' || s === 'range2536' || s === 'high');
                break;

            case 33:
                hasWon = (s === '33' || s === 'odd' ||
                    s === 'black' || s === 'range2536' || s === 'high');
                break;
            case 34:
                hasWon = (s === '34' || s === 'even' ||
                    s === 'red' || s === 'range2536' || s === 'high');
                break;

            case 35:
                hasWon = (s === '35' || s === 'odd' ||
                    s === 'black' || s === 'range2536' || s === 'high');
                break;

            case 36:
                hasWon = (s === '36' || s === 'even' ||
                    s === 'red' || s === 'range2536' || s === 'high');
                break;

        }
        return hasWon;
    }

    const handleMouseOverOrLeave = (n: string) => {
        setMouseOverOption(n);
    }

    const handleSelected = (option: string) => {
        handleSelectOption(option)
        setSelectedOption(selectedOption)
        placedBets.push({
            Option: option,
            BetAmount: betAmount
        });

        setPlacedAmont();
        console.log(placedBets);
    }

    const deleteSelected = () => {
        setSelectedOption(null)
        setPlacedBetAmount(0)
        setBetAmount(10)
        setPlacedBets([])
        setResult(null)
        setOpenOption(false)
        setPayOutAmount(0)
        // setGeneratedRandomNumbers([])
    };

    const handleDouble = () => {
        console.log('handleDouble',placedBets);
        
        placedBets.push(...placedBets);
        setPlacedAmont();
    }

    const undo = () => {
        if (placedBets.length > 0) {
             placedBets.pop() as PlacedBet;
            setPlacedAmont();
        }

        console.log(placedBets);

    };

    const rebet = () => {        
        placedBets.splice(0, placedBets.length);
        placedBets.push(...previousPlacedBets);
        console.log('rebet setPlacedBets', placedBets, 'previousPlacedBets', previousPlacedBets);

        setPlacedAmont();
    };
    // const handleWonOpen = () =>{
    //     setWonOpenOption(!wonOpenOption)
    // }
    return (
        <>
            < Navbar generatedRandomNumbers={generatedRandomNumbers} 
                 imageUrlFire={imageUrlFire} imageUrlCold={imageUrlCold} />
            <Stats />
            {openOption && <SpinnerWheel randomNumber={randomNumber} currentNumber={currentNumber}/>}

            <Wrap>
                <Top>
                    <ContDivL>
                   
                            <ZeroItem blink={getBlinkState('zero')} onClick={() => handleSelected('zero')}
                                onMouseLeave={() => handleMouseOverOrLeave('')}
                                onMouseOver={() => handleMouseOverOrLeave('zero')} >
                                {(mouseOverOption === 'zero') && (<PopImgZ src={getMouseOverImage()} />)}
                                {(randomNumber !== null && randomNumber === 0) ? (<ImageWin src={imageUrlWin} />) :
                                    (placedBets.findIndex(x => x.Option === '0') !== -1) ?
                                        (<Image src={getDisplayImage('0')} />) :
                                        <Diamond color="green" width={40} height={40} />}
                            </ZeroItem>
                     </ContDivL>
                      
                    <CardContainer>
                       
                            <ContDiv>
                                <ListStyles blink={getBlinkState('3')} variant="primary" onClick={() => handleSelected('3')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('3')}>
                                    {(mouseOverOption === '3') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 3) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '3') !== -1) ? (<Image src={getDisplayImage('3')} />) : 3}
                                </ListStyles>

                            <ListStyles blink={getBlinkState('6')} variant="secondary" onClick={() => handleSelected('6')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('6')}>
                                    {(mouseOverOption === '6') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 6) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '6') !== -1) ? (<Image src={getDisplayImage('6')} />) : 6}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('9')} variant="primary" onClick={() => handleSelected('9')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('9')} >
                                    {(mouseOverOption === '9') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 9) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '9') !== -1) ? (<Image src={getDisplayImage('9')} />) : 9}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('12')} variant="primary" onClick={() => handleSelected('12')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('12')}>
                                    {(mouseOverOption === '12') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 12) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '12') !== -1) ? (<Image src={getDisplayImage('12')} />) : 12}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('15')} variant="secondary" onClick={() => handleSelected('15')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('15')}>
                                    {(mouseOverOption === '15') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 15) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '15') !== -1) ? (<Image src={getDisplayImage('15')} />) : 15}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('18')} variant="primary" onClick={() => handleSelected('18')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('18')}>
                                    {(mouseOverOption === '18') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 18) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '18') !== -1) ? (<Image src={getDisplayImage('18')} />) : 18}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('21')} variant="primary" onClick={() => handleSelected('21')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('21')} >
                                    {(mouseOverOption === '21') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 21) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '21') !== -1) ? (<Image src={getDisplayImage('21')} />) : 21}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('24')} variant="secondary" onClick={() => handleSelected('24')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('24')}>
                                    {(mouseOverOption === '24') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 24) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '24') !== -1) ? (<Image src={getDisplayImage('24')} />) : 24}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('27')} variant="primary" onClick={() => handleSelected('27')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('27')}>
                                    {(mouseOverOption === '27') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 27) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '27') !== -1) ? (<Image src={getDisplayImage('27')} />) : 27}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('30')} variant="primary" onClick={() => handleSelected('30')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('30')}>
                                    {(mouseOverOption === '30') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 30) ? (<ImageWin src={imageUrlWin} />) :
                                        (randomNumber !== null && randomNumber === 30) ? (<ImageWin src={imageUrlWin} />) :
                                            (placedBets.findIndex(x => x.Option === '30') !== -1) ? (<Image src={getDisplayImage('30')} />) : 30}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('33')} variant="secondary" onClick={() => handleSelected('33')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('33')}>
                                    {(mouseOverOption === '33') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 33) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '33') !== -1) ? (<Image src={getDisplayImage('33')} />) : 33}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('36')} variant="primary" onClick={() => handleSelected('36')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('36')} >
                                    {(mouseOverOption === '36') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 36) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '36') !== -1) ? (<Image src={getDisplayImage('36')} />) : 36}
                                </ListStyles>
                    </ContDiv>
                    <ContDiv>
                                <ListStyles blink={getBlinkState('2')} variant="secondary" onClick={() => handleSelected('2')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('2')}>
                                    {(mouseOverOption === '2') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 2) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '2') !== -1) ? (<Image src={getDisplayImage('2')} />) : 2}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('5')} variant="primary" onClick={() => handleSelected('5')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('5')}>
                                    {(mouseOverOption === '5') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 5) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '5') !== -1) ? (<Image src={getDisplayImage('5')} />) : 5}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('8')} variant="secondary" onClick={() => handleSelected('8')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('8')}>
                                    {(mouseOverOption === '8') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 8) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '8') !== -1) ? (<Image src={getDisplayImage('8')} />) : 8}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('11')} variant="secondary" onClick={() => handleSelected('11')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('11')}>
                                    {(mouseOverOption === '11') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 11) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '11') !== -1) ? (<Image src={getDisplayImage('11')} />) : 11}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('14')} variant="primary" onClick={() => handleSelected('14')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('14')} >
                                    {(mouseOverOption === '14') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 14) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '14') !== -1) ? (<Image src={getDisplayImage('14')} />) : 14}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('17')} variant="secondary" onClick={() => handleSelected('17')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('17')}>
                                    {(mouseOverOption === '17') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 17) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '17') !== -1) ? (<Image src={getDisplayImage('17')} />) : 17}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('20')} variant="secondary" onClick={() => handleSelected('20')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('20')} >
                                    {(mouseOverOption === '20') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 20) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '20') !== -1) ? (<Image src={getDisplayImage('20')} />) : 20}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('23')} variant="primary" onClick={() => handleSelected('23')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('23')} >
                                    {(mouseOverOption === '23') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 23) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '23') !== -1) ? (<Image src={getDisplayImage('23')} />) : 23}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('26')} variant="secondary" onClick={() => handleSelected('26')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('26')}>
                                    {(mouseOverOption === '26') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 26) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '26') !== -1) ? (<Image src={getDisplayImage('26')} />) : 26}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('29')} variant="secondary" onClick={() => handleSelected('29')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('29')}>
                                    {(mouseOverOption === '29') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 29) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '29') !== -1) ? (<Image src={getDisplayImage('29')} />) : 29}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('32')} variant="primary" onClick={() => handleSelected('32')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('32')}>
                                    {(mouseOverOption === '32') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 32) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '32') !== -1) ? (<Image src={getDisplayImage('32')} />) : 32}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('35')} variant="secondary" onClick={() => handleSelected('35')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('35')}>
                                    {(mouseOverOption === '35') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 35) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '35') !== -1) ? (<Image src={getDisplayImage('35')} />) : 35}
                                </ListStyles>
                        </ContDiv>
                        <ContDiv>
                                <ListStyles blink={getBlinkState('1')} variant="primary" onClick={() => handleSelected('1')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('1')}>
                                    {(mouseOverOption === '1') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 1) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '1') !== -1) ? (<Image src={getDisplayImage('1')} />) : 1}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('4')} variant="secondary" onClick={() => handleSelected('4')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('4')}>
                                    {(mouseOverOption === '4') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 4) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '4') !== -1) ? (<Image src={getDisplayImage('4')} />) : 4}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('7')} variant="primary" onClick={() => handleSelected('7')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('7')}>
                                    {(mouseOverOption === '7') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 7) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '7') !== -1) ? (<Image src={getDisplayImage('7')} />) : 7}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('10')} variant="secondary" onClick={() => handleSelected('10')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('10')}>
                                    {(mouseOverOption === '10') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 10) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '10') !== -1) ? (<Image src={getDisplayImage('10')} />) : 10}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('13')} variant="secondary" onClick={() => handleSelected('13')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('13')}>
                                    {(mouseOverOption === '13') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 13) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '13') !== -1) ? (<Image src={getDisplayImage('13')} />) : 13}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('16')} variant="primary" onClick={() => handleSelected('16')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('16')} >
                                    {(mouseOverOption === '16') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 16) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '16') !== -1) ? (<Image src={getDisplayImage('16')} />) : 16}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('19')} variant="primary" onClick={() => handleSelected('19')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('19')}>
                                    {(mouseOverOption === '19') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 19) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '19') !== -1) ? (<Image src={getDisplayImage('19')} />) : 19}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('22')} variant="secondary" onClick={() => handleSelected('22')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('22')}>
                                    {(mouseOverOption === '22') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 22) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '22') !== -1) ? (<Image src={getDisplayImage('22')} />) : 22}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('25')} variant="primary" onClick={() => handleSelected('25')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('25')}>
                                    {(mouseOverOption === '25') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 25) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '25') !== -1) ? (<Image src={getDisplayImage('25')} />) : 25}
                                </ListStyles>

                                <ListStyles blink={getBlinkState('28')} variant="secondary" onClick={() => handleSelected('28')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('28')}>
                                    {(mouseOverOption === '28') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 28) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '28') !== -1) ? (<Image src={getDisplayImage('28')} />) : 28}
                                </ListStyles >

                                <ListStyles variant="secondary" blink={getBlinkState('31')} onClick={() => handleSelected('31')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('31')}>
                                    {(mouseOverOption === '31') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 31) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '31') !== -1) ? (<Image src={getDisplayImage('31')} />) : 31}
                                </ListStyles>

                                <ListStyles variant="primary" blink={getBlinkState('34')} onClick={() => handleSelected('34')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('34')}>
                                    {(mouseOverOption === '34') && (<ImageH src={getMouseOverImage()} />)}
                                    {(randomNumber !== null && randomNumber === 34) ? (<ImageWin src={imageUrlWin} />) :
                                        (placedBets.findIndex(x => x.Option === '34') !== -1) ? (<Image src={getDisplayImage('34')} />) : 34}
                                </ListStyles>
                                </ContDiv>
                            
                            <ContDiv>
                                <ListItems blink={getBlinkState('range12')} onClick={() => handleSelected('range12')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('range12')}>
                                    {(mouseOverOption === 'range12') && (<PopImg src={getMouseOverImage()} />)}
                                    {(placedBets.findIndex(x => x.Option === 'range12') !== -1) ?
                                        (<Image src={getDisplayImage('range12')} />) : '1 ~ 12'}
                                </ListItems>
                                <ListItems blink={getBlinkState('range1324')} onClick={() => handleSelected('range1324')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('range1324')}>
                                    {(mouseOverOption === 'range1324') && (<PopImg src={getMouseOverImage()} />)}
                                    {(placedBets.findIndex(x => x.Option === 'range1324') !== -1) ?
                                        (<Image src={getDisplayImage('range1324')} />) : '13 ~ 24'}
                                </ListItems>
                                <ListItems blink={getBlinkState('range2536')} onClick={() => handleSelected('range2536')}
                                    onMouseLeave={() => handleMouseOverOrLeave('')}
                                    onMouseOver={() => handleMouseOverOrLeave('range2536')}>
                                    {(mouseOverOption === 'range2536') && (<PopImg src={getMouseOverImage()} />)}
                                    {(placedBets.findIndex(x => x.Option === 'range2536') !== -1) ?
                                        (<Image src={getDisplayImage('range2536')} />) : '25 ~ 36'}
                                </ListItems>
                                </ContDiv>
                       <ContDivLL>
                       <Lion> <ImageLion src={imageUrlLion} /> </Lion>
                       <NumberItems blink={getBlinkState('low')} onClick={() => handleSelected('low')}
                                onMouseLeave={() => handleMouseOverOrLeave('')}
                                onMouseOver={() => handleMouseOverOrLeave('low')} >
                                {(mouseOverOption === 'low') && (<ImageH src={getMouseOverImage()} />)}
                                {(placedBets.findIndex(x => x.Option === 'low') !== -1) ? (<Image src={getDisplayImage('low')} />) : 'LOW'}
                            </NumberItems>
                            <NumberItems blink={getBlinkState('even')} onClick={() => handleSelected('even')}
                                onMouseLeave={() => handleMouseOverOrLeave('')}
                                onMouseOver={() => handleMouseOverOrLeave('even')}>
                                {(mouseOverOption === 'even') && (<ImageH src={getMouseOverImage()} />)}
                                {(placedBets.findIndex(x => x.Option === 'even') !== -1) ? (<Image src={getDisplayImage('even')} />) : 'EVEN'}
                            </NumberItems>
                            <NumberItems blink={getBlinkState('red')} onClick={() => handleSelected('red')}
                                onMouseLeave={() => handleMouseOverOrLeave('')}
                                onMouseOver={() => handleMouseOverOrLeave('red')}>
                                {(mouseOverOption === 'red') && (<ImageH src={getMouseOverImage()} />)}
                                {(placedBets.findIndex(x => x.Option === 'red') !== -1) ? (<Image src={getDisplayImage('red')} />) :
                                    (<Diamond color="red" width={45} height={45} />)}
                            </NumberItems>
                            <NumberItems blink={getBlinkState('black')} onClick={() => handleSelected('black')}
                                onMouseLeave={() => handleMouseOverOrLeave('')}
                                onMouseOver={() => handleMouseOverOrLeave('black')}>
                                {(mouseOverOption === 'black') && (<ImageH src={getMouseOverImage()} />)}
                                {(placedBets.findIndex(x => x.Option === 'black') !== -1) ? (<Image src={getDisplayImage('black')} />) :
                                    (<Diamond color="black" width={45} height={45} />)}
                            </NumberItems>
                            <NumberItems blink={getBlinkState('odd')} onClick={() => handleSelected('odd')}
                                onMouseLeave={() => handleMouseOverOrLeave('')}
                                onMouseOver={() => handleMouseOverOrLeave('odd')}>
                                {(mouseOverOption === 'odd') && (<ImageH src={getMouseOverImage()} />)}
                                {(placedBets.findIndex(x => x.Option === 'odd') !== -1) ? (<Image src={getDisplayImage('odd')} />) : 'ODD'}
                            </NumberItems>
                            <NumberItems blink={getBlinkState('high')} onClick={() => handleSelected('high')}
                                onMouseLeave={() => handleMouseOverOrLeave('')}
                                onMouseOver={() => handleMouseOverOrLeave('high')}>
                                {(mouseOverOption === 'high') && (<ImageH src={getMouseOverImage()} />)}
                                {(placedBets.findIndex(x => x.Option === 'high') !== -1) ? (<Image src={getDisplayImage('high')} />) : 'HIGH'}
                            </NumberItems>
                               <Lion> <ImageLionR src={imageUrlLion} /> </Lion>
                       </ContDivLL>
                      
                    </CardContainer>
                    </Top>
                    <ContDivR>
                    <ButtonContainer>
                            <StyledButton onClick={rebet} disabled={placedBets.length>0}><FontAwesomeIcon icon={faArrowRotateRight} /></StyledButton>
                            <StyledButton onClick={() => handleDouble()}  disabled={placedBets.length===0}>x2</StyledButton>
                            <StyledButton onClick={undo}  disabled={placedBets.length===0}><FontAwesomeIcon icon={faRotateLeft}  /></StyledButton>
                            <StyledButton onClick={deleteSelected}  disabled={placedBets.length===0}><FontAwesomeIcon icon={faTrashCan} /></StyledButton>
                        </ButtonContainer>
                    </ContDivR>
                    </Wrap>

                 <FooterContainer>
                        <Stake>
                          <StakeBalance>
                              <BalanceTitle >CREDIT</BalanceTitle>
                             <BalanceAmount >     
                               
                           </BalanceAmount>
                          </StakeBalance>
                           <StakeBalance>
                                <BalanceTitle>TOTAL BET</BalanceTitle>
                                <BalanceAmount>KSh{placedBetAmount}</BalanceAmount>
                            </StakeBalance>
                          <StakeBalanceG>
                                 <BalanceTitle>WIN</BalanceTitle>
                                 <BalanceAmount>KSh{payoutAmount}</BalanceAmount>
                             </StakeBalanceG>
                         </Stake>
                       
                         <RightDiv>
                                 <OuterDiv>
                                     <InnerDiv>
                                             <Image src={imageUrlP}  showBorder={getShowBorder(500)} onClick={() => setBetAmount(Number(500))}/>
                                         <Span>KSh500</Span>
                                     </InnerDiv>
                                     <InnerDiv>
                                             <Image src={imageUrlB} showBorder={getShowBorder(400)} onClick={() => setBetAmount(Number(400))}/>
                                         <Span>KSh400</Span>
                                     </InnerDiv>
                                     <InnerDiv>
                                             <Image src={imageUrlO} showBorder={getShowBorder(200)} onClick={() => setBetAmount(Number(200))} />
                                         <Span>KSh200</Span>
                                     </InnerDiv>
                                     <InnerDiv>
                                             <Image src={imageUrlG} showBorder={getShowBorder(100)} onClick={() => setBetAmount(Number(100))} />
                                         <Span>KSh100</Span>
                                     </InnerDiv>
                                     <InnerDiv>
                                             <Image src={imageUrlR} showBorder={getShowBorder(50)} onClick={() => setBetAmount(Number(50))} />
                                         <Span>KSh50</Span>
                                     </InnerDiv>
                                     <InnerDiv>
                                             <Image src={imageUrlBL} showBorder={getShowBorder(10)}  onClick={() => setBetAmount(Number(10))} />
                                         <Span>KSh10</Span>
                                     </InnerDiv>
                                 </OuterDiv>
                             <ButtonDiv>
                                 <Button onClick={handleSpin} disabled={spinning}>
                           
                                 <FontAwesomeIcon icon={faPlay} />
                                 </Button>
                             </ButtonDiv>
                         </RightDiv>
                     </FooterContainer>

                 { <div>
                   {    result==='win'?
                        wonOpenOption &&
                      
                        <Won>
                            <h1>You Won</h1> <br/>
                           <h1>Ksh{payoutAmount}</h1>
                        </Won> :<div></div>
                    }     
                </div> }
                 
                
  </>
   )
}
const Top = styled.div`
display:flex;
gap:0px;
`
const ContDiv = styled.div`
display:flex;
`
const ContDivLL = styled.div`
display:flex;
gap:0px;
`
const ContDivL = styled.div`
 margin-left:120px;
`
const ContDivR = styled.div`
`
const Wrap = styled.div`
display:flex;
margin-top:80px;
justify-content:center;
gap:0px;
margin-left:0px;
`
const Image = styled.img<ImageProps>`
 overflow:hidden;
 object-repeat:no-repeat;
 width:32px;
 height:32px;
  padding:3px;
 ${({ showBorder }) => (showBorder===true?
   ` border:3px solid yellow;
     border-radius:50%;`
    : ``)}
`;

const ImageH = styled.img`
width:30px;
 height:30px;
position:absolute;
right:-20%;
bottom:-20%;
z-index:2;
`
const PopImg = styled.img`
width:30px;
 height:30px;
position:absolute;
right:-5%;
bottom:-20%;
z-index:2;
`
const PopImgZ = styled.img`
width:30px;
 height:30px;
position:absolute;
right:-5%;
bottom:-5%;
z-index:2;
`
const ImageLion = styled.img`
 object-repeat:no-repeat;
 width:60px;
 height:90px;
 position: absolute;
 margin-right:0px;
`;
const ImageLionR = styled.img`
 object-repeat:no-repeat;
 width:60px;
 height:90px;
transform: scaleX(-1);
`;
const ImageWin = styled.img`
// object-fit:cover;
 overflow:hidden;
 object-repeat:no-repeat;
 width:50px;
 height:50px;
`
const Lion = styled.div`
background-color:brown;
 object-repeat:no-repeat;
//  position: absolute;
 width: 65px;
 height: 100px;
//  margin-top: 272px;
 background: no-repeat;
 opacity: .8;
 overflow:hidden;
`

const ListStyles = styled.li<DivProps>`
   position:relative;
   background-color: ${({ variant }) => (variant === 'primary' ? 'red' : 'black')};
  display: flex;
  align-items: center;
  justify-content: center;
  color:white;
  margin:0px;
  width :53px;
  height: 53px;
  font-size: 28px;
  font-weight:500;
  list-style:none;
  border-left:1px solid white;
  border-right: 2px solid white;
   border-bottom: 1px solid white;
 border-top: 1px solid white;
 margin-left:0px;
 
 ${({ blink }) => (blink ? 
    ` animation: blink-animation 1.2s 3;
    animation-delay: 0.5s;
  animation-duration: 1s;
   @keyframes blink-animation {
     to {
       background:#D3D3D3;
     }
   }`
     : ``)}    
  &:hover {
    border:1.7px solid yellow;
    background-color:#A9A9A9;
  }
`;

const ListItems = styled.li<ListProps>`
position:relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color:white;
  width :220px;
  height: 50px;
  font-size: 20px;
  list-style:none;
  margin-top:0px;
  margin:0px;
   border: 2px solid white;
   ${({ blink }) => (blink ? 
    ` animation: blink-animation 1.2s 3;
    animation-delay: 0.5s;
  animation-duration: 1s;
   @keyframes blink-animation {
     to {
       background:#D3D3D3;
     }
   }`
     : ``)}    
  &:hover {
    border:2px solid yellow;
    background-color:#A9A9A9;
  }
`;

const ZeroItem = styled.li<ListProps>`
position :relative;
  align-self: flex-start;
  color:white;
  width : 50px;
  height: 163px;
  font-size: 20px;
  list-style:none;
  margin-top:0px;
  margin:0px;
  padding:0px;
  gap:0px;
  margin-right:0px;
  ${({ blink }) => (blink ? 
    ` animation: blink-animation 1.2s 3;
    animation-delay: 0.5s;
  animation-duration: 1s;
   @keyframes blink-animation {
     to {
       background:#D3D3D3;
     }
   }`
     : ``)}    
   border: 2px solid white;
   &:hover {
    border:2px solid yellow;
    background-color:#A9A9A9;
  }
  `;
  
const CardContainer = styled.div`
 width: 653px;
display:flex;
flex-direction:column;
gap:0px;
align-items:center;
justify-content:center;
position:relative;
margin-bottom:24px;

@media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`
const ButtonContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;
    position: relative;
    top: -30px;
    width: 134px;
    font-family: Roboto;
}
`
const NumberItems = styled.li<ListProps>`
   position :relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap:0px;
  width :108px;
  border: 2px solid white;
  ${({ blink }) => (blink ? 
    ` animation: blink-animation 1.2s 3;
    animation-delay: 0.5s;
  animation-duration: 1s;
   @keyframes blink-animation {
     to {
       background:#D3D3D3;
     }
   }`
     : ``)}    
     &:hover {
        border:2px solid yellow;
        background-color:#A9A9A9;
      }
    height: 55px;
    margin-top: 20px;
}
  font-size: 24px;
  font-weight:500;
  list-style:none;
  margin-bottom:0px;
`
const Diamond = styled.div<DiamondProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  width: 100%;
    height: 100%;
  background-color: ${({ color }) => color};
  position: absolute;
clip-path: polygon(50% 10%, 85% 50%, 50% 90%, 15% 50%);
`;

const StyledButton = styled.button`
  position: relative;
  z-index: 1;
  width: 36px;
  height: 36px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 900;
//  color: #1967ff;
  text-transform: none;
  cursor: pointer;
 background-color:light-gray;
  border-radius: 50%;
//   -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1), 0 5px 5px 0 rgba(0, 0, 0, .2);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1), 0 5px 5px 0 rgba(0, 0, 0, .2);
`;

const FooterContainer = styled.footer`
 width:940px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // min-height: 70px;
  padding: 10px;
  color: #fff;
  // background-color: #013b93;
  margin-top:20px;
  margin-right:53px;
  height: 80px;
  background-color: #192348;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;
const Stake = styled.div`
display:flex;
min-width: 380px;
 padding-left: 5px;
 height:60px;
`
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
  width: 170px;
  height: 60px;
  color: black;
  border-radius: 3px;
  -webkit-box-shadow: 0 6px 6px 0 rgba(0, 0, 0, .5);
  font-family: Roboto;
  font-size: 26px;
  color:white;
  text-transform: initial;
  background-color:	#FFE5B4;
`;
const StakeBalance = styled.div`
    display: inline-block;
    width: 120px;
    height: 60px;
    padding: 3px 0 0 3px;
    font-family: Roboto;
    text-align: left;
    background: #efefef;
    border: 2px solid #d9d9d9;
    border-radius: 3px;
    margin-right: 3px;
`
const StakeBalanceG = styled.div`
    display: inline-block;
    width: 120px;
    height: 60px;
    padding: 3px 0 0 3px;
    font-family: Roboto;
    text-align: left;
    background-color: gray;
    border: 2px solid #d9d9d9;
    border-radius: 3px;
    margin-right: 3px;
`
const OuterDiv = styled.div`
  width: 300px;
  height:70px;
  display: flex;
  justify-content: space-between;
  items: center;
`;

const InnerDiv = styled.div`
flex-basis: 16.66666667%;
max-width: 16.66666667%;
  display: flex;
  align-items: center;
  gap:18px;
  flex-direction: column;
  width:53px:
  height:70px;
`;
// const ActionDiv = styled.div`
// width:320px;
// height:58px;

// `
const Span = styled.span`
font-family: Roboto;
    font-size: 11px;
    font-weight: 700;
    line-height: 15px;
    color: #fff;
    text-transform: none;
  // font-family: Roboto;
  //   font-size: 10px;
  //     font-weight: 600;
  //     line-height: 15px;
  //     color: #fff;
  //     text-transform: none;
`;
const RightDiv = styled.div`
display:flex;
gap:20px;
`
const ButtonDiv = styled.div`
-webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    margin-left: auto;
    // padding-right: 10px;
    width:190px;
`
// const GenRan = styled.div`
// width:23px;
// height:23px;
// padding:3px;
// color:white;
// font-size:16px;
// font-weight:500;
// display:flex;
// justify-content:center;
// align-items:center;
// border-radius:5px;
// margin-right:3px; 
// `

const Won = styled.div`       
        width: 380px;
        height: 380px;
        margin:1em auto;
        // border: 2px solid whitesmoke;
        background-color:#90EE90;
        padding: 0;
        color:white;
        display:flex;
        align-items:center;
        flex-direction:column;
        justify-content:center;
        border-radius: 50%;
        overflow: hidden;     
        position:absolute;
        top:14%;
        left:26%;
        z-index:2;
`;
export default Card


