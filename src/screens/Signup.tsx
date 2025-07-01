import { StyleSheet, View, Text, SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import {useState} from 'react';
import { supabase } from '../lib/supabase'
import Background from '../components/Background';
import Title from '../components/Title';
import CTA from '../components/CTA';

const Signup = function Signup({navigation}:{navigation:any}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
        setLoading(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.signUp({
          email: email,
          password: password,
        })
        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return(
        <Background>
            <Title text="Signup"></Title>
            <View style={styles.container1}>
                <View style={styles.containerUser}>
                    <Image source={require('../../assets/User_alt_fill.png')} style={styles.image}></Image>
                    <TextInput placeholder="Email" placeholderTextColor='#CCCCCC' style={styles.textInput} onChangeText={(text)=>setEmail(text)} value={email}>
                    </TextInput>
                </View>
                <View style={styles.containerPass}>
                    <Image source={require('../../assets/Lock_alt_fill.png')} style={styles.image}></Image>
                        <TextInput placeholder="Password" placeholderTextColor='#CCCCCC' style={styles.textInput} onChangeText={(text)=>setPassword(text)} value={password}>
                    </TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.container} disabled={loading} onPress={()=>signUpWithEmail()}>
                <Text style={styles.text}>Signup</Text>
            </TouchableOpacity>
            <CTA text="Have an account? Login" navigation={navigation} dest="Login"></CTA>
        </Background>
    );
}

const styles = StyleSheet.create({
    container1:{
        width:'100%',
        height:150,
        marginTop:40,
        justifyContent:'space-between',
        alignItems:'center',
    },
    containerUser:{
        width:338,
        height:70,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    containerPass:{
        width:338,
        height:70,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    textInput:{
        borderColor:'#F5F5F5',
        borderWidth:1,
        height:36,
        width:261,
        borderRadius:9
    },
    image:{
        width:25,
        height:25,
    },
    container:{
        backgroundColor:'#007AFA',
        width:284,
        height:56,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:9,
        marginTop:13,
    },
    text:{
        fontFamily:'Inter',
        fontWeight:600,
        fontSize:16,
        color:'#FFFFFF'
    }
});

export default Signup;