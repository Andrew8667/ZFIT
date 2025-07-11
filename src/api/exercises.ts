import { exercise } from "../types/exercise";

/**
 * Method obtains the exercise information from public api
 * contains hundreds of exercises
 * @param setExerciseList method used for populating exerciseList variable other files
 */
export async function fetchData(setExerciseList:(exercises:exercise[])=>void){
    try{
        const response = await fetch('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
        if(!response.ok){
            throw new Error('Could not fetch resource')
        }
        const data = await response.json();
        setExerciseList(data);
    } catch(error){
        console.log(error);
    }
}
