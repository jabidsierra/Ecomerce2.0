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

  const cart = useSelector((state) => state.cart);

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>

      <ul>
          {cart?.map((item) => (
            <li
              key={item.id}
              style={{ border: "1px solid black", marginBottom: "1rem" }}
            >
              <h5>{item.title}</h5>
              <img
                style={{ width: 80, objectFit: "contain" }}
                src={item.news?.image}
                alt=""
              />
            </li>
          ))}
        </ul>
        
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;