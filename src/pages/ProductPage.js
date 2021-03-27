import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProductReview, getProduct } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [val, setVal] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const {
    product: {
      image,
      name,
      rating,
      numReviews,
      price,
      description,
      countInStock,
      reviews,
    },
    loading,
    error,
  } = productDetails;
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;
  useEffect(() => {
    if (successProductReview) {
      setVal(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(getProduct(match.params.id));
  }, [dispatch, match, successProductReview]);
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={image} alt={name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={rating}
                    text={`${numReviews} reviews`}
                    color={'#f8e825'}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${price}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs='auto' className='my-1'>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      disabled={countInStock === 0}
                      type='button'
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {reviews.length === 0 && (
                <Message variant='info'>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#f8e825' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Write a review</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant='success'>Review Submitted</Message>
                  )}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={val}
                          onChange={(e) => setVal(Number(e.target.value))}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='5'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='info'>
                      Please <Link to='/login'>login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
