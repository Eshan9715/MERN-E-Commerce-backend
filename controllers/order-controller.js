import Order from '../models/Order.js'


export const addOrder = async(req,res)=>{
    const newOrder = new Order(req.body);
    try{
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    }
    catch(err){
        res.status(500).json(err);

    }
}

export const updateOrder = async(req,res)=>{
    try{
        const upOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {new: true});
            res.status(200).json(upOrder);

    }catch(err){
        res.status(500).json(err);

    }
}


export const deleteOrder = async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted");
    } catch(err){
        res.status(500).json(err);

    }
}

export const getOrder = async(req,res)=>{
    try{
        const Order = await Order.find({userID: req.params.userID});
        res.status(200).json(Order)
    } catch(err){
        res.status(500).json(err);

    }
}

export const getAllOrders = async(req,res)=>{
   
    try{
        const Orders = await Order.find()
        res.status(200).json(Orders)
    } catch(err){
        res.status(500).json(err);

    }
}

export const getMonIncome = async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
        const income = await Order.aggregate([
            { 
                $match: {
                    createdAt: {
                        $gte: previousMonth
                    }
                }
            },

            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$amount",                   
                },
            },

            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: "$sales"
                    }
                }

            }

            
        ]);
        res.status(200).json(income);

    } catch(err){
        res.status(500).json(err);
    }
}
