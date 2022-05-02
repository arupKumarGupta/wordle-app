import React, { useCallback } from 'react';
import { PLACEMENTS } from '../constants/keys';

const Key = ({ type, id, action, currentState }) => {
	const handlePressEvent = useCallback(() => {
		action({ type, id, action, currentState });
	}, [type, id, action, currentState]);

	const getLetterFromId = () => {
		if (id === '#submit') {
			return 'Enter';
		}
		if (id === '#delete') {
			return '⌫';
		}
		return id.toUpperCase();
	};
	return (
		<div
			className={`key ${PLACEMENTS[currentState]}`}
			onClick={handlePressEvent}
		>
			{getLetterFromId(id)}
		</div>
	);
};

export default Key;
