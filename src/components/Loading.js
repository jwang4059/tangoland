import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
	return (
		<div>
			<Typography gutterBottom>Loading...</Typography>
			<CircularProgress style={{ padding: "1rem" }} />
		</div>
	);
};

export default Loading;
