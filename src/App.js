import './App.css';
import WordleProvider from './providers/WordleContext';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import WorldleContainer from './components/WorldleContainer';

function App() {
	return (
		<div className="wordle-container">
			<WordleProvider>
				<WorldleContainer />
			</WordleProvider>
		</div>
	);
}

export default App;
