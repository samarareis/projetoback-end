
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const express = require('express');
const cors = require('cors');

const productImageRoutes = require('./routes/productImageRoutes');
const productOptionRoutes = require('./routes/productOptionRoutes');


const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1/user', userRoutes);
app.use('/v1/category', categoryRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/product-image', productImageRoutes);
app.use('/v1/product-option', productOptionRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Digital College funcionando!'
  });
});

module.exports = app;
