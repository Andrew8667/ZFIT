import { NavigationProp } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import {View,StyleSheet,Text} from 'react-native'
import Background from '../components/Background'
import CustomText from '../components/CustomText'
import MyExerciseList from '../components/MyExercisesList'
import NavBar from '../components/NavBar'
import { getExercises } from '../lib/sets'
import { myExercises } from '../types/exercise'
import { supabase } from '../lib/supabase'
import { shallowEqual } from 'react-redux'
import { UserContext } from '../App'

/**
 * Screen contains recorded sets
 * Sets can be recorded when they are being created 
 * Used if set has significance such as a personal record 
 * @param param0 navigation to other screens
 * @returns screen containing recorded sets
 */
const MyExercises = function MyExercises({navigation}:{navigation:NavigationProp<any>}){
    const [myExercises,setMyExercises] = useState<myExercises[]>([])
    const userId = useContext(UserContext)
    
      useEffect(()=>{
        getExercises(userId, setMyExercises)
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