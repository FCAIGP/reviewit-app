import Post from "../Post";
import React, {Fragment, useEffect, useState} from "react";
import AddPostModal from "../modals/AddPostModal";
import {getPosts} from "../../utils/api";
import {Button, Item, Image, Divider} from "semantic-ui-react";

function PostsList(props) {
    const [showAddPost, setShowAddPost] = useState(false)
    const [posts, setPosts] = useState([])

    const {companyId, ownerId, userId, token} = props;

    useEffect(()=>{
        getPosts(companyId).then(res => setPosts(res));
    }, [companyId]);
    return (
        <Fragment>
            <AddPostModal setPosts={setPosts} show={showAddPost} setShow={setShowAddPost}  companyId={companyId} token={token}/>
            <h1>Posts</h1>
            {
                userId && userId === ownerId && <Button primary icon="add" onClick={() => setShowAddPost(true)} content="Add Post"/>
            }
            <br/>
            {
                posts.map(post => (
                    <Item.Group>
                        <Post key={post.postId} id={post.postId} companyID={companyId} ownerID={ownerId} userID={userId} setPosts={setPosts}/>
                        <Divider/>
                    </Item.Group>
                ))
            }
        </Fragment>
    );
}

export default PostsList;