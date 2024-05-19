
import express from 'express'
import { Request, Response } from 'express';
const app = express();

app.use(express.json())

type Address = string;

let balances : {[address : Address] : number} = {}; 

let allowances : {
    [address:Address] : {
        [address : Address] : number
    }
} = {};


app.post('/create', (req:Request, res:Response)=>{
    const {userId, initialBalance} = req.body;
    if(balances[userId]){
        return res.send("Error : User already exists")
    }

    balances[userId] = initialBalance;
    res.send(`Account for ${userId} created with balance : ${initialBalance}`)
    console.log(balances)

})


app.get('/balance', (req:Request, res:Response)=>{
    const {userId} = req.body;
    if(!balances[userId]){
        return res.send("User doesn't exist")
    }

    const balance  = balances[userId];
    res.send(`${userId} has ${balance} in their account.`)
})



app.listen(3000)