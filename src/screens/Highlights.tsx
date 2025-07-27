import { NavigationProp } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import {View,StyleSheet,Text, TextInput} from 'react-native'
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
    const [searchText,setSearchText] = useState<string>("");
    const userId = useContext(UserContext)
    
      useEffect(()=>{
        getUserMaxes(userId,setMySets)
    },[])
    return(
        <Background>
            <CustomText text='My Exercises' textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <View style={styles.container}>
                <TextInput style={styles.textStyle}
                placeholder='Search by title'
                placeholderTextColor='#B2B2B2'
                value={searchText}
                onChangeText={(input)=>{setSearchText(input)}}>
                </TextInput>
            </View>
            <MyExerciseList mySets={mySets.filter(set=>set[0].trim().toLowerCase().includes(searchText.trim().toLowerCase()))}></MyExerciseList>
            <NavBar curScreen='highlights' navigation={navigation}></NavBar>
        </Background>
    )
}

const styles = StyleSheet.create({
    container:{
        height:34,
        width:250,
        marginTop: 11,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        flexDirection:'row',
        backgroundColor:'#FFFFFF'
    },
    textStyle:{
        opacity:100,
        height:'100%',
        width:'88%',
        padding:10,
        color:'#000000'
    },
})

export default Highlights