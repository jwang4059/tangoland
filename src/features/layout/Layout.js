import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		padding: theme.spacing(3),
	},
	content: {
		width: "100%",
		flex: "1 0 auto",
	},
	footer: {
		flexShrink: 0,
	},
}));

const Layout = ({ children }) => {
	const classes = useStyles();

	return (
		<>
			<Container className={classes.root} maxWidth="xs">
				<div className={classes.content}>
					<Header />
					{children}
				</div>
				<Footer classes={classes} />
			</Container>
		</>
	);
};

export default Layout;
