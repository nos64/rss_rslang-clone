/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { WordInterface } from '../../types/common';
import { baseURL } from './axiosInstance';
import CreateAudioButton from './CreateAudioButton';

const GenerateResults = (props: {
  arrayWord: WordInterface[];
  title: string;
  titleClass: string;
}) => {
  return (
    <div className="correct-div">
      <h2 className={props.titleClass}>{props.title}</h2>
      {props.arrayWord.length ? (
        <ul>
          {props.arrayWord.map((item) => (
            <li className="correct-li" key={item.word}>
              <CreateAudioButton
                audioSrs={`${baseURL}/${item.audio}`}
                autoPlay={false}
                btnClass="audio-button-card"
              />
              <span>{item.word}</span>
              <span>{item.wordTranslate}</span>
              <span>{item.transcription}</span>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default GenerateResults;
