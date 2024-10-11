import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const LeadRadarChart = ({ lead }) => {

    // Fungsi untuk memetakan status lead ke angka
  const getStatusValue = (status) => {
    switch (status) {
      case 'baru':
        return 2;
      case 'mencoba dihubungi':
        return 3;
      case 'dihubungi':
        return 4;
      case 'sukses':
        return 5;
      case 'diskualifikasi':
        return 1;
      default:
        return 0; // Default jika tidak ada status
    }
  };

  const getSourceValue = (source) => {
    switch (source) {
      case 'email':
        return 1;
      case 'social media':
        return 2;
      case 'search engine':
        return 3;
      case 'ad':
        return 4;
      case 'referal':
        return 5;
      default:
        return 0; // Default jika tidak ada status
    }
  };

  const getResponseTimeValue = (time) => {
    switch (true) {
      case time >= 25:
        return 1; // sangat buruk
      case time >= 13 && time <= 24:
        return 2; // buruk
      case time >= 7 && time <= 12:
        return 3; // cukup
      case time >= 3 && time <= 6:
        return 4; // baik
      case time >= 1 && time <= 2:
        return 5; // sangat baik
      default:
        return 0; // Default jika tidak ada status
    }
  };

  const getTradeValue = (value) => {
    switch (true) {
      case value >= 0 && value <= 19999999:
        return 1; // sangat buruk
      case value >= 20000000 && value <= 49999999:
        return 2; // buruk
      case value >= 50000000 && value <= 199999999:
        return 3; // cukup
      case value >= 200000000 && value <= 999999999:
        return 4; // baik
      case value >= 1000000000:
        return 5; // sangat baik
      default:
        return 0; // Default jika tidak ada status
    }
  };
  
  const data = [
    { subject: 'Trade\nValue', value: getTradeValue(lead.trade_value), fullMark: 5 }, // 1B scaling
    { subject: 'Status', value: getStatusValue(lead.lead_status), fullMark: 5 }, // max 5 for status
    { subject: 'Response\nTime', value: getResponseTimeValue(lead.response_time), fullMark: 5 }, // max 48 hours
    { subject: 'Interaction\nLevel', value: lead.interaction_level, fullMark: 5 }, // 5 levels
    { subject: 'Source', value: getSourceValue(lead.source), fullMark: 5 }, // 5 sources
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis
            dataKey="subject"
            tick={({ payload, x, y, textAnchor, stroke }) => {
                return (
                <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    stroke='none'
                    fill='#808080'
                    style={{ fontSize: '10px', whiteSpace: 'pre-line' }} // Kecilkan font
                >
                    {payload.value.split('\n').map((line, index) => (
                    <tspan key={index} x={x} dy={index * 12}>
                        {line}
                    </tspan>
                    ))}
                </text>
                );
            }}
        />
        {/* <PolarAngleAxis dataKey="subject" tick={{ fontSize: '10px' }} /> */}
        <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={{ fontSize: '10px' }} />
        <Radar name="Lead Data" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default LeadRadarChart;
