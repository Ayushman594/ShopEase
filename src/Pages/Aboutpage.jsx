import Navbar from "../Components/Navbar";
import './PageStyles/Aboutpage.css'
function Aboutpage() {
  return (
    <>
      <Navbar />
        <div className="container about mt-5">
            <h2 className="text-center mb-4">About ShopEase</h2>
            <p className="fs-5 ">ShopEase is your one-stop destination for all your shopping needs. We offer a wide range of products, from clothing and electronics to sports equipment and more. Our mission is to provide you with the best shopping experience possible.</p>
            <p className="fs-5 ">At ShopEase, we believe in quality and affordability. We carefully select our products to ensure that our customers receive the best value for their money. Our team is dedicated to providing excellent customer service and ensuring that your shopping experience is smooth and enjoyable.</p>
            <p className="fs-5 ">Thank you for choosing ShopEase. We look forward to serving you!</p>
        </div>
      </>
  )
}

export default Aboutpage
