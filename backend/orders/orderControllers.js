import orderModel from "./orderModel.js";

const getAllOrders = async (req, res) => {
  try {
    const found = await orderModel.find();
    if (!found) {
      return res.status(404).json({ message: "orders not founds" });
    }
    return res.status(200).send(found);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting Orders", error: error.message });
  }
};

const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const found = await orderModel.find({ email }).sort({ createdAt: -1 });
    if (!found) {
      return res.status(404).json({ message: "orders not founds" });
    }
    return res.status(200).send(found);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting Orders", error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const data = req.body;
    console.log("data form fes,body ", data);
    if (!data) return res.status(400).json({ message: "no data found" });
    const order = new orderModel(data);
    const savedOrder = await order.save();
    return res.status(200).send(savedOrder);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

export { getAllOrders, createOrder, getOrdersByEmail };
