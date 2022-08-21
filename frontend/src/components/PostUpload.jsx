import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { reset, createPost } from "./../features/post/postSlice";

function PostUpload() {
    //local state variables
    const [Images, setImages] = useState([]);
    const [description, setDescription] = useState("");

    //global state variables
    const { user } = useSelector((state) => {
        return state.auth;
    });

    const { post, isSuccess, isError, message } = useSelector((state) => {
        return state.post;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (post && isSuccess) {
            toast.success("Uploaded successfully");
        } else if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [post, isError, isSuccess, dispatch, message]);

    ///functionalities
    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleFileUpload = (e) => {
        let images = [];
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            images.push(files[i]);
        }

        setImages([...images]);
    };

    const handleCreatingPost = (e) => {
        e.preventDefault();
        if (Images.length > 0 && description && description.length > 10) {
            dispatch(createPost({ Images, description }));
            setImages([]);
            setDescription("");
            document.getElementById("Images").value = "";
        }
    };

    if (user) {
        return (
            <div className="upload-post">
                <div className="img-and-text">
                    <div className="user-img-div">
                        <img
                            className="user-img"
                            src={`/images/user-profiles/${user.Image}`}
                            alt={`${user.Image}`}
                        />
                    </div>
                    <textarea
                        typeof="text"
                        cols="100"
                        placeholder="type something here...."
                        onChange={handleChange}
                        id="description"
                        value={description}
                    />
                </div>

                <div className="btns">
                    <input
                        id="Images"
                        type="file"
                        onChange={handleFileUpload}
                        accept="image/*"
                        multiple
                    />
                    <button onClick={handleCreatingPost} className="btn">
                        upload
                    </button>
                </div>
            </div>
        );
    }
}

export default PostUpload;
