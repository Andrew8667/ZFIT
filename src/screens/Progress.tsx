import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';
import Background from '../components/Background';
import NavBar from '../components/NavBar';
import CustomText from '../components/CustomText';
import { getStartAndEndOfWeek } from '../utils/workoutHelpers';
import { getNumWeekWorkouts } from '../lib/workouts';

const Progress = function Progress({navigation}:{navigation:any}){ 
    return(
        <Background>
            <CustomText text='Progress' textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <NavBar navigation={navigation} curScreen='progress'></NavBar>
        </Background>
    )
}

const styles = StyleSheet.create({
    
});

export default Progress;