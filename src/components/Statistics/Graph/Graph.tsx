import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserStatsLearnedWordsGraph } from '../../../types/common';

const Graph = (props: {
  graphData: UserStatsLearnedWordsGraph;
  graphDataKey: string;
  title: string;
}) => {
  const { graphData, graphDataKey, title } = props;
  const titleCss = {
    textAlign: 'center',
    mb: 1,
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography sx={titleCss}>{title}</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={graphData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={graphDataKey} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Graph;
