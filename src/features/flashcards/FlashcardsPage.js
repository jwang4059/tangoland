import React from "react";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import Loading from "../../components/Loading";
import Flashcard from "./Flashcard";
import EndCard from "./EndCard";
import Score from "./Score";
import ResetButton from "./ResetButton";
import { selectSelectedFlashcards } from "./flashcardsSlice";

const FlashcardsPage = () => {
	const flashcardsStatus = useSelector((state) => state.flashcards.status);
	const flashcardError = useSelector((state) => state.flashcards.error);
	const flashcards = useSelector(selectSelectedFlashcards);
	const index = useSelector((state) => state.flashcards.counters.index);

	let content;

	if (flashcardsStatus === "loading") {
		content = <Loading />;
	} else if (flashcardsStatus === "succeeded") {
		content = (
			<>
				{index < flashcards.length ? (
					<>
						<Flashcard flashcard={flashcards[index]} />
						<Score />
						<ResetButton />
					</>
				) : (
					<EndCard total={flashcards.length} />
				)}
			</>
		);
	} else if (flashcardsStatus === "failed") {
		content = <Alert severity="error">{flashcardError}</Alert>;
	}

	return <main>{content}</main>;
};

export default FlashcardsPage;
