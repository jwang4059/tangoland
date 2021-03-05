import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	card: {
		height: 280,
		padding: theme.spacing(2),
		margin: theme.spacing(4, 0),
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
		padding: 0,
	},
	title: {
		fontSize: "2.25rem",
		fontWeight: 700,
		borderBottom: "3px solid #3f51b5",
	},
	scoreboard: {
		margin: theme.spacing(6, 0),
	},
	subtitle: {
		fontSize: "1.5rem",
		fontWeight: 500,
	},
	score: {
		fontSize: "1.25",
	},
}));

export const EndCard = ({ total }) => {
	const classes = useStyles();
	const numCorrect = useSelector((state) => state.flashcards.score);

	return (
		<Card className={classes.card}>
			<CardContent className={classes.cardContent}>
				<Typography
					className={classes.title}
					component="h2"
					color="primary"
					align="center"
				>
					DONE
				</Typography>
				<div className={classes.scoreboard}>
					<Typography className={classes.subtitle} align="center">
						SCORE
					</Typography>
					<Typography
						className={classes.score}
						align="center"
					>{`${numCorrect} / ${total}`}</Typography>
				</div>
				<Typography color="textSecondary" variant="caption" align="center">
					Click the RESET button below to continue studying.
				</Typography>
			</CardContent>
		</Card>
	);
};
