import React from 'react';
import { AxiosResponse } from 'axios';
import axiosInstance, { baseURL } from './axiosInstance';
import { WordInterface } from '../../types/common';
import { getRandomPage, hideElem, shuffle } from './utils';

// export const getWords = (group: number, page: number): Promise<AxiosResponse<WordInterface[]>> =>
//   axiosInstance.get(`/words?group=${group}&page=${page}`);

// export const getWord = (id: string): Promise<AxiosResponse<WordInterface>> =>
//   axiosInstance.get(`/words/${id}`);

const AudioChallenge: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let [wordsCount, setWordsCount] = React.useState(0);

  /** Массив с 600 словами из выбранной сложности */
  const allWords: string[] = [];
  const getRandomTranslate = () => allWords[Math.floor(Math.random() * allWords.length)];

  const getWords = (group: number, page: number): Promise<AxiosResponse<WordInterface[]>> =>
    axiosInstance.get(`/words?group=${group}&page=${page}`);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-shadow
  const getWord = (id: string): Promise<AxiosResponse<WordInterface>> =>
    axiosInstance.get(`/words/${id}`);

  /** Клик по уровню сложности, формируется массив с 600 словами вариантов ответов */
  const clickOnButton = async (btn: number) => {
    const words = await getWords(btn, getRandomPage());
    console.log(words);
    const allWordsInGroup: AxiosResponse<WordInterface[]>[] = [];
    for (let i = 0; i <= 29; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      allWordsInGroup.push(await getWords(btn, i));
    }
    allWordsInGroup.flat().map((item) => item.data.forEach((i) => allWords.push(i.wordTranslate)));
    // eslint-disable-next-line no-use-before-define
    renderWords(words);
  };

  const renderUncorrectWordCard = async (word: WordInterface) => {
    const divCard = document.createElement('div');
    divCard.className = 'card-wrapper card-wrapper_uncorrect';
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-card img-card_uncorrect';
    const img = document.createElement('img');
    img.src = `${baseURL}/${(await getWord(word.id)).data.image}`;
    img.className = 'word-img';
    imgWrapper.append(img);

    const audio = new Audio();
    audio.src = `${baseURL}/${(await getWord(word.id)).data.audio}`;
    audio.currentTime = 0;
    const audioButton = document.createElement('button');
    audioButton.className = 'audio-button-card';
    audioButton.innerHTML =
      '<svg class="mui-svg-icon-root jss163" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';

    audioButton.addEventListener('click', () => audio.play());

    const rightWord = document.createElement('p');
    rightWord.textContent = `${(await getWord(word.id)).data.word}`;
    // const translate = document.createElement('p');
    // translate.textContent = `${(await getWord(word.id)).data.wordTranslate}`;

    // const transcription = document.createElement('p');
    // transcription.textContent = `Транскрипция - ${(await getWord(word.id)).data.transcription}`;
    divCard.append(imgWrapper, audioButton, rightWord);
    return divCard;
  };

  /** Рендер слов */
  const wrapper: HTMLElement | null = document.querySelector('.wrapper');
  // const selection = document.querySelector('.selection');
  const audioWrapper: HTMLElement | null = document.querySelector('.audio-wrapper');
  const audioTitle: HTMLElement | null = document.querySelector('.audio__title');

  function renderWords(words: AxiosResponse<WordInterface[]>) {
    if (audioWrapper) hideElem(audioWrapper); // Скрываем описание и меню выбора сложности
    if (audioTitle) hideElem(audioTitle); // Скрыываем заголовок Аудиовызов

    const wordBox: HTMLDivElement = document.createElement('div');
    wordBox.className = 'word-box';
    wrapper?.append(wordBox);

    /** Счетчики выигрышей / проигрышей */
    const countWin: WordInterface[] = [];
    const countLose: WordInterface[] = [];

    /** Счетчик показанных слов */
    // let wordsCount = 0;

    /** Показ слова */
    const showWord = async () => {
      // eslint-disable-next-line no-shadow
      const word = words.data[wordsCount];
      setWordsCount((wordsCount += 1));

      wordBox.textContent = ''; // очищаем поле перед каждым словом

      /** Заполняем массив вариантов ответов рандом из 600 слов */
      const answesArray: Set<string> = new Set();
      answesArray.add(word.wordTranslate); // Помещаем правильный ответ
      while (answesArray.size !== 5) {
        answesArray.add(getRandomTranslate());
      }

      const questionDiv = document.createElement('div');
      questionDiv.className = 'question-wrapper';
      // questionDiv.dataset.count = `${wordsCount}/${words.data.length}`;

      /** Создаем кнопку аудио */
      const audio = new Audio();
      audio.src = `${baseURL}/${(await getWord(word.id)).data.audio}`;
      audio.currentTime = 0;
      audio.autoplay = true;
      const audioBtnDiv = document.createElement('div');
      audioBtnDiv.className = 'audio-btn-wrapper';
      const audioButton = document.createElement('button');
      audioButton.className = 'audio-button';
      audioButton.innerHTML =
        '<svg class="mui-svg-icon-root jss163" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';
      audioBtnDiv.append(audioButton);
      audioButton.addEventListener('click', () => audio.play());

      /** Создаем кнопки ответов */
      const ul = document.createElement('ul');
      ul.className = 'answer-buttons__list';
      shuffle(Array.from(answesArray)).forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'answer-button__item';
        li.dataset.translate = item;
        const btn: HTMLButtonElement = document.createElement('button');
        btn.className = 'answer-button';
        btn.dataset.translate = item;
        btn.textContent = `${index + 1}. ${item}`;

        li.append(btn);
        ul.append(li);
      });
      /** Создаем кнопку Не знаю */
      const mainBtn = document.createElement('button');
      mainBtn.className = 'main-button';
      mainBtn.textContent = 'Не знаю';

      questionDiv.append(audioBtnDiv, ul, mainBtn);
      wordBox.append(questionDiv);

      /** Обработка кликов по ответам */
      ul.addEventListener(
        'click',
        async (e) => {
          if (e.target && e.target instanceof HTMLElement) {
            if (e.target.classList.contains('answer-button')) {
              if (e.target.dataset.translate === word.wordTranslate) {
                audioBtnDiv.textContent = '';
                // audioBtnDiv.append(await renderCorrectWordCard(word));
                mainBtn.textContent = '➙';
                countWin.push(word);
              } else {
                audioBtnDiv.textContent = '';
                // audioBtnDiv.append(await renderUncorrectWordCard(word));
                mainBtn.textContent = '➙';
                countLose.push(word);
                if (countLose.length === 5) {
                  wordBox.textContent = '';
                  // showResult(countWin, countLose, wordBox);
                }
              }
            }
          }
        },
        { once: true }
      );
      mainBtn.addEventListener('click', async () => {
        if (mainBtn.textContent === 'Не знаю') {
          countLose.push(word);
          audioBtnDiv.textContent = '';
          // audioBtnDiv.append(await renderUncorrectWordCard(word));
          if (countLose.length === 5) {
            wordBox.textContent = '';
            // showResult(countWin, countLose, wordBox);
          }
          mainBtn.textContent = '➙';
        } else if (mainBtn.textContent === '➙') {
          if (wordsCount < words.data.length) {
            showWord();
          } else {
            wordBox.textContent = '';
            // showResult(countWin, countLose, wordBox);
          }
        }
      });
    };
    /** Показать первый вопрос */
    showWord();
  }

  return (
    <div className="wrapper">
      <h1 className="audio__title">Аудиовызов</h1>
      <div className="audio-wrapper">
        <p className="audio__description">Тренировка Аудиовызов развивает словарный запас.</p>
        <p className="audio__description">Вы должны выбрать перевод услышанного слова.</p>
        <div className="selection">
          <h2 className="selection__title">Выберете уровень сложности</h2>
          <ul className="selection__list">
            <li className="selection__item">
              <button type="button" onClick={() => clickOnButton(1)} className="selection__btn">
                1
              </button>
            </li>
            <li className="selection__item">
              <button type="button" onClick={() => clickOnButton(2)} className="selection__btn">
                2
              </button>
            </li>
            <li className="selection__item">
              <button type="button" onClick={() => clickOnButton(3)} className="selection__btn">
                3
              </button>
            </li>
            <li className="selection__item">
              <button type="button" onClick={() => clickOnButton(4)} className="selection__btn">
                4
              </button>
            </li>
            <li className="selection__item">
              <button type="button" onClick={() => clickOnButton(5)} className="selection__btn">
                5
              </button>
            </li>
            <li className="selection__item">
              <button type="button" onClick={() => clickOnButton(6)} className="selection__btn">
                6
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioChallenge;
