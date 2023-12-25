import React from 'react';

// css
import "./home.css"

// Carousel
import Carousel from 'react-bootstrap/Carousel';

//images
import slide1 from '../../Assets/slide1.jpg';
import slide2 from '../../Assets/slide2.jpg';

const Home = () => {
    return (
        <React.Fragment>
            <Carousel>
                <Carousel.Item>
                    <img className="w-100 d-block" src={slide1} alt="Slide 1" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Akwad Arabia</h5>
                        <p>Akwad</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="w-100 d-block" src={slide2} alt="Slide 2" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Akwad Arabia</h5>
                        <p>Akwad</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="w-100 d-block" src={slide1} alt="Slide 3" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Akwad Arabia</h5>
                        <p>Akwad</p>
                    </div>
                </Carousel.Item>
            </Carousel>
        </React.Fragment>
    )
}

export default Home