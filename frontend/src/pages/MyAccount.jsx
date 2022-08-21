import { useEffect, useState } from "react";
import EachPost from "./../components/EachPost";

import { useSelector, useDispatch } from "react-redux";

import EditProfile from "../components/EditProfile";

import {
    reset,
    resetAllPosts,
    getUsersPosts,
} from "./../features/post/postSlice";

function MyAccount() {
    let { allPosts } = useSelector((state) => {
        return state.post;
    });

    let { user } = useSelector((state) => {
        return state.auth;
    });

    let [userEdit, setUserEdit] = useState(false);

    //hooks do not get recreated unless the parent component changes
    const dispatch = useDispatch();

    //on the first call of useEffect
    useEffect(() => {
        if (user) {
            dispatch(getUsersPosts());
        }
        dispatch(reset());
        //calling getUsersPosts

        return () => {
            console.log("component is unmounting");

            dispatch(resetAllPosts());

            setUserEdit(false);

            // allPosts = []; this doesn;t alter the state variable like the above
        };
    }, [dispatch, user]);

    const editProfile = (e) => {
        e.preventDefault();
        console.log("Hello there");
        setUserEdit(!userEdit);
    };

    if (user)
        return (
            <div className="user-account-center">
                <div className="user-account">
                    {userEdit ? (
                        <EditProfile
                            user={user}
                            editProfile={editProfile}
                            setUserEdit={setUserEdit}
                            userEdit={userEdit}
                        />
                    ) : (
                        <div className="user-profile flex flex-col  items-center justify-center gap-10 ">
                            <div>
                                <div className="flex items-center gap-4 mb-6 ">
                                    <div className="user-img-div">
                                        <img
                                            className="user-img"
                                            src={`/images/user-profiles/${user.Image}`}
                                            alt={`${user.Image}`}
                                        />
                                    </div>
                                    <p>{user.username}</p>
                                </div>
                                <div className="bio">
                                    {user.bio.split("\n").map((str, index) => {
                                        return <p key={index}>{str}</p>;
                                    })}
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
                                <button className="btn" onClick={editProfile}>
                                    Edit profile
                                </button>
                            </div>
                        </div>
                    )}
                    <h1 className="text-center">POSTS</h1>
                    <div className="user-posts">
                        {allPosts &&
                            allPosts.map((post, index) => {
                                return <EachPost key={index} post={post} />;
                            })}
                    </div>
                </div>
            </div>
        );
}

export default MyAccount;
