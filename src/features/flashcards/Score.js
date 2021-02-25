import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	score: {
		marginBottom: theme.spacing(2),
	},
}));

export const Score = () => {
	const classes = useStyles();
	const numCorrect = useSelector((state) => state.flashcards.score);
	const total = useSelector((state) => state.flashcards.counter);

	return (
		<Typography
			className={classes.score}
			color="textSecondary"
		>{`${numCorrect} / ${total}`}</Typography>
	);
};
