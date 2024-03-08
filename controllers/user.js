const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const connectiondb = require("../config/connectdb")

//register
exports.register= async(req, res) => {
    try {
    
      const { email, password, role,username } = req.body
   
      const existUser = await  connectiondb.query(`select * from users where email="${email}"`) 
  
     if (existUser[0][0]) {
            return res.status(400).send({ msg: "email exist, please login" })
              }
                 //upload photo
                const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
                // Hash the password before storing it
                const hashedPassword = await bcrypt.hash(password, 10);
         const [result]=   await connectiondb.query(`INSERT INTO users (email,password_user,user_name,role,photo)
                  VALUES('${email}',"${hashedPassword}","${username}","${role}","${url}")`)
            
             return res.status(201).json({ msg: "User registered successfully" });
}   
   catch (error) {
         console.log(error);
 }}
//login user 
exports.login = async(req, res) => {
    try{
        const { email, password } = req.body
        const existUser = await  connectiondb.query(`select * from users where email="${email}"`) 
      
        if (!existUser[0][0]) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        console.log(existUser[0]);
        const existpassword=existUser[0][0].password_user
        const isMatched = await bcrypt.compare(password, existpassword)

        if (!isMatched) {
            return res.status(400).send({ msg: "badp credential !!" })
        }
        existUser[0][0].password_user=undefined
         const exist_id=existUser[0][0].id
         const payload = { id: exist_id }
         const token = jwt.sign(payload, process.env.secretKey)
      res.send({ user: existUser[0][0], token })
    } catch (error) {
    console.log(error);
    }}
// get current user ==>private
exports.verify= (req, res) => {
    try{
    res.send(req.user[0]);
} catch (error) {
    console.log(error);
    }
}
//userlist=>private for admin 
exports.getUser=async (req,res) => {
    try {
        const userlist = await  connectiondb.query(`select * from users order by user_name`) 
     res.send(userlist[0])
    } 
     catch (error) {
            console.log(error);
            res.status(400).send({ msg: error.message });
        }}
