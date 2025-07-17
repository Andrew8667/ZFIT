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
import { supabase } from "../lib/supabase"; // adjust path as needed
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import CustomText from "../components/CustomText";
import { getStartAndEndOfWeek } from "../utils/workoutHelpers";
import { getNumWeekWorkouts } from "../lib/workouts";
import Chart from "../components/Chart";

/**
 * Displays chart that shows week by week progress of exercises during a chosen month and year
 * @param param0 navigation to other screens
 * @returns a screen displays progress of exercise
 */
const Progress = function Progress({ navigation }: { navigation: any }) {
  return (
    <Background>
      <CustomText text="Progress" textStyle={styles.title}></CustomText>
      <Chart></Chart>
      <NavBar navigation={navigation} curScreen="progress"></NavBar>
    </Background>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 50,
    marginLeft: 20,
    marginTop: 25,
  },
});

export default Progress;
