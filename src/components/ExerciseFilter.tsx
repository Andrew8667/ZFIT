import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

const ExerciseFilter = function ExerciseFilter({levels, selectedLevel, setSelectedLevel,equipment,selectedEquipment,setSelectedEquipment,muscles,selectedMuscle,setSelectedMuscle,setFilterModalVisible}:
    {levels:string[],selectedLevel:string,setSelectedLevel:(item:string)=>void,equipment:string[],selectedEquipment:string,setSelectedEquipment:(item:string)=>void,muscles:string[],selectedMuscle:string,setSelectedMuscle:(input:string)=>void, setFilterModalVisible:(input:boolean)=>void}){
    return(
        <View style={styles.backdrop}>
            <View style={styles.filterContainer}>
                <View style={styles.levelsContainer}>
                    <CustomText text='Choose Difficulty Level'
                    textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                    <Picker style={styles.picker} selectedValue={selectedLevel} onValueChange={(value)=>{setSelectedLevel(value)}}>
                        <Picker.Item value='' label='Any'></Picker.Item>
                        {levels.map(level=>{
                            return(
                                <Picker.Item value={level} label={level}></Picker.Item>
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.levelsContainer}>
                    <CustomText text='Choose Equipment'
                    textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                    <Picker style={styles.picker} selectedValue={selectedEquipment} onValueChange={(value)=>{setSelectedEquipment(value)}}>
                        <Picker.Item value='' label='any'></Picker.Item>
                        {equipment.map(equipment=>{
                            return(
                                <Picker.Item value={equipment} label={equipment}></Picker.Item>
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.levelsContainer}>
                    <CustomText text='Choose Muscle'
                    textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                    <Picker style={styles.picker} selectedValue={selectedMuscle} onValueChange={(value)=>{setSelectedMuscle(value)}}>
                        <Picker.Item value='' label='any'></Picker.Item>
                        {muscles.map(muscle=>{
                            return(
                                <Picker.Item value={muscle} label={muscle}></Picker.Item>
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton text='Return'
                    extraBtnDesign={{backgroundColor:'#f57c00',width:120,height:35}}
                    extraTxtDesign = {{fontWeight:700,fontSize:14}}
                    action={()=>{setFilterModalVisible(false)}}></CustomButton>
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
    filterContainer:{
        backgroundColor:'#FFFFFF',
        width:350,
        height:650,
        borderRadius:10,
        alignItems:'center'
    },
    levelsContainer:{
        height:200,
        width:'100%',
        justifyContent:'center',
    },
    picker:{
        height:180,
        overflow:'hidden',
    },
    btnContainer:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ExerciseFilter