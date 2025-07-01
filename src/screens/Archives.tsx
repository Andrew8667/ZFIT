import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';

const Archives = function Archives({navigation}:{navigation:any}){ 
    //Current session constant
    const [session, setSession] = useState<Session | null>(null);

    //Retrieves the current session
    const retrieveSession = async ()=>{
        const { data, error } = await supabase.auth.getSession();
        if(error){
            Alert.alert("Error getting session!");
        } else {
            setSession(data.session)
        }
    }
    useEffect(()=>{retrieveSession()},[])

    //navigate to different pages
    const redirect = (dest:string)=>{
        navigation.navigate(dest);
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Archives</Text>
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={()=>{redirect('Home')}}>
                    <Image source={require('../../assets/Home.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{redirect('Archives')}}>   
                    <Image source={require('../../assets/BlueArchives.png')}></Image>
                </TouchableOpacity >
                <TouchableOpacity onPress={()=>{redirect('Create')}}>
                    <Image source={require('../../assets/Create.png')}></Image>
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
    }
});

export default Archives;