import React from 'react';

import Key from './Key';

const Keyboard = ({ onKeyPressed, keys }) => {
	const content = keys.map((keyRow, rowInd) => {
		return (
			<div key={rowInd} className="keyboard-row">
				{keyRow.map((ky, ind) => (
					<Key
						key={ind + ky.id}
						id={ky.id}
						currentState={ky.state}
						type={ky.type}
						action={onKeyPressed}
					/>
				))}
			</div>
		);
	});
	return <div className="keyboard">{content}</div>;
};

export default Keyboard;
