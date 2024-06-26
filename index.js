import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import axios from 'axios'

const app = express();
const port = 3002;

app.use(express.static('public'))

let ispost=false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    ispost=false
    res.render("index.ejs",{
        isPress:ispost
    })
})


app.post("/city",async (req,res)=>{
    ispost=true;
    var Ci_n=req.body["Ci_name"]
    var Co_n=req.body["Co_name"]

    console.log("Your city name is "+Ci_n)

try{
 const response=await axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${Ci_n}&country=${Co_n}&method=2`)
var timings=response.data.data.timings

//converting the times to a 12 hour clock
function timeConverter(req,res,next,timings){
    var asr;
   var maghrib;
   var isha;

var asr1=Number(timings.Asr.slice(0,2))
var maghrib1=Number(timings.Maghrib.slice(0,2))
var  isha1=Number(timings.Maghrib.slice(0,2))

if(asr1>12){
  asr=("0"+(Number(timings.Asr.slice(0,2))-12))+timings.Asr.slice(2,5);
}
else{
    asr=timings.Asr;
}
if(maghrib1>12){
    maghrib=("0"+(Number(timings.Maghrib.slice(0,2))-12))+timings.Maghrib.slice(2,5);
}
else{
    maghrib=timings.Maghrib;
}
if(isha1>12){
    isha=("0"+(Number(timings.Isha.slice(0,2))-12))+timings.Isha.slice(2,5);
}
else{
    isha=timings.Maghrib;
}
return{
  asr: asr,
  maghrib: maghrib,
  isha :isha  
}

}

//saving the output of 12 hour format in a var for easier refrence
var asr12=timeConverter(req, res, null, timings).asr;
var maghrib12=timeConverter(req, res, null, timings).maghrib
var isha12=timeConverter(req, res, null, timings).isha

res.render("index.ejs",{
    isPress:ispost,
    Fajr:timings.Fajr,
    Dhuhr:timings.Dhuhr,
    Asr:asr12,
    Maghrib:maghrib12,
    Isha:isha12
})
}

catch(error){
    console.log("Woops sorry we did not get  the expected result...")
}

})

app.listen(port,()=>{
    console.log(`port running at port ${port}`)
})








