import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData } = useSelector(state => state.user)
  const navigate=useNavigate()
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center relative">
        
        {/* Header with back arrow */}
        <div className="absolute top-6 left-6">
          <button className="text-gray-700 text-2xl hover:text-black transition">
           <FontAwesomeIcon 
  icon={faArrowLeft} 
  onClick={() => navigate("/")} 
  className="cursor-pointer text-gray-700 text-2xl" 
/>

          </button>
        </div>

        {/* Avatar */}
     <div className="mb-6 mt-10 flex justify-center">
  {userData?.photoUrl ? (
    <img
      src={userData?.photoUrl}
      alt="User Avatar"
      className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
    />
  ) : (
    <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold border-2 border-white">
      {userData?.name?.slice(0, 1).toUpperCase()}
    </div>
  )}
</div>

        {/* User Info */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
          <p className="text-gray-500 font-medium text-lg">{userData.role}</p>
        </div>

        {/* Details Section */}
        <div className="text-left mt-8 space-y-4 text-gray-600">
          <p>
            <strong>Email :</strong>{" "}
            <span className="text-gray-800 ml-1.5">{userData.email}</span>
          </p>
          <p>
            <strong>Bio:</strong>{" "}
            <span className="text-gray-800 ml-1.5">{userData.description}</span>
          </p>
          <p>
            <strong>Enrolled Courses:</strong>{" "}
            <span className="text-gray-800 ml-1.5">{userData.enrolledCourses.length}</span>
          </p>
        </div>

        {/* Edit Profile Button */}
        <button className="mt-8 w-4/5 md:w-3/5 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
