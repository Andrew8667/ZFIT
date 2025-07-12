import { supabase } from '../lib/supabase';
import { workoutSliceType } from '../types/exercise';
import { addWorkout } from './workouts';

/**
 * Adds the sets of the workout to the database
 * calls add workout inside
 * @param workout to be added to database
 * @param inProgress determines if the workout is unfinished
 */
export async function addToSet(workout:workoutSliceType,inProgress:boolean){
    const curWorkout = await addWorkout(workout,inProgress);
    const sets = []
    for(let i = 0 ; i < workout.exercises.length;i++){
        for(let j = 0 ; j < workout.exercises[i].sets.length; j++){
            sets.push({exercise:workout.exercises[i].name,set_num:workout.exercises[i].sets[j].setNum,lbs:workout.exercises[i].sets[j].lbs,reps:workout.exercises[i].sets[j].reps,id:curWorkout.id})
        }
    }
    const { error } = await supabase
        .from('set')
        .insert(sets)
    if(error){
        console.log('Error inserting into sets table', error)
    }
}