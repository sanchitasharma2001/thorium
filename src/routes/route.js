let obj = require('../logger/logger')
let help = require('../util/helper')
const express = require('express');
const router = express.Router();
const { chunk } = require('lodash')
const {tail} = require('lodash')
const lodash = require('lodash')
const {union} = require('lodash')
const {fromPairs} = require('lodash')


router.get('/test-me', function (req, res) {
    obj.printMessage('thorium')
    console.log(obj.url)
    res.send('Welcome to my application, I am Sanchita and a part of FunctionUp Thorium cohort')

});

router.get('/hello', function (req, res) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "July", "August", "September", "October", "November", "December" ]
    
    console.log(lodash.chunk(month, 4))
    res.send('Welcome to my application, I am Sanchita and a part of FunctionUp Thorium cohort')

});

router.get('/hello1', function (req, res) {
    let oddNumber = [1,3,5,7,9,11,13,15,17,19]
    console.log(lodash.tail(oddNumber))
    
    res.send('Welcome to my application, I am Sanchita and a part of FunctionUp Thorium cohort')

});

router.get('/hello3', function (req, res) {
    let movie =[["horror","The Shining"], ["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
    
    console.log(lodash.fromPairs(movie))
    res.send('Welcome to my application, I am Sanchita and a part of FunctionUp Thorium cohort')

});

router.get('/test-me1', function (req, res) {
    help.currentdate('thorium')
    console.log(help)
    res.send('Welcome to my application, I am Sanchita and a part of FunctionUp Thorium cohort')

});

module.exports = router;


