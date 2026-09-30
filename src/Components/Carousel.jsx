import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css'
import img1 from '../assets/Images/CarouselImage1.png'
import img2 from '../assets/Images/CarouselImage2.png'
import img3 from '../assets/Images/CarouselImage3.png'

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src={img1} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={img2} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={img3} alt="" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
