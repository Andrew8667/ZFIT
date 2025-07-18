import { SwipeRatingProps } from "@rneui/themed"

/**
 * structure of the exercises from the api exercise list
 */
export type exercise = { 
    name:string,
    force:string,
    level:string,
    mechanic:string,
    equipment:string,
    primaryMuscles:string[],
    secondaryMuscles:string[],
    instructions:string[],
    category:string,
    images:string[],
    id:string
}

/**
 * This is how workout info is stored in the slice
 */
export type workoutSliceType = { 
    title:string,
    date:string,
    duration:number,
    notes:string,
    musclegroups:string[],
    exercises:singleExercise[]
}

/**
 * same as how it is stored in the slice but includes the id of the workout
 */
export type workoutSliceTypeWithId = { 
    title:string,
    date:string,
    duration:number,
    notes:string,
    musclegroups:string[],
    exercises:singleExercise[],
    id:string
}

/**
 * type used to represent an exercise
 * name is the name of the exercise and sets contain an array of setsType
 */
export type singleExercise = {
    name:string,
    sets:setsType[]
}

/**
 * Contain the set info such as lbs,set number, reps, and if it is recorded or not
 */
export type setsType = {
    setNum:number,lbs:number,reps:number,recorded:boolean
}

/**
 * Workout table returns an array of workoutReturn type
 */
export type workoutReturn = {
    created_at:string,
    date:string,
    duration:number,
    id:string,
    inprogress:boolean,
    musclegroups:string,
    notes:string,
    title:string,
    user:string
}

/**
 * Set table returns an array of setReturn type
 */
export type setReturn = {
    id:string,
    exercise:string,
    set_num:number,
    created_at:string,
    lbs:number,
    reps:number,
    userid:string,
    recorded:boolean,
    setid:string
}

export type setReturnWithDate = {
    id:string,
    exercise:string,
    set_num:number,
    created_at:string,
    lbs:number,
    reps:number,
    userid:string,
    recorded:boolean,
    setid:string,
    workout:{
        date:Date
    }
}

/**
 * The return type of when we select all from workout merged with set
 */
export type mergedList ={
    id:string,
    created_at:string,
    user:string,
    title:string,
    inprogress:boolean,
    date:Date,
    duration:number,
    musclegroups:string,
    notes:string,
    set:setReturn[]
}

/**
 * This is used in my exercises screen
 * Name is the name of the exercise
 * RecordedSets contains the reps,lbs,setid, and when set was created
 */
export type myExercises = {
    name:string,
    recordedSets:{reps:number,lbs:number, created_at:string,setid:string}[]
}

/**
 * Type of individual item that gets loaded into dropdown
 */
export type dropdownItem={
    value:string,
    label:string
}