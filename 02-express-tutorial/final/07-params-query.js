const express = require('express');
const app = express();
const { products } = require('./data.js');

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">Products</a>');
});

app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });

  res.json(newProducts);
});

app.get('/api/products/:productID', (req, res) => {
  const productID = req.params.productID;

  const singleProduct = products.find(
    (product) => product.id === parseInt(productID)
  );

  if (singleProduct) {
    res.json(singleProduct);
  } else {
    res.status(404).send(`<h1>Error 404: Product ${productID} not found.</h1>`);
  }
});

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  res.send(req.params);
});

app.get('/api/v1/query', (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts < 1) {
    // res.status(200).send('No products matched your search.');
    res.status(200).json({ success: true, data: [] });
    return;
  }

  res.status(200).json(sortedProducts);
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Error 404: Page not found.</h1>');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
