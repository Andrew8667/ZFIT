import { createSlice } from '@reduxjs/toolkit';
import {useState} from 'react'
import { workoutSliceType } from '../types/exercise';

/**
 *  Workouts will start out empty like this
 * exercises contains a list of objects
 * Each object has an exercise title and sets which is a list of set objects
 * of the form {setnum,lbs,reps}
 */
const initialState:workoutSliceType={
    title:'',
    date: new Date().toISOString().split("T")[0],
    duration:0,
    musclegroups:[],
    notes:'',
    exercises:[]
};

/**
 * Operates on info for the workout
 */
const workoutSlice = createSlice({
    name:'workout',
    initialState,
    reducers:{
    addExercise:(state,action)=>{ {/*adds an exercise with an empty set if the exercise doesn't exist
action.payload of the form name:primarymuscle*/}
            const name = action.payload.split(':')[0]
            const muscle = action.payload.split(':')[1]
            const newExercise = {
                name:name,
                sets:[{
                    setNum:1,
                    lbs:0,
                    reps:0,
                }]
            };
            let exerciseExists = false;
            state.exercises.forEach((exercise)=>{
                if(exercise.name === name){
                    exerciseExists = true;
                }
            })
            if(!exerciseExists){
                state.musclegroups.push(muscle)
                state.exercises.push(newExercise);
            }
        },
        addSet:(state,action)=>{ {/**Adds set to exercise */}
            state.exercises.forEach((exercise)=>{
                if(exercise.name === action.payload){
                    exercise.sets.push(
                        {
                            setNum:exercise.sets.length+1,
                            lbs:0,
                            reps:0
                        }
                    );
                }
            })
        },
        deleteSet:(state,action)=>{ {/**takes in exercise of the set num to be deleted.
        deletes that set and updates the set numbers of the sets after it */}
            const fields = action.payload.split(',');
            const findName = fields[0];
            const setNum = parseInt(fields[1]);
            state.exercises.forEach((exercise)=>{
                if(exercise.name === findName){
                    let isFound = false;
                    let isUpdated = false;
                    for(let i = 0 ; i < exercise.sets.length ; i++){
                        if(isFound){
                            exercise.sets[i].setNum--;
                        }
                        if(exercise.sets[i].setNum === setNum && isUpdated === false){
                            isFound = true;
                            isUpdated = true;
                            exercise.sets[i].setNum = -1;
                        }
                    }
                    exercise.sets = exercise.sets.filter(set=>set.setNum!==-1)
                }
            })
        },
        removeExercise:(state, action)=>{{/**updates the state to be without the exercise with a given name */}
            const newState = {
                title:state.title,
                date:state.date,
                duration:state.duration,
                musclegroups:state.musclegroups,
                notes:state.notes,
                exercises: state.exercises.filter(exercise=>exercise.name !== action.payload)
            }
            return newState;
        },
        updateLbs:(state,action)=>{{/**Whenever user updates the value of lbs in myworkout, it updates lbs in slice*/}
            //action.payload be 'name,set,new lbs'
            const name = action.payload.split(',')[0];
            const setNum = parseInt(action.payload.split(',')[1]);
            const newLbs = parseInt(action.payload.split(',')[2]);
            for(let i = 0 ; i < state.exercises.length; i++){
                if(state.exercises[i].name === name){
                    for(let j = 0 ; j < state.exercises[i].sets.length ; j++){
                        if(state.exercises[i].sets[j].setNum === setNum){
                            if(Number.isNaN(newLbs)){
                                state.exercises[i].sets[j].lbs = 0;
                            } else {
                                state.exercises[i].sets[j].lbs = newLbs;
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        },
        updateReps:(state,action)=>{ {/**Whenever user updates the value of reps in myworkout, it updates reps in slice*/}
            //action.payload be 'name,set,new lbs'
            const name = action.payload.split(',')[0];
            const setNum = parseInt(action.payload.split(',')[1]);
            const newReps = parseInt(action.payload.split(',')[2]);
            for(let i = 0 ; i < state.exercises.length; i++){
                if(state.exercises[i].name === name){
                    for(let j = 0 ; j < state.exercises[i].sets.length ; j++){
                        if(state.exercises[i].sets[j].setNum === setNum){
                            if(Number.isNaN(newReps)){
                                state.exercises[i].sets[j].reps = 0;
                            } else {
                                state.exercises[i].sets[j].reps = newReps;
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        },
        updateTitle:(state,action)=>{{/**Whenever user updates the title of workout in myworkout, it updates workout in slice*/}
            state.title = action.payload
        },
        updateDate:(state,action)=>{{/**Whenever user updates the date of workout in myworkout, it updates workout in slice*/}
            state.date = action.payload
        },
        updateDuration:(state,action)=>{{/**Whenever user updates the duration of workout in myworkout, it updates workout in slice*/}
            state.duration = action.payload
        },
        updateMusclegroups:(state,action)=>{{/**Whenever user adds exercise to workout in myworkout, it updates workout in slice*/}
            let contains = false;
            state.musclegroups.forEach(muscle=>{
                if(muscle === action.payload){
                    contains=true
                }
            })
            if(!contains){
                state.musclegroups.push(action.payload)
            }
        },
        updateNotes:(state,action)=>{{/**Whenever user updates the notes of workout in myworkout, it updates workout in slice*/}
            state.notes = action.payload
        },
        clearWorkout:(state,action)=>{ {/**Will reset the workout slice to be empty */}
            const cleanedWorkout = {
                title:'',
                date: new Date().toISOString().split("T")[0],
                duration:0,
                musclegroups:[],
                notes:'',
                exercises:[
                ]
            }
            return cleanedWorkout;
        },
        populateWorkout:(state,action)=>{ {/** Sets the slice state to be an already in progress workout*/}
            return {
                title:action.payload.title,
                date:action.payload.date,
                duration:action.payload.duration,
                musclegroups: action.payload.musclegroups,
                notes: action.payload.notes,
                exercises:action.payload.exercises
            }
        }
    }
});

export const {updateDate,updateDuration,updateMusclegroups,updateNotes, populateWorkout,clearWorkout,updateTitle,addExercise,addSet,deleteSet,removeExercise,updateLbs,updateReps} = workoutSlice.actions;
export default workoutSlice.reducer;