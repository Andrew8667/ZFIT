import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'
import {exercise} from '../types/exercise'
import CustomText from './CustomText'

/**
 * Boxes containing info in the exercise flatlist
 * Can press on each box and view more info
 * @param param0 contains item which is an exercise in the exercise list
 * -setViewExercise which allows us to set which exercise is clicked
 * -setModalVisible to control when the extra exercise info is shown
 * @returns clickable flatlist item containing exercise info 
 */
const flatListItem = ({item,setViewExercise,setModalVisible}:{item:exercise,setViewExercise:(input:exercise)=>void,setModalVisible:(input:boolean)=>void})=>{
    return(
    <TouchableOpacity style={styles.container} onPress={()=>{
        setViewExercise(item);
        setModalVisible(true)}}>
        <View style={styles.textContainer}>
            <CustomText text={item.name}
            textStyle={styles.textStyle}></CustomText>
            <CustomText text={item.primaryMuscles[0]}
            textStyle={styles.textStyle}></CustomText>
        </View>
        <Image style={{width:123,height:123}}source={{uri: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/' + item.images[0]}}></Image>
        <TouchableOpacity>
            <Image source={require('../../assets/Load_circle_light.png')}></Image>
        </TouchableOpacity>
    </TouchableOpacity>
    )
}

//assigns each exercise a key
const keyExtractor = (item: exercise) => item.id;

/**
 * Flatlist containing exercise item components
 * @param param0 a list of exercises from the api
 * -setViewExercise used to keep track of which item in flatlist is pressed
 * -setModalVisible used to see if the exercise modal is shown or not
 * @returns a flatlist contain
 */
const ExerciseFlatlist = function ExerciseFlatlist({exerciseList,setViewExercise,setModalVisible}:{exerciseList:exercise[],setViewExercise:(input:exercise)=>void,setModalVisible:(input:boolean)=>void}){
    return(
        <FlatList
        contentContainerStyle={{alignItems:'center',justifyContent:'center'}}
        data={exerciseList}
        renderItem={({ item }) => flatListItem({ item, setViewExercise, setModalVisible })}
        keyExtractor={keyExtractor}
        style={styles.flatList}

         ></FlatList>
    );
}

const styles = StyleSheet.create({
    flatList:{
        marginTop:15,
        marginBottom:25
    },
    container:{
        width:356,
        height:123,
        flexDirection:'row',
        backgroundColor:'white',
        marginBottom:15,
        justifyContent:'space-evenly',
        alignItems:'center',
        borderRadius:10
    },
    textStyle:{
        fontWeight:600,
        width:'100%',
        color:"#696969"
    },
    textContainer:{
        width:150,
        height:'100%',
        alignItems:'center',
        justifyContent:'space-evenly'
    }
});

export default ExerciseFlatlist