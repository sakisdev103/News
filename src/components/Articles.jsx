import React, { useState } from "react";
import { useGlobalContext } from "../App";
import moment from "moment";
import image from "../img/news.png";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Articles = () => {
  const { articles } = useGlobalContext();

  const [readMore, setReadMore] = useState({
    title: "-1",
    show: false,
  });

  const readMoreFunc = (title) => {
    if (readMore.title === title) {
      setReadMore({
        title: "-1",
        show: !readMore.show,
      });
    } else {
      setReadMore({
        title,
        show: !readMore.show,
      });
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {articles.map(({ published_date, title, url }) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={title}>
                <Card>
                  <CardMedia
                    sx={{ height: "17vh" }}
                    image={image}
                    title="News"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {title.length > 50
                        ? readMore.title === title
                          ? title
                          : `${title.slice(0, 50)} ...`
                        : title}
                      {title.length > 50 && (
                        <Button
                          variant="text"
                          onClick={() => readMoreFunc(title)}
                        >
                          {readMore.title === title ? "READ LESS" : "READ MORE"}
                        </Button>
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${
                        moment(published_date).isSame(moment(), "day")
                          ? "Today"
                          : published_date.slice(0, 10)
                      } `}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
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
