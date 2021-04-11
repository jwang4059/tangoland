import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { reset } from "./flashcardsSlice";

const useStyles = makeStyles({
	button: {
		margin: "1rem 0",
	},
});

const ResetButton = () => {
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

export default ResetButton;
