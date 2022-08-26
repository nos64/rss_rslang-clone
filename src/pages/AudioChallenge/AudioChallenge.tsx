import React, { useState } from 'react';
import './style.scss';
import './audio.svg';
import RenderQuestion from './RenderQuestion';
import Loading from './Loading';

const AudioChallenge: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [className, setClassName] = useState('');
  const [groupWords, setGroupWords] = useState(0);

  const clickOnButton = async (btn: number) => {
    setIsLoading(true);
    setGroupWords(groupWords + btn - 1);
    setIsLoading(false);
  };

  return (
    <div className="wrapper">
      {isLoading && <Loading />}
      {className === 'invisible' ? <RenderQuestion groupWords={groupWords} /> : ''}
      <h1 className={`audio__title ${className ? 'invisible' : ''}`}>Аудиовызов</h1>
      <div className={`audio-wrapper ${className ? 'invisible' : ''}`}>
        <p className="audio__description">Тренировка Аудиовызов развивает словарный запас.</p>
        <p className="audio__description">Вы должны выбрать перевод услышанного слова.</p>
        <div className="selection">
          <h2 className="selection__title">Выберете уровень сложности</h2>
          <ul className="selection__list">
            <li className="selection__item">
              <button
                type="button"
                onClick={() => {
                  clickOnButton(1);
                  setClassName('invisible');
                }}
                className="selection__btn"
              >
                1
              </button>
            </li>
            <li className="selection__item">
              <button
                type="button"
                onClick={() => {
                  clickOnButton(2);
                  setClassName('invisible');
                }}
                className="selection__btn"
              >
                2
              </button>
            </li>
            <li className="selection__item">
              <button
                type="button"
                onClick={() => {
                  clickOnButton(3);
                  setClassName('invisible');
                }}
                className="selection__btn"
              >
                3
              </button>
            </li>
            <li className="selection__item">
              <button
                type="button"
                onClick={() => {
                  clickOnButton(4);
                  setClassName('invisible');
                }}
                className="selection__btn"
              >
                4
              </button>
            </li>
            <li className="selection__item">
              <button
                type="button"
                onClick={() => {
                  clickOnButton(5);
                  setClassName('invisible');
                }}
                className="selection__btn"
              >
                5
              </button>
            </li>
            <li className="selection__item">
              <button
                type="button"
                onClick={() => {
                  clickOnButton(6);
                  setClassName('invisible');
                }}
                className="selection__btn"
              >
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
