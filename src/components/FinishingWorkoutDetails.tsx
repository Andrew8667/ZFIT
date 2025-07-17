import { StyleSheet,ScrollView,View, Text, FlatList,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { updateTitle,updateDate,updateDuration,updateMusclegroups,updateNotes, clearWorkout} from '../store/workoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkWorkout, getDate, recordWorkout } from '../utils/workoutHelpers';
import RootState from '../store/store';
import { NavigationProp } from '@react-navigation/native';

/**
 * Content inside the modal when finish button is clicked
 * contains info like workout title, date, duration, and notes
 * @param param0 setFinishingModalVisible helps to control whether the modal is shown or not
 * @returns a component where users can input their finishing details for their workout
 */
const FinishingWorkoutDetails = function FinishingWorkoutDetails({setFinishingModalVisible,source,navigation}:
    {setFinishingModalVisible:(input:false)=>void,source:string,navigation:NavigationProp<any>}){
        const dispatch = useDispatch()
        const workout = useSelector((state:RootState)=>state.workout)//gets the state of the workout slice
        const checkAlert = function checkAlert(){ //returns an alert if title is empty
            return(
                Alert.alert('Missing Title','Please give your workout a title')
            )
        }
        return(
        <View style={styles.greyedBackground}>
            <View style={styles.modalContainer}>
                <ScrollView style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <CustomText text='Tilte: ' textStyle={{color:'#000000',fontSize:20,fontWeight:600}}></CustomText>
                        <TextInput style={styles.titleTxtInput} value={workout.title} placeholder='My Workout' placeholderTextColor={'#696969'}
                        onChangeText={(title)=>{dispatch(updateTitle(title))}}></TextInput>
                    </View> 
                    <View style={styles.inputContainer}> 
                        <CustomText text='Date: ' textStyle={{color:'#000000',fontSize:20,fontWeight:600}}></CustomText>
                        <DateTimePicker
                        value={new Date(workout.date)}
                        mode='date'
                        display='default'
                        onChange={(event,selectedDate)=>{
                            if(selectedDate){
                                dispatch(updateDate(selectedDate.toISOString().split("T")[0]))
                            }
                        }}
                        ></DateTimePicker>  
                    </View>
                    <View style={styles.inputContainer}> 
                        <CustomText text='Duration: ' textStyle={{color:'#000000',fontSize:20,fontWeight:600}}></CustomText>
                        <TextInput style={styles.duration} value={workout.duration.toString()} placeholder='0' placeholderTextColor={'#696969'}
                        onChangeText={(text)=>{
                            let numericText = text.replace(/[^0-9]/g, '');
                            if(numericText === ''){
                               numericText = '0' 
                            }
                            dispatch(updateDuration(parseInt(numericText)))
                        }}>
                        </TextInput> 
                        <CustomText text='mins' textStyle={{color:'#000000',fontSize:20,fontWeight:500,marginLeft:10}}></CustomText> 
                    </View>
                    <View style={styles.notesContainer}> 
                        <TextInput onChangeText={(text)=>{dispatch(updateNotes(text))}} value={workout.notes} style={styles.notes} multiline={true} placeholder='Notes' placeholderTextColor={'#696969d'}></TextInput>
                    </View>
                </ScrollView>
                <View style={styles.btnContainer}> 
                    <CustomButton text='Return'
                    extraBtnDesign={{backgroundColor:"#F57C00",width:120,
                    height:35,borderRadius:10}}
                    extraTxtDesign={{fontWeight:700,fontSize:14}} 
                    action={()=>{setFinishingModalVisible(false)}}></CustomButton>
                    <CustomButton text={source==='finish'?'Submit':'Save'}
                    extraBtnDesign={{backgroundColor:"#4CAF50",width:120,
                    height:35,borderRadius:10}}
                    extraTxtDesign={{fontWeight:700,fontSize:14}}
                    action={()=>{
                        if(!checkWorkout(workout)){ //workout doesn't have a title
                            checkAlert()
                        } else {
                            recordWorkout(workout,source)
                            dispatch(clearWorkout(''))
                            setFinishingModalVisible(false)
                            navigation.navigate('Create')
                        }
                    }}></CustomButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    greyedBackground:{
        backgroundColor:'rgba(69,69,69,0.5)',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    modalContainer:{
        backgroundColor:'#FFFFFF',
        width:350,
        height:400,
        borderRadius:10,
    },
    infoContainer:{
        width:'100%',
        height:355,
    },
    btnContainer:{
        width:'100%',
        height:45,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    titleContainer:{
        width:350,
        height:65,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    titleTxtInput:{
        backgroundColor:'#E4E4E4',
        width:175,
        height:25,
        borderRadius:10,
        color:'#000000',
        paddingLeft:10
    },
    inputContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:70
    },
    notesContainer:{
        borderWidth:1,
        borderColor:'rgba(69,69,69,0.5)',
        width:'90%',
        height:200,
        alignSelf:'center',
        borderRadius:10,
    },
    notes:{
        padding: 10,
        width:'100%',
        height:'100%',
        textAlign:'left',
    },
    duration:{
        backgroundColor:'#E4E4E4',
        width:50,
        height:30,
        borderRadius:10,
        textAlign:'center'
    }
});

export default FinishingWorkoutDetails