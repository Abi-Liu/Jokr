const express = require("express");
const router = express.Router();
const jokesController = require("../controllers/jokes");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, jokesController.getJokes);

router.get('/user', jokesController.getUserJokes)

router.post("/createJoke", jokesController.createJoke);

router.put("/like", jokesController.like);

router.put("/removeLike", jokesController.removeLike);

router.put("/dislike", jokesController.dislike);

router.put("/removeDislike", jokesController.removeDislike);

router.delete("/deleteJoke", jokesController.deleteJoke);

module.exports = router;
