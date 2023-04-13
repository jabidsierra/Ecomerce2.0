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
            src={item.news?.image}
            style={{ width: 150 }}
          />
          <Card.Body>
            <Card.Title>{item.news?.headline}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Purchases;
