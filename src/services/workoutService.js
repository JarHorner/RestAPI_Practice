const { v4: uuid } = require("uuid");
const Workout = require("../database/Workout");

const getAllWorkouts = () => {
    const allWorkouts = Workout.getAllWorkouts();
    return allWorkouts;
  };
  
  const getOneWorkout = (workoutId) => {
    const oneWorkout = Workout.getOneWorkout(workoutId)
    return oneWorkout;
  };
  
  const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        id: uuid(),
        ...newWorkout,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }
    const createdWorkout = Workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
  };
  
  const updateOneWorkout = (workoutId, changes) => {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes)
    return updatedWorkout;
  };
  
  const deleteOneWorkout = (workoutId) => {
    Workout.deleteOneWorkout(workoutId)
  };
  
  module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };