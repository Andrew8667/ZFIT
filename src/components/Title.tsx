import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { ReactNode } from 'react';

const Title = function Title({text}:{text:string}){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:260,
    },
    text:{
        fontFamily:'Inter',
        fontWeight: 700,
        fontSize:37
    }
});

export default Title;