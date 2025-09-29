import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { updateTheProfile } from "../services/api";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [name, setName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (photoUrl) {
        formData.append("photoUrl", photoUrl);
      }

      const result = await updateTheProfile(formData);
      dispatch(setUserData(result.data));

      toast.success("Profile Updated");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => navigate("/profile")}
            className="cursor-pointer text-gray-700 text-2xl"
          />
          <h1 className="text-2xl font-bold text-gray-800 flex-grow text-center">
            Edit Profile
          </h1>
          <div className="w-6"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleEditProfile} className="space-y-6">
          <div className="flex justify-center mb-8">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt={userData?.name || "User"}
                className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold border-2 border-white">
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          {/* Avatar Input */}
          <div>
            <label
              htmlFor="image"
              className="text-sm text-gray-700 font-semibold mb-2"
            >
              Select Avatar
            </label>
            <input
              id="photoUrl"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setPhotoUrl(e.target.files[0]);
              }}
              className="w-full px-4 py-2 border rounded-md text-gray-700"
            />
          </div>

          {/* Full Name Input */}
          <div>
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              readOnly
              type="email"
              value={userData?.email || ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          {/* Bio Textarea */}
          <div>
            <label className="text-gray-700 font-semibold mb-2">Bio</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Tell us about yourself"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
