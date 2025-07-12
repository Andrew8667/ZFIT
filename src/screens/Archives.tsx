import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, FlatList } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';
import { DialogTitleProps } from '@rneui/themed';
import {useSelector,useDispatch} from 'react-redux'
import { populateWorkout } from '../store/workoutSlice';
import NavBar from '../components/NavBar';
import Background from '../components/Background';
import CustomText from '../components/CustomText';
import StoredWorkouts from '../components/StoredWorkouts';
import Search from '../components/Search';
import WorkoutFilter from '../components/WorkoutFilter';
import CustomModal from '../components/CustomModal';
import ExerciseFilter from '../components/ExerciseFilter';
import RootState from '../store/store';
import { filteredWorkouts, getFullWorkouts, getMusclesList } from '../utils/workoutHelpers';
import { exercise, workoutSliceType, workoutSliceTypeWithId } from '../types/exercise';
import { fetchData } from '../api/exercises';

const Archives = function Archives({navigation}:{navigation:any}){ 
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
            setWorkouts(await getFullWorkouts(false))
        }
        loadData()
    },[])

    useEffect(()=>{
        setItems(getMusclesList(exerciseList)) ///{label:string,value:string}[] for the dropdown
    },[exerciseList])
    return(
        <Background>
            <CustomModal modalVisible={filterModalVisible}>
                <WorkoutFilter setFilterModalVisible={setFilterModalVisible} dateOrdering={dateOrdering} setDateOrdering={setDateOrdering} durationRange={durationRange} setDurationRange={setDurationRange} selectedMuscles={selectedMuscles} setSelectedMuscles={setSelectedMuscles} open={open} setOpen={setOpen} items={items} setItems={setItems}></WorkoutFilter>
            </CustomModal>
            <CustomText text='Archives' textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <Search setSearchText={setSearchText} searchText={searchText} action={setFilterModalVisible}></Search>
            <StoredWorkouts navigation={navigation} isHorizontal={false} type='finished' workouts={filteredWorkouts(searchText,dateOrdering,durationRange,selectedMuscles,workouts)} containerStyle={{height:610}}></StoredWorkouts>
            <NavBar navigation={navigation} curScreen='archives'></NavBar>
        </Background>
    )
};

export default Archives;