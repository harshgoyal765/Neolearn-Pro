import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import Course from '../models/courseModel.js'
import User from '../models/userModel.js'
dotenv.config()

const RazorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

 

export const RazorpayOrder = async (req, res) => {
  try {
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
    console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
    console.log("Request body:", req.body);

    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    console.log("Course price:", course.price);

    const amountInPaise = course.price * 100;
    if (isNaN(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({ message: "Invalid price for course" });
    }

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: courseId.toString(),
    };
    console.log("Order options:", options);

    const order = await RazorPayInstance.orders.create(options);
    console.log("Razorpay order created:", order);

    if (!order) {
      return res.status(500).json({ message: "Some error occured" });
    }

    return res.status(200).json(order);
  }
  catch (error) {
    console.error("Error in RazorpayOrder:", error);  // log full error
    return res.status(500).json({ message: `failed to create Razorpay order: ${error.message}`});
  }
}


export const verifyPayment = async (req, res) => {
  try {
    const { courseId, userId,razorpay_order_id} = req.body
    const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status !== "paid"){
      return res.status(400).json({message:"Payment not completed"})
    }
    const user = await User.findById(userId)
    if(!user.enrolledCourses.includes(courseId)){
      await user.enrolledCourses.push(courseId)
      await user.save()
    }
    const course = await Course.findById(courseId).populate("lectures")
    if(!course.enrolledStudents.includes(userId)){
      await course.enrolledStudents.push(userId)
      await course.save()
    }
    return res.status(200).json({message:"Payment verified successfully"})
  }
  catch (error) {
    return res.status(500).json({ message: `failed to verify payment ${error}` })
  }
}