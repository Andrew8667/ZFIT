import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import DropDownPicker from "react-native-dropdown-picker";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { dropdownItem } from "../types/exercise";

/**
 * Filters workout by their date, duration, and muscles worked
 * @param param0 contains filter info
 * @returns a filter for workout
 */
const WorkoutFilter = function WorkoutFilter({
  setFilterModalVisible,
  dateOrdering,
  setDateOrdering,
  durationRange,
  setDurationRange,
  selectedMuscles,
  setSelectedMuscles,
  open,
  setOpen,
  items,
  setItems,
}: {
  setFilterModalVisible: (input: boolean) => void;
  dateOrdering: string;
  setDateOrdering: React.Dispatch<React.SetStateAction<string>>;
  durationRange: string;
  setDurationRange: React.Dispatch<React.SetStateAction<string>>;
  selectedMuscles: string[];
  setSelectedMuscles: React.Dispatch<React.SetStateAction<string[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: { value: string; label: string }[];
  setItems: React.Dispatch<
    React.SetStateAction<Array<{ label: string; value: string }>>
  >;
}) {
  const [dateOrderingDropdownOpen, setDateOrderingDropdownOpen] =
    useState(false); //the visibility of the date ordering dropdown
  const [durationOrderingDropdownOpen, setDurationOrderingDropdownOpen] =
    useState(false); //the visibility of the duration ordering dropdow
  //options to choose for ordering by date
  const [dateOptions, setDateOptions] = useState<dropdownItem[]>([
    { value: "Newest to Oldest", label: "Newest to Oldest" },
    { value: "Oldest to Newest", label: "Oldest to Newest" },
  ]);
  //options to choose from duration
  const [durationOptions, setDurationOptions] = useState<dropdownItem[]>([
    { value: "Any", label: "Any" },
    { value: "Under 30 minutes", label: "Under 30 minutes" },
    { value: "30-60 minutes", label: "30-60 minutes" },
    { value: "Over 60 minutes", label: "Over 60 minutes" },
  ]);
  return (
    <View style={styles.backdrop}>
      <View style={styles.filterContainer}>
        <CustomText
          text="Filter By"
          textStyle={{ fontSize: 36, fontWeight: 700 }}
        ></CustomText>
        <View style={styles.muscleContainer}>
          <CustomText
            text="Muscle: "
            textStyle={{
              fontSize: 20,
              fontWeight: 600,
              alignSelf: "center",
              marginTop: 20,
            }}
          ></CustomText>
          <DropDownPicker
            style={styles.dropdown}
            multiple={true}
            open={open}
            value={selectedMuscles}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedMuscles}
            setItems={setItems}
            dropDownContainerStyle={{
                height:100
              }}
          />
        </View>
        <View style={styles.muscleContainer}>
          <CustomText
            text="Date: "
            textStyle={{ fontSize: 20, fontWeight: 600, alignSelf: "center" }}
          ></CustomText>
          <Dropdown
            open={dateOrderingDropdownOpen}
            setOpen={setDateOrderingDropdownOpen}
            selected={dateOrdering}
            setSelected={setDateOrdering}
            items={dateOptions}
            setItems={setDateOptions}
          ></Dropdown>
        </View>
        <View style={styles.muscleContainer}>
          <CustomText
            text="Duration: "
            textStyle={{
              fontSize: 20,
              fontWeight: 600,
              alignSelf: "center",
              marginTop: 20,
            }}
          ></CustomText>
          <Dropdown
            open={durationOrderingDropdownOpen}
            setOpen={setDurationOrderingDropdownOpen}
            selected={durationRange}
            setSelected={setDurationRange}
            items={durationOptions}
            setItems={setDurationOptions}
          ></Dropdown>
        </View>
        <CustomButton
          text="Return"
          extraBtnDesign={{
            backgroundColor: "#f57c00",
            width: 120,
            height: 35,
            marginTop: 30,
          }}
          extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
          action={() => {
            setFilterModalVisible(false);
          }}
        ></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(69,69,69,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    backgroundColor: "#FFFFFF",
    width: 400,
    height: 650,
    borderRadius: 10,
    alignItems: "center",
  },
  muscleContainer: {
    width: "100%",
    marginBottom: '20%',
  },
  dropdown: {
    fontFamily: "Inter",
    borderColor: "#e4e4e4",
    color: "##e4e4e4",
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
});

export default WorkoutFilter;
