import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: ".25rem",
		padding: theme.spacing(2),
		margin: theme.spacing(4, 0),
	},
	title: {
		fontSize: "1.125rem",
		fontWeight: "700",
	},
	button: {
		margin: theme.spacing(2, 0),
	},
}));

export const HomePage = () => {
	const classes = useStyles();

	return (
		<section className={classes.root}>
			<Typography className={classes.title} variant="h2" component="h2">
				Introduction
			</Typography>
			<hr />
			<Typography gutterBottom>
				Welcome to Tangoland, aka 単語のランド. The purpose of this app is to
				test your knowledge on common japanese expressions. To begin, click the
				Study button now and start your journey through the land of vocab.
			</Typography>
			<Link to="/study">
				<Button className={classes.button} variant="contained" color="primary">
					Study
				</Button>
			</Link>
		</section>
	);
};