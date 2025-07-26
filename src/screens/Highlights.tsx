import { NavigationProp } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import {View,StyleSheet,Text} from 'react-native'
import Background from '../components/Background'
import CustomText from '../components/CustomText'
import MyExerciseList from '../components/MyExercisesList'
import NavBar from '../components/NavBar'
import { getExercises } from '../lib/sets'
import { myExercises, setReturn } from '../types/exercise'
import { supabase } from '../lib/supabase'
import { shallowEqual } from 'react-redux'
import { UserContext } from '../App'
import { getUserMaxes } from '../utils/workoutHelpers'

/**
 * Screen contains recorded sets
 * Sets can be recorded when they are being created 
 * Used if set has significance such as a personal record 
 * @param param0 navigation to other screens
 * @returns screen containing recorded sets
 */
const Highlights = function Highlights({navigation}:{navigation:NavigationProp<any>}){
    const [mySets,setMySets] = useState<[string,{lbs:number,reps:number}[]][]>([])//contains all of the users sets
    const userId = useContext(UserContext)
    
      useEffect(()=>{
        getUserMaxes(userId,setMySets)
    },[])
    return(
        <Background>
            <CustomText text='My Exercises' textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <MyExerciseList mySets={mySets}></MyExerciseList>
            <NavBar curScreen='highlights' navigation={navigation}></NavBar>
        </Background>
    )
}

const styles = StyleSheet.create({

})

export default Highlights