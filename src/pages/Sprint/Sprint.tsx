import { Button } from '@mui/material';
import React, { useState } from 'react';
import RenderQuestion from './RenderQuestion';
import Loading from './Loading';

const Sprint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [className, setClassName] = useState('');
  const [groupWords, setGroupWords] = useState(0);

  const clickOnButton = (btn: number) => {
    setIsLoading(true);
    setGroupWords(groupWords + btn - 1);
    setIsLoading(false);
  };
  const btnArr = [1, 2, 3, 4, 5, 6];

  return (
    <div className="wrapper">
      {isLoading && <Loading />}
      {className === 'invisible' ? <RenderQuestion groupWords={groupWords} /> : ''}
      <h1 className={`audio__title ${className ? 'invisible' : ''}`}>Спринт</h1>
      <div className={`audio-wrapper ${className ? 'invisible' : ''}`}>
        <p className="audio__description">
          Спринт - игра на время. Вы должны выбрать правильный перевод слова.
        </p>
        <p className="audio__description">Игра длится 1 минуту или пока не закончаться слова.</p>
        <p className="audio__description rule">
          Для выбора ответа используйте клавиши-стрелки или мышь
        </p>
        <div className="selection">
          <h2 className="selection__title">Выберете уровень сложности</h2>
          <ul className="selection__list">
            {btnArr.map((item) => (
              <li className="selection__item" key={item}>
                <Button
                  variant="contained"
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

export default Sprint;
