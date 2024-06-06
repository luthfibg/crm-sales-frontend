import React from 'react';

const CustomLegend = ({ payload }) => {
    return (
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, fontSize: '11px' }}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ color: entry.color }}>
                    {entry.value}
                </li>
            ))}
        </ul>
    );
};

export default CustomLegend;
