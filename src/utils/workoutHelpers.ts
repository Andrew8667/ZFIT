import { exercise } from "../types/exercise"

export const getLevels = function(exerciseList:exercise[]):string[]{
    const levels = new Set<string>();
    exerciseList.forEach(exercise=>{
        levels.add(exercise.level)
    })
    return Array.from(levels);
}

export const getEquipment = function(exerciseList:exercise[]):string[]{
    const equipment = new Set<string>();
    exerciseList.forEach(exercise=>{
        if(exercise.equipment !== null){
            equipment.add(exercise.equipment);
        } 
    })
    return Array.from(equipment)
}

export const getMuscles = function(exerciseList:exercise[]):string[]{
    const muscles = new Set<string>();
    exerciseList.forEach(exercise=>{
        muscles.add(exercise.primaryMuscles[0])
    })
    return Array.from(muscles)
}