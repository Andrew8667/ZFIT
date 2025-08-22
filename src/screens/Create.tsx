import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { supabase } from "../lib/supabase"; // adjust path as needed
import React, { useState, useEffect, useContext } from "react";
import { populateWorkout } from "../store/workoutSlice";
import { Session } from "@supabase/supabase-js";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import Background from "../components/Background";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import { getWorkouts } from "../lib/workouts";
import { getSets } from "../lib/sets";
import {
  filteredWorkouts,
  getFullWorkouts,
  getMusclesList,
} from "../utils/workoutHelpers";
import StoredWorkouts from "../components/StoredWorkouts";
import {
  exercise,
  workoutSliceType,
  workoutSliceTypeWithId,
} from "../types/exercise";
import { fetchData } from "../api/exercises";
import Search from "../components/Search";
import CustomModal from "../components/CustomModal";
import WorkoutFilter from "../components/WorkoutFilter";
import { UserContext } from "../App";
import SuccessfulCreation from "../components/SuccessfulCreation";
import { NavigationProp } from "@react-navigation/native";

/**
 * Create screen contains a button to create a new workout
 * You can also see in progress workouts if you'd like to keep working on them
 * Can search the finished workouts by title, date, muscles worked, and duration
 * @param param0 navigation to the other screens
 * @returns the create screen
 */
const Create = function Create({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: any;
}) {
  const [exerciseList, setExerciseList] = useState<exercise[]>([]); //contains info that was fetched from exercises.json
  const [searchText, setSearchText] = useState(""); //keeps track of text in search bar
  const [filterModalVisible, setFilterModalVisible] = useState(false); //visibility of filter modal
  const [dateOrdering, setDateOrdering] = useState("Newest to Oldest"); //filter by date
  const [durationRange, setDurationRange] = useState("Any"); //filter by duration
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]); //filter by muscles worked
  const [open, setOpen] = useState<boolean>(false); //Keeps track of if the dropdown in filter for exercises is open
  const [items, setItems] = useState<{ value: string; label: string }[]>([]); //populates the dropdown items
  const [workouts, setWorkouts] = useState<workoutSliceTypeWithId[]>([]); //holds the in progress workouts
  const [successModalVisible, setSuccessModalVisible] = useState(false); //visibility of filter modal
  const userId = useContext(UserContext);
  const status = route?.params?.status ?? "fail";

  useEffect(() => {
    //populates the exercise list when screen loads
    async function loadData() {
      await fetchData(setExerciseList);
      setWorkouts(await getFullWorkouts(userId, true));
    }
    loadData();
    if (status === "success") {
      setSuccessModalVisible(true);
    } else {
      setSuccessModalVisible(false);
    }
  }, []);

  useEffect(() => {
    setItems(getMusclesList(exerciseList)); ///getMusclesList returns {label:string,value:string}[] to populate the dropdown
  }, [exerciseList]);

  return (
    <Background>
      <CustomModal modalVisible={filterModalVisible}>
        <WorkoutFilter
          setFilterModalVisible={setFilterModalVisible}
          dateOrdering={dateOrdering}
          setDateOrdering={setDateOrdering}
          durationRange={durationRange}
          setDurationRange={setDurationRange}
          selectedMuscles={selectedMuscles}
          setSelectedMuscles={setSelectedMuscles}
          open={open}
          setOpen={setOpen}
          items={items}
          setItems={setItems}
        ></WorkoutFilter>
      </CustomModal>
      <CustomText
        text="Create"
        textStyle={{
          color: "#FFFFFF",
          fontWeight: "700",
          fontSize: 50,
          marginLeft: 20,
          marginTop: 25,
        }}
      ></CustomText>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <CustomButton
          text="New Workout"
          extraBtnDesign={{
            backgroundColor: "#f57c00",
            width: 150,
            height: 50,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 20,
          }}
          extraTxtDesign={{ fontSize: 14, fontWeight: 500 }}
          action={() => navigation.navigate("MyWorkout")}
        ></CustomButton>
        <CustomButton
          text="Program"
          extraBtnDesign={{
            backgroundColor: "#4CAF50",
            width: 150,
            height: 50,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 20,
          }}
          extraTxtDesign={{ fontSize: 14, fontWeight: 500 }}
          action={() => navigation.navigate("CreateProgram")}
        ></CustomButton>
      </View>
      <Search
        setSearchText={setSearchText}
        searchText={searchText}
        action={setFilterModalVisible}
        extraStyle={{ marginTop: 20 }}
      ></Search>
      <StoredWorkouts
        navigation={navigation}
        isHorizontal={false}
        type="inprogress"
        workouts={filteredWorkouts(
          searchText,
          dateOrdering,
          durationRange,
          selectedMuscles,
          workouts
        )}
        containerStyle={{
          width: "100%",
          height: 550,
          marginTop: 10,
          justifyContent: "center",
        }}
      ></StoredWorkouts>
      <CustomModal modalVisible={successModalVisible}>
        <SuccessfulCreation
          setSuccessModalVisible={setSuccessModalVisible}
        ></SuccessfulCreation>
      </CustomModal>
      <NavBar navigation={navigation} curScreen="create"></NavBar>
    </Background>
  );
};

export default Create;
