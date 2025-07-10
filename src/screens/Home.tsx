import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';
import Background from '../components/Background'
import CustomText from '../components/CustomText'
import NavBar from '../components/NavBar';

/**
 * This screen is used for the home screen of the app
 * @param param0 recieves navigation which allows us access to other screens defined in app.tsx
 * @returns a home screen
 */
const Home = function Home({navigation}:{navigation:any}){ 
    return(
        <Background>
            <CustomText text='Home'
            textStyle={{color:'#FFFFFF',fontWeight:700,fontSize:50,marginLeft:20,marginTop:25}}></CustomText>
            <NavBar navigation={navigation} curScreen="home"></NavBar>
        </Background>
    );
}

export default Home;