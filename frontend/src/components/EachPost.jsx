import { FaHeart } from "react-icons/fa";

import { useDispatch } from "react-redux";

import { addOrRemoveLike } from "./../features/post/postSlice";

function EachPost({ post }) {
    const dispatch = useDispatch();

    //     const { user } = useSelector((state) => {
    //         return state.auth;
    //     });
    //
    //     const { allPosts } = useSelector((state) => {
    //         return state.post;
    //     });
    // const [totalLikes, setTotalLikes] = useState(post.likes.length);

    const updatedDate = (date) => {
        return new Date(date).toLocaleString("en-us", {
            timeStyle: "short",
            dateStyle: "long",
        });
    };

    const likeOrUnlikePost = (e) => {
        e.preventDefault();

        //in the fulfilled state, just updating the allPosts state variable in the extra redcuers area, will render the components that use those variables, in this case the AllPosts.jsx which makes child component EachPost.jsx get rendered too
        dispatch(addOrRemoveLike(post._id));
        // setTotalLikes(post.likes.length);
    };

    return (
        <div className="post">
            <div className="username-img-date-posted">
                <div className="username-and-img">
                    <div className="user-img-div">
                        <img
                            className="user-img"
                            src={`/images/user-profiles/${post.user.Image}`}
                            alt={`${post.user.Image}`}
                        />
                    </div>
                    <p>{post.user.username}</p>
                </div>

                <p>{updatedDate(post.datePosted)}</p>
            </div>

            <div className="post-images">
                {post.Images.map((img, index) => {
                    return (
                        <img
                            className="post-img"
                            src={`/images/users/${img}`}
                            alt={`${img}`}
                            key={index}
                        />
                    );
                })}
                <button onClick={likeOrUnlikePost} className={`btn-icon`}>
                    <FaHeart />
                </button>
            </div>

            <div className="post-footer">
                <p className="text-center">
                    Nmber of Likes : {post.likes.length}
                </p>

                <p className="text-left">{post.description}</p>
            </div>
        </div>
    );
}

export default EachPost;
