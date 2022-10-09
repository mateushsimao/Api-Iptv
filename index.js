const express = require('express');
const path = require('path');
const cors = require('cors');
var url = require('url');
var fs = require('fs');
const db = require('./mongoDb.js');

const appApi = express();

appApi.use(cors({
    origin: '*'
}));

appApi.use(express.json());
appApi.use(express.urlencoded({ extended: true }));

appApi.post('/api/v1/contacts', function(req, res){
    try{
        db.insertContacts(req.body);
        res.status(200).json({menssage : "ok"});
    }catch(e){
        res.status(400).json({menssage : "error"});
    }
});

appApi.get('/api/v1/contacts/find', async function(req, res){
    try{
        var infos = await db.findContacts();
        res.status(200).json(infos);
    }catch(e){
        res.status(400).json({menssage : "error"});
    }
});

appApi.get('/api/v1/user/find', async function(req, res){
    try{
        var infos = await db.findCountUsers();
        res.status(200).json(infos);
    }catch(e){
        res.status(400).json({menssage : "error"});
    }
});
appApi.get('/api/v1/channels/find', async function(req, res){
    try{
        var infos = await db.findCountChannel();
        res.status(200).json(infos);
    }catch(e){
        res.status(400).json({menssage : "error"});
    }
});
appApi.get('/api/v1/channels/find/names', async function(req, res){
    try{
        var infos = await db.findNameChannel();
        res.status(200).json(infos);
    }catch(e){
        res.status(400).json({menssage : "error"});
    }
});





appApi.get('/api/v1/channels', async function(req, res) { 
    try{
        var infos = await db.findChannels();
        res.status(200).send(infos);
    
    }catch(e){
        console.log(e);
        res.status(400).json({message: "error"});
    }

});

appApi.listen(30001, () => {
    console.log('Server api started on port 30001');
});