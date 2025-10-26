const errorHandler = (err, req,res,next) => {
    console.error(err.stack)
    res.status(300).json({error: err.message})
}

module.exports = {errorHandler}
