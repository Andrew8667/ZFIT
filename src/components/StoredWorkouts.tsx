import { NavigationProp } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { StyleSheet,ScrollView, View, Text,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity, FlatList, ViewStyle } from 'react-native'
import { useDispatch } from 'react-redux'
import { deleteSets } from '../lib/sets'
import { deleteWorkout } from '../lib/workouts'
import { populateWorkout } from '../store/workoutSlice'
import { workoutSliceType, workoutSliceTypeWithId } from '../types/exercise'
import { getFullWorkouts } from '../utils/workoutHelpers'
import CustomText from './CustomText'

/**
 * A scroll view containing finished or in progress workouts
 * @param param0 isHorizontal tells you whether or not scroll view should be horizontal or not
 * -type is whether we are looking for inprogress or finished workouts
 * -container stye provides custom styling for the workout containers
 * -workouts contains a list of workouts to display
 * -navigation allows us to navigate to other screens
 * @returns scrollable view of finished or inprogress workouts
 */
const StoredWorkouts = function StoredWorkouts({isHorizontal,type,containerStyle,workouts,navigation}:{isHorizontal:boolean,type:string,containerStyle:ViewStyle,workouts:workoutSliceTypeWithId[],navigation:NavigationProp<any>}){
    const dispatch = useDispatch()
    /**
     * Shows up to confirm if user wants to edit their workout
     * @param workout workout to be editted
     * @returns an alert
     */
    function askToEditWorkout(workout:workoutSliceTypeWithId) {
        return(Alert.alert(
          'Edit Workout',
          `What would you like to do with the workout "${workout.title}"?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
                text: 'Use as Template',
                onPress: () => {
                  const {id,...newWorkout} = workout
                  //populate the redux workout
                  dispatch(populateWorkout(newWorkout))
                  //navigate to my workout
                  navigation.navigate('MyWorkout',{workoutId:id,type:'Template'})
                },
              },
            {
              text: 'Edit',
              onPress: () => {
                const {id,...newWorkout} = workout
                //populate the redux workout
                dispatch(populateWorkout(newWorkout))
                //navigate to my workout
                navigation.navigate('MyWorkout',{workoutId:id,type:'Edit'})
              },
            },
          ],
          { cancelable: true }
        ))
      }
    return(
        <View style={containerStyle}>
            <View style={{height:50,width:'100%',justifyContent:'flex-start', alignItems:'center',flexDirection:'row',}}>
                <CustomText text={type==='inprogress'?'In Progress':'Finished'} textStyle={{color:'#FFFFFF',fontSize:16,fontWeight:600,marginLeft:45,marginRight:10}}></CustomText>
                <Image source={type==='inprogress'?require('../../assets/loading.png'):require('../../assets/check.png')}></Image>
            </View>
            <ScrollView horizontal={isHorizontal} style={styles.scrollView} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
                {
                    workouts.map((workout,index)=>{
                        return(
                            <TouchableOpacity key={index} style={styles.workoutContainer}
                            onPress={()=>{
                                askToEditWorkout(workout)
                            }}>
                                <View style={[styles.secondaryContainer,{flexDirection:'row',justifyContent:'center'}]}>
                                    <CustomText text={workout.title} textStyle={{color:'#2196F3',fontSize:20,fontWeight:700}}></CustomText>
                                </View>
                                <View style={styles.secondaryContainer}>
                                    <CustomText text={'Date: ' + workout.date} textStyle={{color:'#2196F3',fontWeight:600,fontSize:16}}></CustomText>
                                </View>
                                <View style={styles.secondaryContainer}>
                                    <CustomText text={'Duration: ' + workout.duration + ' mins'} textStyle={{color:'#2196F3',fontWeight:600,fontSize:16}}></CustomText>
                                </View>
                                <View style={styles.secondaryContainer}>
                                    <CustomText text={'Musclegroups: ' + workout.musclegroups.join(', ')} textStyle={{color:'#2196F3',fontWeight:600,fontSize:16}}></CustomText>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView:{
        height:'auto',
    },
    workoutContainer:{
        backgroundColor:'#FFFFFF',
        width:354,
        height:122,
        marginLeft:20,
        borderRadius:10,
        shadowColor: '#696969',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        marginBottom:10
    },
    secondaryContainer:{
        width:'100%',
        height:28,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default StoredWorkouts