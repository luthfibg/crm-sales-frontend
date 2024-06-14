import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography } from '@mui/material';
import darkTheme from '../styles/darkTheme';

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export default class LeadAge extends PureComponent {

  render() {
    return (

        <>
        <Typography variant="body2" fontSize={13} ml={5} mt={2} color={'darkgrey'}>Age (Days)</Typography>
        <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 25,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" height={7} />
          <XAxis dataKey="name" scale="band" tick={{ fontSize: '11px', fill: darkTheme.palette.primary.light }} />
          <YAxis interval={0} tick={{ fontSize: '11px', fill: darkTheme.palette.primary.light }} tickCount={8} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="uv" barSize={18} fill={darkTheme.palette.primary.main} />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
      </>
    );
  }
}
