const OrderModel = require("../models/orderSchema.js")
const Productmodel = require("../models/productSchema.js")
const UserModel = require("../models/userSchema.js")

const createOrder = async function(req, res){
    let data = req.body;
    let uId = date.userId;
    let pId = data.productId;
    let freeAppUser = req.headers.isfreeappuser;
    console.log(freeAppUser);

    let user = await UserModel.findById(uId);
    let product = await Productmodel.findById(pId);

    if(data.hasOwnproperty( "userID") == false)
    {
        res.send({error: " userID is required"});
    }else if(!user){
        res.send({error: "wrong UserID entered"});
    }     


    if(data.hasOwnproperty( "productID") == false)
    {
        res.send({error: " productID is required"});
    }else if(!product){
        res.send({error: "wrong productID entered"});
    }     

    let productDetail = await ProductModel.findById(pId);
    console.log(productDetail);

    let priceValue = productDetail.price;
    console.log(priceValue);

    let userDetail = await UserModel.findById(uId);
    console.log(userDetail);

    let userBalance = userDetail.balance;
    console.log(userBalance);

    if (freeAppUser === "false"){
        if(userBalance>priceValue){
            let updateBalance = await UserModel.findByIdAndUpdate(
                {_id: uId},
                { $inc: { balance: -priceValue}},
                {new: true}
            );
            data.amount = priceValue;
            data.isFreeAppUser = false
            let orderDetails = await OrderModel.create(data);
            res.send({order: orderDetails});
        }else{
            req.send({error: "insufficient balance"});
        }
    }
        else{
                data.amount = 0;
                data.isFreeAppUser = true
                let orderDetails = await OrderModel.create(data);
                req.send({order: orderDetails});
        }};

        module.exports.createOrder = createOrder;

