/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { WordInterface } from '../../types/common';
import { baseURL } from './axiosInstance';

const RenderUncorrectCard = (props: { word: WordInterface }) => {
  const createAudio = () => {
    const audio = new Audio();
    audio.src = `${baseURL}/${props.word.audio}`;
    audio.currentTime = 0;
    audio.autoplay = true;
  };
  return (
    <div className="card-wrapper card-wrapper-uncorrect">
      <div style={{ borderColor: 'red' }} className="img-card img-card-uncorrect">
        <img className="word-img" src={`${baseURL}/${props.word.image}`} alt="Answer pic" />
      </div>
      <button className="audio-button-card" type="button" onClick={createAudio}>
        <svg
          className="mui-svg-icon-root jss163"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      </button>
      <p style={{ color: 'red' }}>{props.word.word}</p>
      {/* <p>`${props.word.wordTranslate}`</p> */}
    </div>
  );
};

export default RenderUncorrectCard;
