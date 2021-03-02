import React from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { Flashcard } from "./Flashcard";
import { Score } from "./Score";
import { ResetButton } from "./ResetButton";

export const FlashcardsPage = () => {
	const flashcardsStatus = useSelector((state) => state.flashcards.status);
	const flashcards = useSelector((state) => state.flashcards.data);
	const counter = useSelector((state) => state.flashcards.counter);
	const error = useSelector((state) => state.flashcards.error);

	let content;

	if (flashcardsStatus === "loading") {
		content = <Loading />;
	} else if (flashcardsStatus === "succeeded") {
		content = (
			<>
				<Flashcard flashcard={flashcards[counter].info} />
				<Score />
				<ResetButton />
			</>
		);
	} else if (flashcardsStatus === "failed") {
		content = <Error message={error} />;
	}

	return <section>{content}</section>;
};
