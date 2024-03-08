const isCompany = (req, res, next) => {
    if (req.user[0].role == "company") {
        next()
    }
  else {  res.status(401).send({msg: "access denied"})}
}
module.exports=isCompany