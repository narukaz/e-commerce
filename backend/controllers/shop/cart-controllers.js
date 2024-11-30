import  {Cart}  from "../../model/cart.js";
import Product from '../../model/ProductModel.js'


export const fetchCartItems = async(req, res) => {
    try {

        const {userId}= req.params
       
        if(!userId){
            return res.status(400).json({
                message:'incorrect userdata',
                success:false
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path: 'items.productId',
            select:'title imageUrl price salePrice'
        })

        
        if(!cart){
            return res.status(404).json({
                message:'cart not found',
                success:false})
        }


        const validItems = cart.items.filter(item=> item.productId)
        if(validItems.length < cart.items.length){
            cart.items = validItems;
            await cart.save();
        }
       
        

        const populateCartItems = validItems.map(item=> ({
            productId:item.productId._id,
            imageUrl:item.productId.imageUrl,
            title:item.productId.title,
            price:item.productId.price,
            salePrice:item.productId.salePrice,
            quantity:item.quantity
        }))

       

        return res.status(200).json({
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems,
                cartId:cart._id
            }
        })

    } catch (e) {
      console.log(e.message);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
};

export const addToCart = async(req, res) => {
try {   
   
    

    const {productId, userId, quantity} = req.body

    if(!productId|| !userId|| quantity <=0){
        return res.status(400).json({
            message: "Invalid data provided",
            success:false
        })
    }

    const product = await Product.findById(productId)

    if(!product){
        return res.status(404).json({
            message: "product not found",
            success:false
        })
    }

    let cart = await Cart.findOne({userId})

    if(!cart){
        cart = new Cart({
            userId,
            cartItems:[{productId, items:[]}]
        })
    }

    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

    if(findCurrentProductIndex == -1){
        cart.items.push({productId, quantity})
    }else{
        cart.items[findCurrentProductIndex].quantity += quantity
    }

    
    await cart.save()

    return res.status(200).json({
        success:true,
        data:cart
    })













  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateCartItemQuantity = async(req, res) => {
    try {
       

    const {productId, userId, quantity} = req.body

    if(!productId|| !userId|| quantity <=0){
        return res.status(400).json({
            message: "Invalid data provided",
            success:false
        })
    }

    const cart = await Cart.findOne({userId})
    if(!cart){
        cart = new Cart({
            userId,
            cartItems:[{productId, items:[]}]
        })
    }

    const findCurrentProductIndex = cart.items.findIndex(item=> item.productId.toString() == productId)

    if(findCurrentProductIndex == -1){
            return res.status(404).json({
                message:"item not found in cart",
                success:false
            })
    }

    cart.items[findCurrentProductIndex].quantity = quantity
    await cart.save()
    await cart.populate({
        path: 'items.productId',
        select:'title imageUrl price salePrice'
    })

    const validItems = cart.items.filter(item=> item.productId)
        if(validItems.length < cart.items.length){
            cart.items = validItems;
            await cart.save();
        }

    const populateCartItems = validItems.map(item=> ({
        productId: item.productId ? item.productId._id : null,
        title: item.productId ? item.productId.title : null,
        imageUrl: item.productId ? item.productId.imageUrl : null,
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity 
    }))
    

    return res.status(200).json({
        message:'success',
        data:{
            ...cart._doc,
            items:populateCartItems
        }
    })

    } catch (e) {
      console.log(e.message);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
};

export const deleteCartItem = async(req, res) => {
    try {

        const {userId, productId} = req.params
        if(!productId|| !userId){
            return res.status(400).json({
                message: "Invalid data provided",
                success:false
            })
        }

        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({
                message:'Cart not found',
                success:false
            })
        }

        if(cart){
            const filteredProduct = cart.items.filter(item=> item.productId.toString() !== productId)
            cart.items = filteredProduct;
            await cart.save()
        }




        await cart.populate({
            path:'items.productId',
            select:'title imageUrl price salePrice'
        });

        const populatedCartItems= cart.items.map(item=>({
            productId: item.productId ? item.productId._id : null,
            title: item.productId ? item.productId.title : null,
            imageUrl: item.productId ? item.productId.imageUrl : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity 
        }))

        return res.status(200).json({
            success:true,
            data:{
                ...cart._doc,
                items:populatedCartItems
            }
        })



    } catch (e) {
      console.log(e.message);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
};

