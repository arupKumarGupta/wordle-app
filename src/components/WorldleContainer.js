import React, { useMemo, useState } from 'react';
import { keys } from '../constants/keys';
import useWordleContext from '../hooks/useWordleContext';
import Board from './Board';
import Keyboard from './Keyboard';

const WorldleContainer = () => {
	const { onKeyPressed, keyState, currentGuess } = useWordleContext();
	console.log(keyState);
	const keyMap = useMemo(() => {
		const keyList = [];
		keys.forEach((row) => {
			const krow = [];
			row.forEach((key) => {
				krow.push(keyState[key.id]);
			});
			keyList.push(krow);
		});

		return keyList;
	}, [keyState]);

	return (
		<>
			<Board />
			<Keyboard onKeyPressed={onKeyPressed} keys={keyMap} />
		</>
	);
};

export default WorldleContainer;
