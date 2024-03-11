const connectiondb = require("../config/connectdb")
//order 
exports.newOrder= async(req, res) => {
    try {
        console.log(req.user[0]);
      
     const [result1]=   await connectiondb.query(`INSERT INTO orders (adress,user_id)
         VALUES ("${req.body.adress}","${req.user[0].id}");
     `)
     console.log(req.body.products);
     for (let index = 0; index < req.body.products.length; index++) {
        const el = req.body.products[index];
        const [result2]= await   connectiondb.query(`INSERT INTO order_details (product,user_id)
         VALUES ("${el}","${req.user[0].id}");
`)  
     }
    
        return res.status(201).json({ msg: "success" });
 } catch (error) {
     console.log(error);
     res.status(400).send({ msg: error.message });
 }}