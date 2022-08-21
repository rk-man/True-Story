import PostUpload from "../components/PostUpload";
import AllPosts from "../components/AllPosts";

import { useSelector } from "react-redux";

function Home() {
    const { isLoading } = useSelector((state) => {
        return state.post;
    });



    return (
        <div>
            <PostUpload />

            {isLoading ? <h1>Loading..</h1> : <AllPosts />}
        </div>
    );
}

export default Home;
