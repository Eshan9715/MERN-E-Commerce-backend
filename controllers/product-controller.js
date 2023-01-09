import Product from '../models/Product.js'


export const addProduct = async(req,res)=>{
    const newProduct = new Product(req.body);
    try{
        const saveProduct = await newProduct.save();
        return res.status(200).json(saveProduct);
    }
    catch(err){
        res.status(500).json(err);

    }
}

export const updateProduct = async(req,res)=>{
    try{
        const upProduct = await Product.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {new: true});
            res.status(200).json(upProduct);

    }catch(err){
        res.status(500).json(err);

    }
}


export const deleteProduct = async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product has been deleted");
    } catch(err){
        res.status(500).json(err);

    }
}

export const getProduct = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch(err){
        res.status(500).json(err);

    }
}

export const getAllProducts = async(req,res)=>{
    const queryNew = req.query.new;
    const queryCato = req.query.category;

    try{
        let products;
        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }else if(queryCato){
            products = await Product.find({categories:{
                $in: [queryCato],
            },
        });
        }else{
            products = await Product.find();
        }
      
        res.status(200).json(products)
    } catch(err){
        res.status(500).json(err);

    }
}
