import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	header: {
		margin: theme.spacing(2),
	},
	title: {
		[theme.breakpoints.down("sm")]: {
			fontSize: "3rem",
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "4rem",
		},
	},
}));

export const Header = () => {
	const classes = useStyles();

	return (
		<header className={classes.header}>
			<Typography className={classes.title} component="h1" variant="h1">
				TangoLand
			</Typography>
		</header>
	);
};
