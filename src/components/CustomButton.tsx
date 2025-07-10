import { StyleSheet, View,ViewStyle,TextStyle, Text,SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';

/**
 * Provides a customizable button to be used in screens
 * @param param0 contains the text, extraBtnDesign, extraTxtDesign, action
 * -text is what is displayed in the button
 * -extraBtnDesign is the styling of the button
 * -extraTxtDesign is the styling of the text inside button
 * -action is what you want the button to do after it is pressed
 * @returns a customized button
 */
const CustomButton = function CustomButton(
    {text,extraBtnDesign,extraTxtDesign,action}:
    {text:string,extraBtnDesign:ViewStyle,extraTxtDesign:TextStyle,action?:()=>void}){
    const navigation = useNavigation<NavigationProp<any>>()
    return(
        <TouchableOpacity style={[styles.btnDesign,extraBtnDesign]}
        onPress={action}>
            <Text style={[styles.txtDesign,extraTxtDesign]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnDesign:{
        borderRadius:9,
        justifyContent:'center',
        alignItems:'center'
    },
    txtDesign:{
        fontFamily:'Inter',
        color:'#FFFFFF',
    }
});

export default CustomButton