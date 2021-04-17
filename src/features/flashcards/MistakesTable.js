import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { selectFlashcardsMap, selectMistakes } from "./flashcardsSlice";

const rowsSort = (rows) => {
	rows.sort((a, b) => b[1] - a[1]);
	return rows;
};

const useStyles = makeStyles({
	tableContainer: {
		maxHeight: 300,
		margin: "1rem 0",
	},
});

export default function BasicTable() {
	const classes = useStyles();
	const flashcardsMap = useSelector(selectFlashcardsMap);
	const mistakes = useSelector(selectMistakes);

	const rows = Object.entries(mistakes);

	return (
		<TableContainer className={classes.tableContainer} component={Paper}>
			<Table stickyHeader aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">Expression</TableCell>
						<TableCell align="center">Attempts</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rowsSort(rows).map(([id, attempts]) => (
						<TableRow key={id}>
							<TableCell component="th" scope="row" align="center">
								{flashcardsMap[id].expression}
							</TableCell>
							<TableCell align="center">{attempts}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
