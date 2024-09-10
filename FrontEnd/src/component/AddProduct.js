import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CreateProduct = () => {
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const discountPercentageRef = useRef();
    const brandRef = useRef();
    const categoryRef = useRef();
    const stockRef = useRef();
    const ratingRef = useRef();
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        brand: '',
        category: '',
        stock: 0,
        rating: 0,
    });
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };


    useEffect(() => {
        // ko dùng được async trong useEffect
        axios.get('http://localhost:9999/categories').then((response) => {
            console.log(response);
            setCategory(response.data.data);
        });

        axios.get('http://localhost:9999/brands').then((response) => {
            console.log(response);
            setBrand(response.data.data);
        });
    }, [])
    useEffect(() => {
        if (id) {

            console.log(id);
            axios.get(`http://localhost:9999/products/${id}`).then((response) => {
                console.log(response);
                setProduct(response.data.data);
            });
        }
    }, [id])

    const takeImage = (e) => {
        console.log("file day");

        console.log(e.target.files[0]['name']);
        setImage(e.target.files[0]['name'])
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        // Get the values of the input elements.
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const price = priceRef.current.value;
        const discountPercentage = discountPercentageRef.current.value;
        const brand = brandRef.current.value;
        const category = categoryRef.current.value;
        const stock = stockRef.current.value;
        const rating = ratingRef.current.value;
        console.log(title, description, price, brand, category, stock, rating, discountPercentage);

        const body = { title: title, description: description, price: price, brand: brand, category: category, stock: stock, rating: rating, discount: discountPercentage, thumbnail: image };
        // Submit the form data.
        // ...

        axios.post('http://localhost:9999/products', body)
            .then((response) => {
                // Handle success, e.g., redirect or show a success message
                console.log('Product created successfully.');
                navigate('/')
            })
            .catch((error) => {
                // Handle error
                console.error('Error creating product:', error);
            });

    };
    return (
        // cách trước 3 phân, nội dung 6 phân: đoạn sau kệ thôi
        <Form className="col-md-6 offset-md-3">
            <h1 className="d-flex justify-content-center">{!id ? 'Create New Product' : "Update Product"}</h1>
            <div className="row">

                <Form.Group className="col-md-6" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control disabled />
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" required placeholder="Title" ref={titleRef} />
                    <Form.Text className="text-danger">
                        {titleRef.current && !titleRef.current.value && "* This field is required"}
                    </Form.Text>

                </Form.Group>
            </div>

            <div className="row">

                <Form.Group className="col-md-6" controlId="formBasicEmail" >
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" required placeholder="0" ref={priceRef} />
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="number" required placeholder="0" ref={discountPercentageRef} />
                </Form.Group>
            </div>

            <div className="row">

                <Form.Group className="col-md-6" controlId="formBasicEmail">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control placeholder="0" type="number" ref={ratingRef} />
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" placeholder="0" ref={stockRef} />
                </Form.Group>
            </div>

            <div className="row">

                <Form.Group className="col-md-6" controlId="formBasicEmail">
                    <Form.Label>Brand</Form.Label>
                    <Form.Select aria-label="Default select example" ref={brandRef}>
                        {
                            brand?.map(e => (
                                <option value={e._id} key={e?._id} >{e.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    {/* as="select" */}
                    <Form.Select aria-label="Default select example" ref={categoryRef}>
                        {
                            category?.map(e => (
                                <option value={e?._id} key={e?._id} >{e.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
            </div>

            <div className="row">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} ref={descriptionRef} />
                </Form.Group>
            </div>

            <div className="row">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    {/* <Form.Label>Upload </Form.Label> */}
                    <Form.Control type="file" onChange={takeImage} />
                </Form.Group>
            </div>

            {/* <Form.Group className="col-md-6" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Add
            </Button>
        </Form>
    );
};

export default CreateProduct;
