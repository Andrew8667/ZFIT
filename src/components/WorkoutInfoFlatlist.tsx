import { StyleSheet,ScrollView,View, Text, FlatList,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import type RootState from '../store/store'
import { singleExercise,setsType } from '../types/exercise'
import {updateRecordedStatus,addSet,clearWorkout,updateTitle,updateReps,addExercise,deleteSet,removeExercise, updateLbs} from '../store/workoutSlice' //workout reducer functions
import CustomText from './CustomText'
import CustomButton from './CustomButton'

/**
 * Component to keep track of the exercises in the workout
 * @returns a flatlist containing the exercises of the workout and workout sets and their details
 */
const WorkoutInfoFlatlist = function WorkoutInfoFlatlist(){
    const workout = useSelector((state:RootState)=>state.workout); //the state of the workout
    const dispatch = useDispatch()//can use dispatch to call slice reducers
    const exercises= useSelector((state:RootState)=>state.workout.exercises);

    const keyExtractor = (item: singleExercise, index: number) => index.toString();
    const renderItem = ({ item }: { item: singleExercise }) => (
        <ScrollView style={styles.exerciseContainer}>
            <View style={styles.titleContainer}>
                <CustomText text={item.name.toUpperCase()} textStyle={{fontWeight:700,fontSize:20,color:'#FFFFFF',marginLeft:10}}></CustomText>
            </View>
            <View style={styles.categoriesContainer}>
                <CustomText text='Set' textStyle={styles.categoryStyles}></CustomText>
                <CustomText text='lbs' textStyle={styles.categoryStyles}></CustomText>
                <CustomText text='Reps' textStyle={styles.categoryStyles}></CustomText>
                <CustomText text='Delete' textStyle={styles.categoryStyles}></CustomText>
                <CustomText text='Record?' textStyle={styles.categoryStyles}></CustomText>
            </View>
                {item.sets.map((set) => (
                    <View key={set.setNum} style={styles.inputContainer}>
                        <View style={[styles.inputBox,{backgroundColor:'#FFFFFF'}]}>
                            <Text >{set.setNum}</Text>
                        </View>
                        <View style={[styles.inputBox,{backgroundColor:'#FFFFFF'}]}>
                        <TextInput
                            style={styles.fillContainer}
                            onChangeText={(value) => dispatch(updateLbs(item.name+','+set.setNum+','+value))}
                            value={exercises
                                .filter((exercise): exercise is singleExercise => exercise?.name !== undefined)
                                .find((exercise) => exercise.name === item.name)
                                ?.sets.find((aSet) => aSet.setNum === set.setNum)
                                ?.lbs.toString() ?? ''}
                            />                           
                        </View>
                        <View style={[styles.inputBox,{backgroundColor:'#FFFFFF'}]}>
                            <TextInput
                                style={styles.fillContainer}
                                onChangeText={(value) => dispatch(updateReps(item.name+','+set.setNum+','+value))}
                                value={exercises
                                    .filter((exercise): exercise is singleExercise => exercise?.name !== undefined)
                                    .find((exercise) => exercise.name === item.name)
                                    ?.sets.find((aSet) => aSet.setNum === set.setNum)
                                    ?.reps.toString() ?? ''}
                            />
                        </View>
                        <View style={[styles.inputBox,{backgroundColor:'#f3a4a2'}]}>
                            <TouchableOpacity style = {{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} onPress={()=>dispatch(deleteSet(item.name + ',' + set.setNum))}>
                                <Image source={require('../../assets/x.png')} style={{width:10,height:10}}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputBox}>
                            <TouchableOpacity style={styles.record} onPress={()=>{dispatch(updateRecordedStatus(item.name + ':' + set.setNum + ':' + set.recorded))}}>
                            {set.recorded 
                                ? <Image source={require('../../assets/checkedBoxless.png')} style={styles.checkedBoxlessStyle} /> 
                                : null}                           
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            <View style={styles.exerciseBtns}>
                <CustomButton text='Add Set' extraBtnDesign=    {{backgroundColor:'#FFFFFF',width:150,height:20}}
                    extraTxtDesign={{color:'#696969',fontWeight:700}}
                    action={()=>dispatch(addSet(item.name))}
                    ></CustomButton>
                <CustomButton text='Remove Exercise' extraBtnDesign={{backgroundColor:'#F3A4A2',width:150,height:20}}
                    extraTxtDesign={{color:'#EB0000',fontWeight:700}}
                    action={()=>dispatch(removeExercise(item.name))}
                    ></CustomButton>
            </View>
      </ScrollView>
    );
    return(
        <View style={styles.flatlistContainer}>
            <FlatList
                style={styles.flatlist}
                data={workout.exercises.filter(
                    (exercise): exercise is singleExercise => exercise !== undefined
                )}
                keyExtractor={keyExtractor}
                renderItem={renderItem}    
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    flatlistContainer:{
        width:'100%',
        height:663
    },
    flatlist:{
        width:'100%',
        height:'100%',
        marginTop:8,
    },
    exerciseContainer:{
        width:'100%',
    },
    titleContainer:{
        width:'100%',
        height:40,
        justifyContent:'center'
    },
    categoriesContainer:{
        width:'100%',
        height:50,
        marginLeft:10,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    inputContainer:{
        width:'100%',
        marginLeft:10,
        height:30,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    inputBox:{
      width: 60,
      height:20,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      marginRight:15
    },
    fillContainer:{
        width:'100%',
        height:'100%',
        textAlign:'center'
    },
    exerciseBtns:{
        width:'100%',
        height:63,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    record:{
        width:20,
        height:20,
        borderWidth:1,
        borderColor:'#000000',
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center'
    },
    categoryStyles:{
        width:60,
        fontWeight:700,
        fontSize:14,
        color:'#FFFFFF'
    },
    checkedBoxlessStyle:{
        width:'90%',
        height:'90%',
    }
})

export default WorkoutInfoFlatlist;