import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product: { name, _id, image, numReviews, rating } }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as='div'>
        <div className='my-3'>
          <Rating
            value={rating}
            text={`${numReviews} reviews`}
            color={'#f8e825'}
          ></Rating>
        </div>
      </Card.Text>
    </Card>
  );
};

export default Product;
