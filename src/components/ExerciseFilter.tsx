import {
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  View,
  Text,
  Button,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { dropdownItem } from "../types/exercise";

/**
 * Use this component when you want to display a filter for the exercises
 * @param param0 contains all the exercise parts we can filter by, the users selected values, and methods to update them
 * @returns a ui component to filter the exercises
 */
const ExerciseFilter = function ExerciseFilter({
  levels,
  setLevels,
  selectedLevel,
  setSelectedLevel,
  equipment,
  setEquipment,
  selectedEquipment,
  setSelectedEquipment,
  muscles,
  setMuscles,
  selectedMuscle,
  setSelectedMuscle,
  setFilterModalVisible,
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  forces,
  setForces,
  selectedForce,
  setSelectedForce,
}: {
  levels: dropdownItem[];
  setLevels: React.Dispatch<React.SetStateAction<dropdownItem[]>>;
  selectedLevel: string;
  setSelectedLevel: React.Dispatch<React.SetStateAction<string>>;
  equipment: dropdownItem[];
  setEquipment: React.Dispatch<React.SetStateAction<dropdownItem[]>>;
  selectedEquipment: string;
  setSelectedEquipment: React.Dispatch<React.SetStateAction<string>>;
  muscles: dropdownItem[];
  setMuscles: React.Dispatch<React.SetStateAction<dropdownItem[]>>;
  selectedMuscle: string;
  setSelectedMuscle: React.Dispatch<React.SetStateAction<string>>;
  setFilterModalVisible: (input: boolean) => void;
  categories: dropdownItem[];
  setCategories: React.Dispatch<React.SetStateAction<dropdownItem[]>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  forces: dropdownItem[];
  setForces: React.Dispatch<React.SetStateAction<dropdownItem[]>>;
  selectedForce: string;
  setSelectedForce: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [difficultyOpen, setDifficultyOpen] = useState(false);//keeps track of whether difficulty dropdown is open
  const [equipmentOpen, setEquipmentOpen] = useState(false);//keeps track of whether equipment dropdown is open
  const [muscleOpen, setMuscleOpen] = useState(false);//keeps track of whether muscle dropdown is open
  const [categoryOpen, setCategoryOpen] = useState(false);//keeps track of whether category dropdown is open
  const [forceOpen, setForceOpen] = useState(false);//keeps track of whether force dropdown is open

  return (
    <View style={styles.backdrop}>
      <View style={styles.filterContainer}>
        <View style={styles.filterItemContainer}>
          <CustomText
            text="Difficulty Level"
            textStyle={{ fontSize: 20, fontWeight: 600, alignSelf: "center" }}
          ></CustomText>
          <Dropdown
            open={difficultyOpen}
            setOpen={setDifficultyOpen}
            selected={selectedLevel}
            setSelected={setSelectedLevel}
            items={levels}
            setItems={setLevels}
          ></Dropdown>
        </View>
        <View style={styles.filterItemContainer}>
          <CustomText
            text="Equipment"
            textStyle={{ fontSize: 20, fontWeight: 600, alignSelf: "center" }}
          ></CustomText>
          <Dropdown
            open={equipmentOpen}
            setOpen={setEquipmentOpen}
            selected={selectedEquipment}
            setSelected={setSelectedEquipment}
            items={equipment}
            setItems={setEquipment}
          ></Dropdown>
        </View>
        <View style={styles.filterItemContainer}>
          <CustomText
            text="Muscle"
            textStyle={{ fontSize: 20, fontWeight: 600, alignSelf: "center" }}
          ></CustomText>
          <Dropdown
            open={muscleOpen}
            setOpen={setMuscleOpen}
            selected={selectedMuscle}
            setSelected={setSelectedMuscle}
            items={muscles}
            setItems={setMuscles}
          ></Dropdown>
        </View>
        <View style={styles.filterItemContainer}>
          <CustomText
            text="Category"
            textStyle={{ fontSize: 20, fontWeight: 600, alignSelf: "center" }}
          ></CustomText>
          <Dropdown
            open={categoryOpen}
            setOpen={setCategoryOpen}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            items={categories}
            setItems={setCategories}
          ></Dropdown>
        </View>
        <View style={styles.filterItemContainer}>
          <CustomText
            text="Force"
            textStyle={{ fontSize: 20, fontWeight: 600, alignSelf: "center" }}
          ></CustomText>
          <Dropdown
            open={forceOpen}
            setOpen={setForceOpen}
            selected={selectedForce}
            setSelected={setSelectedForce}
            items={forces}
            setItems={setForces}
          ></Dropdown>
        </View>
        <View style={styles.btnContainer}>
          <CustomButton
            text="Return"
            extraBtnDesign={{
              backgroundColor: "#f57c00",
              width: 120,
              height: 35,
            }}
            extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
            action={() => {
              setFilterModalVisible(false);
            }}
          ></CustomButton>
        </View>
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
    height: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  filterItemContainer: {
    height: "19%",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
  btnContainer: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position:'absolute',
    bottom:5
  },
});

export default ExerciseFilter;
