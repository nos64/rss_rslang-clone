/* eslint-disable import/order */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { WordInterface, baseURL } from '../../types/common';
import getWords, { getGroupWords } from '../../api/Sprint';
import { getRandomPage, shuffle } from './utils';
import '../../assets/images/audio.svg';
import correctSound from '../../assets/sounds/correct.mp3';
import unCorrectSound from '../../assets/sounds/unCorrect.mp3';
import { Button } from '@mui/material';
import Loading from './Loading';
import RenderResults from './RenderResults';

const RenderQuestion = (props: { groupWords: number }) => {
  const [words, setWords] = useState<WordInterface[]>([]);
  const [word, setWord] = useState<WordInterface | null>(null);
  const [answer, setAnswer] = useState<WordInterface | null>(null);

  const [shuffleWords, setShuffleWords] = useState<WordInterface[]>([]);
  const [shuffleTranslate, setShuffleTranslate] = useState<WordInterface[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [wordsCount, setWordsCount] = useState<number | null>(null);

  const [isClicked, setIsClicked] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [countWin, setCountWin] = useState<WordInterface[]>([]);
  const [countLose, setCountLose] = useState<WordInterface[]>([]);
  const [audioSrs, setAudioSrc] = useState('');
  const [scoreCounter, setScoreCounter] = useState(0);
  const [numberOfPoints, setNumberOfPoints] = useState(10);
  const [wordsCounterInRowArr, setWordsCounterInRowArr] = useState<boolean[]>([]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const uploadedWords = await getWords(props.groupWords, getRandomPage());
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
      setAnswer(shuffleTranslate[wordsCount]);

      setAudioSrc(`${baseURL}/${words[wordsCount].audio}`);
      setIsClicked(false);
      setIsCorrectAnswer(false);
    }
    const wordsCounterInRow = () => {
      if (wordsCounterInRowArr.length < 3) {
        setNumberOfPoints(10);
      }
      if (
        wordsCounterInRowArr.length === 3 &&
        wordsCounterInRowArr.every((item) => item === true)
      ) {
        setNumberOfPoints(20);
      }
      if (
        wordsCounterInRowArr.length === 6 &&
        wordsCounterInRowArr.every((item) => item === true)
      ) {
        setNumberOfPoints(40);
      }
      if (
        wordsCounterInRowArr.length === 9 &&
        wordsCounterInRowArr.every((item) => item === true)
      ) {
        setNumberOfPoints(80);
      }
    };
    wordsCounterInRow();
  }, [wordsCount]);

  const playSound = (soundType: string | undefined) => {
    const sound = new Audio(soundType);

    sound.volume = 0.3;
    sound.play();
  };

  const handleAnswerClickCorrect = () => {
    if (!word || !answer || wordsCount === null) return;
    if (!isClicked) {
      if (word.word === answer.word) {
        setCountWin([...countWin, word]);
        setIsCorrectAnswer(true);
        playSound(correctSound);
        setScoreCounter(scoreCounter + numberOfPoints);
        setWordsCounterInRowArr([...wordsCounterInRowArr, true]);
      } else {
        setCountLose([...countLose, word]);
        setIsCorrectAnswer(false);
        playSound(unCorrectSound);
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
        setIsCorrectAnswer(true);
        playSound(correctSound);
        setScoreCounter(scoreCounter + numberOfPoints);
        setWordsCounterInRowArr([...wordsCounterInRowArr, true]);
      } else {
        setCountLose([...countLose, word]);
        setIsCorrectAnswer(false);
        playSound(unCorrectSound);
        setWordsCounterInRowArr([]);
      }
      setIsClicked(true);
      if (wordsCount !== null) {
        setWordsCount(wordsCount + 1);
      }
    }
  };

  useEffect(() => {
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
    };
  });

  return (
    <>
      {!isLoading && wordsCount !== null && word ? (
        <div className="word-box">
          {/* {wordsCount < 600 ? ( */}
          {wordsCount < 20 ? (
            <div className="question-wrapper">
              <div className="audio-btn-wrapper">
                <div className="timer-wrapper">60</div>
                <div className="word-wrapper">
                  <div className="animation-score">+{numberOfPoints} очков за слово</div>
                  <div className="word-question">{word.word}</div>
                  <div className="word-answer">{answer?.wordTranslate}</div>
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
            <RenderResults countLose={countLose} countWin={countWin} />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RenderQuestion;
