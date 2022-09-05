/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './ProjectItem.scss';

const ProjectItem = (props: { title: string; description: string }) => {
  return (
    <div className="project-item">
      <h3 className="project-item__title">{props.title}</h3>
      <p className="project-item__description">{props.description}</p>
    </div>
  );
};

export default ProjectItem;
