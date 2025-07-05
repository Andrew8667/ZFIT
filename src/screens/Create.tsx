import { StyleSheet,ScrollView, View, Text,Button,SafeAreaView,Alert,Image, TextInput,TouchableOpacity, FlatList } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import React, {useState, useEffect} from 'react'
import {populateWorkout} from '../store/workoutSlice'
import { Session } from '@supabase/supabase-js';
import {useSelector,useDispatch} from 'react-redux'

const Create = function Create({navigation}:{navigation:any}){ 
    const [inProgressList, setInProgressList] = useState<workoutDetails[]>([]);
    const dispatch = useDispatch();
    //navigate to different pages
    const redirect = (dest:string)=>{
        navigation.navigate(dest);
    }

    type exerciseList = {
        exercises:{name:string,sets:{setNum:number,lbs:number,reps:number}[]}[]
    }

    //get list [{title,date},...]
    type workoutDetails = {
        id:string,
        title:string,
        created_at:string
    }
    const getInProgress = async ()=>{
        const { data, error } = await supabase
            .from('workout')
            .select('id,title,created_at')
            .eq('in_progress',true)
        if(error){
            console.log('Error retrieving in progress workouts from workout', error)
        }else {
            const inProgressList:workoutDetails[] = []
            data.forEach(workout=>{
                inProgressList.push({
                    id:workout.id,
                    title:workout.title,
                    created_at:workout.created_at
                })
            })
            setInProgressList(inProgressList);
        }
    }
    useEffect(() => {
        getInProgress();
      }, []);
    const keyExtractor = (item: workoutDetails, index: number) => {
        return item.title + index.toString(); // unique key per item
    };
  const renderItem = ({ item }: { item: workoutDetails }) => {
    return (
        <TouchableOpacity onPress={()=>{
            const title = item.title
            const map = new Map();
            const loadData = async ()=>{
                const data = await getPrevWorkout(item.id);
                data?.[0].set.forEach(set=>{
                    if(map.has(set.exercise)){
                        map.get(set.exercise).push({setNum:set.set_num,lbs:set.lbs,reps:set.reps});
                    } else {
                        map.set(set.exercise,[{setNum:set.set_num,lbs:set.lbs,reps:set.reps}])
                    }
                });
                const holdingList:{name:string,sets:{setNum:number,lbs:number,reps:number}[]}[] = []
                map.forEach((value,key)=>{
                    holdingList.push({name:key,sets:value})
                })
                const workout = {
                    title:title,
                    exercises: holdingList
                }
                dispatch(populateWorkout(workout))
                clear(item.id)
            }
            loadData()
            navigation.navigate('MyWorkout')
        }} style={styles.workoutContainer}>
            <Text style={styles.workoutTitle}>{item.title}</Text>
            <Text style={styles.workoutDate}>{item.created_at.substring(0,10)}</Text> 
        </TouchableOpacity>
    );
  };

  async function getPrevWorkout(id:string){
    const{data,error} = await supabase
        .from('workout')
        .select(
            'title,set(exercise,set_num,lbs,reps)'
        )
        .eq('id',id)
    if(error){
        console.log('Error getting previous workout', error)
    } else {
        return data
    }
  }

  async function clear(id:string){
    await supabase
        .from('workout')
        .delete()
        .eq('id',id)
    await supabase
        .from('set')
        .delete()
        .eq('id',id)
  }

  
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('MyWorkout')} style={styles.createWorkoutBtn}>
                <Text style={styles.createWorkoutBtnText}>Create a New Workout</Text>
            </TouchableOpacity>
            <View style={styles.inProgressContainer}>
                <Text style={styles.inProgressTitle}>In Progress</Text>
                <View style={styles.inProgressListContainer}>
                    <FlatList contentContainerStyle={styles.flatList} data={inProgressList} keyExtractor={keyExtractor} renderItem={renderItem} horizontal={true}></FlatList>
                </View>
            </View>
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={()=>{redirect('Home')}}>
                    <Image source={require('../../assets/Home.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{redirect('Archives')}}>   
                    <Image source={require('../../assets/Archives.png')}></Image>
                </TouchableOpacity >
                <TouchableOpacity onPress={()=>{redirect('Create')}}>
                    <Image source={require('../../assets/BlueCreate.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{redirect('Progress')}}>   
                    <Image source={require('../../assets/Progress.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{redirect('Profile')}}>
                    <Image source={require('../../assets/Profile.png')}></Image>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        alignItems:'center'
    },
    title:{
        fontFamily:'Inter',
        fontWeight:700,
        fontSize:37,
        marginTop:42,
    },
    navContainer:{
        backgroundColor:'#FFFFFF',
        width:367,
        height:66,
        position:'absolute',
        bottom:30,
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    createWorkoutBtn:{
        backgroundColor:'#007AFA',
        width:320,
        height:45,
        borderRadius:9,
        alignItems:'center',
        justifyContent:'center',
        marginTop:27
    },
    createWorkoutBtnText:{
        fontFamily:'Inter',
        fontWeight:500,
        color:'#FFFFFF',
        fontSize:16,
    },
    inProgressContainer:{
        width:'100%',
        height:171,
        marginTop:27,
    },
    inProgressTitle:{
        fontFamily:'Inter',
        fontWeight:500,
        fontSize:20,
        marginLeft:12,
    },
    inProgressListContainer:{
        height:135,
        marginTop:7,
        flex:1,
        justifyContent:'space-between',
    },
    workoutContainer:{
        width:138,
        height:87,
        marginLeft:10,
        marginRight:10,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    flatList:{
        alignItems:'center',
    },
    workoutTitle:{
        fontFamily:'Inter',
        fontWeight:500,
        fontSize:16
    },
    workoutDate:{
        fontFamily:'Inter',
        fontWeight:500,
        fontSize:16
    }
});

export default Create;