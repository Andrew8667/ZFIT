import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'
import { exercise } from '../types/exercise';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

/**
 * Displays the extra info of each exercise
 * @param param0 exercise is the current exercise that what pressed
 * -setExerciseModalVisible allows us to control whether this component is shown or not
 * @returns a screen with blurred background and a box in middle with extra workout info
 */
const ExerciseInfo = function ExerciseInfo({exercise,setExerciseModalVisible}:{exercise:any,setExerciseModalVisible:(input:boolean)=>void}){
    return(
        <View style={styles.backdrop}>
            <View style={styles.container}>
                <View style={styles.nameContainer}>
                    <CustomText text={exercise.name} textStyle={{fontWeight:600,fontSize:20,color:'#000000'}}></CustomText>
                </View>
                <View style={styles.rowContainerA}>
                    <CustomText text={'Level: ' + exercise.level} textStyle={{fontWeight:600,fontSize:16,color:'#000000',width:175}}></CustomText>
                    <CustomText text={'Equipment: ' + exercise.equipment} textStyle={{fontWeight:600,fontSize:16,color:'#000000',width:175}}></CustomText>
                </View>
                <View style={styles.rowContainerB}>
                    <CustomText text={'Category: ' + exercise.category} textStyle={{fontWeight:600,fontSize:16,color:'#000000',width:175}}></CustomText>
                    <CustomText text={'Force: ' + exercise.force} textStyle={{fontWeight:600,fontSize:16,color:'#000000',width:175}}></CustomText>
                </View>
                <View style={styles.descContainer}>
                    <ScrollView>
                        <Text>
                            {'Instructions: ' + exercise.instructions.join(' ')}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton text='Return'
                    extraBtnDesign={{backgroundColor:'#2196f3',width:93,height:22}}
                    extraTxtDesign={{fontWeight:600,fontSize:14}}
                    action={()=>{setExerciseModalVisible(false)}}></CustomButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backdrop:{
        flex:1,
        backgroundColor:'rgba(69,69,69,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        width:350,
        opacity:1,
        height:400,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
    },
    nameContainer:{
        width:'100%',
        height:65,
        justifyContent:'center',
        alignItems:'center'
    },
    rowContainerA:{
        width:'100%',
        height:65,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    rowContainerB:{
        width:'100%',
        height:65,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    descContainer:{
        width:'100%',
        height:160,
    },
    btnContainer:{
        width:'100%',
        height:45,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default ExerciseInfo