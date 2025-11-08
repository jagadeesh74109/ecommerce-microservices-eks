import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);

  const PRODUCT_API = '/api/products';
  const ORDER_API = '/api/orders';

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(PRODUCT_API);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ORDER_API);
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
    setLoading(false);
  };

  const handleOrder = async (product) => {
    try {
      const order = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        totalPrice: product.price,
        customerName: 'Demo User',
        customerEmail: 'demo@example.com',
        shippingAddress: '123 Main St'
      };
      
      await axios.post(ORDER_API, order);
      alert('Order placed successfully!');
      setActiveTab('orders');
    } catch (err) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 E-Commerce Microservices</h1>
        <p>React → Spring Boot (Product + Order) → RDS PostgreSQL</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </nav>

      <main className="content">
        {loading && <p>Loading...</p>}

        {activeTab === 'products' && !loading && (
          <div className="products-grid">
            {products.length === 0 ? (
              <div className="empty-state">
                <p>No products yet. Add some via API!</p>
                <code>
                  POST /api/products<br/>
                  {`{"name":"Laptop","description":"Gaming laptop","price":999.99,"stock":10,"category":"Electronics"}`}
                </code>
              </div>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <p className="price">${product.price}</p>
                  <p className="stock">Stock: {product.stock}</p>
                  <p className="category">Category: {product.category}</p>
                  <button onClick={() => handleOrder(product)}>
                    Order Now
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'orders' && !loading && (
          <div className="orders-list">
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.productName}</td>
                      <td>{order.quantity}</td>
                      <td>${order.totalPrice}</td>
                      <td>{order.customerName}</td>
                      <td><span className="status">{order.status}</span></td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      <footer>
        <p>Deployed on AWS EKS with NGINX Ingress Controller</p>
      </footer>
    </div>
  );
}

export default App;
