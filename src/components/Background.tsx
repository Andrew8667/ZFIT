import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { ReactNode } from 'react';

const Background = function Background({children}:{children:ReactNode}){
    return(
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFFFFF",
        flex:1,
        height:'100%',
        width:'100%',
        alignItems:'center'
    }
});

export default Background;