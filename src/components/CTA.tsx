import { StyleSheet, View, Text, SafeAreaView,TouchableOpacity } from 'react-native'
import { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';

const CTA = function CTA({text,navigation,dest}:{text:string,navigation:any,dest:string}){
    return(
        <View>
            <Text style={styles.text} onPress={()=>{navigation.navigate(dest)}}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text:{
        fontFamily:'inter',
        fontWeight:600,
        fontSize:12,
        color:'#4E9BD8',
        marginTop: 11
    }
});

export default CTA;