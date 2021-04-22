import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import Question from "./Question";
import InfoModal from "./InfoModal";
import SettingsModal from "./SettingsModal";
import SelectMenu from "./SelectMenu";
import {
	incrementCounter,
	incremenentMistake,
	repositionMistake,
	selectMistakes,
	selectIsRepeat,
} from "./flashcardsSlice";

const useStyles = makeStyles((theme) => ({
	card: {
		padding: "1rem",
		margin: "2rem 0",
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: 0,
	},
	cardActions: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: "1rem",
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
			alignItems: "flex-end",
		},
	},
	flashcardHeader: {
		alignSelf: "flex-end",
	},
	submit: {
		marginTop: "1rem",
	},
}));

const Flashcard = ({ flashcard }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const mistakes = useSelector(selectMistakes);
	const isRepeat = useSelector(selectIsRepeat);

	const [openInfo, setOpenInfo] = useState(false);
	const [openSettings, setOpenSettings] = useState(false);
	const [questionType, setQuestionType] = useState("expression");
	const [answerType, setAnswerType] = useState("romaji");
	const [answer, setAnswer] = useState("");
	const [error, setError] = useState(false);
	const [failed, setFailed] = useState(false);

	const handleAnswerChange = (event) => {
		setAnswer(event.target.value);
		if (error) setError(false);
	};

	const isCorrect = () => {
		if (answerType === "expression") {
			return flashcard[answerType] === answer;
		} else {
			return flashcard[answerType].includes(answer);
		}
	};

	const isMistake = () => {
		return mistakes.hasOwnProperty(flashcard._id);
	};

	const handleAnswerValidation = async () => {
		if (isCorrect()) {
			if (!isMistake()) dispatch(incrementCounter("correct"));
			if (isRepeat) {
				if (failed) {
					dispatch(repositionMistake());
				} else {
					dispatch(incrementCounter("index"));
				}
			} else {
				dispatch(incrementCounter("index"));
			}
			setFailed(false);
			setError(false);
			setAnswer("");
		} else {
			dispatch(incremenentMistake(flashcard._id));
			setFailed(true);
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
		<Card className={classes.card} component="section">
			<CardContent className={classes.cardContent}>
				<div className={classes.flashcardHeader}>
					<IconButton
						aria-label="open settings"
						onClick={() => setOpenSettings(true)}
					>
						<SettingsIcon />
					</IconButton>
					<SettingsModal
						open={openSettings}
						onClose={() => setOpenSettings(false)}
					/>
				</div>
				<Question
					flashcard={flashcard}
					questionType={questionType}
					setQuestionType={setQuestionType}
				/>
				<Button onClick={() => setOpenInfo(true)}>Show More</Button>
				<InfoModal
					open={openInfo}
					onClose={() => setOpenInfo(false)}
					flashcard={flashcard}
				/>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<SelectMenu answerType={answerType} setAnswerType={setAnswerType} />
				<TextField
					id="answer"
					label="Answer"
					value={answer}
					error={error}
					autoFocus={true}
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

export default Flashcard;
