import Review from "../Review";
import {Button} from "react-bootstrap";
import React, {Fragment, useState} from "react";
import AddReviewModal from "../modals/AddReviewModal";
import {deleteReview} from "../../utils/api";
import {toast} from "react-toastify";

function ReviewsList(props) {
    const [showAddReview, setShowAddReview] = useState(false)
    const [tagSearch, setTagSearch] = useState("")

    const {reviews, userId, isAdmin, companyId, token, setReviews} = props;

    const filterReviews = () => {
        if(!tagSearch) return reviews;
        return reviews.filter(review => review.tags.some(r => tagSearch.split(',').map(tag => tag.trim()).includes(r)))
    }

    const filteredReviews = filterReviews();
    const handleReviewDelete = (review_Id) => {
        {/* TO DO figure out why reviews are not filtered like Posts delete */
        }
        deleteReview(review_Id, token).then((v) => {
            setReviews(reviews => reviews.filter(p => p.reviewId != review_Id))
            toast.error("Review has been Deleted!", {position: toast.POSITION.TOP_CENTER})
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Fragment>
            <AddReviewModal show={showAddReview} setShow={setShowAddReview} companyId={companyId} token={token} setReviews={setReviews}
                            userId = {userId}/>
            
            <div>
                <label>Search reviews by tags</label>
                <input value={tagSearch} placeholder="Tags" onChange={e => setTagSearch(e.target.value)}></input>
            </div>
            
            <h1>Reviews</h1>
            <button onClick={()=>setShowAddReview(true)}> Add Review</button>
            <br/>

            {
                reviews.length == 0 ? <h3>No reviews yet</h3> :
                       filteredReviews.map(res => (
                            <div key={res.reviewId}>
                            <Review id={res.reviewId} authorId={res.authorId ? res.authorId : null}/>
                            {
                                isAdmin ? <Button onClick={() => handleReviewDelete(res.reviewId)}
                                                  variant="danger">Delete</Button> : <></>
                            }
                            <p>-------------------------------------------------------------------------------</p>
                        </div>
                       ))
            }
        </Fragment>
    )
}

export default ReviewsList;