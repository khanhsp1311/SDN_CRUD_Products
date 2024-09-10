import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import './product.css'
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm
        axios.get('http://localhost:9999/products').then((response) => {
            setProducts(response.data.data);
        });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:9999/brands').then((response) => {
            console.log(response);
            setBrands(response.data.data);
        });
    }, [])
    const btnClickAdd = () => {
        navigate('/product/add')
    }
    // Filter products based on the selected brand
    const filteredProducts = selectedBrand
        ? products.filter(product => product?.brand[0]?.name === selectedBrand)
        : products;
    const btnClickDelete = async (id) => {
        console.log("id = " + id);
        await axios.delete(`http://localhost:9999/products/${id}`);

    }
    const btnClickUpdate = async (id) => {
        console.log("id = " + id);
        navigate(`/product/update/${id}`)
        // await axios.put(`http://localhost:9999/products/${id}`);

    }
    return (
        <div className='container' style={{ display: 'flex' }}>
            <div className="sidebar">
                <h3>Filter by Brand</h3>
                {/* Create radio inputs for each brand name */}
                {brands?.map(e => (
                    <div key={e.id}>
                        <label>
                            <input
                                type="radio"
                                name="brandFilter"
                                value={e.name}
                                checked={selectedBrand === e.name}
                                onChange={() => setSelectedBrand(e.name)}
                            />
                            {e.name}
                        </label>
                    </div>
                ))}
                <label>
                    <input
                        type="radio"
                        name="All"
                        value=""
                        checked={false}
                        onChange={() => setSelectedBrand('')}
                    />
                    All Product
                </label>
            </div>
            <div className="content">
                <h1>Product List</h1>
                <div className="d-flex justify-content-between">


                    <Form.Group className="col-md-6" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Search Product" />
                    </Form.Group>


                    <Button variant="primary" onClick={btnClickAdd}>Add new</Button>
                </div>
                <Table striped bordered hover style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.discountPercentage}</td>
                                <td>{product?.brand[0]?.name}</td>
                                <td>{product?.category[0]?.name}</td>
                                <td><img src={product?.thumbnail} style={{ width: '100px', height: '100px' }} /></td>
                                <td>
                                    <Button variant="primary" onClick={() => btnClickUpdate(product.id)}>Update</Button>
                                    <Button variant="primary" onClick={() => btnClickDelete(product._id)}> Delete </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Product;
