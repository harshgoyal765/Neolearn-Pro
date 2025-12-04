import uploadOnCloudinary from '../config/cloudinary.js';
import Course from '../models/courseModel.js'
import Lecture from '../models/lectureModel.js';
import User from '../models/userModel.js';


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
    const courses = await Course.find({ isPublished: true }).populate("lectures reviews").populate("creator");
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
    const courses = await Course.find({ creator: userId }) .populate("creator");
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



//for lecture

// export const createLecture = async (req, res) => {
//   try {
//     console.log("added lecture",req.body)
//     const { lectureTitle } = req.body
//     const { courseId } = req.params
//     if (!lectureTitle || !courseId) {
//       return res.status(400).json({message:"lecture title required"})
//     }
//     const lecture = await Lecture.create({ lectureTitle })
//     const course = await Course.findById(courseId)
//     if (course) {
//       course.lectures.push(lecture._id)
//     }
//     await course.populate("lectures")
//     await course.save()
//     return res.status(201).json({lecture,course})
//   }
//   catch (error) {
//         return res.status(500).json({ message: `Failed to create lecture ${error}` });
//   }
// }

// export const getCourseLecture = async (req, res) => {
//   try {
//     const { courseId } = req.params
//     const course = await Course.findById(courseId)
//     if (!course) {
//       return res.status(404).json({ message: "Course is not found" })
//       await course.populate("lectures")
//       await course.save()
//       return res.status(200).json(course)
//     }
//   }
//   catch (error) {
//       return res.status(500).json({ message: `Failed to get course lecture ${error}` });
//   }
// }

export const createLecture = async (req, res) => {
  try {
    console.log("added lecture", req.body);
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "lecture title required" });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lectures.push(lecture._id);
    await course.save(); // save first
    await course.populate("lectures"); // then populate if needed for response

    return res.status(201).json({ lecture, course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create lecture ${error.message}` });
  }
};
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course is not found" });
    }

    return res.status(200).json(course); // return populated course directly
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get course lecture ${error.message}` });
  }
};



// export const editLecture = async (req, res) => {
//   try {
//     const { lectureId } = req.params
//     const { isPreviewFree, lectureTitle } = req.body
//     const lecture = await Lecture.findById(lectureId)
//     if (!lecture) {
//       return res.status(404).json({ message: "lecture is not found" })
//     }
//     let videoUrl
//     if (req.file) {
//       videoUrl = await uploadOnCloudinary(req.file.path)
//       lecture.videoUrl = videoUrl
//     }
//     if (lectureTitle) {
//       lecture.lectureTitle = lectureTitle
//     }
//     lecture.isPreviewFree = isPreviewFree
//     await lecture.save()
//     return res.status(200).json(lecture)
//   }
//   catch (error) {
//     return res.status(500).json({ message: `Failed to edit lecture ${error}` });
//   }
// }

export const editLecture = async (req, res) => {
  try {
    console.log(req.body)
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;
    
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "lecture is not found" });
    }

    if (req.file) {
      const videoUrl = await uploadOnCloudinary(req.file.path);
      if (!videoUrl) {
        return res.status(500).json({ message: "Video upload failed" });
      }
      lecture.videoUrl = videoUrl;
    }

    if (lectureTitle !== undefined) {
      lecture.lectureTitle = lectureTitle;
    }

   if (isPreviewFree !== undefined) {
  lecture.isPreviewFree = isPreviewFree === "true"; // convert string to boolean
}

    await lecture.save();
    return res.status(200).json(lecture);

  } catch (error) {
    return res.status(500).json({
      message: `Failed to edit lecture: ${error.message || error}`
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "lecture is not found" });
    }

    // Remove the lecture ID from all courses (just in case it's in multiple)
    const courseUpdate = Course.updateMany(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    const lectureDelete = Lecture.findByIdAndDelete(lectureId);

    await Promise.all([courseUpdate, lectureDelete]);

    return res.status(200).json({ message: "lecture is removed" });

  } catch (error) {
    return res.status(500).json({
      message: `Failed to remove lecture: ${error.message || error}`
    });
  }
};

export const getCreatorById = async (req, res) => {
  try {
    const { userId } = req.body
    const user = await User.findById(userId).select("-password")
    if (!user) {
      res.status(404).json({ message: "user not found" })
    }
    return res.status(200).json(user)
  }
  catch (error) {
    return res.status(500).json({
      message: `Failed to get Creator ${error}` 
    });
  }
}
