import React from 'react';
import moment from 'moment';

const Date = ({ date, format = 'long' }) => {
    const formattedDate = moment(date).format(format);

    return <span>{formattedDate}</span>;
};

export default Date;