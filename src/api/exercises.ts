type exercise = { //structure of exercise in the list
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
