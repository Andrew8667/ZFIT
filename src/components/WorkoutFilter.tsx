import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, FlatList, ScrollView } from 'react-native'
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';

/**
 * Filters workout by their date, duration, and muscles worked
 * @param param0 contains filter info
 * @returns a filter for workout
 */
const WorkoutFilter = function WorkoutFilter({setFilterModalVisible,dateOrdering,setDateOrdering,durationRange,setDurationRange,selectedMuscles,setSelectedMuscles,open,setOpen,items,setItems}:
    {setFilterModalVisible:(input:boolean)=>void,dateOrdering:string,setDateOrdering:(input:string)=>void,durationRange:string,setDurationRange:(input:string)=>void,selectedMuscles:string[],setSelectedMuscles:React.Dispatch<React.SetStateAction<string[]>>,open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,items:{value:string,label:string}[],setItems:React.Dispatch<React.SetStateAction<Array<{ label: string; value: string }>>>}){
    return(
        <View style={styles.backdrop}>
                <View style={styles.filterContainer}>
                        <CustomText text='Filter By' textStyle={{fontSize:36,fontWeight:700}}></CustomText>
                <View style={styles.muscleContainer}>
                        <CustomText text='Muscle: ' textStyle={{fontSize:20,fontWeight:600,alignSelf:'center',marginTop:20}}></CustomText>
                        <DropDownPicker
                            style={styles.dropdown}
                            multiple={true}
                            open={open}
                            value={selectedMuscles}
                            items={items}
                            setOpen={setOpen}
                            setValue={setSelectedMuscles}
                            setItems={setItems}
                        />
                </View>
                <ScrollView style={{width:'100%',height:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                    <View style={styles.dateContainer}>
                        <CustomText text='Date: ' textStyle={{fontSize:20,fontWeight:600,alignSelf:'center'}}></CustomText>
                        <Picker style={{width:'90%',alignSelf:'center',borderWidth:1,borderRadius:10,borderColor:'#e4e4e4'}} selectedValue={dateOrdering} onValueChange={(value)=>setDateOrdering(value)}>
                            <Picker.Item value='Newest to Oldest' label='Newest to Oldest'></Picker.Item>
                            <Picker.Item value='Oldest to Newest' label='Oldest to Newest'></Picker.Item>
                        </Picker>
                    </View>
                    <View style={styles.durationContainer}>
                        <CustomText text='Duration: ' textStyle={{fontSize:20,fontWeight:600,alignSelf:'center',marginTop:20}}></CustomText>
                        <Picker style={{width:'90%',alignSelf:'center', borderWidth:1,borderRadius:10,borderColor:'#e4e4e4'}} selectedValue={durationRange} onValueChange={(value)=>setDurationRange(value)}>
                            <Picker.Item value='Any' label='Any'></Picker.Item>
                            <Picker.Item value='Under 30 minutes' label='Under 30 minutes'></Picker.Item>
                            <Picker.Item value='30-60 minutes' label='30-60 minutes'></Picker.Item>
                            <Picker.Item value='Over 60 minutes' label='Over 60 minutes'></Picker.Item>
                        </Picker>
                    </View>
                    <CustomButton text='Return'
                        extraBtnDesign={{backgroundColor:'#f57c00',width:120,height:35,marginTop:30}}
                        extraTxtDesign = {{fontWeight:700,fontSize:14}}
                        action={()=>{setFilterModalVisible(false)}}></CustomButton>
                </ScrollView>
            </View>
        </View>
    )
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
    dateContainer:{
        width:'100%', 
        flexDirection:'column'       
    },
    durationContainer:{
        width:'100%'
    },
    muscleContainer:{
        width:'100%',
        marginBottom:20
    },
    dropdown:{
        fontFamily:'Inter',
        borderColor:'#e4e4e4',
        color:'##e4e4e4',
        marginTop:10,
        width:'90%',
        alignSelf:'center'
    }
})

export default WorkoutFilter
