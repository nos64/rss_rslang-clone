/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { WordInterface } from '../../types/common';
import getWords, { getGroupWords } from './api';
import { getRandomPage, getRandomTranslate, shuffle } from './utils';
import Loading from './Loading';
import { baseURL } from './axiosInstance';
import './audio.svg';

const RenderQuestion = (props: { groupWords: number }) => {
  const [words, setWords] = useState<WordInterface[]>([]);
  const [allWords, setAllWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [wordsCount, setWordsCount] = useState(0);
  const [word, setWord] = useState<WordInterface>(words[wordsCount]);

  const [answerArray, setAnswerArray] = useState<Set<string>>(new Set());
  const [countWin, setCountWin] = useState<WordInterface[]>([]);
  const [countLose, setCountLose] = useState<WordInterface[]>([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      setWords([...words, ...(await getWords(props.groupWords, getRandomPage()))]);
      setAllWords([...allWords, ...(await getGroupWords(props.groupWords))]);
      setWord(words[wordsCount]);
      setIsLoading(false);
    };
    getData();
  }, []);

  const firstWord = words[wordsCount];
  console.log('firstWord: ', firstWord);

  // const newSet = new Set(answerArray);
  // newSet.add(word.wordTranslate);

  // const getData = async () => {
  //   setIsLoading(true);
  //   setWords([...words, ...(await getWords(props.groupWords, getRandomPage()))]);
  //   setAllWords([...allWords, ...(await getGroupWords(props.groupWords))]);
  //   setIsLoading(false);
  // };

  /** Заполняем массив вариантов ответов рандом из 600 слов */
  // const answesArr: Set<string> = new Set();
  // answesArr.add(word.wordTranslate); // Помещаем правильный ответ
  // setAnswerArray(answerArray.add(word.wordTranslate));
  // console.log('answesArr: ', answesArr);
  // while (answerArray.size !== 5) {
  // eslint-disable-next-line react/destructuring-assignment
  // setAnswerArray([...answerArray, answerArray.add(getRandomTranslate(allWords))]);
  //   answesArray.add(getRandomTranslate(props.allWords));
  // }
  // console.log('answesArray: ', answesArray);
  // setWordsCount(wordsCount + 1);
  // const audio = new Audio();
  // audio.src = `${baseURL}/${word.audio}`;
  // audio.currentTime = 0;
  // audio.autoplay = true;
  return (
    <>
      {isLoading && <Loading />}
      <div className="word-box">
        <div className="audio-btn-wrapper">
          <p>{word.id}</p>
          {/* <button className="audio-button" type="button" onClick={audio.play}>
            <svg
              className="mui-svg-icon-root jss163"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button> */}
        </div>
        {/* <ul className="answer-buttons__list">
          {shuffle(Array.from(answesArray)).map((item, index) => {
            <li className="answer-button__item" {dataset.translate = item}>
              <button className="answer-button" type="button" {dataset.translate = item}>
                {`${index + 1}. ${item}`}
              </button>
            </li>
          })}
        </ul> */}
        <button className="main-button" type="button">
          Не знаю
        </button>
      </div>
      ;
    </>
  );
};

export default RenderQuestion;
