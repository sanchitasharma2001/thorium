function currentdate() {
    const date = new Date().toLocaleDateString()
    const month = new Date().getMonth()+1
    const batch = new Date().getDay()
    // const week = new Date()
    console.log(`${date} Day${batch}, The topic for today is Nodejs module system`)

    console.log("Current Date" + " "+ date)
    console.log(month)
}
currentdate() 

module.exports.currentdate = currentdate;