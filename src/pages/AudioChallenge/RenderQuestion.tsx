/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { WordInterface } from '../../types/common';
import getWords, { getGroupWords } from './api';
import { getRandomPage, getRandomTranslate, shuffle } from './utils';
import Loading from './Loading';
import { baseURL } from './axiosInstance';
import './audio.svg';
import './style.scss';
import RenderAnswerBtns from './RenderAnswerBtns';
import RenderAnswerCard from './RenderAnswerCard';

const RenderQuestion = (props: { groupWords: number }) => {
  const [words, setWords] = useState<WordInterface[]>([]);
  const [allWords, setAllWords] = useState<string[]>([]);
  const [answerArray, setAnswerArray] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isWordLoading, setIsWordLoading] = useState(false);

  const [wordsCount, setWordsCount] = useState(0);
  const [word, setWord] = useState<WordInterface>(words[wordsCount]);

  const [answer, setAnswer] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [countWin, setCountWin] = useState<WordInterface[]>([]);
  const [countLose, setCountLose] = useState<WordInterface[]>([]);
  const [nameBtnNext, setNaneBtnNext] = useState('Не знаю');
  const [audioSrs, setAudioSrc] = useState('');
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const uploadedWords = await getWords(props.groupWords, getRandomPage());
      setWords([...words, ...uploadedWords]);
      setWord(uploadedWords[wordsCount]);
      const uploadedGroup = await getGroupWords(props.groupWords);
      setAllWords([...allWords, ...uploadedGroup]);
      setAnswer(uploadedWords[wordsCount].wordTranslate);
      const newSet: Set<string> = new Set();
      newSet.add(uploadedWords[wordsCount].wordTranslate);
      while (newSet.size !== 5) {
        newSet.add(getRandomTranslate(uploadedGroup));
      }
      setAnswerArray([...shuffle(Array.from(newSet))]);
      setAudioSrc(`${baseURL}/${uploadedWords[wordsCount].audio}`);
      setIsLoading(false);
      setIsWordLoading(true);
      setIsClicked(false);
      setNaneBtnNext('Не знаю');
    };
    getData();
  }, [wordsCount]);

  const createAudio = () => {
    const audio = new Audio();
    audio.src = audioSrs;
    audio.currentTime = 0;
    audio.autoplay = true;
  };

  const handleAnswerClick = (item: string) => {
    if (!isClicked) {
      if (answer === item) {
        console.log('correct');
        setCountWin([...countWin, word]);
        setIsCorrectAnswer(true);
        setNaneBtnNext('➙');
      } else {
        console.log('unCorrect');
        setCountLose([...countLose, word]);
        setIsCorrectAnswer(false);
        setNaneBtnNext('➙');
      }
      setIsClicked(true);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {isWordLoading ? (
        <div className="word-box">
          <div className="audio-btn-wrapper">
            {!isClicked ? (
              <button className="audio-button" type="button" onClick={createAudio}>
                <audio src={`${baseURL}/${word.audio}`} autoPlay />
                <svg
                  className="mui-svg-icon-root jss163"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </button>
            ) : (
              <RenderAnswerCard isCorrectAnswer={isCorrectAnswer} word={word} />
            )}
          </div>
          <ul className="answer-buttons__list">
            {answerArray.map((item, index) => (
              <li className="answer-button__item" key={item} data-translate={item}>
                <button
                  onClick={() => handleAnswerClick(item)}
                  className="answer-button"
                  type="button"
                  data-translate={item}
                >
                  {`${index + 1}. ${item}`}
                </button>
              </li>
            ))}
          </ul>
          {/* <RenderAnswerBtns answerArray={answerArray} word={word} /> */}
          <button
            onClick={() => setWordsCount(wordsCount + 1)}
            className="main-button"
            type="button"
          >
            {nameBtnNext}
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default RenderQuestion;
