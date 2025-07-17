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

/**
 * Where users create their workouts
 * @param param0 navigation to other screens
 * @returns a screen containing workout info
 */
const MyWorkout = function MyWorkout({navigation}:{navigation:any}){
    const [finishingModalVisible,setFinishingModalVisible] = useState(false)//determines whether or not the modal where users can input their final workout details is shown or not
    const [source,setSource] = useState('finish')
    const dispatch = useDispatch()
    //Alert asking users if they want to save their workout to inprogress or not
    const saveWorkoutAlert = function saveWorkoutAlert(){
        return(
            Alert.alert(
                'Save Workout',
                'How would you like to save the workout? If you select discard, this workout will be deleted',
                [
                  {
                    text: 'Discard',
                    style: 'destructive',
                    onPress: () => {
                      dispatch(clearWorkout(''))
                      navigation.navigate('Create')
                    },
                  },
                  {
                    text: 'Save to In Progress',
                    onPress: () => {
                        setSource('inprogress')
                        setFinishingModalVisible(true)
                    },
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                { cancelable: true }
              ));
    }
    return(
        <Background>
            <CustomModal modalVisible={finishingModalVisible}>
                <FinishingWorkoutDetails setFinishingModalVisible={setFinishingModalVisible} source={source} navigation={navigation}></FinishingWorkoutDetails>
            </CustomModal>
            <CustomText text='My Workout' textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <WorkoutInfoFlatlist></WorkoutInfoFlatlist>
            <View style={styles.bottomBtnContainer}>
                <CustomButton text='Return'
                extraBtnDesign={{backgroundColor:'#f57c00',width:120,height:35,borderRadius:10}}
                extraTxtDesign={{fontWeight:700,fontSize:14}}
                action={()=>{saveWorkoutAlert()}}
                ></CustomButton>
                <CustomButton text='Add Exercise'
                extraBtnDesign={{backgroundColor:'#FFFFFF',width:120,height:35,borderRadius:10}}
                extraTxtDesign={{fontWeight:700,fontSize:14, color:'#696969'}}
                action={()=>{navigation.navigate('AddExercise')}}
                ></CustomButton>
                <CustomButton text='Finish'
                extraBtnDesign={{backgroundColor:'#4caf50',width:120,height:35,borderRadius:10}}
                extraTxtDesign={{fontWeight:700,fontSize:14}}
                action={()=>{
                    setSource('finish')
                    setFinishingModalVisible(true)
                }}
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