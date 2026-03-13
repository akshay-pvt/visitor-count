import fs from "fs"

export default function handler(req, res) {

const key = req.query.site

if(!key){
return res.status(400).json({
error:"site parameter required"
})
}

let data={}

if(fs.existsSync("data.json")){
data=JSON.parse(fs.readFileSync("data.json"))
}

if(!data[key]){

data[key]={
total:0,
today:0,
date:new Date().toISOString().slice(0,10)
}

}

let today=new Date().toISOString().slice(0,10)

if(data[key].date!==today){

data[key].today=0
data[key].date=today

}

data[key].total++
data[key].today++

fs.writeFileSync("data.json",JSON.stringify(data,null,2))

res.json({
site:key,
total:data[key].total,
today:data[key].today
})

}
