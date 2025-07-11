import { createSlice } from '@reduxjs/toolkit';
import {useState} from 'react'

/**
 * Each workout starts out like this
 * exercises will contain a list of objects
 * these objects will have an exercise name and sets for that exercise
 * sets will contain a list of objecets containing set number, lbs, and reps
 */
const initialState={
    title:'test',
    exercises:[
        {
            name:"chest press",
            sets:[
                {
                    setNum:1,
                    lbs:0,
                    reps:0,
                },{
                    setNum:2,
                    lbs:0,
                    reps:0,
                },{
                    setNum:3,
                    lbs:0,
                    reps:0,
                },{
                    setNum:4,
                    lbs:0,
                    reps:0,
                },{
                    setNum:5,
                    lbs:0,
                    reps:0,
                }
            ]
        },,{
            name:"Squat",
            sets:[
                {
                    setNum:1,
                    lbs:0,
                    reps:0,
                },{
                    setNum:2,
                    lbs:0,
                    reps:0,
                },{
                    setNum:3,
                    lbs:0,
                    reps:0,
                },{
                    setNum:4,
                    lbs:0,
                    reps:0,
                },{
                    setNum:5,
                    lbs:0,
                    reps:0,
                }
            ]
        }
    ]
};

/**
 * Operates on info for the workout
 */
const workoutSlice = createSlice({
    name:'workout',
    initialState,
    reducers:{
    addExercise:(state,action)=>{ {/*adds an exercise with an empty set if the exercise doesn't exist*/}
            const newExercise = {
                name:action.payload,
                sets:[{
                    setNum:1,
                    lbs:0,
                    reps:0,
                }]
            };
            let exerciseExists = false;
            state.exercises.forEach((exercise)=>{
                if(exercise.name === action.payload){
                    exerciseExists = true;
                }
            })
            if(!exerciseExists){
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
        clearWorkout:(state,action)=>{ {/**Will reset the workout slice to be empty */}
            const cleanedWorkout = {
                title:'',
                exercises:[

                ]
            }
            return cleanedWorkout;
        },
        populateWorkout:(state,action)=>{ {/** Sets the slice state to be an already in progress workout*/}
            return {
                title:action.payload.title,
                exercises:action.payload.exercises
            }
        }
    }
});

export const {populateWorkout,clearWorkout,createWorkout,updateTitle,addExercise,addSet,deleteSet,removeExercise,updateLbs,updateReps} = workoutSlice.actions;
export default workoutSlice.reducer;