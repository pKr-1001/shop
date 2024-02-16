import './App.css';
import { useState } from "react";
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import images from './img/bg.png';
import {data, image} from './data.js';
import { Routes, Route, Link, useNavigate, Outlet, useParams  } from 'react-router-dom';

// import {a,b,c} from './data.js';


function App() {
    let [shoes, fixed] = useState(data)
    let navigate = useNavigate();
  return (
    <div className="App">
        <Navbar bg="dark" data-bs-theme="dark" className='navbar'>
        <Container>
          <Navbar.Brand href="#home">Park's Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

        <Routes>
            <Route path='/' element = {
                <>
                    <div className='main-bg' style={{ backgroundImage : 'url('+ images +')'}}></div>
                            <button onClick={() => {
                                let copy = [...shoes]
                                copy.sort((a,b) => a.title.localeCompare(b.title))
                                fixed(copy)
                            }}>Change content in alphabetical</button>
                    <div className='container'>
                        <div className='row'>
                            {
                                shoes.map(function(a,i) {
                                    return (
                                        <Product shoes={shoes[i]} i = {i}></Product>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
        }/>
        <Route path='/detail/:id' element={<Detail shoes={shoes}></Detail>}></Route>
            <Route path='/about' element={<About></About>}>
                <Route path='member' element={<div>member</div>}/>
                <Route path='location' element={<div>location info</div>}/>
            </Route>
            <Route path='/event' element={<Event></Event>}>
                <Route path='one' element={<p>50% off on your first order</p>}/>
                <Route path='two' element={<p>20% off coupon</p>}/>
            </Route>
            <Route path='*' element={<div>Doesn't Exist 404</div>}></Route>
        </Routes>
    </div>
  );
}

function Event() {
    return(
        <div>
            <h4>Today's Event</h4>
            <Outlet></Outlet>
        </div>
    )
}

function About() {
    return (
        <div>
            <h4> Compnay Info</h4>
            <Outlet></Outlet>
        </div>
    )
}

function Detail(props) {
    let {id} = useParams();
    return (
        <div className='containter'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={'https://codingapple1.github.io/shop/shoes' + (parseInt(id) + 1) + '.jpg'} width="60%"></img>
                </div>
                <div className='col-md-6'>
                    <h4 className='pt-5'>{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}</p>
                    <button className='btn btn-danger'>order</button>
                </div>
            </div>
        </div>
    )
}

function Product(props) {
    return (
        <div>
            <img src={require(`./img/shoes${props.i+1}.png`)} width="80%"></img>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </div>
    )
}

export default App;
