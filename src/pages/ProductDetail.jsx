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
    <Container>
      <Row>
        <Col sm={8}><img src={ detail.images?.[0].url} /></Col>
        <Col sm={4}>{ detail.title} <br/>
        { detail.description }</Col>
      </Row>
      <Row>
        <Col sm></Col>
        <Col sm></Col>
        <Col sm>${ detail.price }   <Button onClick={addChart} variant="primary"><i className='bx bx-cart-add'></i> Agregar al carrito</Button>
        <Button onClick={() => setCounter(counter - 1)}>-</Button>
          {counter}
          <Button onClick={() => setCounter(counter + 1)}>+</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;


