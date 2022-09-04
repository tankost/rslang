import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import style from './Sprint.module.css'
import { setGroup, setPage, setTextbookGame, setUserTextbookGame } from '../../state/reducers/sprint'
import { Game } from './Game/Game';
import { getRandomGroupNumber, getRandomPageNumber } from '../../utils/utils';
import { StartButtons } from './StartButons/StartButtons';
import wordsService from '../../services/words'
import { getExtraWords } from './utils';
import { ResultsModal } from './ResultsModal/ResultsModal';

export const Sprint = () => {

  const dispatch = useAppDispatch()

  const { useTextbook, showResults } = useAppSelector(state => state.sprint)
  const textbook = useAppSelector(state => state.textbook)
  const { group, page, words, isGameStarted } = useAppSelector(state => state.sprint)
  
  const user = useAppSelector(state => state.user)
  useEffect(() => {
    if(user) {
      if(useTextbook) {
        dispatch(setUserTextbookGame())
      }
    } else {
      if(useTextbook) {
        dispatch(setTextbookGame())
      }
    }
  }, [])

  return <div className={style.wrapper}>
    {showResults ? <ResultsModal /> : < StartButtons />}
    {isGameStarted && <Game />}
  </div>
}