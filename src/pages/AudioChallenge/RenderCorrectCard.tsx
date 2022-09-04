/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { WordInterface } from '../../types/common';
import { BACKEND_DOMAIN_FOR_PATH_FILES } from '../../variables/constants';
import CreateAudioButton from './CreateAudioButton';

const RenderCorrectCard = (props: { word: WordInterface }) => {
  return (
    <div className="card-wrapper card-wrapper-correct">
      <div style={{ borderColor: 'green' }} className="img-card img-card-correct">
        <img
          className="word-img"
          src={`${BACKEND_DOMAIN_FOR_PATH_FILES}/${props.word.image}`}
          alt="Answer pic"
        />
      </div>
      <CreateAudioButton
        audioSrs={`${BACKEND_DOMAIN_FOR_PATH_FILES}/${props.word.audio}`}
        autoPlay={false}
        btnClass="audio-button-card"
      />
      <p style={{ color: 'green' }}>{props.word.word}</p>
      <p style={{ color: 'green' }}>{props.word.wordTranslate}</p>
    </div>
  );
};

export default RenderCorrectCard;
