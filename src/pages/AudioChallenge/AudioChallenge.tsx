import React, { useState } from 'react';
import './style.scss';
import './audio.svg';
import { Button } from '@mui/material';
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
  const btnArr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="wrapper">
      {isLoading && <Loading />}
      {className === 'invisible' ? <RenderQuestion groupWords={groupWords} /> : ''}
      <h1 className={`audio__title ${className ? 'invisible' : ''}`}>Аудиовызов</h1>
      <div className={`audio-wrapper ${className ? 'invisible' : ''}`}>
        <p className="audio__description">Тренировка Аудиовызов развивает словарный запас.</p>
        <p className="audio__description">Вы должны выбрать перевод услышанного слова.</p>
        <p className="audio__description rule">
          Для выбора ответа используйте клавиши 1, 2, 3, 4, 5
        </p>
        <p className="audio__description rule">Для перехода к следющему слову нажмите Enter</p>
        <p className="audio__description rule">
          Для повторного воспроизведения слова нажмите Пробел
        </p>
        <div className="selection">
          <h2 className="selection__title">Выберете уровень сложности</h2>
          <ul className="selection__list">
            {btnArr.map((item, index) => (
              <li className="selection__item" key={item}>
                <Button
                  variant="contained"
                  // ref={`keyboardClcick-${index}`}
                  type="button"
                  onClick={() => {
                    clickOnButton(item);
                    setClassName('invisible');
                  }}
                  className="selection__btn"
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioChallenge;
