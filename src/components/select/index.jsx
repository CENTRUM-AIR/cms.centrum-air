import { isEmpty } from "lodash";
import React, { useState } from "react";
import SelectComp from "react-select";

export const Select = ({ items, placeholder, selectedValue, onPick }) => {
  const styles = {
    control: () => ({
      display: "flex",
      height: "58px",
      width: "100%",
      border: "1px solid #E8E8EA",
      borderRadius: "12px",
      backgroundColor: "#f3f6fc",
      paddingLeft: "14px",
      fontWeight: "400",
      cursor: "pointer",
      transitionProperty:
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      transitionTimingFunction: " cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
      ":hover": {
        background: "#F1F0FB",
      },
    }),
    menu: () => ({
      backgroundColor: "#f3f6fc",
      border: "1px solid #E8E8EA",
      borderRadius: "8px",
      marginTop: "4px",
      width: "100%",
      zIndex: "100",
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      textAlign: "left",
      height: "48px",
      backgroundColor: isSelected ? "#F1F0FB" : "#f3f6fc",
      color: isSelected ? "#4F3CFF" : "#000",
      ":hover": {
        background: "#F1F0FB",
      },

      transitionProperty:
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      transitionTimingFunction: " cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "300ms",
    }),
  };
  return (
    <SelectComp
      placeholder={placeholder}
      styles={styles}
      options={items}
      value={selectedValue}
      onChange={onPick}
      // onInputChange={(e) => e && setInputValue(e)}

      // isOptionSelected={() => setIsNoOptions(false)}
    />
  );
};
