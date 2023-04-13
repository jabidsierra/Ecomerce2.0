import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { setIsLoading } from '../store/slices/isLoading.slice'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createCartThunk } from "../store/slices/cart.slice";
import Card from 'react-bootstrap/Card';
const ProductDetail = () => {
  const { id } = useParams()
  const [ detail, setDetail ] = useState({})
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch()
 
  useEffect( () => {
    dispatch( setIsLoading( true ) )
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then( (resp) => setDetail( resp.data ) )
      .catch( error => console.error( error ) )
      .finally( () => dispatch (setIsLoading( false ) ) )
  }, [])

  const addChart = () => {
    const data = {
      rate: counter, //quantity
      news: id //productId
    };

    dispatch(createCartThunk(data));
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="right" src={ detail.images?.[0].url} />
      <Card.Body>
        <Card.Title>{ detail.title}</Card.Title>
        <Card.Text>
        { detail.description }
        </Card.Text>
        <Button onClick={addChart} variant="primary"><i className='bx bx-cart-add'></i> Agregar al carrito</Button>
        <Button onClick={() => setCounter(counter - 1)}>-</Button>
          {counter}
          <Button onClick={() => setCounter(counter + 1)}>+</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductDetail;


