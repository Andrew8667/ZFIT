import { supabase } from '../lib/supabase';
import { mergedList, workoutReturn, workoutSliceType } from '../types/exercise';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

/**
 * Adds workout to the database
 * @param workout to be added to db
 * @param inProgress determines whether the workout is being worked on
 * @returns the workout that was just added
 */
export async function addWorkout(workout:workoutSliceType,inProgress:boolean){
    const musclegroupList = workout.musclegroups.join(', ')
    const { data, error } = await supabase
        .from('workout')
        .insert({title:workout.title,date:workout.date,duration:workout.duration,musclegroups:musclegroupList,notes:workout.notes,inprogress:inProgress})
        .select()
        .single()
    if(error){
        console.log('Error inserting into workout table', error)
    }
    return data
}

/**
 * Gets the session's current uuid
 * @returns the user id of the user of current session
 */
export async function getUserUUID(){
    const{data:{session},error}=await supabase.auth.getSession();
    if(error){
        console.error('Error getting session', error.message)
        return null
    }
    return session?.user?.id;
}

/**
 * Gets the workouts either in progress or not
 * @param inprogress workout can either be in progress or finished
 * @returns a list of rows from database table workouts
 */
export async function getWorkouts(inprogress:boolean){
    const{data,error} = await supabase
        .from('workout')
        .select('*')
        .eq('user','349fcb09-99be-4732-a4c4-00ebf9d998e3') //change this to the actual user later
        .eq('inprogress',inprogress)
    if(error){
        console.log('Error getting workouts',error)
        return []
    }
    return data
}

/**
 * Used to keep track of weekly workout goal
 * @param startOfWeek date of the start of this week
 * @param endOfWeek date of the end of this week
 * @returns the number of workouts user has completed this week
 */
export async function getNumWeekWorkouts(setNumOfWorkouts:(input:number)=>void,startOfWeek:string,endOfWeek:string){
    const {count,error} = await supabase
        .from('workout')
        .select('*',{count:'exact',head:true})
        .eq('user','349fcb09-99be-4732-a4c4-00ebf9d998e3') //change this to the actual user later
        .gte('date',startOfWeek)
        .lte('date',endOfWeek)
    if(error){
        console.log('Error getting number of exercises in the week',error)
        setNumOfWorkouts(0)
    } else {
        setNumOfWorkouts(count??0)
    }
}

/**
 * Deletes workout from workout table using id of that workout
 * @param id the id of workout to be deleted
 */
export async function deleteWorkout(id:string){
    const{error} = await supabase
        .from('workout')
        .delete()
        .eq('id',id)
}

export async function getMergedTable(user:string){
    const {data,error} = await supabase
        .from('workout')
        .select('*,set(*)')
        .eq('user',user)
    if(error){
        console.log("could not get the merged list",error)
        return []
    } else {
        return data
    }
}


