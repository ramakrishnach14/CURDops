
//simple app for curd operations in mongodb


const express = require("express");
const mongoDb = require("mongodb");
const cors = require("cors");
const env = require("dotenv").config();

const app = express();
const mongoClient = mongoDb.MongoClient;
const objectId = mongoDb.ObjectID;
const port = process.env.port || 3000;
app.use(express.json());
app.use(cors());

const dbUrl= process.env.DB_URL || "mongodb://127.0.0.1:27017";
console.log(dbUrl);
const dbName="UserData"
const coll = "users"


//for getting all records
app.get("/", async function(req,res){
	try{
			let client =  await mongoClient.connect(dbUrl,{ useUnifiedTopology: true });
			let db = client.db(dbName);
			let result =  await db.collection("users").find().toArray();
			res.status(200).json({result});
			client.close();
		}catch(error){
			console.log(error);
			res.sendStatus(500);
		}
					 
});

//for getting specific record
app.get("/getUser/:id",async (req,res)=>{

	try{
			let client = await mongoClient.connect(dbUrl,{ useUnifiedTopology: true });
			let db = client.db(dbName);
			let result = await db.collection(coll).findOne({_id:objectId(req.params.id)});
			res.status(200).json({result});
			client.close();


	}catch(error){
		console.log(error);
		res.sendStatus(500);
	}

});

//for adding record
app.post("/addUser",async (req,res)=>{
	try{
		let client = await mongoClient.connect(dbUrl,{useUnifiedTopology: true});
		let db = client.db(dbName);
		let result = await db.collection(coll).insertOne(req.body);
		res.status(200).json({result});
		client.close();
	}catch(error){
		console.log(error);
		res.sendStatus(500);
	}
});

//for updating specific record
app.put("/updateUser/:id",async (req,res)=>{
	try{
		let client = await mongoClient.connect(dbUrl,{useUnifiedTopology:true});
		let db = client.db(dbName);
		let result = await db.collection(coll).findOneAndUpdate({_id:objectId(req.params.id)},{$set: req.body});
		res.status(200).json({message:"user updated"});
		client.close();
	}catch(error){
		console.log(error);
		res.sendStatus(500);
	}
})

//for deleting specific record
app.delete("/deleteUser/:id",async (req,res)=>{
	try{
		let client = await mongoClient.connect(dbUrl,{useUnifiedTopology:true});
		let db = client.db(dbName);
		let result = await db.collection(coll).deleteOne({_id:objectId(req.params.id)});
		res.status(200).json({message:"user deleted"});
		client.close();
	}catch(error){
		console.log(error);
		res.sendStatus(500);
	}
})



app.listen(port,function(){
	console.log("server is listening at port "+port);
});


