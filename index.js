import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import axios from 'axios'

const app = express();
const port = 3000;

app.use(express.static('public'))

let ispost=false;

var happy="yay";
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

    console.log(Ci_n)
    console.log(Co_n)
try{
 const response=await axios.get("http://api.aladhan.com/v1/timingsByCity?city=Dubai&country=United Arab Emirates&method=2")
const result=response.data

}
catch(error){

}

res.render("index.ejs",{
    isPress:ispost
})

})

app.listen(port,()=>{
    console.log(`port running at port ${port}`)
})

// hello






