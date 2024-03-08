const connectiondb = require("../config/connectdb")
//order 
exports.newOrder= async(req, res) => {
    try {
        console.log(req.user[0]);
      
     const [result]=   await connectiondb.query(`INSERT INTO orders (adress,user_id)
     VALUES ("${req.body.adress}","${req.user[0].id}");
     `)
     
                                 console.log(result);
             return res.status(201).json({ msg: "success" });
 } catch (error) {
     console.log(error);
     res.status(400).send({ msg: error.message });
 }}