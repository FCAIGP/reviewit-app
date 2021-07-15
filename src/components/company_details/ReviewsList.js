import Review from "../Review";
import {Button} from "react-bootstrap";
import React, {Fragment, useEffect, useState} from "react";
import AddReviewModal from "../modals/AddReviewModal";
import {deleteReview, getReviews} from "../../utils/api";
import {toast} from "react-toastify";
import Tags from '../Tags'

function ReviewsList(props) {
    const [showAddReview, setShowAddReview] = useState(false)
    const [tagSearch, setTagSearch] = useState("")
    const [reviews, setReviews] = useState([])
    const {userId, isAdmin, companyId, token} = props;

    const filterReviews = () => {
        if(tagSearch.length == 0) return reviews;
        return reviews.filter(review => review.tags.some(r => tagSearch.map(tag => tag.trim()).includes(r)))
    }
    
    const filteredReviews = filterReviews();
    useEffect(()=>{
        getReviews(companyId).then(res => setReviews(res));
    }, [companyId])
    const handleReviewDelete = (review_Id) => {
        /* TO DO figure out why reviews are not filtered like Posts delete */
        deleteReview(review_Id, token).then(v => setReviews(reviews => reviews.filter(p => p.reviewId !== review_Id)))
        toast.error("Review has been Deleted!", {position: toast.POSITION.TOP_CENTER})
    }

    return (
        <Fragment>
            <AddReviewModal show={showAddReview} setShow={setShowAddReview} companyId={companyId} token={token} setReviews={setReviews}
                            userId = {userId}/>
            
            <div>
                <Tags setTagSearch={setTagSearch}/>
            </div>
            
            <h1>Reviews</h1>
            <Button onClick={()=>setShowAddReview(true)}> Add Review</Button>
            <br/>

            {
                reviews.length === 0 ? <h3>No reviews yet</h3> :
                       filteredReviews.map(res => (
                            <div key={res.reviewId}>
                            <Review id={res.reviewId} authorId={res.authorId ? res.authorId : null}/>
                            {
                                isAdmin ? <Button onClick={() => handleReviewDelete(res.reviewId)}
                                                  variant="danger">Delete</Button> : <></>
                            }
                        </div>
                       ))
            }
        </Fragment>
    )
}

export default ReviewsList;