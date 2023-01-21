const express = require('express');
const JWT = require("jsonwebtoken")
const argon2 = require("argon2")
const UserModel = require("../Models/UserModel")
const router = express.Router()

router.post('/signup', async (req, res)=> {
    const {name, email, password} = req.body;
    const hash = await argon2.hash(password)
    // console.log(req.body)
    const userexist = await UserModel.findOne({email})
    try {
        if (userexist) {
            return res.status(400).send({ message: "User already exist, Please enter different email" })
        }
        const newUser = await UserModel.create({name, email, password: hash })
        newUser.save()
        return res.status(201).send({ message: "User created successfully" })
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }

});


const REFRESHKEY = "REFRESH12"
const SECRETKEY = "MOCK12"
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
        if (await argon2.verify(user.password, password)) {
            const token = JWT.sign({ id: user._id, name: user.name }, SECRETKEY, { expiresIn: "7 days" });
            const refreshToken = JWT.sign({ id: user._id, name: user.name }, REFRESHKEY, { expiresIn: "28 days" })
            return res.status(200).send({ message: "Login successfully", token, refreshToken, email: user.email })
        }
    }
    return res.status(401).send("Invalid Credentials or User is not Registerd")

})

router.post('/logout', (req, res) => {
    const token = req.headers['authorization']
    try {
        return res.status(200).send({ message: "Logout Successfull" })
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
})


module.exports = router;