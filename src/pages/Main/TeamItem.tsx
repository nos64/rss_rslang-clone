/* eslint-disable react/destructuring-assignment */
import React from 'react';

const TeamItem = (props: {
  imageSrc: string;
  gitLink: string;
  name: string;
  description: string;
  created: string[];
}) => {
  return (
    <div className="team-item">
      <div className="item__avatar">
        <img src={props.imageSrc} alt="Avatar" />
      </div>
      <a href={props.gitLink} className="item__linc">
        <span className="item__name">{props.name}</span>
      </a>
      <p className="item__description">{props.description}</p>
      <ul className="answer-buttons__list">
        {props.created.map((item) => (
          <li className="item__created-li" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamItem;
