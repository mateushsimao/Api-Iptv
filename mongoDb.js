const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
module.exports = {


    async findChannels() {
        try {
            console.log(new Date()+" - Request find channel solicited")
            const database = client.db("tvDB");
            const db = database.collection("channels");
            const sort = { name: 1 };
            const result = await db.find().sort(sort).toArray();
            if(result){
                return result;
            }else{
                throw new Error('Error')
            }
        }catch (e){
            console.log(new Date()+" - "+e)
            throw new Error('Error');
        }
    },

    async insertContacts(json) {
        try {
            const database = client.db("tvDB");
            const db = database.collection("contacs");
            console.log(new Date()+" - Contact insert ok")
            var insert = db.insertOne(json);
        }catch (e){
            console.log(new Date()+" - "+e)
            throw new Error('Error');
        }
    },
    async findContacts() {
        try {
            const database = client.db("tvDB");
            const db = database.collection("contacs");
            console.log(new Date()+" - Contact metrics find")
            var ok = await db.count({answered:true});
            var not = await db.count({answered:false});
            return [["Task", "Contacts"],["answered" , ok],  ["pending", not]];

        }catch (e){
            console.log(new Date()+" - "+e)
            throw new Error('Error');
        }
    },
    async findCountUsers() {
        try {
            const database = client.db("tvDB");
            const db = database.collection("users");
            console.log(new Date()+" - user metrics find")
            var metrics = await db.countDocuments();
            return metrics;

        }catch (e){
            console.log(new Date()+" - "+e)
            throw new Error('Error');
        }
    },
    async findCountChannel() {
        try {
            const database = client.db("tvDB");
            const db = database.collection("channels");
            console.log(new Date()+" - channels metrics find")
            var metrics = await db.countDocuments();
            return metrics;
        }catch (e){
            console.log(new Date()+" - "+e)
            throw new Error('Error');
        }
    },
    async findNameChannel() {
        try {
            const database = client.db("tvDB");
            const db = database.collection("channels");
            console.log(new Date()+" - channels name find")
            const projection = { _id: 0, name: 1 };
            var result = await db.find().project(projection).toArray();
            var array = [];
            for(const key in result){
                array.push(result[key].name);
            }
            return array;
        }catch (e){
            console.log(new Date()+" - "+e)
            throw new Error('Error');
        }
    },
}