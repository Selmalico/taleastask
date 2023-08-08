import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function GenreSelect({ genres, selectedGenres, setSelectedGenres }) {
  const theme = useTheme();

  const handleGenreChange = (event) => {
    setSelectedGenres(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth style={{backgroundColor: "white"}}>
        <InputLabel id="demo-multiple-chip-label">Select Genres:</InputLabel>
        <Select
          fullWidth
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedGenres}
          onChange={handleGenreChange}
          input={<OutlinedInput id="select-multiple-chip" label="Select Genres" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {genres.map((genre) => (
            <MenuItem
              fullWidth
              key={genre._id}
              value={genre.name}
              style={getStyles(genre.name, selectedGenres, theme)}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const getStyles = (genre, selectedGenres) => {
    const isSelected = selectedGenres && selectedGenres.indexOf(genre._id) !== -1;
    return {
      background: isSelected ? "#007bff" : "transparent",
      color: isSelected ? "#fff" : "#000",
    };
  };
  
