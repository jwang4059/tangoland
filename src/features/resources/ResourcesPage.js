import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: ".25rem",
		padding: "1rem",
		margin: "2rem 0",
	},
	div: {
		margin: "2rem 0",
	},
	title: {
		fontSize: "1.5rem",
		lineHeight: "2rem",
		fontWeight: "700",
	},
	subheader: {
		fontWeight: "500",
		marginBottom: "1rem",
	},
	link: {
		display: "block",
	},
	button: {
		margin: "1rem 0",
	},
}));

const ResourcesPage = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<main>
			<section className={classes.root}>
				<Typography
					className={classes.title}
					component="h2"
					color="primary"
					align="center"
				>
					Resources
				</Typography>
				<hr />
				<div className={classes.div}>
					<Typography className={classes.subheader} component="h3">
						How to set up Japanese keyboard
					</Typography>
					<a
						className={classes.link}
						href="https://www.coscom.co.jp/learnjapanese801/install_ime.html"
						target="_blank"
						rel="noreferrer"
					>
						Windows
					</a>
					<a
						className={classes.link}
						href="https://redcocoon.org/cab/mysoft.html"
						target="_blank"
						rel="noreferrer"
					>
						Mac OS X
					</a>
					<a
						className={classes.link}
						href="https://help.ubuntu.com/community/JapaneseInput"
						target="_blank"
						rel="noreferrer"
					>
						Ubuntu
					</a>
				</div>
				<div className={classes.div}>
					<Typography className={classes.subheader} component="h3">
						How to Type in Japanese
					</Typography>
					<a
						className={classes.link}
						href="https://www.tofugu.com/japanese/how-to-type-in-japanese/"
						target="_blank"
						rel="noreferrer"
					>
						Japanese Typing
					</a>
				</div>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => history.push("/")}
				>
					Back to Home
				</Button>
			</section>
		</main>
	);
};

export default ResourcesPage;
