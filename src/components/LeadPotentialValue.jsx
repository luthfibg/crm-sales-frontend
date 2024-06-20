import { Typography } from '@mui/material';
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import darkTheme from '../styles/darkTheme';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class LeadPotentialValue extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Typography variant="body2" fontSize={13} ml={5} color={'darkgrey'}>
          Potential Value
        </Typography>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
            style={{ cursor: 'pointer' }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: '11px', fill: darkTheme.palette.primary.light }} />
            <YAxis tick={{ fontSize: '11px', fill: darkTheme.palette.primary.light }} />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke={darkTheme.palette.secondary.main} fill={darkTheme.palette.secondary.main} />
            {/* <Brush /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
