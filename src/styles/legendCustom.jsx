import React from 'react';

const CustomLegend = ({ payload }) => {
    return (
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 80 }}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ marginBottom: 1 }}>
                    <span style={{ color: entry.color, fontSize: '12px' }}>{entry.value}</span>
                </li>
            ))}
        </ul>
    );
};

export default CustomLegend;
