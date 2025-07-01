import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, FlatList } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';

const Create = function Create({navigation}:{navigation:any}){ 


    //navigate to different pages
    const redirect = (dest:string)=>{
        navigation.navigate(dest);
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('MyWorkout')} style={styles.createWorkoutBtn}>
                <Text style={styles.createWorkoutBtnText}>Create a New Workout</Text>
            </TouchableOpacity>
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
    }
});

export default Create;