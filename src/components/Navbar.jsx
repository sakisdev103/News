import React from "react";
import { useGlobalContext } from "../App";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

import * as icons from "country-flag-icons/react/1x1";
import { countries, categories } from "../data";

const Navbar = () => {
  console.log(icons.US);
  const { selectedCountry, setSelectedCountry, fetchFunc } = useGlobalContext();
  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
    fetchFunc(e.target.value);
  };
  return (
    <nav>
      <Container maxWidth="false" sx={{ mb: 2 }} disableGutters={true}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country-select-small"
                value={selectedCountry}
                label="Country"
                onChange={handleChange}
                autoWidth
              >
                {countries.map((country) => {
                  const Flag = icons[country];
                  return (
                    <MenuItem
                      value={country}
                      key={country}
                      style={{ alignItems: "center", gap: "0.3rem" }}
                    >
                      <Flag
                        title={country}
                        style={{ width: "1.5rem", height: "0.8rem" }}
                      />
                      {country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </Container>
    </nav>
  );
};

export default Navbar;
