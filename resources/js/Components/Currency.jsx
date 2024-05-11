import React from 'react';

const Currency = ({ amount, currency = 'USD' }) => {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency,
    }).format(amount);

    return <span>{formattedAmount}</span>;
};

export default Currency;