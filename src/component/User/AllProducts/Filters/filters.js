import React, { useState } from "react";
import { FormGroup, FormControlLabel, Checkbox, Typography, Box, Divider, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const FilterSection = () => {
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    size: [],
    brand: [],
    color: [],
    rating: [],
    material: [],
    discount: [],
  });

  const [isOpen, setIsOpen] = useState({
    category: true,
    price: true,
    size: true,
    brand: true,
    color: true,
    rating: true,
    material: true,
    discount: true,
  });

  const options = {
    category: ["Electronics", "Clothing", "Books", "Shoes", "Toys", "Furniture", "Beauty", "Grocery", "Sports", "Accessories"],
    price: ["Under $10", "$10 - $50", "$50 - $100", "$100 - $200", "$200 - $500", "$500 - $1000", "$1000 - $2000", "$2000 - $5000", "Above $5000"],
    size: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "Free Size", "Custom"],
    brand: ["Nike", "Adidas", "Samsung", "Apple", "Sony", "LG", "Puma", "Reebok", "Asus", "Dell"],
    color: ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Orange", "Purple", "Gray"],
    rating: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    material: ["Cotton", "Polyester", "Leather", "Silk", "Wood", "Plastic", "Metal", "Glass", "Rubber", "Wool"],
    discount: ["10% Off", "20% Off", "30% Off", "40% Off", "50% Off", "60% Off", "70% Off", "80% Off", "90% Off"],
  };

  const handleChange = (type, value) => {
    setFilters((prevFilters) => {
      const selected = prevFilters[type];
      const updatedSelection = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];
      return { ...prevFilters, [type]: updatedSelection };
    });
  };

  const toggleSection = (type) => {
    setIsOpen((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  };

  const renderOptions = (type) =>
    options[type].map((option, index) => (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            checked={filters[type].includes(option)}
            onChange={() => handleChange(type, option)}
          />
        }
        label={option}
      />
    ));

  return (
    <Box sx={{ p: 2, maxWidth: 300}}>
      <Typography variant="h6">Filters</Typography>
      <Divider sx={{ my: 1 }} />

      {Object.keys(options).map((filterKey) => (
        <Box key={filterKey}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle1">{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</Typography>
            <IconButton onClick={() => toggleSection(filterKey)}>
              {isOpen[filterKey] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          {isOpen[filterKey] && <FormGroup>{renderOptions(filterKey)}</FormGroup>}
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Box>
  );
};


