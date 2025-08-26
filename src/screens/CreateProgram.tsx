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
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import Background from "../components/Background";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import { NavigationProp } from "@react-navigation/native";
import Dropdown from "../components/Dropdown";
import { dropdownItem, workoutPlanItem } from "../types/exercise";
import DropDownPicker from "react-native-dropdown-picker";
import { getEquipment } from "../utils/workoutHelpers";
import CustomModal from "../components/CustomModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Keyboard } from "react-native";

/**
 * Creates customized workout programs based on user input
 * @param param0 contains naviagation to other screens
 * @returns screen that manages the creation of custom workout programs
 */
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
  const [goal, setGoal] = useState<string>(""); // the fitness goal of the user
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
  const [equipmentOpen, setEquipmentOpen] = useState<boolean>(false); //the open state of the dropdown for equipment options
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]); //list of equipment that the user has
  const [equipment, setEquipment] = useState<dropdownItem[]>([
    { value: "Any", label: "Any" },
    { value: "body only", label: "body only" },
    { value: "machine", label: "machine" },
    { value: "foam roll", label: "foam roll" },
    { value: "kettlebells", label: "kettlebells" },
    { value: "dumbbells", label: "dumbbells" },
    { value: "cable", label: "cable" },
    { value: "barbell", label: "barbell" },
    { value: "bands", label: "bands" },
    { value: "medicine ball", label: "medicine ball" },
    { value: "exercise ball", label: "exercise ball" },
    { value: "e-z curl bar", label: "e-z curl bar" },
  ]); //list of possible equipment to choose from
  const [missingFieldsModal, setMissingFieldsModal] = useState<boolean>(false); //visibilty of modal containing feedback on whether or not there is missing fields
  const [date, setDate] = useState<Date>(new Date()); // date of today
  const [workoutPlan, setWorkoutPlan] = useState<workoutPlanItem[]>([]); //contains info for the generated workout plan
  const [loading, setLoading] = useState<boolean>(true); //the loading state of generating custom workout
  const [changes, setChanges] = useState<string>(""); //the updates the user wants to make to the program

  /**
   * Used to go to next step of questioning
   */
  const handleContinue = () => {
    switch (stage) {
      case 1:
        if (age !== "" && gender !== "" && level !== "") {
          setStage((prev) => prev + 1);
        } else {
          setMissingFieldsModal(true);
        }
        break;
      case 2:
        if (goal !== "") {
          setStage((prev) => prev + 1);
        } else {
          setMissingFieldsModal(true);
        }
        break;
      case 3:
        if (selectedDays.length !== 0) {
          setStage((prev) => prev + 1);
        } else {
          setMissingFieldsModal(true);
        }
        break;
    }
  };

  /**
   * Saves the workouts in the program to in progress
   */
  const handleSave = () => {
    axios
      .post("http://127.0.0.1:5000/insertProgram", workoutPlan)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.navigate("Create");
  };

  /**
   * Goes back to the previous question
   */
  const handlePrev = () => {
    setStage((prev) => prev - 1);
  };

  /**
   * Updates the workout plan based on the changes the user makes
   */
  const handleChange = () => {
    axios
      .post("http://127.0.0.1:5000/updateProgram", [workoutPlan, changes])
      .then((response) => {
        console.log(response.data);
        setWorkoutPlan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Gives the API the results of the assessment to send to /generateProgram endpoint in the backend
   * API returns a custom workout program
   */
  const handleSubmit = () => {
    if (selectedEquipment.length !== 0) {
      const user_data = {
        age: age,
        gender: gender,
        level: level,
        goal: goal,
        days: selectedDays,
        startdate: date,
        equipment: selectedEquipment,
      };
      axios
        .post("http://127.0.0.1:5000/generateProgram", user_data)
        .then((response) => {
          setWorkoutPlan(response.data);
          setStage((prev) => prev + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMissingFieldsModal(true);
    }
  };

  /**
   * Sets the screen to loading while new program is being generated
   */
  useEffect(() => {
    setLoading(false);
  }, [workoutPlan]);

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
          text={
            stage === 5
              ? "Results"
              : "Part " + stage.toString() + " of " + numOfParts
          }
          textStyle={{
            color: "#FFFFFF",
            fontSize: 20,
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
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={styles.filterItemContainer}>
                <View>
                  <CustomText
                    text="Briefly describe your workout goal"
                    textStyle={{
                      fontSize: 16,
                      fontWeight: 600,
                      alignSelf: "center",
                      color: "#FFFFFF",
                    }}
                  ></CustomText>
                  <View style={styles.notesContainer}>
                    <TextInput
                      value={goal}
                      onChangeText={(text) => {
                        setGoal(text);
                      }}
                      style={styles.notes}
                      multiline={true}
                      maxLength={150}
                      placeholder="Ex: My goal is to get stronger in the bench press(max characters: 150)"
                      placeholderTextColor={"#696969d"}
                    ></TextInput>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
                text="Start Date"
                textStyle={{
                  fontSize: 20,
                  fontWeight: 600,
                  alignSelf: "center",
                  color: "#FFFFFF",
                }}
              ></CustomText>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }}
                style={{ alignSelf: "center" }}
              />
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

        <ScrollView>
          {stage === 5 &&
            workoutPlan.map((workout) => (
              <View key={workout.date} style={{ justifyContent: "center" }}>
                <CustomText
                  text={"Title: " + workout.title}
                  textStyle={{
                    fontSize: 16,
                    fontWeight: 600,
                    alignSelf: "center",
                    color: "#FFFFFF",
                  }}
                ></CustomText>
                <CustomText
                  text={"Date: " + workout.date}
                  textStyle={{
                    fontSize: 14,
                    fontWeight: 600,
                    alignSelf: "center",
                    color: "#FFFFFF",
                  }}
                ></CustomText>
                <CustomText
                  text={
                    "Muscle Groups Trained: " + workout.musclegroups.join(", ")
                  }
                  textStyle={{
                    fontSize: 14,
                    fontWeight: 600,
                    alignSelf: "center",
                    color: "#FFFFFF",
                  }}
                ></CustomText>
                <CustomText
                  text={
                    "Sets:\n " +
                    workout.sets.map(
                      (set) =>
                        "-Exercise: " +
                        set.exercise +
                        ", Set: " +
                        set.set_num +
                        ", Lbs: " +
                        set.lbs +
                        ", Reps: " +
                        set.reps +
                        "\n"
                    )
                  }
                  textStyle={{
                    fontSize: 13,
                    fontWeight: 600,
                    alignSelf: "center",
                    color: "#FFFFFF",
                  }}
                ></CustomText>
                <TextInput></TextInput>
              </View>
            ))}
        </ScrollView>
        {stage === 5 && workoutPlan.length != 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={styles.notesContainer}>
                <TextInput
                  value={changes}
                  onChangeText={(text) => {
                    setChanges(text);
                  }}
                  style={styles.notes}
                  multiline={true}
                  maxLength={255}
                  placeholder="Ex: Replace all instances of barbell bench press with an alternative exercise using dumbbells"
                  placeholderTextColor={"#696969d"}
                ></TextInput>
              </View>
            </TouchableWithoutFeedback>
            <CustomButton
              text="Enter"
              extraBtnDesign={{
                backgroundColor: "#f57c00",
                width: 120,
                height: 35,
                borderRadius: 10,
              }}
              extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
              action={() => {
                handleChange();
              }}
            ></CustomButton>
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
          text={stage === 4 ? "Generate" : stage === 5 ? "Save" : "Continue"}
          extraBtnDesign={{
            backgroundColor: "#4CAF50",
            width: 120,
            height: 35,
            borderRadius: 10,
          }}
          extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
          action={() => {
            stage === 4
              ? handleSubmit()
              : stage === 5
              ? handleSave()
              : handleContinue();
          }}
        ></CustomButton>
      </View>
      <CustomModal modalVisible={missingFieldsModal}>
        <View style={styles.backdrop}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              height: 100,
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "90%",
              borderRadius: 10,
            }}
          >
            <CustomText
              text="Please fill in missing fields"
              textStyle={{ color: "#2196F3", fontSize: 20, fontWeight: 600 }}
            ></CustomText>
            <CustomButton
              text="Ok"
              extraBtnDesign={{
                backgroundColor: "#B2B2B2",
                width: 120,
                height: 35,
                borderRadius: 10,
              }}
              extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
              action={() => {
                setMissingFieldsModal(false);
              }}
            ></CustomButton>
          </View>
        </View>
      </CustomModal>
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
    height: 100,
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
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(69,69,69,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateProgram;
