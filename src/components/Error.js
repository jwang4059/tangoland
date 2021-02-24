import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "#801313",
		backgroundColor: "#f2aeae",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
	icon: {
		marginRight: theme.spacing(1),
	},
}));

export const Error = ({ message }) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<ErrorOutlineIcon className={classes.icon} />
			<Typography>{message}</Typography>
		</div>
	);
};
