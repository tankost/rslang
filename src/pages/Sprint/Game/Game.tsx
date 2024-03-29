import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import style from './Game.module.css'
import { increaseIdx, addGuessed, addUnGuessed, startGame, displayResults, setResults, sendResults } from '../../../state/reducers/sprint'
import { Timer } from '../Timer/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from "@mui/icons-material/Close";
import { createResults } from '../utils'

interface Deck {
  id: string,
  word: string,
  wordTranslate: string
  result: boolean
}

export const Game = () => {
  const dispatch = useAppDispatch()
  const [points, setPoints] = useState<number>(0)
  const [learned, setLearned] = useState<string[]>([])
  const [green, setGreen] = useState(false)
  const [red, setRed] = useState(false)
  const user = useAppSelector(state => state.user)
  const {deck, idx, guessed, unguessed, words, isGameStarted, useTextbook} = useAppSelector(state => state.sprint)
  const [current, setCurrent] = useState<Deck>(deck[idx])
  const handleAnswer = (answer: boolean) => {
    if(answer === current.result) {
      setPoints(points + 1)
      setLearned(learned.concat(current.id))
      // dispatch(addGuessed(current.id))
      setGreen(true)
      setTimeout(() => {
        setGreen(false)
      }, 200);
    } else {
      setLearned([])
      setPoints(0)
      dispatch(addUnGuessed(current.id))
      setRed(true)
      setTimeout(() => {
        setRed(false)
      }, 200);
    }
    if(idx + 1 === deck.length) {
      stopGame()
    }
    dispatch(increaseIdx(null))
  }

  const stopGame = () => {
    dispatch(startGame(false))
    const arr = createResults(words, guessed, unguessed)
    dispatch(setResults(arr))
    dispatch(displayResults(true))
    if(user) {
      dispatch(sendResults(arr))
      return
    }
  }

  useEffect(() => {
    if(points >= 3) {
      learned.forEach((el: string) => {
        dispatch(addGuessed(el))
      })
      setLearned([])
    }
  },[points])

  useEffect(() => {
    setCurrent(deck[idx])
  },[idx])

  return (
    <div className={style.modal}>
      <div className={style.close} onClick={() => stopGame()}><CloseIcon /></div>
      <div className={style.header}>
        <div className={style.score} style={{color: `${points >= 3 ? 'green' : 'red'}`}}>{points}</div>
        <div className={style.timer}><Timer /></div>
      </div>
      <div className={`${style.card} ${green ? style.green : ''} ${red ? style.red : ''}`}>
        <div className={style.circles}>
          <div className={`${style.circle} ${points >= 1 ? style.circleActive : ''}`}></div>
          <div className={`${style.circle} ${points >= 2 ? style.circleActive : ''}`}></div>
          <div className={`${style.circle} ${points >= 3 ? style.circleActive : ''}`}></div>
        </div>
        <div className={style.word}>{current.word}</div>
        <div className={style.answer}>{current.wordTranslate}</div>
        <div
         className={`${style.checkWrapper}`}>
          <div className={`${green ? style.displayCheck : red ? style.displayCheck : style.hideCheck}`} >
            <CheckCircleIcon style={{color: `${green ? 'green' : 'red'}`}} />
          </div>
        </div>
        <div className={style.buttons}>
          <button onClick={() => handleAnswer(true)} className={style.buttonTrue}>Верно</button>
          <button onClick={() => handleAnswer(false)} className={style.buttonFalse}>Неверно</button>
        </div>
      </div>
    </div>
  )
}