
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


app.post('/transfer', (req:Request, res:Response)=>{
    const {sender, receiver, amount} = req.body;
    if(!balances[sender || !balances[receiver]]){
        return res.status(404).send("User doesn't exist")
    }

    if(balances[sender] < amount){
        return res.status(408).send("Insufficient funds")
    }

    balances[sender] -= amount;
    balances[receiver] += amount;

    res.send(`Sent amount : ${amount} from ${sender} to ${receiver}`)
    console.log(balances)


})

app.post('/approve', (req:Request, res:Response)=>{
    const {ownerId, wallet, amount} = req.body;
    if(!balances[ownerId]){
        return res.send("User does not exist")
    }

    if(!allowances[ownerId]){
        allowances[ownerId] = {};
    }
    allowances[ownerId][wallet] = amount;
    return res.status(200).send(`${ownerId} has allowed ${wallet} to spend ${amount}`)
})


app.listen(3000)