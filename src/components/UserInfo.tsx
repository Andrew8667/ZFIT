import { StyleSheet, View, Alert,Text, Image,TextInput,SafeAreaView,ViewStyle,TextStyle } from 'react-native'
import {useState} from 'react'
import { supabase } from '../lib/supabase'
import { NavigationProp, useNavigation } from '@react-navigation/native';

/**
 * Component the the email and password inputs for the login and signup screen
 * @param param0 contains email,password,loading,setEmail,setPassword,and setLoading
 * -email is the email of the user
 * -password is the password of the user
 * -loading is whether the user's credentials are being processed
 * -setEmail,setPassword,and setLoading are functions that allow us to control their respective values
 * @returns a styled component where users can enter their info
 */
const UserInfo = function UserInfo({email,password,loading,setEmail,setPassword,setLoading}:{email:string,password:string,loading:boolean,setEmail:(input:string)=>void,setPassword:(input:string)=>void,setLoading:(input:boolean)=>void}){
    return(
        <View style = {styles.mainContainer}>
            <View style = {styles.secondaryContainer}>
                <Image source={require('../../assets/E-mail.png')} style={styles.img}></Image>
                <TextInput
                value={email}
                placeholder='Email'
                onChangeText={(input)=>{setEmail(input)}}
                style={styles.input}
                placeholderTextColor='#FFFFFF'>
                </TextInput>
            </View>
            <View style = {styles.secondaryContainer}>
                <Image source = {require('../../assets/Lock.png')} style={styles.img}></Image>
                    <TextInput
                    value={password}
                    placeholder='Password'
                    onChangeText={(input)=>{setPassword(input)}}
                    style={styles.input}
                    placeholderTextColor='#FFFFFF'>
                    </TextInput>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:175,
        marginTop:35,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    secondaryContainer:{
        width:338,
        height:70,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
    },
    input:{
        borderWidth:1,
        borderColor:'#FFFFFF',
        width:260,
        height:36,
        borderRadius:9,
        fontFamily:'Inter',
        fontWeight:400,
        color:'#FFFFFF',
        paddingLeft:10
    },
    img:{
        height:25,
        width:25
    }
});

export default UserInfo;