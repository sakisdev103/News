import React from "react";
import { useGlobalContext } from "../App";
import moment from "moment";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Articles = () => {
  const { articles } = useGlobalContext();
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {articles.map(({ published_date, title, url }) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={title}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${
                        moment(published_date).isSame(moment(), "day")
                          ? "Today"
                          : published_date.slice(0, 10)
                      } ${published_date.slice(11, 16)}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" href={url}>
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Articles;
