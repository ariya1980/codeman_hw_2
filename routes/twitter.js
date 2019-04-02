const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()
const currentUser = require('../models/currentUser')
const tweetModel = require('../models/tweetModel')

const urlencodedParser = bodyParser.urlencoded({extended: true})

router.get('/users/login',function(request,response){
    response.render('my/login')
})

router.post('/users/session',urlencodedParser,function(request,response){
    const { username } = request.body
    console.log("############# user : " +  username)
    currentUser.set(username)
    console.log("############# user : " +  currentUser.get())
    response.redirect(`/twitter/tweets`)
 })

router.get('/tweets',function(request,response){
    console.log("############# tweets : " )
    const user = currentUser.get()
    const tweets  = tweetModel.find(user)
    response.render('my/search',{tweets})
}).post('/tweets',urlencodedParser,function(request,response){
    console.log("############ New")
    const { tweetData } = request.body
    const user = currentUser.get()
    tweetModel.add(user,tweetData)
    response.redirect(`/twitter/tweets/${user}`)
})

router.post('/search',urlencodedParser,function(request,response){
    console.log("############search")
    const { q } = request.body
    console.log("############search : " + q)
    const tweets  = tweetModel.findTweet(q)
    if( typeof(tweets) !== undefined){
        console.log("############my search : " + JSON.stringify(tweets, null, 4))
        response.render('my/search',{tweets})
    }else{
        response.redirect('/twitter/tweets') 
    }
 })

router.get('/tweets/:id/:index',function(request,response){
    const { id , index } = request.params
    console.log("############# tweets by id : "  + id)
    const tweets  = tweetModel.findOne(id,index)
    response.render('my/show',{tweets})
})

router.get('/tweets/:id',function(request,response){
    const { id , index } = request.params
    console.log("############# tweets by id : "  + id)
    const tweets  = tweetModel.find(id)
    response.render('my/show',{tweets})
})

router.get('/tweets/check/:id/:index',function(request,response){
    console.log("CHECK ############# ")
    const { id,index } = request.params
    console.log("CHECK ############# tweets by id : "  + id)
    console.log("CHECK ############# tweets by index : "  + index)
    const user = currentUser.get()
    if(user === id){
        //page edit
        response.redirect(`/twitter/tweets/${id}/${index}/edit`) 
    }else{
        //page show
        response.redirect(`/twitter/tweets/${id}`) 
    }
})

router.get('/new',function(request,response){
   response.render('my/new')
})

router.get('/tweets/:id/:index/edit',function(request,response){
    //edit  tweets
    const { id, index } = request.params
    const tweets  = tweetModel.findOne(id,index)
    response.render('my/edit',{tweets,id,index})
})

router.put('/tweets/:id/:index',urlencodedParser,function(request,response){
    console.log("PUT ############# ")
    const { id, index } = request.params
    const { tweetEdit } = request.body
    tweetModel.edit(id,index,tweetEdit)
    response.redirect(`/twitter//tweets/${id}/${index}/edit`) 
})

router.delete('/tweets/:id/:index',urlencodedParser,function(request,response){
    console.log("DELETE ############# ")
    const { id, index } = request.params
    tweetModel.delete(id,index)
    response.redirect(`/twitter/tweets/${id}`) 
})

module.exports = router