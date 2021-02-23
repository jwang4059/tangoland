import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "./features/layout/Layout";
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

	return (
		<div className="App">
			<Layout>{content}</Layout>
		</div>
	);
};

export default App;
