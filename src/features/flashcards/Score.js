import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { selectMistakes } from "./flashcardsSlice";

const useStyles = makeStyles({
	score: {
		display: "block",
		margin: "1rem 0",
	},
});

const Score = () => {
	const classes = useStyles();
	const correct = useSelector((state) => state.flashcards.counters.correct);
	const mistakes = useSelector(selectMistakes);
	const total = correct + Object.keys(mistakes).length;

	return (
		<Typography
			className={classes.score}
			component="span"
			color="textSecondary"
		>{`${correct} / ${total}`}</Typography>
	);
};

export default Score;
