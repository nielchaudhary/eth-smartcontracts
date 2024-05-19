"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let balances = {};
let allowances = {};
app.post('/create', (req, res) => {
    const { userId, initialBalance } = req.body;
    if (balances[userId]) {
        return res.send("Error : User already exists");
    }
    balances[userId] = initialBalance;
    res.send(`Account for ${userId} created with balance : ${initialBalance}`);
    console.log(balances);
});
app.post('/transfer', (req, res) => {
    const { fromUser, toUser, amount } = req.body;
    if (!balances[fromUser || !balances[toUser]]) {
        return res.status(404).send("User doesn't exist");
    }
    if (balances[fromUser] < amount) {
        return res.status(408).send("Insufficient funds");
    }
    balances[fromUser] -= amount;
    balances[toUser] += amount;
    res.send(`Sent amount : ${amount} from ${fromUser} to ${toUser}`);
    console.log(balances);
});
app.get('/balances', (req, res) => {
    const { userId } = req.body;
    if (!balances[userId]) {
        return res.send("User doesn't exist");
    }
    const balance = balances[userId];
    res.send(`${userId} has ${balance} in their account.`);
});
app.post('/approve', (req, res) => {
    const { ownerId, spenderId, amount } = req.body;
    if (!balances[ownerId]) {
        return res.send("User does not exist");
    }
    if (!allowances[ownerId]) {
        allowances[ownerId] = {};
    }
    allowances[ownerId][spenderId] = amount;
    return res.status(200).send(`${ownerId} has allowed ${spenderId} to spend ${amount}`);
});
app.post('/transferFrom', (req, res) => {
    const { fromUserId, toUserId, spenderId, amount } = req.body;
    if (!balances[fromUserId] || !balances[toUserId]) {
        return res.status(400).send("User does not exist");
    }
    const allowedAmount = allowances[fromUserId] && allowances[fromUserId][spenderId];
    if (!allowedAmount || allowedAmount < amount) {
        return res.send("Insufficient allowance");
    }
    if (balances[fromUserId] < amount) {
        return res.send("Insufficient funds");
    }
    balances[fromUserId] -= amount;
    balances[toUserId] += amount;
    allowances[fromUserId][spenderId] -= amount;
    return res.status(200).send(`Successfully sent ${amount} token from ${fromUserId} to ${toUserId} via ${spenderId}`);
});
app.listen(3000);
