import { NavigationProp } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {View,StyleSheet,Text} from 'react-native'
import Background from '../components/Background'
import CustomText from '../components/CustomText'
import MyExerciseList from '../components/MyExercisesList'
import NavBar from '../components/NavBar'
import { getExercises } from '../lib/sets'
import { myExercises } from '../types/exercise'
import { supabase } from '../lib/supabase'
import { shallowEqual } from 'react-redux'

const MyExercises = function MyExercises({navigation}:{navigation:NavigationProp<any>}){
    const [myExercises,setMyExercises] = useState<myExercises[]>([])
    
      useEffect(()=>{
        getExercises('349fcb09-99be-4732-a4c4-00ebf9d998e3', setMyExercises)
        const channel = supabase
            .channel('set-channel')
            .on(
                'postgres_changes',
                {
                event: '*', 
                schema: 'public',
                table: 'set',
                },
                (payload) => {
                console.log('Realtime payload:', payload);

                if (payload.eventType === 'UPDATE') {
                  setMyExercises(prevExercises =>
                    prevExercises.flatMap(exercise => {
                      if (exercise.name === payload.new.exercise) {
                        const newRecordedSets = exercise.recordedSets?.filter(
                          set => set.setid !== payload.new.setid
                        )
                  
                        // If no sets left, exclude this exercise
                        if (!newRecordedSets || newRecordedSets.length === 0) {
                          return [] // remove this exercise
                        }
                  
                        return [{ ...exercise, recordedSets: newRecordedSets }]
                      }
                  
                      return [exercise] // keep other exercises unchanged
                    })
                  )
                  
                }
                }
            )
            .subscribe();

            // Cleanup on unmount
            return () => {
            supabase.removeChannel(channel);
            };
    },[])
    return(
        <Background>
            <CustomText text='My Exercises' textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <MyExerciseList myExercises={myExercises} setMyExercises={setMyExercises}></MyExerciseList>
            <NavBar curScreen='myexercises' navigation={navigation}></NavBar>
        </Background>
    )
}

const styles = StyleSheet.create({

})

export default MyExercises