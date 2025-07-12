import { useEffect, useState } from 'react'
import { StyleSheet,ScrollView, View, Text,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity, FlatList, ViewStyle } from 'react-native'
import { workoutSliceType } from '../types/exercise'
import { getFullWorkouts } from '../utils/workoutHelpers'
import CustomText from './CustomText'

const StoredWorkouts = function StoredWorkouts({isHorizontal,type,containerStyle}:{isHorizontal:boolean,type:string,containerStyle:ViewStyle}){
    const [workouts,setWorkouts] = useState<workoutSliceType[]>([])
    useEffect(()=>{
        async function getWorkouts(){
            setWorkouts(await getFullWorkouts(type==='inprogress'?true:false))
        }
        getWorkouts()
    },[])
    return(
        <View style={containerStyle}>
            <View style={{height:50,width:'100%',justifyContent:'flex-start', alignItems:'center',flexDirection:'row',}}>
                <CustomText text={type==='inprogress'?'In Progress':'Finished'} textStyle={{color:'#FFFFFF',fontSize:16,fontWeight:600,marginLeft:20,marginRight:10}}></CustomText>
                <Image source={type==='inprogress'?require('../../assets/loading.png'):require('../../assets/check.png')}></Image>
            </View>
            <ScrollView horizontal={isHorizontal} style={styles.scrollView} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
                {
                    workouts.map((workout,index)=>{
                        return(
                            <TouchableOpacity key={index} style={styles.workoutContainer}>
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
    },
    secondaryContainer:{
        width:'100%',
        height:28,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default StoredWorkouts