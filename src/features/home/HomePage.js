import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	card: {
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		borderRadius: ".25rem",
		padding: "1rem",
		margin: "2rem 0",
	},
	title: {
		fontSize: "1.5rem",
		lineHeight: "2rem",
		fontWeight: "700",
		alignSelf: "stretch",
		paddingBottom: "0.5rem",
		borderBottom: "1px solid black",
		marginBottom: "1rem",
	},
	button: {
		margin: "1rem 0",
	},
}));

const HomePage = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<main>
			<section className={classes.card}>
				<Typography
					className={classes.title}
					component="h2"
					color="primary"
					align="center"
				>
					Introduction
				</Typography>
				<Typography align="center" gutterBottom>
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
				<Typography variant="caption" component="span" display="block">
					For more help, visit <Link to="/resources">resources</Link>
				</Typography>
			</section>
		</main>
	);
};

export default HomePage;
