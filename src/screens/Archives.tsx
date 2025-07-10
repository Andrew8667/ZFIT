import { StyleSheet, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, FlatList } from 'react-native'
import { supabase} from '../lib/supabase'; // adjust path as needed
import {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js';
import { DialogTitleProps } from '@rneui/themed';
import {useSelector,useDispatch} from 'react-redux'
import { populateWorkout } from '../store/workoutSlice';

const Archives = function Archives({navigation}:{navigation:any}){ 
    const dispatch = useDispatch();
    //Current session constant
    const [session, setSession] = useState<Session | null>(null);
    //The list of finished workouts
    const [finishedWorkouts,setFinishedWorkouts] = useState<{created_at:string,id:string,title:string}[]>([])
    //list of current sets
    type SetType = {
        exercise: string;
        set_num: number;
        lbs: number;
        reps: number;
      };
    const [workoutSets,setWorkoutSets] = useState<SetType[]>([])

    //Retrieves the current session
    const retrieveSession = async ()=>{
        const { data, error } = await supabase.auth.getSession();
        if(error){
            Alert.alert("Error getting session!");
        } else {
            setSession(data.session)
        }
    }
    useEffect(()=>{retrieveSession()},[])

    //navigate to different pages
    const redirect = (dest:string)=>{
        navigation.navigate(dest);
    }

    //retrieve the id, title, created_at, where in progress is false
    async function getFinishedWorkouts(){
        const {data,error} = await supabase
            .from('workout')
            .select('id,title,created_at')
            .eq('in_progress',false)
        if(error){
            console.log('error getting finished workouts',error)
        } else {
            setFinishedWorkouts(data)
        }
    }
    useEffect(()=>{
        const executeGetFinishedWorkouts = async ()=>{
            await getFinishedWorkouts();
        }
        executeGetFinishedWorkouts()
    },[])

    //flat list stuff
    const renderItem = ({ item }: { item: { id: string; title: string; created_at: string } }) => {
        return(
            <View>
                <Text>{item.title}</Text>
                <Text>{item.created_at.substring(0,10)}</Text>
                <Button title="View" onPress={() => {
                        const handleEdit = async () => {
                        const { data, error } = await supabase
                            .from('set')
                            .select('exercise,set_num,lbs,reps')
                            .eq('id', item.id);

                        if (error) {
                            console.log('Error finding sets belonging to that workout', error);
                            return;
                        }

                        if (!data) {
                            console.log('No data returned');
                            return;
                        }

                        const map = new Map();

                        data.forEach((set) => {
                            if (map.has(set.exercise)) {
                            map.get(set.exercise).push({
                                setNum: set.set_num,
                                lbs: set.lbs,
                                reps: set.reps,
                            });
                            } else {
                            map.set(set.exercise, [
                                {
                                setNum: set.set_num,
                                lbs: set.lbs,
                                reps: set.reps,
                                },
                            ]);
                            }
                        });

                        const list: {
                            name: string;
                            sets: { setNum: number; lbs: number; reps: number }[];
                        }[] = [];

                        map.forEach((value, key) => {
                            list.push({ name: key, sets: value });
                        });
                        const workout = {
                            title: item.title,
                            exercises: list,
                        };
                        dispatch(populateWorkout(workout));
                        };
                        handleEdit();
                        navigation.navigate('ViewWorkout')}}></Button>
                <Button
                    title="Edit"
                    onPress={() => {
                        const handleEdit = async () => {
                        const { data, error } = await supabase
                            .from('set')
                            .select('exercise,set_num,lbs,reps')
                            .eq('id', item.id);

                        if (error) {
                            console.log('Error finding sets belonging to that workout', error);
                            return;
                        }

                        if (!data) {
                            console.log('No data returned');
                            return;
                        }

                        const map = new Map();

                        data.forEach((set) => {
                            if (map.has(set.exercise)) {
                            map.get(set.exercise).push({
                                setNum: set.set_num,
                                lbs: set.lbs,
                                reps: set.reps,
                            });
                            } else {
                            map.set(set.exercise, [
                                {
                                setNum: set.set_num,
                                lbs: set.lbs,
                                reps: set.reps,
                                },
                            ]);
                            }
                        });

                        const list: {
                            name: string;
                            sets: { setNum: number; lbs: number; reps: number }[];
                        }[] = [];

                        map.forEach((value, key) => {
                            list.push({ name: key, sets: value });
                        });
                        const workout = {
                            title: item.title,
                            exercises: list,
                        };
                        dispatch(populateWorkout(workout));
                        };
                        handleEdit();
                        clear(item.id)
                        navigation.navigate('MyWorkout');
                    }}
                    />

            </View>
        )
    }
    const keyExtractor = (item:{id:string,title:string,created_at:string},index:number)=>{
        return index.toString();
    }

    async function clear(id:string){
        await supabase
            .from('workout')
            .delete()
            .eq('id',id)
        await supabase
            .from('set')
            .delete()
            .eq('id',id)
      }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Archives</Text>
            <View style={{height:'80%'}}>
                <FlatList data = {finishedWorkouts} renderItem={renderItem} keyExtractor={keyExtractor}></FlatList>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        alignItems:'center'
    },
    title:{
        fontFamily:'Inter',
        fontWeight:700,
        fontSize:37,
        marginTop:42,
    },
    navContainer:{
        backgroundColor:'#FFFFFF',
        width:367,
        height:66,
        position:'absolute',
        bottom:30,
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }
});

export default Archives;