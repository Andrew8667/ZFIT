import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

/**
 * Use this component when you want to display a filter for the exercises 
 * @param param0 contains all the exercise parts we can filter by, the users selected values, and methods to update them
 * @returns a ui component to filter the exercises
 */
const ExerciseFilter = function ExerciseFilter({levels, selectedLevel, setSelectedLevel,equipment,selectedEquipment,setSelectedEquipment,muscles,selectedMuscle,setSelectedMuscle,setFilterModalVisible,
categories,selectedCategory,setSelectedCategory,forces,selectedForce,setSelectedForce}:
    {levels:string[],selectedLevel:string,setSelectedLevel:(item:string)=>void,equipment:string[],selectedEquipment:string,setSelectedEquipment:(item:string)=>void,muscles:string[],selectedMuscle:string,setSelectedMuscle:(input:string)=>void, setFilterModalVisible:(input:boolean)=>void
        categories:string[],selectedCategory:string,setSelectedCategory:(item:string)=>void,forces:string[],selectedForce:string,setSelectedForce:(item:string)=>void}){
    return(
        <View style={styles.backdrop}>
            <View style={styles.filterContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.filterItemContainer}>
                        <CustomText text='Choose Difficulty Level'
                        textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                        <Picker style={styles.picker} selectedValue={selectedLevel} onValueChange={(value)=>{setSelectedLevel(value)}}>
                            <Picker.Item value='' label='Any'></Picker.Item>
                            {levels.map((level,index)=>{
                                return(
                                    <Picker.Item value={level} label={level} key={index.toString()}></Picker.Item>
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={styles.filterItemContainer}>
                        <CustomText text='Choose Equipment'
                        textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                        <Picker style={styles.picker} selectedValue={selectedEquipment} onValueChange={(value)=>{setSelectedEquipment(value)}}>
                            <Picker.Item value='' label='any'></Picker.Item>
                            {equipment.map((equipment,index)=>{
                                return(
                                    <Picker.Item value={equipment} label={equipment}  key={index.toString()}></Picker.Item>
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={styles.filterItemContainer}>
                        <CustomText text='Choose Muscle'
                        textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                        <Picker style={styles.picker} selectedValue={selectedMuscle} onValueChange={(value)=>{setSelectedMuscle(value)}}>
                            <Picker.Item value='' label='any'></Picker.Item>
                            {muscles.map((muscle,index)=>{
                                return(
                                    <Picker.Item value={muscle} label={muscle} key={index.toString()}></Picker.Item>
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={styles.filterItemContainer}>
                        <CustomText text='Choose Category'
                        textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                        <Picker style={styles.picker} selectedValue={selectedCategory} onValueChange={(value)=>{setSelectedCategory(value)}}>
                            <Picker.Item value='' label='any'></Picker.Item>
                            {categories.map((category,index)=>{
                                return(
                                    <Picker.Item value={category} label={category}  key={index.toString()}></Picker.Item>
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={styles.filterItemContainer}>
                        <CustomText text='Choose Force'
                        textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                        <Picker style={styles.picker} selectedValue={selectedForce} onValueChange={(value)=>{setSelectedForce(value)}}>
                            <Picker.Item value='' label='any'></Picker.Item>
                            {forces.map((force,index)=>{
                                return(
                                    <Picker.Item value={force} label={force} key={index.toString()}></Picker.Item>
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
                </ScrollView>
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
        width:400,
        height:650,
        borderRadius:10,
        alignItems:'center'
    },
    scrollView:{
        width:'100%',
        height:'100%',
    },
    filterItemContainer:{
        height:200,
        width:'90%',
        justifyContent:'center',
        alignSelf:'center',
    },
    picker:{
        height:180,
        alignSelf:'center',
        width:'90%',
        overflow:'hidden',
    },
    btnContainer:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:15
    }
})

export default ExerciseFilter