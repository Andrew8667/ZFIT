import React, { useContext, useEffect, useState } from "react";
import { View, Dimensions, Text, StyleSheet, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getExercises } from "../lib/sets";
import { setReturn } from "../types/exercise";
import { getChartData, getUniqueExerciseList } from "../utils/workoutHelpers";
import { Picker } from "@react-native-picker/picker";
import CustomText from "./CustomText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserContext } from "../App";

/**
 * Chart displays the week by week progress of an exercise on a specific day
 * @returns chart displaying exercise progression
 */
export default function Chart() {
  const screenWidth = Dimensions.get("window").width;
  const [uniqueExercises, setUniqueExercises] = useState<string[]>([]);//exercises user has completed
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  ); //year to display
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  ); //month to display
  const [datesList, setDatesList] = useState<string[]>([]); //contains x axis week number values
  const [volumeList, setVolumeList] = useState<number[]>([]); //contains y axis weekly volume values 
  const [selectedExercise, setSelectedExercise] = useState("");//exercise to display info for
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
    getChartData(
      userId,
      selectedExercise,
      selectedYear,
      selectedMonth,
      setDatesList,
      setVolumeList
    );
  }, [selectedExercise, selectedMonth, selectedYear]); //everytime the user inputs something new, repopulate the chart data

  const chartData = { //contains data from chart
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
            style={{ height: 40, width: "50%" }}
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
            style={{ height: 40, width: "50%" }}
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
            fontSize: 20,
            marginLeft: 20,
            marginTop: 20,
            alignSelf: "center",
          }}
        ></CustomText>
        <Picker
          selectedValue={selectedExercise}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedExercise(itemValue)
          }
          style={{ height: 40, width: "100%" }}
        >
          {uniqueExercises.map((exercise) => {
            return (
              <Picker.Item
                key={exercise}
                value={exercise}
                label={exercise}
              ></Picker.Item>
            );
          })}
        </Picker>
      </View>
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
    height: "100%",
    marginTop: 80,
    width: "100%",
  },
  dateContainer: {
    height: "20%",
  },
  dateContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
