import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { dropdownItem } from "../types/exercise";
import { StyleSheet } from "react-native";

/**
 * Dropdown for selecting items to filter by
 * @param param0 contains parameters needed to create dropdown
 * @returns a custom dropdown
 */
const Dropdown = function Dropdown({
  open,
  setOpen,
  selected,
  setSelected,
  items,
  setItems,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  items: dropdownItem[];
  setItems: React.Dispatch<React.SetStateAction<dropdownItem[]>>;
}) {
  return (
    <DropDownPicker
      style={styles.dropdown}
      multiple={false}
      open={open}
      value={selected}
      items={items}
      setOpen={setOpen}
      setValue={setSelected}
      setItems={setItems}
      dropDownContainerStyle={{
        height:100
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    fontFamily: "Inter",
    borderColor: "#e4e4e4",
    color: "##e4e4e4",
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
})

export default Dropdown;
