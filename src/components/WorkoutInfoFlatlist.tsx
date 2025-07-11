import { StyleSheet,ScrollView,View, Text, FlatList,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import type RootState from '../store/store'
import { singleExercise,setsType } from '../types/exercise'
import {addSet,clearWorkout,updateTitle,updateReps,addExercise,deleteSet,removeExercise, updateLbs} from '../store/workoutSlice' //workout reducer functions
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
        <View style={styles.exerciseContainer}>
            <View style={styles.titleContainer}>
                <CustomText text={item.name.toUpperCase()} textStyle={{fontWeight:700,fontSize:20,color:'#FFFFFF',marginLeft:10}}></CustomText>
            </View>
            <View style={styles.categoriesContainer}>
                <CustomText text='Set' textStyle={{width:45,fontWeight:700,fontSize:14,color:'#FFFFFF'}}></CustomText>
                <CustomText text='lbs' textStyle={{width:45,fontWeight:700,fontSize:14,color:'#FFFFFF'}}></CustomText>
                <CustomText text='Reps' textStyle={{width:45,fontWeight:700,fontSize:14,color:'#FFFFFF'}}></CustomText>
                <CustomText text='Delete' textStyle={{width:45,fontWeight:700,fontSize:14,color:'#FFFFFF'}}></CustomText>
            </View>
            <ScrollView >
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
                                <Image source={require('../../assets/x.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>     
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
      </View>
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
        height:223,
    },
    titleContainer:{
        width:'100%',
        height:40,
        justifyContent:'center'
    },
    categoriesContainer:{
        width:360,
        height:50,
        marginLeft:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    inputContainer:{
        width:360,
        marginLeft:10,
        height:30,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    inputBox:{
      width: 56,
      height:20,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
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
    exerciseBtn:{

    }
})

export default WorkoutInfoFlatlist;