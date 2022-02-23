const express = require('express');
const router = express.Router();

let players = [ 
    {
          
         "name": "manish",
         "dob": "1/1/1995",
         "gender":"male",
         "city": "jalandhar",
         "sports": [ " swimming"],
         "bookings": [ 

            {
                "bookingNumber":1,
                "sportsId":"",
                "centreId":"",
                "type":"private",
                "slot": "12345",
                "bookedOn":"31/08/2021",
                "bookedFor":" 01/09/2021"
            },
            {
                "bookingNumber":2,
                "sportsId":"",
                "centreId":"",
                "type":"private",
                "slot": "123456",
                "bookedOn":"31/08/2021",
                "bookedFor":" 03/09/2021"
            }

         ]
  },
 
 
  {
    "name": "Rajnish",
    "dob": "1/3/1998",
    "gender":"male",
    "city": "jalandhar",
    "sports": [ " swimming"],
    "bookings": [   ]

 },

  {

    "name": "sanchu",
    "dob": "1/2/1999",
    "gender":"male",
    "city": "jalandhar",
    "sports": [ " swimming"],
    "bookings": [  ]
 }
]
// Part 1 ==> Add new player.

router.post('/player',function(req,res){

let ele = req.body.players1.name;
let elem = req.body.players1
for (let i=0;i<players.length;i++){
if(ele === players[i].name ){
    console.log(ele)
    res.send("player already exists")
    
   
}
else if (i === players.length-1){

    players.push(elem)
    console.log(elem)
    res.send({data :players , status : true})  
 }
}
})

module.exports = router;
