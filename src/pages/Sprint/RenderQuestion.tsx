/* eslint-disable import/order */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { WordInterface } from '../../types/common';
import getWords, { getGroupWords } from './api';
import { baseURL } from './axiosInstance';
import { getRandomPage, getRandomTranslate, shuffle } from './utils';
import './audio.svg';
import correctSound from './correct.mp3';
import unCorrectSound from './unCorrect.mp3';
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
      console.log('words: ', words);
      setAnswer(shuffleTranslate[wordsCount]);
      console.log('shuffleTranslate: ', shuffleTranslate);

      setAudioSrc(`${baseURL}/${words[wordsCount].audio}`);
      setIsClicked(false);
      setIsCorrectAnswer(false);
    }
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
        console.log('true');
        setCountWin([...countWin, word]);
        setIsCorrectAnswer(true);
        playSound(correctSound);
      } else {
        setCountLose([...countLose, word]);
        setIsCorrectAnswer(false);
        playSound(unCorrectSound);
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
      } else {
        setCountLose([...countLose, word]);
        setIsCorrectAnswer(false);
        playSound(unCorrectSound);
      }
      setIsClicked(true);
      if (wordsCount !== null) {
        setWordsCount(wordsCount + 1);
      }
    }
  };
  return (
    <>
      {!isLoading && wordsCount !== null && word ? (
        <div className="word-box">
          {/* {wordsCount < 600 ? ( */}
          {wordsCount < 20 ? (
            <div className="question-wrapper">
              <div className="audio-btn-wrapper">
                <div className="word-wrapper">
                  {word.word} это {answer?.wordTranslate}?
                </div>
              </div>
              <Button
                variant="outlined"
                className="answer-button"
                type="button"
                onClick={() => handleAnswerClickCorrect()}
              >
                YES
              </Button>
              <Button
                variant="outlined"
                className="answer-button"
                type="button"
                onClick={() => handleAnswerClickUnCorrect()}
              >
                NO
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
