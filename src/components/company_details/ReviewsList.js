import Review from "../Review";
import {Button} from "react-bootstrap";
import React, {Fragment, useState} from "react";
import AddReviewModal from "../modals/AddReviewModal";
import {deleteReview} from "../../utils/api";
import {toast} from "react-toastify";

function ReviewsList(props) {
    const [showAddReview, setShowAddReview] = useState(false)

    const {reviews, userId, isAdmin, companyId, token, setReviews} = props;

    const handleReviewDelete = (review_Id) => {
        {/* TO DO figure out why reviews are not filtered like Posts delete */
        }
        deleteReview(review_Id, token).then(v => setReviews(reviews => reviews.filter(p => p.reviewId != review_Id)))
        toast.error("Review has been Deleted!", {position: toast.POSITION.TOP_CENTER})
    }

    return (
        <Fragment>
            <AddReviewModal show={showAddReview} setShow={setShowAddReview} companyId={companyId} token={token} setReviews={setReviews}
                            userId = {userId}/>
            <h1>Reviews</h1>
            <button onClick={()=>setShowAddReview(true)}> Add Review</button>
            <br/>
            {
                reviews.length == 0 ? <h3>No reviews yet</h3> :
                    reviews.map(review => (
                        <div key={review.reviewId}>
                            <Review id={review.reviewId} authorId={review.authorId ? review.authorId : null}/>
                            {
                                isAdmin ? <Button onClick={() => handleReviewDelete(review.reviewId)}
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