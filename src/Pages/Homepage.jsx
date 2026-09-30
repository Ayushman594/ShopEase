import ShopNavbar from "../Components/Navbar"
import CarouselFadeExample from "../Components/Carousel"
import './PageStyles/Homepage.css'
function Homepage() {

  const exploreClothings=[{
      img:'https://m.media-amazon.com/images/I/61D2GVIp-RL._AC_UL480_QL65_.jpg',
      name:'Neck/Round Neck Half Sleeve Tshirt for Men',
      ratings:'⭐️⭐️⭐️⭐️'
  },{
     img:'https://m.media-amazon.com/images/I/61yAbOVbQ6L._AC_UL480_QL65_.jpg',
     name:"Allen Solly Men’s Polo T‑Shirt",
     ratings:'⭐⭐⭐⭐⭐'
  },{
    img:'https://m.media-amazon.com/images/I/71fOul+EKOL._AC_UL480_QL65_.jpg',
    name:"URBAN POCKETS Jeans Denim for Men",
    ratings:'⭐️⭐️⭐️⭐️'
  }]


  const exploreSportProducts=[{
     img:'https://m.media-amazon.com/images/I/71H7H99Dg4L._AC_SR480%2C570_.jpg',
     name:'Plastic Cricket Bat',
     ratings:'⭐️⭐️⭐️⭐️'
  },{
    img:'https://m.media-amazon.com/images/I/61qgmkl8a9L._AC._SR360,460.jpg',
    name:'DSC Beamer Cricket Shoes for Mens',
    ratings:'⭐️⭐️⭐️⭐️'
  },{
    img:'https://m.media-amazon.com/images/I/51QsIn-sTAL.AC_SX250.jpg',
    name:'Nivia Dominator 3.0 Football',
    ratings:'⭐⭐⭐⭐⭐'
  }]
  
  const exploreElectronics=[{
     img:'https://m.media-amazon.com/images/I/61TyCpcEVCL._AC_SR480,440_.jpg',
     name:'Mirrorless Camera',
     ratings:'⭐⭐⭐⭐⭐'
  },{
    img:'https://m.media-amazon.com/images/I/7121jjZo6HL._AC._SR360,460.jpg',
    name:'HP Original 65W Laptop Charger with Power Cable',
    ratings:'⭐⭐⭐⭐⭐'
  },{
    img:'https://m.media-amazon.com/images/I/71dZBla7wUL._AC_SR480,440_.jpg',
    name:'Nothing Phone (3a Lite) (Black, 128 GB) (8 GB RAM)',
    ratings:'⭐⭐⭐⭐'
  }]
  return (
    <>
      <ShopNavbar/>
      <CarouselFadeExample/>
      <section className="p-4">
         <h3 className="text-primary text-center mb-3">Explore Clothings</h3>
         <div className="clothings-container mt-4">
            {exploreClothings.map((clothes)=>{
                 return (
                     <div className="home-clothes-card">
                        <img src={clothes.img} alt="" />
                        <div>
                            <h3 className="text-primary fs-4 px-3 mt-2">{clothes.name}</h3>
                            <p className="text-center px-3">{clothes.ratings}</p>
                        </div>
                     </div>
                 )
            })}
         </div>
      </section>
      <section className="p-4">
        <h3 className="text-primary text-center mb-3">Explore Sports Products</h3>
         <div className="sports-container mt-4">
            {exploreSportProducts.map((sports)=>{
                 return (
                     <div className="home-sports-card">
                        <img src={sports.img} alt="" />
                        <div>
                            <h3 className="text-primary fs-4 px-3 mt-2">{sports.name}</h3>
                            <p className="text-center px-3">{sports.ratings}</p>
                        </div>
                     </div>
                 )
            })}
         </div>
      </section> 
      <section className="p-4">
         <h3 className="text-primary text-center mb-3">Explore Electronics</h3>
         <div className="electronics-container mt-4">
            {exploreElectronics.map((items)=>{
                 return (
                     <div className="home-electronics-card">
                        <img src={items.img} alt="" />
                        <div>
                            <h3 className="text-primary fs-4 px-3 mt-2">{items.name}</h3>
                            <p className="text-center px-3">{items.ratings}</p>
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
                <p className="fs-3 text-light">Up to <strong>50% Off</strong></p>
            </div>
            <div className="border offer w-25 border-dark rounded p-5">
                <h3 className="fs-1 text-center">🚚</h3>
                <p className="fs-3 text-light">Free delivery on Orders above ₹ 999</p>
            </div>
         </div>
      </section>
    </>
  )
}

export default Homepage
