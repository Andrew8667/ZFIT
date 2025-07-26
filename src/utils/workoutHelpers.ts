import { dropdownItem, exercise, mergedList, myExercises, setReturn, setReturnWithDate, setsType, singleExercise, workoutReturn, workoutSliceType, workoutSliceTypeWithId } from "../types/exercise"
import { useSelector } from "react-redux"; 
import RootState from "../store/store";
import { supabase } from "../lib/supabase";
import {getSets, addToSet, getSetExercise } from "../lib/sets";
import { getMergedTable, getWorkouts } from "../lib/workouts";
import ExerciseFlatlist from "../components/ExerciseFlatlist";
import { fetchData } from "../api/exercises";
import { start } from "repl";
/**
 * Gets all the unique levels of each exercise in the list
 * @param exerciseList list of all the exercises and their info
 * @returns list of unique exercise level difficulty as a list of dropdown items
 */
export const getLevels = function(exerciseList:exercise[]):dropdownItem[]{
    const levels = new Set<string>();
    exerciseList.forEach(exercise=>{
        levels.add(exercise.level)
    })
    const arr = Array.from(levels)
    const newArr:dropdownItem[] = []
    newArr.push({
        value:'',
        label:'Any'
    })
    arr.map(level=>{
        newArr.push({
            value:level,
            label:level
        }) 
    })
    return newArr
}

/**
 * Gets the equipment that is possible
 * @param exerciseList list of all the exercises and their info
 * @returns a unique list of possible equipment as a list of dropdown items
 */
export const getEquipment = function(exerciseList:exercise[]):dropdownItem[]{
    const equipment = new Set<string>();
    exerciseList.forEach(exercise=>{
        if(exercise.equipment !== null){
            equipment.add(exercise.equipment);
        } 
    })
    const arr= Array.from(equipment)
    const newArr:dropdownItem[] = []
    newArr.push({
        value:'',
        label:'Any'
    })
    arr.map(equipment=>{
        newArr.push({
            value:equipment,
            label:equipment
        }) 
    })
    return newArr
}

/**
 * Gets a unique list of muscles that can be trained
 * @param exerciseList list of all the exercises and their info
 * @returns unique string list of muscles as a list of dropdown items
 */
export const getMuscles = function(exerciseList:exercise[]):dropdownItem[]{
    const muscles = new Set<string>();
    exerciseList.forEach(exercise=>{
        muscles.add(exercise.primaryMuscles[0])
    })
    const arr=Array.from(muscles)
    const newArr:dropdownItem[] = []
    newArr.push({
        value:'',
        label:'Any'
    })
    arr.map(muscle=>{
        newArr.push({
            value:muscle,
            label:muscle
        }) 
    })
    return newArr
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
export const getCategories = function(exerciseList:exercise[]):dropdownItem[]{
    const categories = new Set<string>();
    exerciseList.forEach(exercise=>{
        categories.add(exercise.category)
    })
    const arr=Array.from(categories)
    const newArr:dropdownItem[] = []
    newArr.push({
        value:'',
        label:'Any'
    })
    arr.map(category=>{
        newArr.push({
            value:category,
            label:category
        }) 
    })
    return newArr
}

/**
 * Gets the force of the exercise such as pull or push
 * @param exerciseList list of all the exercises and their info
 * @returns unique string list of exercise forces  as a list of dropdown items
 */
export const getForces = function(exerciseList:exercise[]):dropdownItem[]{
    const forces = new Set<string>();
    exerciseList.forEach(exercise=>{
        if(exercise.force !== null){
            forces.add(exercise.force)
        }
    })
    const arr=Array.from(forces)
    const newArr:dropdownItem[] = []
    newArr.push({
        value:'',
        label:'Any'
    })
    arr.map(force=>{
        newArr.push({
            value:force,
            label:force
        }) 
    })
    return newArr
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
export async function getFullWorkouts(user:string,inprogress:boolean){
    const workoutArr: workoutSliceTypeWithId[]= []
    const workouts:workoutReturn[]= await getWorkouts(user,inprogress)
    const sets:setReturn[]= await getSets(user)
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
                workoutData.exercises.find((exercise:singleExercise)=>exercise.name===set.exercise)?.sets.push({
                    setNum:set.set_num,
                    lbs:set.lbs,
                    reps:set.reps,
                    recorded:set.recorded
                })
            } else {
                workoutData.exercises.push({
                    name:set.exercise,
                    sets:[{
                        setNum:set.set_num,
                        lbs:set.lbs,
                        reps:set.reps,
                        recorded: set.recorded
                    }]
                })
            }
        })
        workoutArr.push(workoutData)
    })
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

/**
 * Gets the starting and ending date of the week
 * @param date the current date
 * @returns the first and last day of the week in the form 'YYYY-MM-DD'
 */
export function getStartAndEndOfWeek() {
    const date = new Date()
    const dayOfWeek = date.getDay(); // 0 (Sun) to 6 (Sat)
  
    const start = new Date(date);
    start.setDate(date.getDate() - dayOfWeek);
  
    const end = new Date(date);
    end.setDate(date.getDate() + (6 - dayOfWeek));
  
    const format = (day:Date) => day.toISOString().split('T')[0];
  
    return {
      startOfWeek: format(start),
      endOfWeek: format(end),
    };
  }

  /**
   * Sets the unique exercise list with the exercises user has completed
   * @param user the user of the current session
   * @param setUniqueExercises sets the unique exerciselist
   */
export async function getUniqueExerciseList(user:string,setUniqueExercises:(input:string[])=>void){
    const setList:setReturn[] = await getSets(user)
    const uniqueExercises = new Set<string>();
    setList.forEach(set=>{
        uniqueExercises.add(set.exercise)
    })
    const uniqueExerciseList = Array.from(uniqueExercises)
    setUniqueExercises(uniqueExerciseList)
}

/**
 * Populates the data that goes in the progress screen chart
 * @param user of the current session
 * @param exercise we want data for
 * @param year of when we want data to be from
 * @param month of when we want data to be from
 * @param setDatesList dates contain the numbered weeks and are on x axis
 * @param setVolumeList contains the total volumes for each week
 */
export async function getChartData(user:string,exercise:string,year:number,month:number, setDatesList:(input:string[])=>void, setVolumeList:(input:number[])=>void){
    const {start,end} = getMonthRange(year,month)
    const setList:setReturnWithDate[] = await getSetExercise(user);
    const filteredList:setReturnWithDate[] = []
    setList.forEach(set=>{
        if(set.exercise === exercise){
            filteredList.push(set)
        }
    })
    const dates:string[] = []
    const values:number[] = []
    let curDay = new Date(start);
    let endDay = new Date(start);
    endDay.setDate(endDay.getDate()+6)
    let week = 1;
    while(endDay.getUTCMonth() === month){
        let sum = 0;
        const filteredFilteredList = filteredList.filter(set=>{
            if(new Date(set.workout.date) >= curDay && new Date(set.workout.date) <= endDay){
                return set
            }
        })
        filteredFilteredList.forEach(set=>{
            sum+= set.lbs * set.reps
        })
        dates.push('Week ' + week)
        week++
        values.push(sum)
        curDay.setDate(curDay.getDate()+6)
        endDay.setDate(endDay.getDate()+6)
    }
    setDatesList(dates)
    setVolumeList(values)
} 

/**
 * Gets the beginning and end of a month of a specific year
 * @param year of when we want exercise data for
 * @param month of when we want exercise data for
 * @returns the date of the start and end of the month
 */
function getMonthRange(year: number, month: number) {
    const start = new Date(year, month, 1)
    const end = new Date(year, month + 1, 0)
  
    return {
      start: start.toISOString().split('T')[0], 
      end: end.toISOString().split('T')[0],   
    }
  }

  /**
   * Gets the weekly stats of the user to be displayed on the home page
   * @param user of the current session
   * @param setTotalLbs total lbs lifted this week
   * @param setTotalDuration total duration of workouts this week
   * @param setTotalSets total sets performed this week
   * @param setTotalReps total reps performed this week
   * @param setStreak Number of days worked out in a row
   */
export async function getWeekStats(user:string,setTotalLbs:(inputs:number)=>void,setTotalDuration:(inputs:number)=>void,setTotalSets:(inputs:number)=>void,setTotalReps:(inputs:number)=>void,setStreak:(inputs:number)=>void){
    const data:mergedList[] = await getMergedTable(user)
    const {startOfWeek,endOfWeek} = getStartAndEndOfWeek()
    const filteredData:mergedList[] = data.filter(item=>new Date(item.date) >= new Date(startOfWeek) && new Date(item.date) <= new Date(endOfWeek))
    let totalLbs = 0
    let totalReps = 0
    let totalSets = 0
    const totalDuration = filteredData.reduce((sum, item) => sum + item.duration,0)
    filteredData.forEach(workout=>{
        workout.set.forEach(set=>{
            totalLbs+=set.lbs
            totalReps+=set.reps
            totalSets+=1
        })
    })
    let date = new Date()
    const result = filteredData.find(item=>new Date(item.date).getFullYear() === date.getFullYear() && new Date(item.date).getDay() === date.getDay() && new Date(item.date).getMonth() === date.getMonth())
    let streak = result?1:0
    date.setDate(date.getDate()-1)
    let hasStreak = true
    while(hasStreak){
        const result = filteredData.find(item=>new Date(item.date).getFullYear() === date.getFullYear() && new Date(item.date).getDay() === date.getDay() && new Date(item.date).getMonth() === date.getMonth())
        if(result){
            streak++
            date.setDate(date.getDate()-1)
        } else {
            hasStreak=false
        }
    }
    setStreak(streak)
    setTotalLbs(totalLbs)
    setTotalDuration(totalDuration),
    setTotalSets(totalSets)
    setTotalReps(totalReps)
}

export function correctedDate(date:string):Date{
    const correctDate = new Date(date)
    correctDate.setDate(correctDate.getDate()+1)
    return correctDate
}

export async function getUserMaxes(userId:string,setMySets:(input:[string,{lbs:number,reps:number}[]][])=>void){
    const sets:setReturn[] = await getSets(userId)
    const map:Map<string,{lbs:number,reps:number}[]> = new Map()
    sets.forEach(set=>{
        if(!map.has(set.exercise)){
            map.set(set.exercise,[{lbs:set.lbs,reps:set.reps}])
        } else {
            const exerciseSets:{lbs:number,reps:number}[] = map.get(set.exercise) ?? []
            const existingSets = map.get(set.exercise);
            const index = exerciseSets?.findIndex(aSet=>aSet.lbs === set.lbs)
            if(index !== -1){
                if(exerciseSets[index].reps < set.reps){
                    if (existingSets){
                        existingSets[index] = {lbs:set.lbs,reps:set.reps}
                    }
                }
            } else {
                existingSets?.push({lbs:set.lbs,reps:set.reps})
            }
        }
    })
    setMySets(Array.from(map))
}
  