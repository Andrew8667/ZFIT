import { StyleSheet,ScrollView,View, Text, FlatList,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import {addSet,clearWorkout,updateTitle,updateReps,addExercise,deleteSet,removeExercise, updateLbs} from '../store/workoutSlice'
import type RootState from '../store/store'
import {useState} from 'react'
import { supabase } from '../lib/supabase';
import Background from '../components/Background';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import WorkoutInfoFlatlist from '../components/WorkoutInfoFlatlist'
import CustomModal from '../components/CustomModal'
import FinishingWorkoutDetails from '../components/FinishingWorkoutDetails'

/*type setsType={
    setNum:number,
    lbs:number,
    reps:number
}

type exerciseType={
    name:string,
    sets:setsType[]
}

type workoutType = {
    title:string,
    exercises: exerciseType[],
};
  
  const MyWorkout = function MyWorkout({ navigation }: { navigation: any }) {
    const dispatch = useDispatch();
    const workout = useSelector((state:RootState)=>state.workout);
    const exercises: exerciseType[] = workout.exercises;
    //handles finish button
    async function addToWorkout(inProgress:boolean){
        const { data, error } = await supabase
            .from('workout')
            .insert({title:workout.title,in_progress:inProgress})
            .select()
            .single()
        if(error){
            console.log('Error inserting into workout table', error)
        }
        return data
    }
    async function addToSet(inProgress:boolean){
        const data = await addToWorkout(inProgress);
        const sets = []
        for(let i = 0 ; i < exercises.length;i++){
            for(let j = 0 ; j < exercises[i].sets.length; j++){
                sets.push({exercise:exercises[i].name,set_num:exercises[i].sets[j].setNum,lbs:exercises[i].sets[j].lbs,reps:exercises[i].sets[j].reps,id:data.id})
            }
        }
        const { error } = await supabase
            .from('set')
            .insert(sets)
        if(error){
            console.log('Error inserting into sets table', error)
        }
    }
    const finishWorkout = ()=>{
        addToSet(false);
        dispatch(clearWorkout(''));
        navigation.navigate('Create')
    }

    //deal with return
    //click return popup asking if they want to save workout
    const returnAction = ()=>{
        Alert.alert('Do you want to save your current workout to continue later?','',[
            {
                text:'No',
                onPress: ()=>{
                    dispatch(clearWorkout(''));
                    navigation.navigate('Create');
                },
                style:'cancel'
            },
            {
                text:'Yes',
                onPress: async ()=>{
                    await addToSet(true);
                    dispatch(clearWorkout(''));
                    navigation.navigate('Create');
                }
            }
        ])
    }

    const keyExtractor = (item: exerciseType, index: number) => index.toString();
    const renderItem = ({ item }: { item: exerciseType }) => (
        <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name.toUpperCase()}</Text>
            <View style={styles.exerciseLabelContainer}>
                <Text style={styles.exerciseLabelText}>Set</Text>
                <Text style={styles.exerciseLabelText}>lbs</Text>
                <Text style={styles.exerciseLabelText}>Reps</Text>
                <Text style={{width:60, height:25}}></Text>
            </View>
            <ScrollView >
                {item.sets.map((set) => (
                    <View key={set.setNum} style={styles.exerciseDataContainer}>
                        <Text style={styles.setNum}>{set.setNum}</Text>
                        <TextInput
                            style={styles.setInfo}

                            onChangeText={(value) => dispatch(updateLbs(item.name+','+set.setNum+','+value))}
                            value={exercises.find(exercise=>exercise.name===item.name)?.sets.filter((aSet:{setNum:number,lbs:number,reps:number})=>aSet.setNum===set.setNum)[0].lbs.toString()}
                        />
                        <TextInput
                            style={styles.setInfo}

                            onChangeText={(value) => dispatch(updateReps(item.name+','+set.setNum+','+value))}
                            value={exercises.find(exercise=>exercise.name===item.name)?.sets.filter((aSet:{setNum:number,lbs:number,reps:number})=>aSet.setNum===set.setNum)[0].reps.toString()}
                        />
                        <TouchableOpacity style={styles.deleteBtn} onPress={()=>dispatch(deleteSet(item.name + ',' + set.setNum))}>
                            <Text style={styles.deleteBtnTxt}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>     
            <View style={styles.bottomBtnsContainer}>
                <TouchableOpacity style={styles.addSetBtn} onPress={()=>dispatch(addSet(item.name))}>
                    <Text style={styles.addSetBtnTxt}>Add Set</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>dispatch(removeExercise(item.name))} style={styles.removeExerciseBtn}>
                    <Text style={styles.removeExerciseBtnTxt}>Remove Exercise</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topElementsContainer}>
          <Text style={styles.title}>My Workout</Text>
          <TouchableOpacity onPress={finishWorkout} style={styles.finishBtn}>
            <Text style={styles.finishBtnText}>Finish</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.workoutTitleContainer}>
            <TextInput style={styles.workoutTitle} value={workout.title} onChangeText={(newTitle)=>dispatch(updateTitle(newTitle))} placeholder="Workout Title"></TextInput>
        </View>
        <FlatList
            style={styles.flatList}
            data={workout.exercises}
            keyExtractor={keyExtractor}
            renderItem={renderItem}    
        />
  
        <View style={styles.bottomButtons}>
            <TouchableOpacity onPress={returnAction} style={styles.returnBtn}>
                <Text style={styles.returnBtnText}>Return</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddExercise')} style={styles.addExerciseBtn}>
                <Text style={styles.addExerciseBtnText}>Add Exercise</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        alignItems:'flex-start'
    },
    topElementsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center',
    },
    title:{
        fontFamily:'Inter',
        fontWeight:600,
        fontSize:37,
        marginLeft:20
    },
    finishBtn:{
        marginRight: 36,
        backgroundColor:'#00A7FA',
        borderRadius:9,
        justifyContent:'center',
        alignItems:'center',
        width:60,
        height:35
    },
    finishBtnText:{
        fontFamily:'Inter',
        fontWeight:500,
        fontSize:16,
        color:'#FFFFFF'
    },
    bottomButtons:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-evenly',
        position:'absolute',
        top:'97%'
    },
    returnBtn:{
        borderRadius:5,
        backgroundColor:'#FFEDEF',
        width:175,
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
    addExerciseBtn:{
        borderRadius:5,
        backgroundColor:'#E9F5FE',
        width:175,
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
    returnBtnText:{
        fontFamily:'Inter',
        fontWeight:500,
        fontSize:16,
        color:'#FF5A67'
    },
    addExerciseBtnText:{
        fontFamily:'Inter',
        fontWeight:500,
        fontSize:16,
        color:'#00A7FA'
    },
    exerciseContainer:{
        width:'90%',
        alignItems:'baseline',
        alignSelf:'center',
        marginBottom:15,
    },
    exerciseName:{
        fontFamily:'Inter',
        fontWeight:600,
        fontSize:22,
        color:'#00A7FA',
        marginBottom:12,
    },
    exerciseLabelContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5
    },
    exerciseLabelText:{
        fontFamily:'Inter',
        fontWeight:600,
        fontSize:16,
    },
    setNum:{
        fontFamily:'Inter',
    },
    setInfo:{
        fontFamily:'Inter',
        backgroundColor:'#EAEAEA',
        width:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:9,
        textAlign:'center',
    },
    flatList:{
        width:'100%',
        marginBottom:100,
        marginTop:20,
    },
    exerciseDataContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5
    },
    deleteBtn:{
        backgroundColor:"#FFEDEF",
        width:60,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
    deleteBtnTxt:{
        color:'#FF5A67',
        fontFamily:'Inter',
        fontWeight:500,
        fontSize:16
    },
    bottomBtnsContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7
    },
    addSetBtn:{
        backgroundColor:'#EAEAEA',
        width:225,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    removeExerciseBtn:{
        width:150,
        height:25,
        borderRadius:5,
        backgroundColor:'#FFEDEF',
        justifyContent:'center',
        alignItems:'center'
    },
    removeExerciseBtnTxt:{
        fontFamily:'Inter',
        fontSize:16,
        fontWeight:500,
        color:'#FF5A67',
        width:'auto',
    },
    addSetBtnTxt:{
        fontFamily:'Inter',
        fontSize:16,
        fontWeight:500,
        color:'#000000',
        width:'auto'
    },
    workoutTitleContainer:{
        backgroundColor:'#EAEAEA',
        height:25,
        marginTop:20,
        marginLeft:20,
        width:'50%',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'flex-start',
    },
    workoutTitle:{
        width:'100%',
        height:'100%',
        marginLeft:10
    }
});*/

const MyWorkout = function MyWorkout({navigation}:{navigation:any}){
    const [finishingModalVisible,setFinishingModalVisible] = useState(false)//determines whether or not the modal where users can input their final workout details is shown or not
    return(
        <Background>
            <CustomModal modalVisible={finishingModalVisible}>
                <FinishingWorkoutDetails setFinishingModalVisible={setFinishingModalVisible} ></FinishingWorkoutDetails>
            </CustomModal>
            <CustomText text='My Workout' textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <WorkoutInfoFlatlist></WorkoutInfoFlatlist>
            <View style={styles.bottomBtnContainer}> {/**Holds the bottom buttons */}
                <CustomButton text='Return'
                extraBtnDesign={{backgroundColor:'#f57c00',width:120,height:35,borderRadius:10}}
                extraTxtDesign={{fontWeight:700,fontSize:14}}
                action={()=>{navigation.navigate('Create')}}
                ></CustomButton>
                <CustomButton text='Add Exercise'
                extraBtnDesign={{backgroundColor:'#FFFFFF',width:120,height:35,borderRadius:10}}
                extraTxtDesign={{fontWeight:700,fontSize:14, color:'#696969'}}
                action={()=>{navigation.navigate('AddExercise')}}
                ></CustomButton>
                <CustomButton text='Finish'
                extraBtnDesign={{backgroundColor:'#4caf50',width:120,height:35,borderRadius:10}}
                extraTxtDesign={{fontWeight:700,fontSize:14}}
                action={()=>{setFinishingModalVisible(true)}}
                ></CustomButton>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    bottomBtnContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        position:'absolute',
        width:'100%',
        marginTop: 830,
    }
})

export default MyWorkout;