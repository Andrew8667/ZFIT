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
} from "react-native";
import { useEffect, useState } from "react";
import Background from "../components/Background";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import { NavigationProp } from "@react-navigation/native";
import Dropdown from "../components/Dropdown";
import { dropdownItem } from "../types/exercise";
import DropDownPicker from "react-native-dropdown-picker";
import { getEquipment } from "../utils/workoutHelpers";

const CreateProgram = function CreateProgram({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const numOfParts = 4; //the number of question parts
  const [stage, setStage] = useState<number>(1); //the stage of questions asked to create the program
  const [ageOpen, setAgeOpen] = useState<boolean>(false); //the openness of the age dropdown
  const [age, setAge] = useState<string>(""); //age selected
  const [ages, setAges] = useState<dropdownItem[]>([]); //list of ages to choose from
  const [genderOpen, setGenderOpen] = useState<boolean>(false); //open status of the drop down to select gender
  const [gender, setGender] = useState<string>(""); //gender of the user
  const [genders, setGenders] = useState<dropdownItem[]>([
    {
      value: "male",
      label: "male",
    },
    {
      value: "female",
      label: "female",
    },
  ]); //list of possible genders to choose from
  const [levelOpen, setLevelOpen] = useState<boolean>(false); //the state of the drop down for experience level
  const [level, setLevel] = useState<string>(""); //the experience level of person
  const [levels, setLevels] = useState<dropdownItem[]>([
    {
      value: "beginner",
      label: "beginner",
    },
    {
      value: "intermediate",
      label: "intermediate",
    },
    {
      value: "expert",
      label: "expert",
    },
  ]); //possible experience levels to choose from: beginner, intermediate, expert
  const [goalOpen, setGoalOpen] = useState<boolean>(false); //the open state of the drop down containing possible goals
  const [goal, setGoal] = useState<string>(""); // the fitness goal of the user
  const [goals, setGoals] = useState<dropdownItem[]>([
    {
      value: "Strength",
      label: "Strength",
    },
    {
      value: "Hypertrophy",
      label: "Hypertrophy",
    },
  ]); //the options to choose from for goals
  const [musclegroups, setMusclegroups] = useState<string>(""); //string of muscle groups user wants to focus on
  const [lifts, setLifts] = useState<string>(""); //string of lifts that the user wants to prioritize
  const [daysOpen, setDaysOpen] = useState<boolean>(false); //the open state of the modal containing days of the week
  const [selectedDays, setSelectedDays] = useState<string[]>([]); //selected days of the week the user wants to do program
  const [days, setDays] = useState<dropdownItem[]>([
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ]); //possible days to choose from
  const [durationOrderingDropdownOpen, setDurationOrderingDropdownOpen] =
    useState(false); //the visibility of the duration ordering dropdow
  const [durationOptions, setDurationOptions] = useState<dropdownItem[]>([
    { value: "Any", label: "Any" },
    { value: "Under 30 minutes", label: "Under 30 minutes" },
    { value: "30-60 minutes", label: "30-60 minutes" },
    { value: "Over 60 minutes", label: "Over 60 minutes" },
  ]); //options to choose from duration
  const [durationRange, setDurationRange] = useState<string>(""); //the duration range that users want their workouts to be
  const [lengthOpen, setLengthOpen] = useState(false); //the visibility of the length dropdown
  const [lengthOptions, setLengthOptions] = useState<dropdownItem[]>([]); //options to choose from for length of program
  const [length, setLength] = useState<string>(""); //the length of program in weeks that users want their workouts to be
  const [equipmentOpen,setEquipmentOpen] = useState<boolean>(false);//the open state of the dropdown for equipment options
  const [selectedEquipment,setSelectedEquipment] = useState<string[]>([]);//list of equipment that the user has
  const [equipment,setEquipment] = useState<dropdownItem[]>([
    {value:'Any',label:'Any'},
    {value:'body only',label:'body only'},
    {value:'machine',label:'machine'},
    {value:'foam roll',label:'foam roll'},
    {value:'kettlebells',label:'kettlebells'},
    {value:'dumbbells',label:'dumbbells'},
    {value:'cable',label:'cable'},
    {value:'barbell',label:'barbell'},
    {value:'bands',label:'bands'},
    {value:'medicine ball',label:'medicine ball'},
    {value:'exercise ball',label:'exercise ball'},
    {value:'e-z curl bar',label:'e-z curl bar'},
  ]);//list of possible equipment to choose from
  /**
   * Used to go to next step of questioning
   */
  const handleContinue = () => {
    setStage((prev) => prev + 1);
  };

  /**
   * Goes back to the previous question
   */
  const handlePrev = () => {
    setStage((prev) => prev - 1);
  };

  /**
   * Populates drop down options for age and length of program
   */
  useEffect(() => {
    const ages = [];
    for (let i = 14; i <= 120; i++) {
      ages.push({
        value: i.toString(),
        label: i.toString(),
      });
    }
    setAges(ages);

    const lengthOptions = [];
    for (let i = 1; i <= 12; i++) {
      lengthOptions.push({
        value: i.toString(),
        label: i.toString(),
      });
    }
    setLengthOptions(lengthOptions);
  }, []);

  return (
    <Background>
      <CustomText
        text="Assessment"
        textStyle={{
          color: "#FFFFFF",
          fontWeight: "700",
          fontSize: 50,
          marginLeft: 20,
          marginTop: 25,
        }}
      ></CustomText>

      <View style={{ height: "80%" }}>
        <CustomText
          text={"Part " + stage.toString() + " of " + numOfParts}
          textStyle={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 600,
            marginLeft: 45,
            marginRight: 10,
          }}
        ></CustomText>
        {stage === 1 && (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <View style={styles.filterItemContainer}>
              <CustomText
                text="Age"
                textStyle={{
                  fontSize: 20,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
                }}
              ></CustomText>
              <Dropdown
                open={ageOpen}
                setOpen={setAgeOpen}
                selected={age}
                setSelected={setAge}
                items={ages}
                setItems={setAges}
              ></Dropdown>
            </View>
            <View style={styles.filterItemContainer}>
              <CustomText
                text="Gender"
                textStyle={{
                  fontSize: 20,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
                }}
              ></CustomText>
              <Dropdown
                open={genderOpen}
                setOpen={setGenderOpen}
                selected={gender}
                setSelected={setGender}
                items={genders}
                setItems={setGenders}
              ></Dropdown>
            </View>
            <View style={styles.filterItemContainer}>
              <CustomText
                text="Experience Level"
                textStyle={{
                  fontSize: 20,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
                }}
              ></CustomText>
              <Dropdown
                open={levelOpen}
                setOpen={setLevelOpen}
                selected={level}
                setSelected={setLevel}
                items={levels}
                setItems={setLevels}
              ></Dropdown>
            </View>
          </View>
        )}
        {stage === 2 && (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <View style={styles.filterItemContainer}>
              <CustomText
                text="Goal"
                textStyle={{
                  fontSize: 20,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
                }}
              ></CustomText>
              <Dropdown
                open={goalOpen}
                setOpen={setGoalOpen}
                selected={goal}
                setSelected={setGoal}
                items={goals}
                setItems={setGoals}
              ></Dropdown>
              {goal !== "" && (
                <View style={styles.notesContainer}>
                  <TextInput
                    value={goal === "Hypertrophy" ? musclegroups : lifts}
                    onChangeText={(text) => {
                      goal === "Hypertrophy"
                        ? setMusclegroups(text)
                        : setLifts(text);
                    }}
                    style={styles.notes}
                    multiline={true}
                    placeholder={
                      goal === "Hypertrophy"
                        ? "List the muscle groups you'd like to focus on"
                        : "List the lifts you'd like to improve"
                    }
                    placeholderTextColor={"#696969d"}
                  ></TextInput>
                </View>
              )}
            </View>
          </View>
        )}

        {stage === 3 && (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <View style={styles.filterItemContainer}>
              <CustomText
                text="Days of the week"
                textStyle={{
                  fontSize: 20,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
                }}
              ></CustomText>
              <DropDownPicker
                style={styles.dropdown}
                multiple={true}
                open={daysOpen}
                value={selectedDays}
                items={days}
                setOpen={setDaysOpen}
                setValue={setSelectedDays}
                setItems={setDays}
                dropDownContainerStyle={{
                  height: 100,
                }}
              />
            </View>
            <View style={styles.filterItemContainer}>
              <CustomText
                text="Duration"
                textStyle={{
                  fontSize: 20,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
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
            <View style={styles.filterItemContainer}>
              <CustomText
                text="Length of Program(weeks)"
                textStyle={{
                  fontSize: 20,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
                }}
              ></CustomText>
              <Dropdown
                open={lengthOpen}
                setOpen={setLengthOpen}
                selected={length}
                setSelected={setLength}
                items={lengthOptions}
                setItems={setLengthOptions}
              ></Dropdown>
            </View>
          </View>
        )}

        {stage === 4 && (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <View style={styles.filterItemContainer}>
              <CustomText
                text="What equipment do you have access to?"
                textStyle={{
                  fontSize: 16,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
                }}
              ></CustomText>
              <DropDownPicker
                style={styles.dropdown}
                multiple={true}
                open={equipmentOpen}
                value={selectedEquipment}
                items={equipment}
                setOpen={setEquipmentOpen}
                setValue={setSelectedEquipment}
                setItems={setEquipment}
                dropDownContainerStyle={{
                  height: 100,
                }}
              />
            </View>
          </View>
        )}
      </View>

      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <CustomButton
          text="Return"
          extraBtnDesign={{
            backgroundColor: "#f57c00",
            width: 120,
            height: 35,
            borderRadius: 10,
          }}
          extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
          action={() => {
            navigation.navigate("Create");
          }}
        ></CustomButton>
        {stage !== 1 && (
          <CustomButton
            text="Previous"
            extraBtnDesign={{
              backgroundColor: "#B2B2B2",
              width: 120,
              height: 35,
              borderRadius: 10,
            }}
            extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
            action={() => {
              handlePrev();
            }}
          ></CustomButton>
        )}
        <CustomButton
          text={stage === 4? 'Submit':'Continue'}
          extraBtnDesign={{
            backgroundColor: "#4CAF50",
            width: 120,
            height: 35,
            borderRadius: 10,
          }}
          extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
          action={() => {
            handleContinue();
          }}
        ></CustomButton>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  filterItemContainer: {
    height: "19%",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
  dropdown: {
    fontFamily: "Inter",
    borderColor: "#e4e4e4",
    color: "##e4e4e4",
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  notesContainer: {
    borderWidth: 1,
    borderColor: "rgba(69,69,69,0.5)",
    width: "90%",
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  notes: {
    padding: 10,
    width: "100%",
    height: "100%",
    textAlign: "left",
  },
});

export default CreateProgram;
