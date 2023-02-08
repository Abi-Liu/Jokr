const Joke = require("../models/Joke");
const User = require('../models/User')

module.exports = {
    getJokes: async(req, res) => {
        try{
            const jokes = await Joke.find()
                .sort({likes: 'desc'})
            const users = await User.find()
            res.render('jokes.ejs', {jokes: jokes, users: users})
        }
        catch (err){
            console.error(err)
        }
    },
    getUserJokes: async (req, res)=>{
        try{
            const jokes = await Joke.find({userId: req.user.id})
                .sort({likes: 'desc'})
            console.log(jokes)
            res.render('userJokes.ejs', {jokes: jokes, user: req.user})
        } catch (err){
            console.error(err)
        }
    },
    createJoke: async (req,res) => {
        try{
            req.body.userId = req.user.id
            req.body.likes = 0
            req.body.dislikes = 0
            await Joke.create(req.body)
            console.log('joke created')
            res.redirect('/jokes/user')
        }
         catch (err){
            console.error(err)
        }
    },
    like: async (req, res) => {
        try{
            await Joke.findOneAndUpdate({_id: req.body.id}, {
                $inc: {
                    'likes': 1
                }
            })
            console.log('like added')
            res.json('like added')
        } catch(err){
            console.error(err)
        }
    },
    dislike: async (req, res) => {
        try{
            await Joke.findOneAndUpdate({_id: req.body.id}, {
                $inc: {
                    'dislikes': 1
                }
            })
            console.log('dislike added')
            res.json('dislike added')
        } catch(err){
            console.error(err)
        }
    },
   deleteJoke: async (req, res)=>{
        try{ 
            console.log(req.body)
            await Joke.findOneAndDelete({_id: req.body.id})
            console.log('deleted')
            res.json('deleted')
        }catch(err){
            console.error(err)
        }
   }
}