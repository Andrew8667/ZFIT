import { StyleSheet, View, Text, SafeAreaView,ViewStyle,TextStyle } from 'react-native'

/**
 * Component for the text inside the screens
 * @param param0 contains text and textStyle
 * -text is the text to be shown
 * -textStyle is extra styling on the text
 * @returns a customized text
 */
const CustomText = function CustomText({text,textStyle,action}:{text:string,textStyle?:TextStyle,action?:()=>void}){
    return(
        <Text style={[styles.text,textStyle]} onPress={action}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text:{
        fontFamily:'Inter',
    }
})

export default CustomText