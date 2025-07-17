import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { getExercises, setRecorded } from "../lib/sets";
import { myExercises } from "../types/exercise";
import CustomText from "./CustomText";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

/**
 * Contains the users exercises and sets that they have marked as recorded
 * @param param0 contains the exercises to be displayed in myexercises screen and setMyExercises to set them
 * @returns list of exercises and their sets on myexercises screen
 */
const MyExerciseList = function MyExerciseList({
  myExercises,
  setMyExercises,
}: {
  myExercises: myExercises[];
  setMyExercises: (input: myExercises[]) => void;
}) {
  return (
    <ScrollView style={styles.container}>
      {myExercises.map((exercise,index) => {
        return (
          <View key={index.toString()} style={styles.exerciseContainer}>
            <CustomText
              text={exercise.name}
              textStyle={styles.exerciseName}
            ></CustomText>
            {exercise.recordedSets.map((set,index) => {
              const data =
                "lbs: " +
                set.lbs +
                " reps: " +
                set.reps +
                "\nCreated on: " +
                new Date(set.created_at).toLocaleDateString() +
                " " +
                new Date(set.created_at).toLocaleTimeString();
              return (
                <View style={styles.datacontainer} key={index.toString()}>
                  <Image
                    source={require("../../assets/bluediamond.png")}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                  ></Image>
                  <CustomText
                    text={data}
                    textStyle={{ color: "#FFFFFF", fontSize: 14, width: "85%" }}
                  ></CustomText>
                  <TouchableOpacity
                    style={{ width: 20, height: 20 }}
                    onPress={() => {
                      setRecorded(set.setid, false);
                    }}
                  >
                    <Image
                      source={require("../../assets/trash.png")}
                      style={{ width: 20, height: 20 }}
                    ></Image>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    height: '80%',
    marginBottom:100
  },
  exerciseContainer: {
    width: "100%",
    height: "auto",
  },
  exerciseName: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  datacontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MyExerciseList;
