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
import { useState, useEffect, useContext } from "react";
import Background from "../components/Background";
import CustomText from "../components/CustomText";
import NavBar from "../components/NavBar";
import { getWeekStats } from "../utils/workoutHelpers";
import CustomButton from "../components/CustomButton";
import { Session } from "node:inspector/promises";
import { UserContext } from "../App";
import { signOutUser } from "../lib/auth";

/**
 * This screen is used for the home screen of the app
 * @param param0 recieves navigation which allows us access to other screens defined in app.tsx
 * @returns a home screen with features such as a:
 * -logout button
 * -weekly totals
 * -workout streak
 */
const Home = function Home({ navigation }: { navigation: any }) {
  const [totalLbs, setTotalLbs] = useState(0); //total lbs lifted during the week
  const [totalDuration, setTotalDuration] = useState(0); //total minutes worked out during week
  const [totalSets, setTotalSets] = useState(0); //total sets during the week
  const [totalReps, setTotalReps] = useState(0); //total reps during the week
  const [workoutStreak, setWorkoutStreak] = useState(0); //the amount of consecutive workouts

  const userId = useContext(UserContext); //user id of the current session user

  useEffect(() => {
    getWeekStats(
      userId,
      setTotalLbs,
      setTotalDuration,
      setTotalReps,
      setTotalSets,
      setWorkoutStreak
    ); //populates the weekly stats of the user
  }, []);

  return (
    <Background>
      <CustomText
        text="Home"
        textStyle={{
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: 50,
          marginLeft: 20,
          marginTop: 25,
        }}
      ></CustomText>
      <View style={styles.totalsContainer}>
        <View style={styles.totalsTitle}>
          <Image source={require("../../assets/muscle.png")}></Image>
          <CustomText
            text="Weekly Totals"
            textStyle={{ fontSize: 20, fontWeight: 700, color: "#2196F3" }}
          ></CustomText>
        </View>
        <View style={styles.lbsDurationContainer}>
          <CustomText
            text={"Lbs Lifted: " + totalLbs}
            textStyle={{ fontSize: 14, fontWeight: 600, color: "#2196F3" }}
          ></CustomText>
          <CustomText
            text={"Duration(mins): " + totalDuration}
            textStyle={{ fontSize: 14, fontWeight: 600, color: "#2196F3" }}
          ></CustomText>
        </View>
        <View style={styles.setsRepsContainer}>
          <CustomText
            text={"Sets: " + totalSets}
            textStyle={{ fontSize: 14, fontWeight: 600, color: "#2196F3" }}
          ></CustomText>
          <CustomText
            text={"Reps: " + totalReps}
            textStyle={{ fontSize: 14, fontWeight: 600, color: "#2196F3" }}
          ></CustomText>
        </View>
      </View>
      <View style={styles.streakContainer}>
        <CustomText
          text={workoutStreak + " day workout streak"}
          textStyle={{ color: "#FFFFFF", fontWeight: 600, fontSize: 24 }}
        ></CustomText>
        <Image
          source={require("../../assets/fire.png")}
          style={{ width: 40, height: 40, marginLeft: 10 }}
        ></Image>
      </View>
      <View style={styles.logoutContainer}>
        <CustomButton
          text="Logout"
          extraBtnDesign={{
            backgroundColor: "#F3A4A2",
            width: 150,
            height: 20,
            borderRadius: 10,
          }}
          extraTxtDesign={{ color: "#EB0000", fontSize: 14, fontWeight: 700 }}
          action={() => {
            signOutUser(navigation);
          }}
        ></CustomButton>
      </View>
      <NavBar navigation={navigation} curScreen="home"></NavBar>
    </Background>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    backgroundColor: "#FFFFFF",
    width: 350,
    height: 199,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 0 }, // shadow position
    shadowOpacity: 0.3, // shadow transparency
    shadowRadius: 3.84,
  },
  totalsTitle: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  lbsDurationContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 40,
  },
  setsRepsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 40,
  },
  streakContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    height: "20%",
  },
  logoutContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
