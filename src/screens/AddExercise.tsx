import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';
import Title from '../components/Title'
import Background from '../components/Background'
import { ListItem } from '@rneui/base';
import {useDispatch} from 'react-redux'
import {addExercise,addSet,deleteSet} from '../store/workoutSlice'

const AddExercise = function AddExercise({navigation}:{navigation:any}){
    const [exerciseList,setExerciseList] = useState<Exercise[]>([]);
    const [filteredExerciseList,setFilteredExerciseList] = useState<Exercise[]>([]);
    const [modalVisible,setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState<Exercise | null>(null);
    const [searchItem,setSearchItem] = useState('');
    const [muscleList,setMuscleList] = useState<string[]>([]);
    const dispatch = useDispatch();

    type Exercise = {
        name: string,
        force: string,
        level: string,
        mechanic: string,
        equipment: string,
        primaryMuscles: string[],
        secondaryMuscles: string[],
        instructions: string[],
        category: string,
        images: string[],
        id: string,
    }
    //fetch data from json file
    async function fetchData(){
        try{
            const response = await fetch('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
            if(!response.ok){
                throw new Error('Could not fetch resource')
            }
            const data = await response.json();
            setExerciseList(data);
        } catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{fetchData()},[]);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.exerciseContainer} onPress={()=>{
            setModalVisible(true);
            setCurrentItem(item)}}>
            <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseMuscle}>{item.primaryMuscles}</Text>
            </View>
            <Image source={{ uri: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/' + item.images[0] }}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"></Image>
            <TouchableOpacity onPress={()=>dispatch(addExercise(item.name))} style={styles.addBtn}>
                <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
        </TouchableOpacity>
      );
    const keyExtractor = (item: any, index: number) => index.toString();

    return(
        <Background>
            <Text style={styles.title}>Add Exercise</Text>
            <View style={styles.searchBar}>
                <TextInput style={styles.textInput} placeholder='Exercise Name' placeholderTextColor={'#A7AAB4'} 
                onChangeText={(newValue) => {setSearchItem(newValue)}}>                  
                </TextInput>
                <TouchableOpacity style={styles.filter}>
                    <Image source={require('../../assets/Filter_alt.png')}></Image>
                </TouchableOpacity>
            </View>
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContainer}>
                        <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center',flexGrow:1 }}>
                            <Text style={styles.moreInfoTitle}>{currentItem?.name}</Text>
                            <View style={styles.moreInfo}>                
                                <Text style={styles.moreInfoText}>Type: {currentItem?.force}</Text>
                                <Text style={styles.moreInfoText}>Difficulty: {currentItem?.level}</Text>
                            </View>
                            <View style={styles.moreInfo}>                
                                <Text style={styles.moreInfoText}>Movement: {currentItem?.mechanic}</Text>
                                <Text style={styles.moreInfoText}>Equipment: {currentItem?.equipment}</Text>
                            </View>
                            <Text style={[styles.moreInfoText,{marginTop:10}]}>Instructions: {currentItem?.instructions}</Text>
                            <Button onPress={()=>setModalVisible(false)} title="Close"></Button>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <FlatList style={styles.flatList} data={exerciseList.filter(exercise => exercise.name.trim().toLowerCase().startsWith(searchItem.trim().toLowerCase()))} renderItem={renderItem} keyExtractor={keyExtractor}></FlatList>
            <TouchableOpacity onPress={()=>navigation.navigate('MyWorkout')} style={{backgroundColor:'#EAEAEA',width:80,height:30,justifyContent:'center',alignItems:'center',borderRadius:9}}>
                <Text>Return</Text>
            </TouchableOpacity>
        </Background>
    );
}

const styles = StyleSheet.create({
    title:{
        fontFamily:'Inter',
        fontWeight: 700,
        fontSize:37
    },
    searchBar:{
        backgroundColor:'#F2F6FC',
        width:350,
        height:35,
        borderRadius:9,
        marginTop:26,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    textInput:{
        marginLeft:10,
        width: '90%',
        height: '100%',
    },
    filter:{
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',
    },
    exerciseContainer:{
        backgroundColor:'#FFFFFF',
        width:350,
        height:100,
        marginTop:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
        alignSelf:'center',
    },
    exerciseInfo:{
        height:'100%',
        justifyContent:'space-evenly',
        marginLeft:10,
        flexShrink:1,
    },
    exerciseName:{
        fontFamily:'Inter',
        fontSize:16,
        fontWeight:500,
    },
    exerciseMuscle:{
        fontFamily:'Inter',
        fontSize:12,
    },
    addBtn:{
        backgroundColor:'#EAEAEA',
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        width:30,
        height:30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    addBtnText:{
        fontFamily:'Inter'
    },
    flatList:{
        width:'90%',
        height:'70%',
        marginTop:20,
        marginBottom:40,
    },
    modalContainer:{
        height: '40%',
        width:'90%',
        alignSelf:'center',
        marginTop:'20%',
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
    },
    modalBackdrop:{
        flex:1,
        backgroundColor:'rgba(128, 128, 128, 0.3)',
        justifyContent:'center',
        alignItems:'center',
    },
    moreInfo:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        width:'100%',
        marginTop:10,
    },
    moreInfoTitle:{
        fontFamily:'Inter',
        fontSize:24,
        fontWeight:500
    },
    moreInfoText:{
        fontFamily:'Inter',
        fontSize:14,
    },
});

export default AddExercise;