/* eslint-disable import/order */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import { WordInterface } from '../../types/common';
import getWords, { getGroupWords } from './api';
import { getRandomPage, getRandomTranslate, shuffle } from './utils';
import Loading from './Loading';
import { baseURL } from './axiosInstance';
import './audio.svg';
import './style.scss';
// import RenderAnswerBtns from './RenderAnswerBtns';
import RenderAnswerCard from './RenderAnswerCard';
import RenderResults from './RenderResults';
import CreateAudioButton from './CreateAudioButton';
import { Button } from '@mui/material';
import correctSound from './correct.mp3';
import unCorrectSound from './unCorrect.mp3';

const RenderQuestion = (props: { groupWords: number }) => {
  const [words, setWords] = useState<WordInterface[]>([]);
  const [allWords, setAllWords] = useState<string[]>([]);
  const [answerArray, setAnswerArray] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  // const [isWordLoading, setIsWordLoading] = useState(false);

  const [wordsCount, setWordsCount] = useState<number | null>(null);
  const [word, setWord] = useState<WordInterface | null>(null);

  const [answer, setAnswer] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [countWin, setCountWin] = useState<WordInterface[]>([]);
  const [countLose, setCountLose] = useState<WordInterface[]>([]);
  const [nameBtnNext, setNameBtnNext] = useState('Не знаю');
  const [audioSrs, setAudioSrc] = useState('');

  const [indexAnswer, setIndexAnswer] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const uploadedWords = await getWords(props.groupWords, getRandomPage());
      setWords(uploadedWords);
      const uploadedGroup = await getGroupWords(props.groupWords);
      setAllWords(uploadedGroup);

      setIsLoading(false);
      setWordsCount(0);
    };
    getData();
  }, []);

  useEffect(() => {
    if (wordsCount !== null && wordsCount < 20) {
      setWord(words[wordsCount]);
      setAnswer(words[wordsCount].wordTranslate);
      const newSet: Set<string> = new Set();
      newSet.add(words[wordsCount].wordTranslate);
      while (newSet.size !== 5) {
        newSet.add(getRandomTranslate(allWords));
      }
      const arr = shuffle(Array.from(newSet));
      setAnswerArray([...arr]);
      // setAnswerArray([...shuffle(Array.from(newSet))]);
      const rightIndex = arr.findIndex((item) => item === words[wordsCount].wordTranslate);
      setIndexAnswer(rightIndex);

      setAudioSrc(`${baseURL}/${words[wordsCount].audio}`);
      setIsClicked(false);
      setIsCorrectAnswer(false);
      setNameBtnNext('Не знаю');
    }
  }, [wordsCount]);

  const playSound = (soundType: string | undefined) => {
    const sound = new Audio(soundType);
    sound.volume = 0.5;
    sound.play();
  };
  const handleAnswerClick = (item: string) => {
    if (!word) return;
    if (!isClicked) {
      if (answer === item) {
        setCountWin([...countWin, word]);
        setIsCorrectAnswer(true);
        setNameBtnNext('➙');
        playSound(correctSound);
      } else {
        setCountLose([...countLose, word]);
        setIsCorrectAnswer(false);
        setNameBtnNext('➙');
        playSound(unCorrectSound);
      }
      setIsClicked(true);
    }
  };
  const handleAnswerPress = (key: number) => {
    if (!word) return;
    if (!isClicked) {
      if (key === indexAnswer) {
        setCountWin([...countWin, word]);
        setIsCorrectAnswer(true);
        setNameBtnNext('➙');
        playSound(correctSound);
      } else {
        setCountLose([...countLose, word]);
        setIsCorrectAnswer(false);
        setNameBtnNext('➙');
        playSound(unCorrectSound);
      }
      setIsClicked(true);
    }
  };

  const handleMainBtnClick = () => {
    if (!word || wordsCount === null) {
      return;
    }
    if (nameBtnNext === 'Не знаю') {
      setCountLose([...countLose, word]);
      setIsCorrectAnswer(false);
      setNameBtnNext('➙');
      setIsClicked(true);
      playSound(unCorrectSound);
    }
    if (nameBtnNext === '➙' && wordsCount !== null) {
      setWordsCount(wordsCount + 1);
    }
  };

  useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        handleMainBtnClick();
      }
      if (e.key === '1') {
        handleAnswerPress(0);
      }
      if (e.key === '2') {
        handleAnswerPress(1);
      }
      if (e.key === '3') {
        handleAnswerPress(2);
      }
      if (e.key === '4') {
        handleAnswerPress(3);
      }
      if (e.key === '5') {
        handleAnswerPress(4);
      }
      if (e.key === '6') {
        handleAnswerPress(5);
      }
    };
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  });

  return (
    <>
      {/* {isLoading && <Loading />} */}
      {!isLoading && wordsCount !== null && word ? (
        <div className="word-box">
          {countLose.length !== 5 && wordsCount < 20 ? (
            <div className="question-wrapper">
              <div className="audio-btn-wrapper">
                {!isClicked ? (
                  <CreateAudioButton audioSrs={audioSrs} autoPlay btnClass="audio-button" />
                ) : (
                  <RenderAnswerCard isCorrectAnswer={isCorrectAnswer} word={word} />
                )}
              </div>
              <ul className="answer-buttons__list">
                {answerArray.map((item, index) => (
                  <li className="answer-button__item" key={item} data-num={index + 1}>
                    <Button
                      variant="outlined"
                      onClick={() => handleAnswerClick(item)}
                      className="answer-button"
                      type="button"
                      data-num={index + 1}
                    >
                      {`${index + 1}. ${item}`}
                    </Button>
                  </li>
                ))}
              </ul>
              {/* <RenderAnswerBtns answerArray={answerArray} word={word} /> */}
              <Button
                variant="contained"
                onClick={() => handleMainBtnClick()}
                className="main-button"
                type="button"
              >
                {nameBtnNext}
              </Button>
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
