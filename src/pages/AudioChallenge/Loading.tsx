import { CircularProgress } from '@mui/material';
import React from 'react';
import './style.scss';

const Loading = () => {
  return (
    <div className="loading-message">
      <CircularProgress />
    </div>
  );
};

export default Loading;
