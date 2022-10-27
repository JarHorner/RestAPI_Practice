const DB = require("./db.json")
const { saveToDatabase } = require("./utils")

const getAllWorkouts = (filterParams) => {
    try {
        let workouts = DB.workouts;
        if (filterParams.mode) {
            return workouts.filter((workout) => 
                workout.mode.toLowerCase().includes(filterParams.mode)
            )
        }
        if (filterParams.equipment) {
            return workouts.filter((workout) => 
                workout.equipment.find(element => element.toLowerCase().includes(filterParams.equipment))
            )
        }
        if (filterParams.length) {
            return workouts.sort(function (a, b) {
                return a.name.localeCompare(b.name)
            }).slice(0,filterParams.length)
        }
        //other if statements go here for different parameters
        return DB.workouts
    } catch (error) {
        throw { status: 500, message: error }
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            }
        }
        return workout
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout with the name '${newWorkout.name}' already exists`,
        }
    }
    try {
        DB.workouts.push(newWorkout)
        saveToDatabase(DB)
        return newWorkout
    } catch (error) {
        throw {status: 500, message: error?.message || error }
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        }
        DB.workouts[indexForUpdate] = updatedWorkout
        saveToDatabase(DB)
        return updatedWorkout
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDatabase(DB)
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = { 
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
 }