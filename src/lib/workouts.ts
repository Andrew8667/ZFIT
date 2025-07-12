import { supabase } from '../lib/supabase';
import { workoutReturn, workoutSliceType } from '../types/exercise';

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
 * Gets all the sets in the set table
 * @param user the uuid of the current session user
 * @returns list of the rows from set table
 */
export async function getSets(user:string){
    const{data,error} = await supabase
        .from('set')
        .select('*')
        .eq('userid','349fcb09-99be-4732-a4c4-00ebf9d998e3') //change this to the actual user later
    if(error){
        console.log('Error getting sets',error)
        return []
    }
    return data
}