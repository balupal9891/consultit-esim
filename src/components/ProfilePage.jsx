import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../appContext/UserContext";
import axios from "axios";

export default function ProfilePage() {
  const [disabled, setDisabled] = useState(false);
  const { user } = useUser();
  const [userData, setUserData] = useState(null)

  useState(() => {
    if (user) {
      fetchUserData();
    }
  }, [user])

  async function fetchUserData() {
    console.log(user)
    try {
      await axios.get(`https://consultit-esim.onrender.com/api/user/info/${user?.userId}`)
        .then(response => {
          if (response.status == 200) {
            setUserData(response.data.data);
            console.log(response.data.data)
          }
        })
        .catch(error => {
          toast.error(error?.response.data);
        });
    } catch (error) {
      toast.error('Error while fetching userData')
    }
  }

  function updateUser(prop, value) {
    setUserData((prev) => ({ ...prev, [prop]: value }));
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      try {
        // const res = await fetch("/api/upload", { method: "POST", body: data });
        // const result = await res.json();
        // updateUser("imageUrl", result?.imageUrl || "");
        toast.success("Image updated");
      } catch (err) {
        toast.error("Upload failed");
      }
    }
  }

  async function handleProfileUpdate(ev) {
    try {
      ev.preventDefault();
      await axios.patch(`https://consultit-esim.onrender.com/api/user/info/${user?.userId}`, userData)
        .then(response => {
          setUserData(response?.data?.data);
        })
        .catch(error => {
          toast.error(error?.response?.data);
        });
    } catch (error) {
      toast.error('Error while updating')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Your Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-8 text-black">
          {/* Avatar Section */}
          <div className="md:w-1/3 flex flex-col items-center gap-4">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 border-4 border-blue-100 shadow-sm">
              {user && user?.imageUrl ? (
                <img
                  src={user?.imageUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
            </div>
            <label className="w-full text-center cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <span className="inline-block mt-2 text-sm font-medium border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                Change Image
              </span>
            </label>
          </div>

          {/* Form Section */}
          <form onSubmit={handleProfileUpdate} className="md:w-2/3 w-full space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 rounded-lg p-1 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData?.fullName || ''}
                onChange={(ev) => updateUser("fullName", ev.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                className="w-full mt-1 rounded-lg p-1 border border-gray-300 bg-gray-50"
                value={userData?.userName || ''}
                onChange={(ev) => updateUser("userName", ev.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                disabled
                className="w-full mt-1 rounded-lg p-1 border border-gray-200 bg-gray-100 text-gray-500"
                value={userData?.email || ''}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <input
                type="tel"
                disabled={disabled}
                className="w-full mt-1 rounded-lg p-1 border border-gray-300 bg-gray-50"
                value={userData?.mobile || ''}
                onChange={(ev) => updateUser("phone", ev.target.value)}
              />
            </div>

            {/* <div>
              <label className="text-sm font-medium text-gray-600">Region</label>
              <input
                type="text"
                disabled={disabled}
                className="w-full mt-1 rounded-lg p-1 border border-gray-300 bg-gray-50"
                value={userData?.region || ''}
                onChange={(ev) => updateUser("region", ev.target.value)}
              />
            </div> */}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-6 rounded-lg shadow-md"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
