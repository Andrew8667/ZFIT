import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';
import { ListItem } from '@rneui/base';
import {useDispatch} from 'react-redux'
import {addExercise,addSet,deleteSet} from '../store/workoutSlice'
import Background from '../components/Background';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import { fetchData } from '../api/exercises';
import Search from '../components/Search'
import {exercise} from '../types/exercise'
import ExerciseFlatlist from '../components/ExerciseFlatlist';
import CustomModal from '../components/CustomModal';
import ExerciseInfo from '../components/ExerciseInfo';
import ExerciseFilter from '../components/ExerciseFilter';
import { getLevels,getEquipment,getMuscles,getCategories,getForces } from '../utils/workoutHelpers';

const AddExercise = function AddExercise({navigation}:{navigation:any}){
    const [exerciseList,setExerciseList] = useState<exercise[]>([]); //list of exercises
    const [searchText,setSearchText] = useState('');
    const [exerciseModalVisible,setExerciseModalVisible] = useState(false);
    const [filterModalVisible,setFilterModalVisible] = useState(false);
    const [viewExercise,setViewExercise] = useState<exercise|undefined>(undefined)
    const [selectedLevel,setSelectedLevel] = useState('')
    const [selectedEquipment,setSelectedEquipment] = useState('')
    const [selectedMuscle,setSelectedMuscle] = useState('')
    const [selectedCategory,setSelectedCategory] = useState('')
    const [selectedForce,setSelectedForce] = useState('')

    useEffect(()=>{ //populates the exercise list when screen loads
        async function loadData(){
            await fetchData(setExerciseList)
        }
        loadData()
    },[])

    return(
        <Background>
            <CustomText text="Add Exercise"
            textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <Search setSearchText={setSearchText} searchText={searchText} action={setFilterModalVisible}></Search>
            <ExerciseFlatlist exerciseList={exerciseList.filter(exercise=>exercise.name.trim().toLowerCase().includes(searchText.toLowerCase().trim())
                && (exercise.primaryMuscles[0].includes(selectedMuscle))
                && (exercise.level.includes(selectedLevel))
                && (exercise.equipment !== null && (exercise.equipment.includes(selectedEquipment)))
                && (exercise.category.includes(selectedCategory))
                && (exercise.force !== null && (exercise.force.includes(selectedForce)))
            )}
            setViewExercise={setViewExercise}
            setModalVisible={setExerciseModalVisible}></ExerciseFlatlist>
            <View style={styles.returnBtnContainer}>
                <CustomButton text='Return'
                    extraBtnDesign={{backgroundColor:'#f57c00',width:120,height:35,borderRadius:10,marginTop:50}}
                    extraTxtDesign={{fontWeight:700,fontSize:14}}
                    action={()=>{navigation.navigate('MyWorkout')}}
                ></CustomButton>
            </View>
            <CustomModal modalVisible={exerciseModalVisible}>
                <ExerciseInfo setExerciseModalVisible={setExerciseModalVisible} exercise={viewExercise}></ExerciseInfo>
            </CustomModal>
            <CustomModal modalVisible={filterModalVisible}>
                <ExerciseFilter levels={getLevels(exerciseList)} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} 
                equipment={getEquipment(exerciseList)} selectedEquipment={selectedEquipment} setSelectedEquipment={setSelectedEquipment}
                muscles={getMuscles(exerciseList)} selectedMuscle={selectedMuscle} setSelectedMuscle={setSelectedMuscle}
                categories={getCategories(exerciseList)} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                forces={getForces(exerciseList)} selectedForce={selectedForce} setSelectedForce={setSelectedForce}
                setFilterModalVisible={setFilterModalVisible}></ExerciseFilter>
            </CustomModal>
        </Background>
    )
}

const styles = StyleSheet.create({
    returnBtnContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        marginTop:830
    },
});

export default AddExercise;