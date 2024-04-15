import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Loading = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ m: 5 }}>
        <Typography align="center">
          <CircularProgress />
        </Typography>
      </Container>
    </>
  );
};

export default Loading;
