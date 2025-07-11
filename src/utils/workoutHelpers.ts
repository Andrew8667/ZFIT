import { exercise, singleExercise, workoutSliceType } from "../types/exercise"
import { useSelector } from "react-redux"; 
import RootState from "../store/store";
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

