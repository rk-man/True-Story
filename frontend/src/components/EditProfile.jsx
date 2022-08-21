import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { editUserProfile } from "./../features/auth/authSlice";

function EditProfile({ user, editProfile }) {
    const [userData, setUserData] = useState({
        Image: null,
        bio: user.bio,
        username: user.username,
    });
    const { username, bio } = userData;

    const dispatch = useDispatch();

    const onChange = (e) => {
        setUserData((prev) => {
            return {
                ...prev,
                [`${e.target.name}`]: e.target.value,
            };
        });
    };

    const onUpload = (e) => {
        setUserData((prev) => {
            return {
                ...prev,
                [`${e.target.name}`]: e.target.files[0],
            };
        });
    };

    const saveChanges = (e) => {
        e.preventDefault();
        if (bio.trim().length > 50) {
            toast.error("Bio can have only 50 characters");
        }
        if (username.length > 20) {
            toast.error("username can't be more than 20 characters");
        }

        console.log(bio);

        if (username.length < 20 && bio.trim().length < 50) {
            let tobeUpdatedObj = userData;

            if (userData.Image != null) {
                console.log(userData.Image);
                tobeUpdatedObj.Image = userData.Image;
            }
            console.log(tobeUpdatedObj);
            dispatch(editUserProfile(tobeUpdatedObj));
            editProfile(e);
        }
    };

    return (
        <div className="user-profile flex flex-col  items-center justify-center gap-10 ">
            <div>
                <div className="flex flex-col items-center gap-4 mb-6 ">
                    <div className="flex items-center gap-4">
                        <div className="user-img-div">
                            <img
                                className="user-img"
                                src={`/images/user-profiles/${user.Image}`}
                                alt={`${user.Image}`}
                            ></img>
                        </div>

                        <label>
                            <input
                                type="file"
                                className="text-sm text-grey-500
            file:mr-5 file:py-3 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
            hover:file:cursor-pointer hover:file:opacity-80
          "
                                name="Image"
                                onChange={onUpload}
                            />
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="default-input"
                        className="block mb-2 font-medium text-gray-900 dark:text-gray-300 "
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="default-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChange}
                        name="username"
                        value={userData.username}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="default-input"
                        className="block mb-2 font-medium text-gray-900 dark:text-gray-300"
                    >
                        Bio
                    </label>
                    <textarea
                        type="text"
                        id="default-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="bio"
                        onChange={onChange}
                        value={userData.bio}
                        rows="5"
                    />
                </div>
            </div>

            <div className="flex items-center gap-24 justify-center">
                <div className="num-posts">
                    <h3>8</h3>
                    <p>posts</p>
                </div>
                <div className="num-followers">
                    <h3>55</h3>
                    <p>followers</p>
                </div>
                <div className="num-following">
                    <h3>65</h3>
                    <p>following</p>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <button className="btn" onClick={saveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default EditProfile;
