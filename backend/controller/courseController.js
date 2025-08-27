import uploadOnCloudinary from '../config/cloudinary.js';
import Course from '../models/courseModel.js'


export const createCourse = async (req, res) => {
  try {
    
    const { title, category } = req.body
    if (!title || !category) {
      return res.status(400).json({message:"title or category is required"})
    }
    const course = await Course.create({
      title,
      category,
      creator:req.userId
    })
    
     return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course, 
    });
  }
  catch (error) {
  
     res.status(500).json({ message: "course creation error" });
  }
}

export const getpublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
    if (!courses) {
       return res.status(400).json({message:"Courses are not found"})
    }
    return res.status(200).json(courses)
  }
  catch (error) {
    res.status(500).json({ message: "Failed to get Published courses error" });
  }
}

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId
    const courses = await Course.find({ creator: userId })
    if (!courses) {
       return res.status(400).json({message:"Courses are not found"})
    }
     return res.status(200).json(courses)
  }
  catch (error) {
    res.status(500).json({ message: `Failed to get creator courses ${error}` });
  }
}


// export const editCourse = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { title, subTitle, description, category, level, isPublished, price } = req.body;
//     let updateData = {
//       title,
//       subTitle,
//       description,
//       category,
//       level,
//       isPublished: isPublished === "true" || isPublished === true,
//       price: Number(price)
//     };

//     if (req.file) {
//       const uploadedImage = await uploadOnCloudinary(req.file.path);
     

//    if (typeof uploadedImage === "string") {
//     updateData.thumbnail = uploadedImage;
//   }

//       if (uploadedImage?.secure_url) {
//         updateData.thumbnail = uploadedImage.secure_url;
//       }
//     }
//    const course = await Course.findByIdAndUpdate(
//       courseId,
//       { $set: updateData },   // $set use karo overwrite avoid karne ke liye
//       { new: true }
//     );

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//    console.log(course)
//     return res.status(200).json(course);

//   } catch (error) {
//     return res.status(500).json({ message: `Failed to edit course: ${error.message}` });
//   }
// };



export const editCourse = async (req, res) => {
  try {
    console.log("Body:", req.body);
console.log("File:", req.file);
    const { courseId } = req.params;

    // destructure body values
    const { 
      title, 
      subTitle, 
      description, 
      category, 
      level, 
      isPublished, 
      price, 
      thumbnail // 👈 frontend se bheja hua (purana ya naya string)
    } = req.body;

    // base updateData
    let updateData = { 
      title, 
      subTitle, 
      description, 
      category, 
      level, 
      isPublished: isPublished === "true" || isPublished === true,
      price: Number(price)
    };

    // agar frontend se thumbnail string mili ho (naya ya purana URL)
    if (thumbnail && thumbnail.trim() !== "") {
      updateData.thumbnail = thumbnail;
    }

    // agar file aayi ho to cloudinary pe upload karke override karo
    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file.path);
       console.log("uploaded image",uploadedImage)
      if (typeof uploadedImage === "string") {
        updateData.thumbnail = uploadedImage;
      } else if (uploadedImage?.secure_url) {
        updateData.thumbnail = uploadedImage.secure_url;
      }
    }

    // update course in DB
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $set: updateData },
      { new: true } // return updated document
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
   console.log(course)
    return res.status(200).json(course);

  } catch (error) {
    console.error("Edit Course Error:", error);
    return res.status(500).json({ message: `Failed to edit course: ${error.message}` });
  }
};



export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params
     let course = await Course.findById(courseId)
    if (!course) {
       return res.status(400).json({message:"Course is not found"})
    }
    return res.status(200).json(course)
  }
  catch (error) {
    return res.status(500).json({ message: `Failed to get course by id ${error}` });
  }
}

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    let course = await Course.findById(courseId)
    if (!course) {
       return res.status(400).json({message:"Course is not found"})
    }
    course = await Course.findByIdAndDelete(courseId, { new: true })
    return res.status(200).json({message:"course removed"})
  }
  catch (error) {
    return res.status(500).json({ message: `Failed to delete course by id ${error}` });
  }
}