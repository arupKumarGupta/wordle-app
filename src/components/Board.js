import React from 'react';
import useWordleContext from '../hooks/useWordleContext';
import Word from './Word';

const Board = () => {
	const { maxAllowedGuesses, guessesTillNow, currentGuess } =
		useWordleContext();

	const GuessedWords = guessesTillNow.map((guess, i) => (
		<Word
			key={`word-${i}`}
			value={guess.currentGuess}
			placements={guess.letterPlacements}
		/>
	));
	if (GuessedWords.length < maxAllowedGuesses) {
		const CurrentWord = (
			<Word value={currentGuess} key={`word-${GuessedWords.length}`} />
		);
		GuessedWords[GuessedWords.length] = CurrentWord;
		for (let i = GuessedWords.length; i < maxAllowedGuesses; i++) {
			GuessedWords[i] = <Word key={`word-${i}`} />;
		}
	}
	return <div style={{ color: 'white' }}>{GuessedWords}</div>;
};

export default Board;
