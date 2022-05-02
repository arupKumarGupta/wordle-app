import React, { createContext, useCallback, useEffect, useState } from 'react';
import { keys } from '../constants/keys';
import wordleService from '../services/wordleService';
export const WordleContext = createContext();
function getPlacement(current, placement) {
	if (current === 'CORRECT') {
		return current;
	}
	return placement;
}
const WordleProvider = ({ children }) => {
	const [currentGuess, setCurrentGuess] = useState('');
	const [keyState, setKeyState] = useState(
		keys
			.flatMap((k) => k)
			.reduce((a, ky) => {
				a[ky.id] = ky;
				return a;
			}, {})
	);

	const [guessesTillNow, setGuessesTillNow] = useState([]);

	const onKeyPressed = useCallback(
		async (data) => {
			if (data.type === 'letter') {
				setCurrentGuess((cW) => {
					const newWord = cW + data.id.toUpperCase();
					if (newWord.length > 5) {
						return cW;
					}
					return newWord;
				});
			} else if (data.type === 'action') {
				if (data.id === '#submit') {
					if (currentGuess.length === 5) {
						try {
							const { letterPlacements, valid, match } =
								await wordleService.checkWord(
									currentGuess.toLowerCase()
								);
							if (!valid) {
								console.log('not in the world list');
								return;
							}
							if (match) {
								console.log('MATCH!!!!');
							}
							setGuessesTillNow((guesses) => [
								...guesses,
								{ currentGuess, letterPlacements },
							]);
							for (let i = 0; i < currentGuess.length; i++) {
								let c = currentGuess[i].toLowerCase();
								setKeyState((cK) => ({
									...cK,
									[c]: {
										...cK[c],
										state: getPlacement(
											cK[c].state,
											letterPlacements[i]
										),
									},
								}));
							}
							setCurrentGuess('');
						} catch (err) {
							console.error(err);
						}
					}
				} else if (data.id === '#delete') {
					setCurrentGuess((cW) => cW.substring(0, cW.length - 1));
				}
			}
		},
		[setGuessesTillNow, setCurrentGuess, currentGuess, setKeyState]
	);
	const value = {
		currentGuess,
		setCurrentGuess,
		guessesTillNow,
		setGuessesTillNow,
		maxAllowedGuesses: 6,
		onKeyPressed,
		keyState,
	};
	return (
		<WordleContext.Provider value={value}>
			{children}
		</WordleContext.Provider>
	);
};

export default WordleProvider;
