import { createSlice } from '@reduxjs/toolkit';
import {useState} from 'react'

const initialState={
    title:'',
    exercises:[
    ]
};

const workoutSlice = createSlice({
    name:'workout',
    initialState,
    reducers:{
        addExercise:(state,action)=>{
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
        addSet:(state,action)=>{
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
        deleteSet:(state,action)=>{
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
        removeExercise:(state, action)=>{
            const newState = {
                title:state.title,
                exercises: state.exercises.filter(exercise=>exercise.name !== action.payload)
            }
            return newState;
        },
        updateLbs:(state,action)=>{
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
        updateReps:(state,action)=>{
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
        updateTitle:(state,action)=>{
            state.title = action.payload
        },
        clearWorkout:(state,action)=>{
            const cleanedWorkout = {
                title:'',
                exercises:[

                ]
            }
            return cleanedWorkout;
        },
        populateWorkout:(state,action)=>{
            return {
                title:action.payload.title,
                exercises:action.payload.exercises
            }
        }
    }
});

export const {populateWorkout,clearWorkout,createWorkout,updateTitle,addExercise,addSet,deleteSet,removeExercise,updateLbs,updateReps} = workoutSlice.actions;
export default workoutSlice.reducer;