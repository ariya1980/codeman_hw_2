const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const twitter = require('./routes/twitter')
const urlencodedParser = bodyParser.urlencoded({extended: true})
const methodOverride = require('method-override')

app.use(urlencodedParser)
app.use(methodOverride(function (req, res) {
  console.log(" @@@@@@@@@@@@@"  + req.body)
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method
    delete req.body._method
    console.log(" @@@@@@@@@@@@@" + method)
    return method
  }else{
    console.log(" @@@@@@@@@@@@@" )
  }
}))

app.set('views','./views')
app.set('view engine', 'pug' )
app.use(express.static('public'))
app.use('/twitter',twitter)

app.all('*',function(request, response) {
    console.log('other' )
    response.redirect('/twitter')
})

app.listen(3002)