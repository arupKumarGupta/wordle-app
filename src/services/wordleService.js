class WordleService {
	checkWord = (input) => {
		return fetch(
			`http://localhost:8080/submit?input=${encodeURIComponent(input)}`
		).then((res) => res.json());
	};
}
export default new WordleService();
