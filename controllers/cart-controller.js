import Cart from '../models/Cart.js'


export const addCart = async(req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    }
    catch(err){
        res.status(500).json(err);

    }
}

export const updateCart = async(req,res)=>{
    try{
        const upCart = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {new: true});
            res.status(200).json(upCart);

    }catch(err){
        res.status(500).json(err);

    }
}


export const deleteCart = async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted");
    } catch(err){
        res.status(500).json(err);

    }
}

export const getCart = async(req,res)=>{
    try{
        const cart = await Cart.find({userID: req.params.userID});
        res.status(200).json(cart)
    } catch(err){
        res.status(500).json(err);

    }
}

export const getAllCarts = async(req,res)=>{
   
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch(err){
        res.status(500).json(err);

    }
}
