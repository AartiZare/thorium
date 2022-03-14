let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
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

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
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



// let getByDistrict = async function(req, res){

// try {
//     let districtid = req.query.district_id
//     let date = req.query.date
//     let options = {
//         method: "get",
//         url: `https://cdn-api.co-vin.in/api/v2/appoinment/sessions/public/findByDistricts?district_id=${districtid}&date=${date}`
//     }
//     let result = await axios(options)
//     console.log(result.data)
//     res.status(200).send({ msg: result.data })
// }
// catch (err) {
//     console.log(err)
//     res.status(500).send({ msg: err.message })
// }
// }


let getCitiesSortedByTemp = async function (req, res){
    try{
        let cities = ["Bengaluru","Mumbai", "Delhi", "Akola", "Chennai", "London", "Moscow"]
        let newSortedCities = []
        for(let i=0;i<cities.length;i++){
            let city1 = {city: cities[i]}
        
        var options = {
            method : "get",
            url : `https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=bbece151db69c9097279bc35cebae6dc`,
        }
        let result = await axios(options)
        console.log(result.data.main.temp)
        city1.temp= result.data.main.temp
        newSortedCities.push(city1)
    }
        let sorted = newSortedCities.sort( function(a, b){return a.temp - b.temp})
        console.log(sorted)
        res.status(200).send({status: true, data:sorted})

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}




// let getCities = async function(req, res){
//     try{
//         let cityNames = ["Akola","benglore","pune","hydrabad","Mumbai","London"]
//         let cityArr = [ ]
//         for(i=0; i<cityNames.length; i++){
//             let obj = {city: cityNames[i] }
//             let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityNames[i]}&appid=f8822001d957adc2071b44acf083e8e3}`)
//             console.log(res.data.main.temp)
            
//             obj.temp = res.data.main.temp
//             cityArr.push(obj)
//         }

//         let sortedCity = cityArr.sort(function(a,b)
//         {
//             return a.temp - b.temp
//         })
//         console.log(sortedCity)
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).send({status: false, msg: "server error"})
//     }
// }




let memeHandler = async function(req, res)
{
    try{
        let options= {
            method: "post",
            url: "https://api.imgflip.com/caption_image?template_id=181913649&text0=Functionup_is_Cool&text1=Yesss&username=chewie12345&password=meme@123"

            
        }
        let result = await axios(options)
        res.send({data: result.data})
    }
    catch(error){
        console.log(error)
        res.status(500).send({status: false, msg: "server error"})
    }
}





let getSessionByDistrict = async function (req, res) {
    try {
        let district_id  = req.query.district_id
        let date = req.query.date

        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp

module.exports.getSessionByDistrict = getSessionByDistrict


//module.exports.getByDistrict = getByDistrict
//module.exports.getCities = getCities

module.exports.getCitiesSortedByTemp = getCitiesSortedByTemp

module.exports.memeHandler = memeHandler