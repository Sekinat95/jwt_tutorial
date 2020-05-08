require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: "sekinat",
        title: "post 1"
    },
    {
        username: "kyle",
        title: "post 2"
    }
]

//a simple route
app.get('/posts',authenticateToken ,(req, res) => {
   // res.json(posts)
    res.json(posts.filter(post => post.username===req.user.name))
})

//middleware to authenticate token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'] // has the format: Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1] //split bearer and token with a space. get token(second param)
   // Bearer TOKEN
   if(token==null) return res.sendStatus(401)

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       if(err) return res.sendStatus(403)

       req.user = user
       next()
   })
}

app.listen(3000)