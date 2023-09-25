const express = require("express")
const wol = require("./wol_service");
const { error } = require("console");
const fs = require('fs').promises;

let targetsListFile = "targets.json"
let targets = []
if (process.env.TARGETS_LIST) {
    targetsListFile = process.env.TARGETS_LIST
}
let validateTarget = (t) => {
    if(!t) return false
    if(!t.name) return false
    if(!t.target) return false
    if(typeof t.name !== "string") return false
    if(typeof t.target !== "string") return false
    return true
}
const app = express();
app.use(express.json())

async function readAFile(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        var jsonData
        try {
            jsonData = JSON.parse(data)
        } catch (parseError) {
            console.error('Error parsing JSON', parseError)
        }
        if (jsonData.targets === null) {
            targets = []
            return
        }

        if (jsonData.targets.map((t)=>validateTarget(t)).includes(false)) {
            console.error("Target Error: all targets mac address and target name must be string")
            targets = []
            return
        }

        targets = jsonData.targets
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

readAFile(targetsListFile);


app.post("/", (req, res) => {
    const tarName = req.body?.target;
    console.log(tarName)
    if (!tarName) {
        res.status(400).json({error: "no target given"})
    }
    console.log(targets.map((t) => t.name))
    if (!targets.map((t) => t.name).includes(tarName)) {
        res.status(404).json({error: "target not registered"})
    }

    // wake
    try {
        wol.wake_device(targets.find((t) => t.name === tarName).target)
    } catch (err){
        res.status(500).json({"error": "can't wake with the given MAC."})
    }
    res.status(200).json({"success": true})

})

//
app.listen(process.env.WOL_PORT)
