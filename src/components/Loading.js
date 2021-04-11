import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
	return (
		<Box>
			<Typography>Loading...</Typography>
			<Box m={2}>
				<CircularProgress />
			</Box>
		</Box>
	);
};

export default Loading;
