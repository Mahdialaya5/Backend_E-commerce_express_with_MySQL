const connectiondb = require("../config/connectdb")

//get products
exports.getProducts=async (req,res) => {
    try {
        const products = await  connectiondb.query(`SELECT products.*, users.user_name
              FROM products
             JOIN users ON users.id = products.company_id;`) 
     res.send(products[0])
    } 
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: error.message });
        }}

//add product 
exports.addProduct= async(req, res) => {
   try {
    console.log(req.user[0]);
     const {id}=req.user[0]
     const {name,price} = req.body
       const datenow= new Date()
       const day = datenow.getDate();
       const month = datenow.getMonth() + 1; 
       const year = datenow.getFullYear();
     const date=`${day}-${month}-${year}`
      //upload photo
      const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
    const [result]=   await connectiondb.query(`INSERT INTO products (product_name,add_At,price,photo,company_id)
                                VALUES('${name}',"${date}",${price},"${url}",${id})`)
                                console.log(result);
            return res.status(201).json({ msg: "add successfully" });
} catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
}}
//updateProduct
exports.updateProduct=async (req,res) => {
    try {
        const {id}=req.user[0]
        const exist_user=await  connectiondb.query(`SELECT company_id FROM products WHERE id='${req.params.id}'`)
        console.log(exist_user[0][0].company_id);
     if (id==exist_user[0][0].company_id)
       { 
        const  result = await  connectiondb.query(`UPDATE products SET price='${req.body.price}' WHERE id='${req.params.id}'`)
        return  res.status(200).send(result)  
       }
     else {  return res.status(401).send({msg: "access denied"})}

    } 
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: error.message });
        }}

//deleteProduct
exports.deleteProduct=async (req,res) => {
    try {
        const {id}=req.user[0]
        const exist_user=await  connectiondb.query(`SELECT company_id FROM products WHERE id='${req.params.id}'`)
     if(id==exist_user[0][0].company_id){
        const  result = await  connectiondb.query(`DELETE from products  WHERE id='${req.params.id}'`) 
        return   res.status(200).send(result)}
     else 
         {return res.status(401).send({msg: "access denied"})}
     }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: error.message });
        }}