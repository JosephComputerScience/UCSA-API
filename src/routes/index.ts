// external imports
import Router from 'express-promise-router';
import { get } from '../services/lol'
export const v1Router = Router();


v1Router.route("/").get((req, res) => { return res.status(200).json({hi: "hello"})})