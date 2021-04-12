import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	container: {
		minHeight: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
	},
	expression: {
		fontSize: "3rem",
		lineHeight: 1,
	},
	meaning: {
		fontSize: "2.25rem",
		lineHeight: "2.5rem",
	},
});

const Question = ({ flashcard, questionType, setQuestionType }) => {
	const classes = useStyles();

	const handleQuestionToggle = () => {
		if (questionType === "expression") {
			setQuestionType("meaning");
		} else {
			setQuestionType("expression");
		}
	};

	return (
		<div className={classes.container} onClick={handleQuestionToggle}>
			{questionType === "expression" ? (
				<Typography
					className={classes.expression}
					component="h2"
					align="center"
				>
					{flashcard[questionType]}
				</Typography>
			) : (
				<Typography className={classes.meaning} component="h2" align="center">
					{flashcard[questionType].join(", ")}
				</Typography>
			)}
		</div>
	);
};

export default Question;
