import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import getConfig from '../helpers/GetConfig';
import Card from "react-bootstrap/Card";
const Purchases = () => {

  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    axios
      .get("https://news-app-api.academlo.tech/favorites/", getConfig())
      .then((resp) => setPurchases(resp.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Favoritos / Purchases</h1>
      {purchases.map((item) => (
        <Card
          style={{ width: "100%", display: "flex", flexDirection: "row" }}
          key={item.id}
        >
          <Card.Img
            variant="left"
            src={item.images?.[0].url}
            style={{ width: 150 }}
          />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
            ${ item.price }
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Purchases;
