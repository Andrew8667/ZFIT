import {supabase} from './supabase'
import {Alert} from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';

/**
 * Checks supabase to see if user is a registered user
 * @param setLoading function that determines whether the user is being authenticated or not
 * @param email email of the user
 * @param password password of the user
 * @param navigation navigation to other screen
 */
export async function signInWithEmail(setLoading:(input:boolean)=>void,email:string,password:string, navigation:NavigationProp<any>) {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if(error){
        Alert.alert(error.message)
    } else {
        navigation.navigate('Home')
    }
    setLoading(false)
}

/**
 * Checks supabase to see if user can create their new account
 * @param setLoading function that determines whether the user is being authenticated or not
 * @param email email of the user
 * @param password password of the user
 * @param navigation navigation to other screen
 */
export async function signUpWithEmail(setLoading:(input:boolean)=>void,email:string,password:string, navigation:NavigationProp<any>) {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error){
        Alert.alert(error.message)
    } else {
        if (!session){
            Alert.alert('Please check your inbox for email verification!')
        } 
    }
    setLoading(false)
}
