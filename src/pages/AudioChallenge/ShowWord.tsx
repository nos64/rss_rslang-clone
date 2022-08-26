import React, { useState } from 'react';
import { WordInterface } from '../../types/common';

const ShowWord = () => {
  const [wordsCount, setWordsCount] = useState(0);
  const [countWin, setCountWin] = useState<WordInterface[]>([]);
  const [countLose, setCountLose] = useState<WordInterface[]>([]);
   /** Показ слова */
   const showWord = async () => {
    // eslint-disable-next-line no-shadow
    const word = words.data[wordsCount];
    setWordsCount(wordsCount + 1);

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
    // audio.src = `${baseURL}/${(await getWord(word.id)).data.audio}`;
    audio.src = `${baseURL}/${word.audio}`;
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
              // countWin.push(word);
              setCountWin([...countWin, word]);
            } else {
              audioBtnDiv.textContent = '';
              // audioBtnDiv.append(await renderUncorrectWordCard(word));
              mainBtn.textContent = '➙';
              // countLose.push(word);
              setCountLose([...countLose, word]);
              if (countLose.length === 5) {
                wordBox.textContent = '';
                showResult(countWin, countLose, wordBox);
                // showResult(countWin, countLose);
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
          showResult(countWin, countLose, wordBox);
          // showResult(countWin, countLose);
        }
        mainBtn.textContent = '➙';
      } else if (mainBtn.textContent === '➙') {
        if (wordsCount < words.data.length) {
          showWord();
        } else {
          wordBox.textContent = '';
          showResult(countWin, countLose, wordBox);
          // showResult(countWin, countLose);
        }
      }
    });
  };
  /** Показать первый вопрос */
  showWord();
  return (
    <div>
      
    </div>
  );
};

export default ShowWord;