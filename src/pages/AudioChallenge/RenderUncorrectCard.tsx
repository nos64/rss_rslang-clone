/* eslint-disable react/destructuring-assignment */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import CreateAudioButton from './CreateAudioButton';
import { WordInterface } from '../../types/common';
import { baseURL } from './axiosInstance';

const RenderUncorrectCard = (props: { word: WordInterface }) => {
  return (
    <div className="card-wrapper card-wrapper-uncorrect">
      <div style={{ borderColor: 'red' }} className="img-card img-card-uncorrect">
        <img className="word-img" src={`${baseURL}/${props.word.image}`} alt="Answer pic" />
      </div>
      <CreateAudioButton
        audioSrs={`${baseURL}/${props.word.audio}`}
        autoPlay={false}
        btnClass="audio-button-card"
      />
      <p style={{ color: 'red' }}>{props.word.word}</p>
      {/* <p>`${props.word.wordTranslate}`</p> */}
    </div>
  );
};

export default RenderUncorrectCard;
