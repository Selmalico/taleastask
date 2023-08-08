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
}

export default function BookSelect({ books, selectedBooks, setSelectedBooks }) {
  const theme = useTheme();

  const handleBooksChange = (e) => {
    setSelectedBooks(e); 
  };
  return (
    <div>
      <FormControl  fullWidth>
        <InputLabel id="demo-multiple-chip-label">Select Books:</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          fullWidth
          value={selectedBooks}
          onChange={handleBooksChange}
          input={<OutlinedInput id="select-multiple-chip" label="Select Books" fullWidth />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {books.map((book) => (
            <MenuItem
              key={book._id}
              value={book.title}
              style={getStyles(book.title, selectedBooks, theme)}
            >
              {book.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const getStyles = (book, selectedBooks) => {
    const isSelected = selectedBooks && selectedBooks.indexOf(book._id) !== -1;
    return {
      background: isSelected ? "#007bff" : "transparent",
      color: isSelected ? "#fff" : "#000",
    };
  };
  