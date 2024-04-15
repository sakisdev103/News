import React from "react";
import { useGlobalContext } from "../App";
import moment from "moment";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Articles = () => {
  const { articles } = useGlobalContext();
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {articles.map(({ published_date, title, url }) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={title}>
                <Card variant="outlined">
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
                    {/* <Button size="small">Learn More</Button> */}
                    <Link href={url} sx={{ mx: 1 }} underline="none">
                      Learn More
                    </Link>
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
