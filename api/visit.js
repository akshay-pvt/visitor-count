import clientPromise from "../lib/mongodb.js"

export default async function handler(req, res) {

res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
res.setHeader("Access-Control-Allow-Headers", "Content-Type")

if (req.method === "OPTIONS") {
return res.status(200).end()
}

try {

const site = req.query.site

if (!site) {
return res.status(400).json({
error: "site parameter required"
})
}

const client = await clientPromise
const db = client.db("counter")
const visits = db.collection("visits")

const today = new Date().toISOString().slice(0, 10)

let record = await visits.findOne({ site })

// Site does not exist
if (!record) {

const newRecord = {
site: site,
total: 1,
today: 1,
date: today
}

await visits.insertOne(newRecord)

return res.json(newRecord)

}

// New day → reset today counter
if (record.date !== today) {

await visits.updateOne(
{ site },
{
$set: {
today: 1,
date: today
},
$inc: {
total: 1
}
}
)

} else {

await visits.updateOne(
{ site },
{
$inc: {
total: 1,
today: 1
}
}
)

}

const updated = await visits.findOne({ site })

res.json({
site: updated.site,
total: updated.total,
today: updated.today
})

} catch (err) {

res.status(500).json({
error: "server error",
details: err.message
})

}

}
