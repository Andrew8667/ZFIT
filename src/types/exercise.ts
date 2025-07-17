import { SwipeRatingProps } from "@rneui/themed"

export type exercise = { //structure of exercise in the list
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

export type workoutSliceType = {
    title:string,
    date:string,
    duration:number,
    notes:string,
    musclegroups:string[],
    exercises:singleExercise[]
}

export type workoutSliceTypeWithId = {
    title:string,
    date:string,
    duration:number,
    notes:string,
    musclegroups:string[],
    exercises:singleExercise[],
    id:string
}

export type singleExercise = {
    name:string,
    sets:setsType[]
}

export type setsType = {
    setNum:number,lbs:number,reps:number,recorded:boolean
}

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
    set:{
        id:string,
        exercise:string,
        set_num:number,
        created_at:string,
        lbs:number,
        reps:number,
        userid:string,
        recorded:boolean,
        setid:string,
    }[]
}


export type myExercises = {
    name:string,
    recordedSets:{reps:number,lbs:number, created_at:string,setid:string}[]
}