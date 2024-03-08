const isAdmin = (req, res, next) => {
    if (req.user[0].role == "admin") {
        next()
    }
  else {  res.status(401).send({msg: "access denied"})}
}
module.exports=isAdmin