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

export type singleExercise = {
    name:string,
    sets:setsType[]
}

export type setsType = {
    setNum:number,lbs:number,reps:number
}