import {StyleSheet,Button,SafeAreaView,View,Text, FlatList} from 'react-native'
import {addSet,clearWorkout,updateTitle,updateReps,addExercise,deleteSet,removeExercise, updateLbs} from '../store/workoutSlice'
import type RootState from '../store/store'
import {useSelector,useDispatch} from 'react-redux'
import React from 'react'


const ViewWorkout = function ViewWorkout({navigation}:{navigation:any}){
    const workout = useSelector((state: RootState) => state.workout);
    const dispatch = useDispatch();
    const renderItem = ({ item }: { item: { name: string, sets: { setNum: number, lbs: number, reps: number }[] } }) => {
        return (
          <View>
            <Text>{item.name}</Text>
            {item.sets.map((set, index) => (
              <View key={index}>
                <Text>{set.setNum}</Text>
                <Text>{set.lbs}</Text>
                <Text>{set.reps}</Text>
              </View>
            ))}
          </View>
        );
      };
    const keyExtractor = (item:{ name: string; sets: { setNum: number; lbs: number; reps: number }[]},index:number)=>{
        return index.toString()
    }

    return(
        <SafeAreaView>
            <Button title="Return" onPress={()=>{dispatch(clearWorkout(''));navigation.navigate('Archives')}}></Button>
            <Text>{workout.title}</Text>
            <FlatList data={workout.exercises} renderItem={renderItem} keyExtractor={keyExtractor}></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});

export default ViewWorkout;