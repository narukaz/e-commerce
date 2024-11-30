import { Order } from "../../model/order.js";

export const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.find({});
    if (orders.length < 0) {
      return res.status(400).json({
        success: false,
        message: "no orders found",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order)
      return res.status(404).json({
        success: false,
        message: "order data not found",
      });

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    
    const order = await Order.findById(id);
    if (!order)
      return res.status(404).json({
        success: false,
        message: "order data not found",
      });

    await Order.findByIdAndUpdate(id, { orderStatus });

    return res.status(200).json({
      success: true,
      message: "successfully updated",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
