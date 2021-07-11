import Post from "../Post";
import React, {Fragment, useState} from "react";
import AddPostModal from "../modals/AddPostModal";

function PostsList(props) {
    const [showAddPost, setShowAddPost] = useState(false)

    const {posts, companyId, ownerId, userId, token, setPosts} = props;
    return (
        <Fragment>
            <AddPostModal setPosts={setPosts} show={showAddPost} setShow={setShowAddPost}  companyId={companyId} token={token}/>
            <h1>Posts</h1>
            {
                userId && userId == ownerId && <button onClick={() => setShowAddPost(true)}> Add Post</button>
            }
            <br/>
            {
                posts.map(post => (
                    <Post key={post.postId} id={post.postId} companyID={companyId} ownerID={ownerId} userID={userId} setPosts={setPosts}/>
                ))
            }
        </Fragment>
    );
}

export default PostsList;