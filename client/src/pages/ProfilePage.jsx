import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  // ---------- Context ----------
  const { authUser, updateProfile } = useContext(AuthContext);

  // ---------- Local States ----------
  const [selectedImg, setSelectedImg] = useState(null);   // New uploaded image
  const [name, setName] = useState('');                   // User full name
  const [bio, setBio] = useState('');                     // User bio
  const navigate = useNavigate();                         // Navigation hook

  // ---------- Sync state with user data ----------
  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || '');
      setBio(authUser.bio || '');
    }
  }, [authUser]);

  // ---------- Form Submit Handler ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ If no image is selected, update text fields only
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      return navigate('/');
    }

    // ✅ If image is selected, convert to base64 and update all
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        profilePic: base64Image,
        fullName: name,
        bio,
      });

      navigate('/');
    };
  };

  // ---------- Handle loading state ----------
  if (!authUser)
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      {/* ---------- Profile Form Card ---------- */}
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse">
        
        {/* ---------- Form Section ---------- */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg font-semibold">Profile Details</h3>

          {/* ---------- Profile Image Upload ---------- */}
          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || assets.avatar_icon
              }
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span>Upload Profile Image</span>
          </label>

          {/* ---------- Name Input ---------- */}
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name please"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* ---------- Bio Textarea ---------- */}
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write Profile Bio"
            required
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>

          {/* ---------- Save Button ---------- */}
          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
          >
            Save
          </button>
        </form>

        {/* ---------- Profile Image Preview (Right) ---------- */}
        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover"
          src={
            selectedImg
              ? URL.createObjectURL(selectedImg)
              : authUser?.profilePic || assets.logo_icon
          }
          alt="profile"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
