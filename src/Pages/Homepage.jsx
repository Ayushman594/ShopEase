import ShopNavbar from "../Components/Navbar"
import logo from '../assets/Images/Logo (1).png'
import CarouselFadeExample from "../Components/Carousel"
import { Link } from "react-router-dom"
import './HomePageStyles/Homepage.css'
function Homepage() {

  const exploreClothings=[{
      img:'https://m.media-amazon.com/images/I/61D2GVIp-RL._AC_UL480_QL65_.jpg',
      name:'Neck/Round Neck Half Sleeve Tshirt for Men',
   },{
     img:'https://m.media-amazon.com/images/I/61yAbOVbQ6L._AC_UL480_QL65_.jpg',
     name:"Allen Solly Men’s Polo T‑Shirt",
   },{
    img:'https://m.media-amazon.com/images/I/71fOul+EKOL._AC_UL480_QL65_.jpg',
    name:"URBAN POCKETS Jeans Denim for Men",
  }]


  const exploreSportProducts=[{
     img:'https://m.media-amazon.com/images/I/71H7H99Dg4L._AC_SR480%2C570_.jpg',
     name:'Plastic Cricket Bat',
  },{
    img:'https://m.media-amazon.com/images/I/61qgmkl8a9L._AC._SR360,460.jpg',
    name:'DSC Beamer Cricket Shoes for Mens',
  },{
    img:'https://m.media-amazon.com/images/I/51QsIn-sTAL.AC_SX250.jpg',
    name:'Nivia Dominator 3.0 Football',
  }]
  
  const exploreElectronics=[{
     img:'https://m.media-amazon.com/images/I/61TyCpcEVCL._AC_SR480,440_.jpg',
     name:'Mirrorless Camera',
  },{
    img:'https://m.media-amazon.com/images/I/7121jjZo6HL._AC._SR360,460.jpg',
    name:'HP Original 65W Laptop Charger with Power Cable',
  },{
    img:'https://m.media-amazon.com/images/I/71dZBla7wUL._AC_SR480,440_.jpg',
    name:'Nothing Phone (3a Lite) (Black, 128 GB) (8 GB RAM)',
  }]


  return (
    <>
      <ShopNavbar/>
      <CarouselFadeExample/>
      <section className="p-4">
         <h3 className="text-primary text-center mb-3">Explore Clothings</h3>
         <div className="clothings-container mt-4">
            {exploreClothings.map((clothes,index)=>{
                 return (
                     <div className="home-clothes-card" key={index}>
                        <img src={clothes.img} alt="" />
                        <div>
                            <h3 className="text-primary fs-4 px-3 mt-2">{clothes.name}</h3>
                        </div>
                     </div>
                 )
            })}
         </div>
      </section>
      <section className="p-4">
        <h3 className="text-primary text-center mb-3">Explore Sports Products</h3>
         <div className="sports-container mt-4">
            {exploreSportProducts.map((sports,index)=>{
                 return (
                     <div className="home-sports-card" key={index}>
                        <img src={sports.img} alt="" />
                        <div>
                            <h3 className="text-primary fs-4 px-3 mt-2">{sports.name}</h3>
                        </div>
                     </div>
                 )
            })}
         </div>
      </section> 
      <section className="p-4">
         <h3 className="text-primary text-center mb-3">Explore Electronics</h3>
         <div className="electronics-container mt-4">
            {exploreElectronics.map((items,index)=>{
                 return (
                     <div className="home-electronics-card" key={index}>
                        <img src={items.img} alt="" />
                        <div>
                            <h3 className="text-primary fs-4 px-5 pb-3 mt-2">{items.name}</h3>
                        </div>
                     </div>
                 )
            })}
         </div>
      </section>
      <section className="p-3">
         <h3 className="text-primary text-center mb-4">Special Offers</h3>
         <div className="d-flex justify-content-around flex-wrap">
            <div className="border offer border-dark rounded p-5">
                <h3 className="fs-1 text-center">🏷️</h3>
                <p className="fs-5 text-center text-light">Up to <strong>50% Off</strong></p>
            </div>
            <div className="border offer  border-dark rounded p-5">
                <h3 className="fs-1 text-center">🚚</h3>
                <p className="fs-5 text-center text-light">Free delivery on Orders above ₹ 999</p>
            </div>
         </div>
      </section>
      <footer className="mt-4">
         <div className="container">
            <div className="row">
                <div className="col">
                    <h3 className="fs-4"><img src={logo}  className="footer-logo" alt="ShopEase Logo" />ShopEase</h3>
                    <p className="fs-6">ShopEase is your one-stop destination for all your shopping needs. We offer a wide range of products, from clothing and electronics to sports equipment and more. Our mission is to provide you with the best shopping experience possible.</p>
                </div>
                <div className="col ms-5">
                     <h3 className="fs-4">Quick Links</h3>
                     <Link className="fs-6" to='/'>Home</Link>
                     <Link className="fs-6" to='/products'>Shop</Link>
                     <Link className="fs-6" to="/about">About Us</Link>
                     <Link className="fs-6" to="/contact">Contact</Link>
                </div>
                <div className="col">
                    <h3 className="fs-4">Contact Us</h3>
                    <p className="fs-6">Email: info@shopease.com</p>
                    <p className="fs-6">Phone: +1 234 567 890</p>
                </div>
                  <div className="col">
                     <h3 className="fs-4">Our Policies</h3>
                     <Link className="fs-6" to='/terms'>Terms and Conditions</Link>
                  </div>
                  
            </div>
         </div>
      </footer>
    </>
  )
}

export default Homepage
