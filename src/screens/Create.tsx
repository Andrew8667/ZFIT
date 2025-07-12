import { StyleSheet,ScrollView, View, Text,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity, FlatList } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import React, {useState, useEffect} from 'react'
import {populateWorkout} from '../store/workoutSlice'
import { Session } from '@supabase/supabase-js';
import {useSelector,useDispatch} from 'react-redux'
import NavBar from '../components/NavBar'
import Background from '../components/Background'
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { getSets, getWorkouts } from '../lib/workouts';
import { filteredWorkouts, getFullWorkouts, getMusclesList } from '../utils/workoutHelpers';
import StoredWorkouts from '../components/StoredWorkouts';
import { exercise, workoutSliceType, workoutSliceTypeWithId } from '../types/exercise';
import { fetchData } from '../api/exercises';
import Search from '../components/Search';

const Create = function Create({navigation}:{navigation:any}){
    const [exerciseList,setExerciseList] = useState<exercise[]>([])
    const [searchText,setSearchText] = useState('')
    const [filterModalVisible, setFilterModalVisible] = useState(false)
    const [dateOrdering,setDateOrdering] = useState('Newest to Oldest')
    const [durationRange,setDurationRange] = useState('Any')
    const [selectedMuscles,setSelectedMuscles] = useState<string[]>([])
    const [open,setOpen] = useState<boolean>(false)
    const [items,setItems] = useState<{value:string,label:string}[]>([])
    const [workouts,setWorkouts] = useState<workoutSliceTypeWithId[]>([])

    useEffect(()=>{ //populates the exercise list when screen loads
        async function loadData(){
            await fetchData(setExerciseList)
            setWorkouts(await getFullWorkouts(true))
        }
        loadData()
    },[])

    useEffect(()=>{
        setItems(getMusclesList(exerciseList)) ///{label:string,value:string}[] for the dropdown
    },[exerciseList])
    useEffect(()=>{ //populates the exercise list when screen loads
        async function loadData(){
            setWorkouts(await getFullWorkouts(true))
        }
        loadData()
    },[])
    return(
        <Background>
            <CustomText text='Create' textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <CustomButton text='Create New Workout' 
            extraBtnDesign={{backgroundColor:'#f57c00',width:200,height:50,borderRadius:10,alignSelf:'center',marginTop:20}}
            extraTxtDesign={{fontSize:14,fontWeight:500}}
            action={()=>navigation.navigate('MyWorkout')}></CustomButton>
            <Search setSearchText={setSearchText} searchText={searchText} action={setFilterModalVisible} extraStyle={{marginTop:20}}></Search>
            <StoredWorkouts navigation={navigation} isHorizontal={false} type='inprogress' workouts={filteredWorkouts(searchText,dateOrdering,durationRange,selectedMuscles,workouts)} containerStyle={{width:'100%',height:550,marginTop:10,justifyContent:'center'}}></StoredWorkouts>
            <NavBar navigation={navigation} curScreen='create'></NavBar>
        </Background>
    )
}

export default Create;