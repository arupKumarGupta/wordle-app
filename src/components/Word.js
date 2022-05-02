import React from 'react';
import Letter from './Letter';

const Word = ({ value = '', placements = [] }) => {
	const letters = value.padEnd(5, ' ').split('');
	const content = letters.map((letter, id) => (
		<Letter
			value={letter.toUpperCase()}
			key={id}
			placement={placements[id]}
		/>
	));
	return <div className="word">{content}</div>;
};

export default Word;
