import Post from "../Post";
import React from "react";

function PostsList(props) {
    const {posts, companyId, ownerId, userId} = props;
    return (
        <div>
            <h1>Posts</h1>
            <br/>
            {
                posts.map(post => (
                    <Post key={post.postId} id={post.postId} companyID={companyId} ownerID={ownerId} userID={userId}/>
                ))
            }
        </div>
    );
}

export default PostsList;