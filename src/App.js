import React from "react";
import { useSelector } from "react-redux";
import { Flashcard } from "./features/flashcards/Flashcard";
import "./App.css";

const App = () => {
	const flashcardsStatus = useSelector((state) => state.flashcards.status);
	const error = useSelector((state) => state.flashcards.error);

	let content;

	if (flashcardsStatus === "loading") {
		content = <div>Loading...</div>;
	} else if (flashcardsStatus === "succeeded") {
		content = <Flashcard />;
	} else if (flashcardsStatus === "failed") {
		content = <div>{error}</div>;
	}

	return <div className="App">{content}</div>;
};

export default App;
