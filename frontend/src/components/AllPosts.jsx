import { useEffect } from "react";
import EachPost from "./EachPost";

import { useSelector, useDispatch } from "react-redux";

import {
    reset,
    getOverallPosts,
    resetAllPosts,
} from "./../features/post/postSlice";

function AllPosts() {
    let { allPosts } = useSelector((state) => {
        return state.post;
    });

    let { user } = useSelector((state) => {
        return state.auth;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getOverallPosts());
            dispatch(reset());
        }

        return () => {
            dispatch(resetAllPosts());
            // allPosts = [];
        };
    }, [dispatch, user]);

    if (user) {
        return (
            <div className="all-posts">
                {allPosts &&
                    allPosts.map((post, index) => {
                        return <EachPost key={index} post={post} />;
                    })}
            </div>
        );
    }
}

export default AllPosts;
