import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import { Question } from "./Question";
import { InfoModal } from "./InfoModal";
import { SettingsModal } from "./SettingsModal";
import { SelectMenu } from "./SelectMenu";
import { incrementCounter, incrementScore } from "./flashcardsSlice";

const useStyles = makeStyles((theme) => ({
	card: {
		minWidth: 250,
		maxWidth: 500,
		padding: theme.spacing(2),
		margin: theme.spacing(4, 0),
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
		padding: 0,
		marginBottom: theme.spacing(4),
	},
	cardActions: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
		},
	},
	submit: {
		marginTop: theme.spacing(2),
	},
	settingsButton: {
		marginLeft: "auto",
	},
	infoButton: {
		margin: "0 auto",
	},
}));

export const Flashcard = ({ flashcard }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [openInfo, setOpenInfo] = useState(false);
	const [openSettings, setOpenSettings] = useState(false);
	const [questionType, setQuestionType] = useState("expression");
	const [answerType, setAnswerType] = useState("romaji");
	const [answer, setAnswer] = useState("");
	const [error, setError] = useState(false);
	const [mistake, setMistake] = useState(false);

	const handleAnswerChange = (event) => {
		setAnswer(event.target.value);
		setError(false);
	};

	const handleAnswerValidation = () => {
		if (flashcard[answerType].includes(answer)) {
			if (!mistake) {
				dispatch(incrementScore());
			} else {
				setMistake(false);
			}
			setError(false);
			dispatch(incrementCounter());
			setAnswer("");
		} else {
			setMistake(true);
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
				<IconButton
					className={classes.settingsButton}
					onClick={() => setOpenSettings(true)}
				>
					<SettingsIcon />
				</IconButton>
				<SettingsModal
					open={openSettings}
					onClose={() => setOpenSettings(false)}
				/>
				<Question
					flashcard={flashcard}
					questionType={questionType}
					setQuestionType={setQuestionType}
				/>
				<Button
					className={classes.infoButton}
					onClick={() => setOpenInfo(true)}
				>
					Show More
				</Button>
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
