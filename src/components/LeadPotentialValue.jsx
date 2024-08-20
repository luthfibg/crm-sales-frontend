import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
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
import axios from 'axios';

export default function LeadPotentialValue({ username }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTradeValueData = async () => {
      try {
        const response = await axios.get(`http://localhost:2999/api/${username}/trade-value`);
        setData(response.data.map(row => ({
          name: row.date,  // Label untuk X-Axis (tanggal)
          pv: parseInt(row.total_value, 10),  // Total trade_value untuk Y-Axis
        })));
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch trade_value data:', error);
      }
    };

    fetchTradeValueData();
  }, [username]);


  return (
    <div style={{ width: '100%' }}>
    <Typography variant="body2" fontSize={13} ml={5} color={'darkgrey'}>
      Potential Value
    </Typography>

    {data.length > 0 ? (
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
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <Typography variant="body2" fontSize={13} ml={5} color={'darkgrey'}>
        No data available
      </Typography>
    )}
  </div>
  );
}
