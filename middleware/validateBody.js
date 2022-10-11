/**
 * middleware logic to perform checks for new users signup
 */

validateBody = (req,res,next)=>{
    if(!req.body.first_name){
        return res.status(400).send({
            message : "Please provide first name"
        })
    }

    if(!req.body.last_name){
        return res.status(400).send({
            message : "Please provide last name"
        })
    }

    if(!req.body.email){
        return res.status(400).send({
            message : "Please provide email"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Please provide password"
        })
    }

    if(!req.body.phone_number){
        return res.status(400).send({
            message : "Please provide phone number"
        })
    }

    if(!req.body.phone_number.length == 10){
        return res.status(400).send({
            message : "Invalid contact number!"
        })
    }

    if(req.body.phone_number.length == 10){
        let val = req.body.phone_number;
        let isnum =  /^\d+$/.test(val);
        if(!isnum){
            return res.status(400).send({
                message : "Please provide only digits for phone number"
            })
        }        
    }

    if(req.body.email){
        let email = req.body.email;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!filter.test(email)){
            return res.status(400).send({
                message : "Invalid email-id format!"
            })
        }
    }

    const userObj = User.findOne({email: req.body.email});
    if(userObj){
        return res.status(400).send({
            message : "Try any other email, this email is already registered!"
        })
    }

    next();
}