/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { WordInterface } from '../../types/common';

// eslint-disable-next-line react/no-unused-prop-types
const RenderAnswerBtns = (props: { answerArray: string[]; word: WordInterface }) => {
  const [answer, setAnswer] = useState('');

  return (
    <ul className="answer-buttons__list">
      {props.answerArray.map((item, index) => (
        <li className="answer-button__item" key={item} data-translate={item}>
          <button
            onClick={() => setAnswer(item)}
            className="answer-button"
            type="button"
            data-translate={item}
          >
            {`${index + 1}. ${item}`}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RenderAnswerBtns;
