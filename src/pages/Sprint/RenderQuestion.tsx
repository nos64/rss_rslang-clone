/* eslint-disable import/order */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { WordInterface } from '../../types/common';
import { BACKEND_DOMAIN_FOR_PATH_FILES } from '../../variables/constants';
import getWords from '../../api/Sprint';
import { getRandomPage, shuffle } from './utils';
import correctSound from '../../assets/sounds/correct.mp3';
import unCorrectSound from '../../assets/sounds/unCorrect.mp3';
import { Button } from '@mui/material';
import Loading from './Loading';
import RenderResults from './RenderResults';
import useGetStorageWords from '../../hooks/useGetStorageWords';
import textbookStore from '../../store/textbook';
import useSetStorageWords from '../../hooks/useSetStorageWords';
import store from '../../store';

const RenderQuestion = (props: { groupWords: number; handleClickNewGameBtn: () => void }) => {
  const [words, setWords] = useState<WordInterface[]>([]);
  const [word, setWord] = useState<WordInterface | null>(null);
  const [answer, setAnswer] = useState<WordInterface | null>(null);

  // const [shuffleWords, setShuffleWords] = useState<WordInterface[]>([]);
  const [shuffleTranslate, setShuffleTranslate] = useState<WordInterface[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [wordsCount, setWordsCount] = useState<number | null>(null);

  const [isClicked, setIsClicked] = useState(false);
  const [countWin, setCountWin] = useState<WordInterface[]>([]);
  const [countLose, setCountLose] = useState<WordInterface[]>([]);
  const [audioSrc, setAudioSrc] = useState('');
  const [scoreCounter, setScoreCounter] = useState(0);
  const [numberOfPoints, setNumberOfPoints] = useState(10);
  const [wordsCounterInRowArr, setWordsCounterInRowArr] = useState<boolean[]>([]);
  const [unbeatenStreak, setUnbeatenStreak] = useState(wordsCounterInRowArr.length);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [overTime, setOverTime] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [countNewWordsInStats, setCountNewWordsInStats] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const pageNumber = textbookStore.fromTextbook ? textbookStore.currentPage : getRandomPage();
      const uploadedWords = await getWords(props.groupWords, pageNumber);
      // const uploadedWords = await getGroupWords(props.groupWords);
      setWords(uploadedWords);
      const shuffleWordsAnswer = shuffle(uploadedWords);
      // const shuffleWordsQuestion = shuffle(uploadedWords.flat());
      // setWords(shuffleWordsQuestion);
      // const shuffleWordsAnswer = shuffle(uploadedWords.flat());
      setShuffleTranslate(shuffleWordsAnswer);

      setIsLoading(false);
      setWordsCount(0);
    };
    getData();
  }, []);

  useEffect(() => {
    // if (wordsCount !== null && wordsCount < 600) {
    if (wordsCount !== null && wordsCount < 20) {
      setWord(words[wordsCount]);
      if (textbookStore.userId) {
        if (!useGetStorageWords(words[wordsCount].word, textbookStore.userId)) {
          setCountNewWordsInStats(countNewWordsInStats + 1);
        }
      }
      setAnswer(shuffleTranslate[wordsCount]);

      setAudioSrc(`${BACKEND_DOMAIN_FOR_PATH_FILES}/${words[wordsCount].audio}`);
      setIsClicked(false);
    }

    const unbeatenStreakCount = () => {
      if (wordsCounterInRowArr.length > unbeatenStreak) {
        setUnbeatenStreak(wordsCounterInRowArr.length);
      }
    };

    const wordsCounterInRow = () => {
      if (wordsCounterInRowArr.length < 3) {
        setNumberOfPoints(10);
      }
      if (wordsCounterInRowArr.length === 3) {
        setNumberOfPoints(20);
      }
      if (wordsCounterInRowArr.length === 6) {
        setNumberOfPoints(40);
      }
      if (wordsCounterInRowArr.length === 9) {
        setNumberOfPoints(80);
      }
    };
    unbeatenStreakCount();
    wordsCounterInRow();
  }, [wordsCount]);

  const playSound = (soundType: string | undefined) => {
    const sound = new Audio(soundType);

    sound.volume = 0.3;
    sound.play();
  };

  const tickTimer = () => {
    if (seconds === 1) {
      setOverTime(true);
    }
    if (seconds > 1) {
      setSeconds(seconds - 1);
    }
  };

  const handleAnswerClickCorrect = () => {
    if (!word || !answer || wordsCount === null) return;
    if (!isClicked) {
      if (word.word === answer.word) {
        setCountWin([...countWin, word]);
        playSound(correctSound);
        setIsCorrectAnswer(true);
        setScoreCounter(scoreCounter + numberOfPoints);
        setWordsCounterInRowArr([...wordsCounterInRowArr, true]);
      } else {
        setCountLose([...countLose, word]);
        playSound(unCorrectSound);
        setIsCorrectAnswer(false);
        setWordsCounterInRowArr([]);
      }
      setIsClicked(true);

      if (wordsCount !== null) {
        setWordsCount(wordsCount + 1);
      }
    }
  };

  const handleAnswerClickUnCorrect = () => {
    if (!word || !answer || wordsCount === null) return;
    if (!isClicked) {
      if (word.word !== answer.word) {
        setCountWin([...countWin, word]);
        playSound(correctSound);
        setIsCorrectAnswer(true);
        setScoreCounter(scoreCounter + numberOfPoints);
        setWordsCounterInRowArr([...wordsCounterInRowArr, true]);
      } else {
        setCountLose([...countLose, word]);
        playSound(unCorrectSound);
        setIsCorrectAnswer(false);
        setWordsCounterInRowArr([]);
      }
      setIsClicked(true);
      if (wordsCount !== null) {
        setWordsCount(wordsCount + 1);
      }
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tickTimer(), 1000);
    const onKeypress = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        handleAnswerClickCorrect();
      }
      if (e.key === 'ArrowRight') {
        handleAnswerClickUnCorrect();
      }
    };
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
      clearInterval(timerID);
    };
  });

  useEffect(() => {
    if (store.isAuth) {
      if (word && textbookStore.userId) {
        useSetStorageWords(word, isCorrectAnswer, textbookStore.userId);
      }
    }
  }, []);

  return (
    <>
      {!isLoading && wordsCount !== null && word ? (
        <div className="sprint__word-box">
          {/* {wordsCount < 600 && !overTime ? ( */}
          {wordsCount < 20 && !overTime ? (
            <div className="sprint__question-wrapper">
              <div className="sprint__btn-wrapper">
                <div className="sprint__timer-wrapper">{seconds}</div>
                <div className="sprint__word-wrapper">
                  <div className="sprint__score">+{numberOfPoints} очков за слово</div>
                  <div className="sprint__word-question">{word.word}</div>
                  <div className="sprint__word-answer">{answer?.wordTranslate}</div>
                </div>
                <div className="score-wrapper">{scoreCounter}</div>
              </div>
              <div className="button-wrapper">
                <Button
                  variant="contained"
                  color="success"
                  className="answer-button"
                  type="button"
                  onClick={() => handleAnswerClickCorrect()}
                >
                  &#9664; YES
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  className="answer-button"
                  type="button"
                  onClick={() => handleAnswerClickUnCorrect()}
                >
                  NO &#9654;
                </Button>
              </div>
            </div>
          ) : (
            <RenderResults
              countLose={countLose}
              countWin={countWin}
              scoreCounter={scoreCounter}
              unbeatenStreak={unbeatenStreak}
              countNewWordsInStats={countNewWordsInStats}
              handleClickNewGameBtn={props.handleClickNewGameBtn}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RenderQuestion;
