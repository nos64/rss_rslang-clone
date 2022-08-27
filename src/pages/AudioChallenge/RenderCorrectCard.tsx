/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { WordInterface } from '../../types/common';
import { baseURL } from './axiosInstance';
import CreateAudioButton from './CreateAudioButton';

const RenderCorrectCard = (props: { word: WordInterface }) => {
  return (
    <div className="card-wrapper card-wrapper-correct">
      <div style={{ borderColor: 'green' }} className="img-card img-card-correct">
        <img className="word-img" src={`${baseURL}/${props.word.image}`} alt="Answer pic" />
      </div>
      <CreateAudioButton
        audioSrs={`${baseURL}/${props.word.audio}`}
        autoPlay={false}
        btnClass="audio-button-card"
      />
      <p style={{ color: 'green' }}>{props.word.word}</p>
      <p style={{ color: 'green' }}>{props.word.wordTranslate}</p>
    </div>
  );
};

export default RenderCorrectCard;
