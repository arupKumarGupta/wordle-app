import React from 'react';
import { PLACEMENTS } from '../constants/keys';

const Letter = ({ value, placement }) => {
	return <div className={`letter ${PLACEMENTS[placement]}`}>{value}</div>;
};

export default Letter;
