import { Button } from '@mui/material';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import RenderQuestion from './RenderQuestion';
import Loading from './Loading';
import textbookStore from '../../store/textbook';
import './Sprint.scss';
import PageTitle from '../../components/PageTitle/PageTitle';

const Sprint: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [className, setClassName] = useState('');
  const [groupWords, setGroupWords] = useState(0);

  const clickOnButton = (btn: number) => {
    setIsLoading(true);
    setGroupWords(btn - 1);
    setIsLoading(false);
  };

  const handleClickNewGameBtn = () => {
    setIsLoading(false);
    setClassName('');
    setGroupWords(0);
    textbookStore.fromTextbook = false;
  };

  const btnArr = [1, 2, 3, 4, 5, 6];

  return (
    <div className="wrapper">
      {isLoading && <Loading />}
      {className === 'invisible' ? (
        <RenderQuestion groupWords={groupWords} handleClickNewGameBtn={handleClickNewGameBtn} />
      ) : (
        ''
      )}
      <div className={`sprint__title ${className ? 'invisible' : ''}`}>
        <PageTitle title="Спринт" />
      </div>
      <div className={`sprint__wrapper ${className ? 'invisible' : ''}`}>
        <p className="sprint__description">
          Спринт - игра на время. Вы должны выбрать правильный перевод слова.
        </p>
        <p className="sprint__description">Игра длится 30 секунд или пока не закончатся слова.</p>
        <p className="sprint__description rule">
          Для выбора ответа используйте клавиши-стрелки клавиатуры или мышь
        </p>
        <div className="selection">
          {textbookStore.fromTextbook ? (
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                clickOnButton(textbookStore.currentGroup + 1);
                setClassName('invisible');
              }}
            >
              Начать игру
            </Button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Sprint;
