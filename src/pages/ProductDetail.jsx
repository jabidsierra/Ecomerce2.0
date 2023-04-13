import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { setIsLoading } from '../store/slices/isLoading.slice'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProductDetail = () => {
  const { id } = useParams()
  const [ detail, setDetail ] = useState({})
  const dispatch = useDispatch()
 
  useEffect( () => {
    dispatch( setIsLoading( true ) )
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then( (resp) => setDetail( resp.data ) )
      .catch( error => console.error( error ) )
      .finally( () => dispatch (setIsLoading( false ) ) )
  }, [])

  return (
    <Container>
      <Row>
        <Col sm={8}><img src={ detail.images?.[0].url} /></Col>
        <Col sm={4}>{ detail.title}</Col>
      </Row>
      <Row>
        <Col sm>${ detail.price }</Col>
        <Col sm><Button variant="primary"><i className='bx bx-cart-add'></i> Agregar al carrito</Button></Col>
        <Col sm>{ detail.description }</Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
