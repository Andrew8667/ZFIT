import { createSlice } from '@reduxjs/toolkit';
import {useState} from 'react'

const initialState=[
];

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
            state.forEach((exercise)=>{
                if(exercise.name === action.payload){
                    exerciseExists = true;
                }
            })
            if(!exerciseExists){
                state.push(newExercise);
            }
        },
        addSet:(state,action)=>{
            state.forEach((exercise)=>{
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
            state.forEach((exercise)=>{
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
            return state.filter(exercise=>exercise.name !== action.payload);
        },
        findLbs:(state,action)=>{
            //action.payload contains name,set
        },
        updateLbs:(state,action)=>{
            //action.payload be 'name,set,new lbs'
            const name = action.payload.split(',')[0];
            const setNum = parseInt(action.payload.split(',')[1]);
            const newLbs = parseInt(action.payload.split(',')[2]);
            for(let i = 0 ; i < state.length; i++){
                if(state[i].name === name){
                    for(let j = 0 ; j < state[i].sets.length ; j++){
                        if(state[i].sets[j].setNum === setNum){
                            if(Number.isNaN(newLbs)){
                                state[i].sets[j].lbs = 0;
                            } else {
                                state[i].sets[j].lbs = newLbs;
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        },
        updateReps:(state,action)=>{
            //action.payload be 'name,set'
        }
    }
});

export const {addExercise,addSet,deleteSet,removeExercise,updateLbs,updateReps} = workoutSlice.actions;
export default workoutSlice.reducer;