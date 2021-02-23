import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Question } from "./Question";
import { InfoModal } from "./InfoModal";
import { SelectMenu } from "./SelectMenu";
import { increment } from "./flashcardsSlice";

const useStyles = makeStyles((theme) => ({
	card: {
		minWidth: 250,
		maxWidth: 500,
		padding: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
	},
	submit: {
		marginTop: theme.spacing(2),
	},
}));

export const Flashcard = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const flashcards = useSelector((state) => state.flashcards.data);
	const counter = useSelector((state) => state.flashcards.counter);

	const [open, setOpen] = useState(false);
	const [questionType, setQuestionType] = useState("expression");
	const [answerType, setAnswerType] = useState("romaji");
	const [answer, setAnswer] = useState("");
	const [error, setError] = useState(false);

	const flashcard = flashcards[counter];

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAnswerChange = (event) => {
		setAnswer(event.target.value);
		setError(false);
	};

	const handleAnswerValidation = () => {
		if (flashcard[answerType].includes(answer)) {
			setError(false);
			dispatch(increment());
			setAnswer("");
		} else {
			setError(true);
		}
	};

	const onEnterKey = (event) => {
		const code = event.keyCode ? event.keyCode : event.which;
		if (code === 13) {
			handleAnswerValidation();
		}
	};

	return (
		<Card className={classes.card}>
			<CardContent className={classes.cardContent}>
				<Question
					flashcard={flashcard}
					questionType={questionType}
					setQuestionType={setQuestionType}
				/>
				<Button onClick={handleOpen}>Show More</Button>
				<InfoModal open={open} onClose={handleClose} flashcard={flashcard} />
			</CardContent>
			<CardActions>
				<SelectMenu answerType={answerType} setAnswerType={setAnswerType} />
				<TextField
					id="answer"
					label="Answer"
					value={answer}
					error={error}
					fullWidth
					onChange={handleAnswerChange}
					onKeyPress={onEnterKey}
				/>
				<Button
					className={classes.submit}
					size="small"
					onClick={handleAnswerValidation}
				>
					Submit
				</Button>
			</CardActions>
		</Card>
	);
};
