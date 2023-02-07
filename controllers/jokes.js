const Joke = require("../models/Joke");

module.exports = {
    getJokes: async(req, res) => {
        try{
            const jokes = await Joke.find()
            res.render('jokes.ejs', {jokes: jokes})
        }
        catch (err){
            console.error(err)
        }
    },
    getUserJokes: async (req, res)=>{
        try{
            const jokes = await Joke.find({userId: req.user.id})
                .populate('user')

            res.render('userJokes.ejs', {jokes: jokes})
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
            res.redirect('/jokes')
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
            await Joke.findOneAndDelete({_id: req.body.id})
            console.log('deleted')
            res.json('deleted')
        }catch(err){

        }
   }
}