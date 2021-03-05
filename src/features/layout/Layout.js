import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

const useStyles = makeStyles((theme) => ({
	container: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		padding: theme.spacing(3),
	},
	main: {
		width: "100%",
		flex: "1 0 auto",
	},
}));

export const Layout = ({ children }) => {
	const classes = useStyles();

	return (
		<>
			<Container className={classes.container} maxWidth="xs">
				<Header />
				<main className={classes.main}>{children}</main>
				<Footer />
			</Container>
		</>
	);
};
