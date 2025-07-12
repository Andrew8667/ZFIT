import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';
import Background from '../components/Background';

const Progress = function Progress({navigation}:{navigation:any}){ 
    return(
        <Background>
            
        </Background>
    )
}

const styles = StyleSheet.create({
    
});

export default Progress;