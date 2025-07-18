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
} from "react-native";
import { supabase } from "../lib/supabase"; // adjust path as needed
import { useState, useEffect, useContext, createContext } from "react";
import { Session } from "@supabase/supabase-js";
import { DialogTitleProps } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { populateWorkout } from "../store/workoutSlice";
import NavBar from "../components/NavBar";
import Background from "../components/Background";
import CustomText from "../components/CustomText";
import StoredWorkouts from "../components/StoredWorkouts";
import Search from "../components/Search";
import WorkoutFilter from "../components/WorkoutFilter";
import CustomModal from "../components/CustomModal";
import ExerciseFilter from "../components/ExerciseFilter";
import RootState from "../store/store";
import {
  filteredWorkouts,
  getFullWorkouts,
  getMusclesList,
} from "../utils/workoutHelpers";
import {
  exercise,
  workoutSliceType,
  workoutSliceTypeWithId,
} from "../types/exercise";
import { fetchData } from "../api/exercises";
import { UserContext } from "../App";

/**
 * Finished contain your past workouts that are marked as completed
 * Users can search for these workouts by name or use filter to filter by
 * -date
 * -duration
 * -musclegroups
 * @param param0 navigation allows you to navigate to the different screens
 * @returns screen that displays your finished workouts
 */
const Finished = function Finished({ navigation }: { navigation: any }) {
  const [exerciseList, setExerciseList] = useState<exercise[]>([]); //list of exercise info from exercises.json
  const [searchText, setSearchText] = useState(""); //keeps track of what is typed in search bar
  const [filterModalVisible, setFilterModalVisible] = useState(false); //controls visibility of filter modal
  const [dateOrdering, setDateOrdering] = useState("Newest to Oldest"); //filter by date
  const [durationRange, setDurationRange] = useState("Any"); //filter by duration of workout
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]); //filter by muscle
  const [open, setOpen] = useState<boolean>(false); //Determines if the drop down picker for muscles is open or not
  const [items, setItems] = useState<{ value: string; label: string }[]>([]); //muscles that are in the dropdown in filter
  const [workouts, setWorkouts] = useState<workoutSliceTypeWithId[]>([]); //workouts of the user
  const userId = useContext(UserContext);

  useEffect(() => {
    //populates the exercise list and user workouts when screen loads
    async function loadData() {
      await fetchData(setExerciseList);
      setWorkouts(await getFullWorkouts(userId, false));
    }
    loadData();
  }, []);

  useEffect(() => {
    setItems(getMusclesList(exerciseList)); ///getMuscleList returns {label:string,value:string}[] and is used to populate the exercise dropdown
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
        text="Finished"
        textStyle={{
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: 50,
          marginLeft: 20,
          marginTop: 25,
        }}
      ></CustomText>
      <Search
        setSearchText={setSearchText}
        searchText={searchText}
        action={setFilterModalVisible}
      ></Search>
      <StoredWorkouts
        navigation={navigation}
        isHorizontal={false}
        type="finished"
        workouts={filteredWorkouts(
          searchText,
          dateOrdering,
          durationRange,
          selectedMuscles,
          workouts
        )}
        containerStyle={{ height: 610 }}
      ></StoredWorkouts>
      <NavBar navigation={navigation} curScreen="finished"></NavBar>
    </Background>
  );
};

export default Finished;
