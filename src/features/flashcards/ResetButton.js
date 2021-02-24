import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { reset } from "./flashcardsSlice";

const useStyles = makeStyles((theme) => ({
	button: {
		marginBottom: theme.spacing(2),
	},
}));

export const ResetButton = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<Button
			className={classes.button}
			variant="contained"
			color="primary"
			onClick={() => dispatch(reset())}
		>
			Reset
		</Button>
	);
};
