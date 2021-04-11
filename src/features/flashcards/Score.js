import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	score: {
		display: "block",
		margin: "1rem 0",
	},
});

const Score = () => {
	const classes = useStyles();
	const numCorrect = useSelector((state) => state.flashcards.score);
	const total = useSelector((state) => state.flashcards.counter);

	return (
		<Typography
			className={classes.score}
			component="span"
			color="textSecondary"
		>{`${numCorrect} / ${total}`}</Typography>
	);
};

export default Score;
