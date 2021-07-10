import Review from "../Review";
import {Button} from "react-bootstrap";
import React from "react";

function ReviewsList(props) {
    const {reviews, isAdmin, handleReviewDelete} = props;
    return (
        <div>
            <h1>Reviews</h1>
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
        </div>
    )
}

export default ReviewsList;