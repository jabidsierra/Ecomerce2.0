import React, { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ( { show, handleClose } ) => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch( getCartThunk() ) 
  }, [])
  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;