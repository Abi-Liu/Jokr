const Joke = require("../models/Joke");
const User = require('../models/User')

module.exports = {
    getJokes: async(req, res) => {
        try{
            const jokes = await Joke.find()
                // .sort({likes: 'desc'})
            const users = await User.find()
            console.log(req.user.id)
            res.render('jokes.ejs', {jokes: jokes, users: users, loggedUser: req.user.id})
        }
        catch (err){
            console.error(err)
        }
    },
    getUserJokes: async (req, res)=>{
        try{
            const jokes = await Joke.find({userId: req.user.id})
                // .sort({likes: 'desc'})
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
            req.body.likesArr = []
            req.body.dislikesArr = []
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
            const user = req.user.id
            const joke = await Joke.find({_id: req.body.id})
            if(!joke[0].likesArr.includes(user)){
                await Joke.findOneAndUpdate({_id: req.body.id}, {
                    $inc: {
                        'likes': 1
                    },
                    $push: {
                        'likesArr': user
                    }
                })
                console.log('like added')
                res.json('like added')
            }
            console.log('user already liked')
            res.json('user already liked')

        } catch(err){
            console.error(err)
        }
    },
    removeLike: async(req, res) => {
        try{
            const user = req.user.id
            const joke = await Joke.find({_id: req.body.id})
            if(joke[0].likesArr.includes(user)){
                await Joke.findOneAndUpdate({_id: req.body.id}, {
                    $inc: {
                        'likes': -1
                    },
                    $pull: {
                        'likesArr': user
                    }
                })
                console.log('like added')
                res.json('like added')
            }
            console.log('user already liked')
            res.json('user already liked')
        } catch(err){
            console.error(err)
        }
    },
    dislike: async (req, res) => {
        try{
            const user = req.user.id
            const joke = await Joke.find({_id: req.body.id})
            if (!joke[0].dislikesArr.includes(user)) {
              await Joke.findOneAndUpdate({ _id: req.body.id },
                {
                  $inc: {
                    dislikes: 1,
                  },
                  $push: {
                    dislikesArr: user
                  }
                })
              console.log('dislike added')
              res.json('dislike added')
            }
            console.log('user already disliked')
            res.json('user already disliked')

        } catch(err){
            console.error(err)
        }
    },
    removeDislike: async(req, res) => {
        try{
            const user = req.user.id
            const joke = await Joke.find({_id: req.body.id})
            if(joke[0].dislikesArr.includes(user)){
                await Joke.findOneAndUpdate({_id: req.body.id}, {
                    $inc: {
                        'dislikes': -1
                    },
                    $pull: {
                        'dislikesArr': user
                    }
                })
                console.log('dislike removed')
                res.json('dislike removed')
            }
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