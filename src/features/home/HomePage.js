import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2),
		margin: theme.spacing(4, 0),
	},
}));

export const HomePage = () => {
	const classes = useStyles();

	return (
		<section className={classes.root}>
			<Typography variant="h2" component="h2">
				Introduction
			</Typography>
			<hr />
			<Typography>
				Welcome to Tangoland, aka <strong>単語のランド</strong>. The purpose of
				this app is to test your knowledge on common japanese expressions. To
				begin, click the Study button now and start your journey through the
				land of vocab.
			</Typography>
		</section>
	);
};
