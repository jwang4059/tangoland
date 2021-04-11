import React from "react";
import { useHistory } from "react-router-dom";
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
		fontSize: "1.5rem",
		lineHeight: "2rem",
		fontWeight: "700",
	},
	button: {
		margin: theme.spacing(2, 0),
	},
}));

const HomePage = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<main>
			<section className={classes.root}>
				<Typography className={classes.title} component="h2" color="primary">
					Introduction
				</Typography>
				<hr />
				<Typography gutterBottom>
					Welcome to Tangoland, aka 単語のランド. The purpose of this app is to
					test your knowledge on common japanese expressions. To begin, click
					the Study button now and start your journey through the land of vocab.
				</Typography>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => history.push("/study")}
				>
					Study
				</Button>
			</section>
		</main>
	);
};

export default HomePage;
