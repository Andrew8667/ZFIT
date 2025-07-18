import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';

/**
 * Component is used for creating the navbar
 * @param param0 recieves navigation and curScreen
 * -navigation allows us to navigate to other screens
 * -curScreen is the current screen we are on
 * @returns a custom navbar
 */
const NavBar = function NavBar({navigation,curScreen}:{navigation:NavigationProp<any>,curScreen:string}){
    return(
        <View style={styles.frame}>
            <View style={styles.container}>
            <TouchableOpacity onPress={()=>{curScreen==='home'?null:navigation.navigate('Home')}}>
                <Image source={curScreen==='home'?require('../../assets/bluehome.png'):require('../../assets/home.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{curScreen==='finished'?null:navigation.navigate('Finished')}}>
                <Image source={curScreen==='finished'?require('../../assets/bluefinished.png'):require('../../assets/finished.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{curScreen==='create'?null:navigation.navigate('Create')}}>
                <Image source={curScreen==='create'?require('../../assets/bluecreate.png'):require('../../assets/create.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{curScreen==='progress'?null:navigation.navigate('Progress')}}>
                <Image source={curScreen==='progress'?require('../../assets/blueprogress.png'):require('../../assets/progress.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{curScreen==='highlights'?null:navigation.navigate('Highlights')}}>
                <Image source={curScreen==='highlights'?require('../../assets/bluehighlights.png'):require('../../assets/highlights.png')}></Image>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    frame:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:30
    },
    container:{
        width:367,
        height:66,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        shadowColor: '#696969',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
    }
})

export default NavBar