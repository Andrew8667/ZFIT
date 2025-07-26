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
  mySets,
}: {
  mySets: [string, { lbs: number; reps: number }[]][];
}) {
  return (
    <ScrollView style={styles.container}>
      {mySets.map((exercise, index) => {
        return (
          <View key={index.toString()} style={styles.exerciseContainer}>
            <CustomText
              text={exercise[0]}
              textStyle={styles.exerciseName}
            ></CustomText>
            <View style={styles.datacontainer} key={index.toString()}>
              {exercise[1].map((set) => (
                <View key={set.lbs} style={{flexDirection:'row',width:'100%'}}>
                  <Image
                    source={require("../../assets/bluediamond.png")}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                  ></Image>
                  <CustomText
                    text={`Weight: ${set.lbs} Reps: ${set.reps}`}
                    textStyle={{
                      color: "#FFFFFF",
                      fontSize: 14,
                      width: "100%",
                    }}
                  ></CustomText>
                </View>
              ))}
            </View>
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
    height: "80%",
    marginBottom: 100,
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
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default MyExerciseList;
