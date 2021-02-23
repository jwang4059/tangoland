import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const CustomInput = withStyles((theme) => ({
	input: {
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		fontSize: 16,
	},
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
}));

export const SelectMenu = ({ answerType, setAnswerType }) => {
	const classes = useStyles();

	const handleChange = (event) => {
		setAnswerType(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<Select
				value={answerType}
				onChange={handleChange}
				input={<CustomInput />}
			>
				<MenuItem value={"romaji"}>Romaji</MenuItem>
				<MenuItem value={"kana"}>Kana</MenuItem>
				<MenuItem value={"expression"}>Expression</MenuItem>
			</Select>
		</FormControl>
	);
};
