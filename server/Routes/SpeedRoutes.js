import express from "express";
import { saveSpeed } from "../Controllers/SpeedControllers.js";

const SpeedRoutes = express.Router();

SpeedRoutes.post("/saveSpeed", saveSpeed);

export default SpeedRoutes;
