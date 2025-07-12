import { exercise, setReturn, setsType, singleExercise, workoutReturn, workoutSliceType, workoutSliceTypeWithId } from "../types/exercise"
import { useSelector } from "react-redux"; 
import RootState from "../store/store";
import { supabase } from "../lib/supabase";
import { addToSet } from "../lib/sets";
import { getSets, getWorkouts } from "../lib/workouts";
import ExerciseFlatlist from "../components/ExerciseFlatlist";
import { fetchData } from "../api/exercises";
/**
 * Gets all the unique levels of each exercise in the list
 * @param exerciseList list of all the exercises and their info
 * @returns list of unique exercise level difficulty as strings
 */
export const getLevels = function(exerciseList:exercise[]):string[]{
    const levels = new Set<string>();
    exerciseList.forEach(exercise=>{
        levels.add(exercise.level)
    })
    return Array.from(levels);
}

/**
 * Gets the equipment that is possible
 * @param exerciseList list of all the exercises and their info
 * @returns a unique list of possible equipment
 */
export const getEquipment = function(exerciseList:exercise[]):string[]{
    const equipment = new Set<string>();
    exerciseList.forEach(exercise=>{
        if(exercise.equipment !== null){
            equipment.add(exercise.equipment);
        } 
    })
    return Array.from(equipment)
}

/**
 * Gets a unique list of muscles that can be trained
 * @param exerciseList list of all the exercises and their info
 * @returns unique string list of muscles
 */
export const getMuscles = function(exerciseList:exercise[]):string[]{
    const muscles = new Set<string>();
    exerciseList.forEach(exercise=>{
        muscles.add(exercise.primaryMuscles[0])
    })
    return Array.from(muscles)
}

/**
 * Used for WorkoutFilter.tsx
 * @param exerciseList a list of exercises retrived from api
 * @returns list of muscles for multipicker with label and value
 */
export const getMusclesList = function(exerciseList:exercise[]):{label:string,value:string}[]{
    const muscles = new Set<string>();
    exerciseList.forEach(exercise=>{
        muscles.add(exercise.primaryMuscles[0])
    })
    const musclesArr = Array.from(muscles)
    const musclesList:{label:string,value:string}[]=[]
    musclesArr.forEach(muscle=>{
        musclesList.push({value:muscle,label:muscle})
    })
    return musclesList;
}

/**
 * Gets the categories of exercises such as strength
 * @param exerciseList list of all the exercises and their info
 * @returns unique list of categories
 */
export const getCategories = function(exerciseList:exercise[]):string[]{
    const categories = new Set<string>();
    exerciseList.forEach(exercise=>{
        categories.add(exercise.category)
    })
    return Array.from(categories)
}

/**
 * Gets the force of the exercise such as pull or push
 * @param exerciseList list of all the exercises and their info
 * @returns unique string list of exercise forces
 */
export const getForces = function(exerciseList:exercise[]):string[]{
    const forces = new Set<string>();
    exerciseList.forEach(exercise=>{
        if(exercise.force !== null){
            forces.add(exercise.force)
        }
    })
    return Array.from(forces)
}

/**
 * Used to get string representation of the date
 * @param dateObj a date object which contains the date and time
 * @returns date in string form
 */
export const getDate = function(dateObj:Date):string{
    const dateList = Date.toString()
    return dateList[1] + ' ' + dateList[2] + ', ' + dateList[3]
}

/**
 * Checks to see if an exercise is already in the workout
 * @param targetName the name of the exercise we are checking to see if it is in the workout
 * @returns true if exercise is in workout, false otherwise
 */
export const hasExercise = function(targetName:string,exercises:singleExercise[]):boolean{
    let isTrue = false
    exercises.forEach(exercise=>{
        if(exercise.name===targetName){
            isTrue = true
        }
    })
    return isTrue
}

/**
 * Determines if a workout has the criteria to be added to database
 * @param workout workout being checked
 * @returns true if the workout has a title, false otherwise
 */
export const checkWorkout = function checkWorkout(workout:workoutSliceType):boolean{
    return workout.title !== ''
}

/**
 * Adds workout to database
 * @param workout to be added to database
 * @param source either from in progress or finish
 */
export const recordWorkout = async function recordWorkout(workout:workoutSliceType,source:string){
    if(source === 'inprogress'){
        await addToSet(workout,true) //adding to workout included in addToSet
    } else {
        await addToSet(workout,false)
    }
}

/**
 * Get the workouts that are in progress or finished
 * @param inprogress workout can either be in progress or finished
 * @returns an array containing filtered workouts
 */
export async function getFullWorkouts(inprogress:boolean){
    const workoutArr: workoutSliceTypeWithId[]= []
    const workouts:workoutReturn[]= await getWorkouts(inprogress)
    const sets:setReturn[]= await getSets('')
    const filteredWorkouts = workouts.filter(workout=>workout.inprogress===inprogress) //filtered by inprogress or not
    filteredWorkouts.forEach(workout=>{
        const workoutData:workoutSliceTypeWithId = {
            title:workout.title,
            date:workout.date,
            duration:workout.duration,
            notes:workout.notes,
            musclegroups:workout.musclegroups.split(', '),
            exercises:[],
            id:workout.id
        }
        const filteredSets = sets.filter(set=>set.id===workout.id)
        filteredSets.forEach(set=>{
            if(workoutData.exercises.find((exercise:singleExercise)=>exercise.name===set.exercise)){
                //exercise already inside
                workoutData.exercises.find((exercise:singleExercise)=>exercise.name===set.exercise)?.sets.push({
                    setNum:set.set_num,
                    lbs:set.lbs,
                    reps:set.reps
                })
            } else {
                workoutData.exercises.push({
                    name:set.exercise,
                    sets:[{
                        setNum:set.set_num,
                        lbs:set.lbs,
                        reps:set.reps
                    }]
                })
            }
        })
        workoutArr.push(workoutData)
    })
    //return array of workouts
    return(workoutArr)
}

/**
 * User can filter the workouts to display
 * @param dateOrdering workouts can be sorted by date
 * @param durationRange workouts can be sorted by being within a duration range
 * @param selectedMuscles muscles of the workouts we want to find
 * @param unfilteredWorkouts workouts without the filters
 * @returns a filtered workout list
 */
export function filteredWorkouts(searchText:string,dateOrdering:string,durationRange:string,selectedMuscles:string[],unfilteredWorkouts:workoutSliceTypeWithId[]):(workoutSliceTypeWithId[]){
    let sortedWorkouts = dateOrdering === 'Newest to Oldest'?[...unfilteredWorkouts].sort((a,b)=>a.date.localeCompare(b.date)):[...unfilteredWorkouts].sort((a,b)=>a.date.localeCompare(b.date)).reverse()//sorts by date
    switch(durationRange){ //filter by duration
        case 'Under 30 minutes':
            sortedWorkouts = sortedWorkouts.filter(workout=>workout.duration<30)
            break;
        case '30-60 minutes':
            sortedWorkouts = sortedWorkouts.filter(workout=>workout.duration>=30 && workout.duration<=60)
            break;
        case 'Over 60 minutes':
            sortedWorkouts = sortedWorkouts.filter(workout=>workout.duration>60)
            break;
        default:
    }
    sortedWorkouts = sortedWorkouts.filter(workout=>workout.title.trim().toLowerCase().includes(searchText.trim().toLowerCase()))
    sortedWorkouts = sortedWorkouts.filter(workout=>selectedMuscles.every(muscle=>workout.musclegroups.includes(muscle)))//filter by muscle group
    return sortedWorkouts
}