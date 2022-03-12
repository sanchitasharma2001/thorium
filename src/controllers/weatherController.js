let axios = require("axios")

let getWeather = async function (req, res) {
    try {
        let place= req.query.place
        let appid = req.query.appid
        console.log(`query params are: ${place} ${appid}`)
        var options = {
            method:'get',
            url: `http://api.openweathermap.org/data/2.5/weather?place=${place}&appid=${appid}`
        
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    
        
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



let getTemperature = async function (req,res){
    try{
    let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
    let id = req.query.id;
    console.log(id)
    let resultTemp = []
    for (let i = 0; i < cities.length; i++) {
    let option = {
            method:"get",
            url:`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${id}`
            
            }
        let result = await axios(option);
        let tempResult = result.data.main.temp;
        resultTemp.push(tempResult);

    } 
    let sortTemp = resultTemp.sort((a, b) => a - b);
    res.status(200).send(sortTemp);
 
} catch(err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
}

module.exports.getWeather =getWeather
module.exports.getTemperature =getTemperature 