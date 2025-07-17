import { supabase } from '../lib/supabase';
import { myExercises, setReturn, workoutSliceType } from '../types/exercise';
import { getStartAndEndOfWeek } from '../utils/workoutHelpers';
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
            sets.push({exercise:workout.exercises[i].name,set_num:workout.exercises[i].sets[j].setNum,lbs:workout.exercises[i].sets[j].lbs,reps:workout.exercises[i].sets[j].reps,recorded:workout.exercises[i].sets[j].recorded,id:curWorkout.id})
        }
    }
    const { error } = await supabase
        .from('set')
        .insert(sets)
    if(error){
        console.log('Error inserting into sets table', error)
    }
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
        .eq('userid','349fcb09-99be-4732-a4c4-00ebf9d998e3')
    if(error){
        console.log('Error getting sets',error)
        return []
    }
    return data
}

/**
 * Deletes sets from sets table given the id
 * @param id of sets to be deleted
 */
export async function deleteSets(id:string){
    const{error} = await supabase
        .from('set')
        .delete()
        .eq(id,'id')
}

/**
 * Finds all the exerc
 * @param user the userid corresponding to the exercises we are searching for
 * @param setExerciseList populates exercise list in My Exercises.tsx
 */
export async function getExercises(user:string,setMyExercises:(input:myExercises[])=>void){
    const {data,error} = await supabase
        .from('set')
        .select('*')
        .eq('userid',user)
        .eq('recorded',true)
    if(error){
        console.log('Error getting users exercise list', error)
    } else {
        const exerciseList:myExercises[] = []
        data.forEach(row=>{
            let exists =false
            exerciseList.forEach(exercise=>{
                if(exercise.name === row.exercise){
                    exercise.recordedSets.push({
                        reps:row.reps,
                        lbs:row.lbs,
                        created_at:row.created_at,
                        setid:row.setid,
                    })
                    exists = true
                }
            })
            if(!exists){
                exerciseList.push({
                    name:row.exercise,
                    recordedSets:[
                        {
                            reps:row.reps,
                            lbs:row.lbs,
                            created_at:row.created_at,
                            setid:row.setid,
                        }
                    ]
                })
                exists=false
            }
        })
        setMyExercises(exerciseList)
    }
}

/**
 * Sets the recorded status of set
 * @param setid the id of the set we want to update
 * @param recorded true or false 
 */
export async function setRecorded(setid:string,recorded:boolean){
    const {data,error} = await supabase
        .from('set')
        .update({recorded})
        .eq('setid',setid)
        .select()
    if(error){
        console.log('Error updating recorded',error)
    }
}

export async function getSetList(user:string){
    const {data,error} = await supabase
        .from('set')
        .select('*')
        .eq('userid',user)
    if(error){
        console.log("could not get the set list",error)
        return []
    } else {
        return data
    }
}

export async function getSetExercise(user:string){
    const {data,error} = await supabase
        .from('set')
        .select('*,workout(date)')
        .eq('userid',user)
    if(error){
        console.log("could not get the set list",error)
        return []
    } else {
        return data
    }
}

