/**
 * need to validate if all the required elements are present or not
 */
exports.validateOrder = async (req,res,next)=>{

    if(!req.body.productId){
        return res.status(400).send({
            message : "Please enter Product ID"
        })
    }

    // if(!req.body.userId){
    //     return res.status(400).send({
    //         message : "Please enter User ID"
    //     })
    // }

    if(!req.body.addressId){
        return res.status(400).send({
            message : "Please enter Address ID"
        })
    }

    if(!req.body.quantity){
        return res.status(400).send({
            message : "Please enter the quantity"
        })
    }

    next();

}