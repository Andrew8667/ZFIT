import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackgroundComponent,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getExercises } from "../lib/sets";
import { setReturn } from "../types/exercise";
import { getChartData, getUniqueExerciseList } from "../utils/workoutHelpers";
import { Picker } from "@react-native-picker/picker";
import CustomText from "./CustomText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserContext } from "../App";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "./CustomButton";
import axios from "axios";
import CustomModal from "./CustomModal";

/**
 * Chart displays the week by week progress of an exercise on a specific day
 * @returns chart displaying exercise progression
 */
export default function Chart() {
  const screenWidth = Dimensions.get("window").width;
  const [uniqueExercises, setUniqueExercises] = useState<string[]>([]); //exercises user has completed
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  ); //year to display
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  ); //month to display
  const [datesList, setDatesList] = useState<string[]>([]); //contains x axis week number values
  const [volumeList, setVolumeList] = useState<number[]>([]); //contains y axis weekly volume values
  const [selectedExercise, setSelectedExercise] = useState(""); //exercise to display info for
  const [open, setOpen] = useState(false); //dropdown is open or not
  const [items, setItems] = useState<{ label: string; value: string }[]>([]); //items in the dropdown picker
  const [insightModal, setInsightModal] = useState<boolean>(false); //visibilty of modal containing exercise insights
  const [insights, setInsights] = useState<any>(""); //insights for exercise
  const userId = useContext(UserContext);

  useEffect(() => {
    getUniqueExerciseList(userId, setUniqueExercises);
    getChartData(
      userId,
      selectedExercise,
      selectedYear,
      selectedMonth,
      setDatesList,
      setVolumeList
    );
  }, []);

  useEffect(() => {
    setItems(
      uniqueExercises.map((exercise) => {
        return { label: exercise, value: exercise };
      })
    );
  }, [uniqueExercises]);

  useEffect(() => {
    getChartData(
      userId,
      selectedExercise,
      selectedYear,
      selectedMonth,
      setDatesList,
      setVolumeList
    );
  }, [selectedExercise, selectedMonth, selectedYear]); //everytime the user inputs something new, repopulate the chart data

  /**
   * Generates insights for the selected exercise
   */
  const generate_insights = () => {
    axios
      .get(`http://127.0.0.1:5000/getInsights/${selectedExercise}`)
      .then((response) => {
        setInsights(response.data);
        setInsightModal(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const chartData = {
    //contains data from chart
    labels: datesList,
    datasets: [
      {
        data: volumeList, // y-axis values
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: [selectedExercise + " " + (selectedMonth + 1) + "/" + selectedYear],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#1e90ff",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {datesList.length > 0 &&
        volumeList.length > 0 &&
        volumeList.length === datesList.length ? (
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        ) : (
          <Text>Loading chart data...</Text>
        )}
      </View>
      <View style={styles.dateContainer}>
        <CustomText
          text="Please choose a month, year, and exercise"
          textStyle={{
            color: "#FFFFFF",
            fontWeight: 500,
            fontSize: 20,
            marginLeft: 20,
            marginTop: 20,
            alignSelf: "center",
          }}
        ></CustomText>
        <View style={styles.dateContainer2}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedMonth(itemValue)
            }
            style={{ height: 20, width: "50%" }}
            itemStyle={{ fontSize: 12 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
              return (
                <Picker.Item
                  key={month}
                  value={month - 1}
                  label={month.toString()}
                ></Picker.Item>
              );
            })}
          </Picker>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
            style={{ height: 20, width: "50%" }}
            itemStyle={{ fontSize: 12 }}
          >
            <Picker.Item
              key={selectedYear - 1}
              value={selectedYear - 1}
              label={(selectedYear - 1).toString()}
            ></Picker.Item>
            <Picker.Item
              key={selectedYear}
              value={selectedYear}
              label={selectedYear.toString()}
            ></Picker.Item>
            <Picker.Item
              key={selectedYear + 1}
              value={selectedYear + 1}
              label={(selectedYear + 1).toString()}
            ></Picker.Item>
          </Picker>
        </View>
      </View>
      <View style={styles.exerciseContainer}>
        <CustomText
          text="Please choose an exercise"
          textStyle={{
            color: "#FFFFFF",
            fontWeight: 500,
            fontSize: 16,
            marginLeft: 20,
            marginTop: 20,
            alignSelf: "center",
          }}
        ></CustomText>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "90%",
          }}
        >
          <DropDownPicker
            style={styles.dropdown}
            multiple={false}
            open={open}
            value={selectedExercise}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedExercise}
            setItems={setItems}
          />
          {selectedExercise && (
            <CustomButton
              text="Generate Insights"
              extraBtnDesign={{
                backgroundColor: "#f57c00",
                flex: 1,
                height: 20,
              }}
              extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
              action={() => {
                generate_insights();
                console.log("test");
              }}
            ></CustomButton>
          )}
        </View>
      </View>
      <CustomModal modalVisible={insightModal}>
        <View style={styles.backdrop}>
          <View style={styles.insightContainer}>
            <CustomText
              text={insights}
              textStyle={{
                color: "#000000",
                fontWeight: 500,
                fontSize: 12,
                marginLeft: 20,
                marginTop: 20,
                alignSelf: "center",
              }}
            ></CustomText>
          </View>
          <CustomButton
              text="Return"
              extraBtnDesign={{
                backgroundColor: "#f57c00",
                position:'relative',
                height: 30,
                width:'20%',
                bottom:'10%'
              }}
              extraTxtDesign={{ fontWeight: 700, fontSize: 14 }}
              action={() => {
                setInsightModal(false);
              }}
            ></CustomButton>
        </View>
      </CustomModal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "80%",
    alignItems: "center",
    flexDirection: "column",
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  exerciseContainer: {
    height: "20%",
    marginTop: 80,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    height: "20%",
  },
  dateContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    fontFamily: "Inter",
    borderColor: "#e4e4e4",
    color: "##e4e4e4",
    marginTop: 10,
    width: "60%",
    alignSelf: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(69,69,69,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  insightContainer: {
    backgroundColor: "#FFFFFF",
    width: 400,
    height: 650,
    borderRadius: 10,
    alignItems: "center",
  },
});
