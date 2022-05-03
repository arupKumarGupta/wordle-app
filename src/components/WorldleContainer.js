import React, { useEffect, useMemo, useState } from 'react';
import { keys } from '../constants/keys';
import useWordleContext from '../hooks/useWordleContext';
import Board from './Board';
import Keyboard from './Keyboard';

const WorldleContainer = () => {
	const { onKeyPressed, keyState, isGameOver } = useWordleContext();
	useEffect(() => {
		const keyUpHandler = ({ keyCode, key }) => {
			const actions = { 8: '#delete', 13: '#submit' };
			if (key.length > 1 && !actions[keyCode]) {
				return;
			}
			if (
				(keyCode >= 65 && keyCode <= 91) ||
				(keyCode >= 97 && keyCode <= 122)
			) {
				onKeyPressed({
					id: key.toLowerCase(),
					type: 'letter',
				});
			} else {
				if (actions[keyCode])
					onKeyPressed({
						type: 'action',
						id: actions[keyCode],
					});
			}
		};
		document.addEventListener('keyup', keyUpHandler);
		return () => {
			document.removeEventListener('keyup', keyUpHandler);
		};
	}, [onKeyPressed]);
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
