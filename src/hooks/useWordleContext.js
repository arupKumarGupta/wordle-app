import { useContext } from 'react';
import { WordleContext } from '../providers/WordleContext';

const useWordleContext = () => {
	const context = useContext(WordleContext);
	if (!context) {
		console.error(
			'useWordleContext can only be used inside WorldleProvider'
		);
	}
	return context;
};

export default useWordleContext;
