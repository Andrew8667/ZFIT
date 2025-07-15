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

const MyExercises = function MyExercises({navigation}:{navigation:NavigationProp<any>}){
    const [myExercises,setMyExercises] = useState<myExercises[]>([])
    
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