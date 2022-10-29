const express = require("express")
const apicache = require("apicache")
const workoutController = require("../../controllers/workoutController")
const recordController = require("../../controllers/recordController")

const router = express.Router()
const cache = apicache.middleware

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *       - in: query
 *         name: equipment
 *         schema:
 *           type: string
 *         description: The equipment used in a workout
 *       - in: query
 *         name: length
 *         schema:
 *           type: int
 *         description: The length of workouts shown
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorts workouts by 2 different criteria "createdAt" and "updatedAt" in descending order
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get("/", cache("2 minutes"), workoutController.getAllWorkouts)

/**
 * @openapi
 * /api/v1/workouts/{workoutID}:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: workoutID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get("/:workoutId", workoutController.getOneWorkout)

/**
 * @openapi
 * /api/v1/workouts/{workoutID}/record:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: workoutID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get("/:workoutId/record", recordController.getRecordForWorkout)

/**
 * @openapi
 * /api/v1/workouts:
 *   post:
 *     tags:
 *       - Workouts
 *     requestBody:
 *      description: A JSON format workout
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/Workout"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.post("/", workoutController.createNewWorkout)

/**
 * @openapi
 * /api/v1/workouts/{workoutID}:
 *   patch:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: workoutID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout
 *     requestBody:
 *      description: A JSON format workout
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/Workout"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.patch("/:workoutId", workoutController.updateOneWorkout)

/**
 * @openapi
 * /api/v1/workouts/{workoutID}:
 *   delete:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: workoutID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout
 *     requestBody:
 *      description: A JSON format workout
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/Workout"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.delete("/:workoutId", workoutController.deleteOneWorkout)

module.exports = router