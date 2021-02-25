import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "./features/layout/Layout";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Flashcard } from "./features/flashcards/Flashcard";
import { Score } from "./features/flashcards/Score";
import { ResetButton } from "./features/flashcards/ResetButton";

const App = () => {
	const flashcardsStatus = useSelector((state) => state.flashcards.status);
	const error = useSelector((state) => state.flashcards.error);

	let content;

	if (flashcardsStatus === "loading") {
		content = <Loading />;
	} else if (flashcardsStatus === "succeeded") {
		content = (
			<>
				<Flashcard />
				<Score />
				<ResetButton />
			</>
		);
	} else if (flashcardsStatus === "failed") {
		content = <Error message={error} />;
	}

	return <Layout>{content}</Layout>;
};

export default App;
