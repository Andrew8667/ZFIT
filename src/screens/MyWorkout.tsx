import { StyleSheet,ScrollView,View, Text, FlatList,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import Background from '../components/Background';
import Title from '../components/Title';
import {useSelector,useDispatch} from 'react-redux'
import {addSet,addExercise,deleteSet,removeExercise, updateLbs} from '../store/workoutSlice'
import type RootState from '../store/store'
import {useState} from 'react'


type Item = {
    name: string;
    sets: any[];
};
  
  
  const MyWorkout = function MyWorkout({ navigation }: { navigation: any }) {
    const items = useSelector((state: RootState) => state.workout) as Item[];
    const dispatch = useDispatch();
    const [addExerciseSet,setAddExerciseSet] = useState('');
    const workouts = useSelector((state:RootState)=>state.workout);

    const keyExtractor = (item: Item, index: number) => index.toString();
    const renderItem = ({ item }: { item: Item }) => (
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
                            value={workouts.find((workout:Item)=>workout.name===item.name)?.sets.filter((aSet:{setNum:number,lbs:number,reps:number})=>aSet.setNum===set.setNum)[0].lbs.toString()}
                        />
                        <TextInput style={styles.setInfo} value='0'></TextInput>
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
          <TouchableOpacity style={styles.finishBtn}>
            <Text style={styles.finishBtnText}>Finish</Text>
          </TouchableOpacity>
        </View>
  
        <FlatList
            style={styles.flatList}
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
  
        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('AddExercise')} style={styles.addExerciseBtn}>
            <Text style={styles.addExerciseBtnText}>Add Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelWorkoutBtn}>
            <Text style={styles.cancelWorkoutBtnText}>Cancel Workout</Text>
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
    cancelWorkoutBtn:{
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
    cancelWorkoutBtnText:{
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
});

export default MyWorkout;