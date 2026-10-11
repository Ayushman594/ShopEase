import Navbar from "../Components/Navbar";
import "./PageStyles/Terms.css";

function Terms() {
  return (
    <>
      <Navbar />

      <div className="terms-page">
        <div className="terms-header">
          <h1>Terms & Conditions</h1>
          <p>
            Welcome to ShopEase! Please read these terms carefully
            before using our website.
          </p>
          <span>Last updated: October 2026</span>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Introduction</h2>
            <p>
              These Terms and Conditions govern your use of ShopEase
              and the purchase of products through our website.
              By accessing or using ShopEase, you agree to these terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. User Accounts</h2>
            <ul>
              <li>You must provide accurate information when registering.</li>
              <li>You are responsible for keeping your login credentials secure.</li>
              <li>You must notify us if you suspect unauthorized access to your account.</li>
              <li>You must not misuse the website or another user's account.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. Products and Pricing</h2>
            <p>
              We aim to display accurate product descriptions, images,
              availability, and prices. Product images may differ slightly
              from the actual product. Prices and availability may change
              without prior notice, subject to applicable law.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Orders</h2>
            <p>
              Placing an order constitutes a purchase request. Orders are
              subject to availability and confirmation. ShopEase may contact
              you if additional information is needed to process an order.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Payments</h2>
            <p>
              ShopEase may offer online payments through Razorpay or other
              supported payment methods. Payments are subject to the
              applicable payment provider's terms and security procedures.
              An order's payment status will be updated according to
              verified payment results.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Shipping and Delivery</h2>
            <p>
              Delivery estimates, shipping charges, and service availability
              will be communicated where applicable. Delivery times may vary
              because of location, product availability, or circumstances
              outside our control.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Cancellations, Returns and Refunds</h2>
            <p>
              Cancellation, return, replacement, and refund requests are
              subject to the applicable policy displayed by ShopEase at
              the time of purchase. Eligible refunds will be processed
              through the applicable payment method or process.
            </p>
            <p>
              Please review the relevant product and order conditions
              before completing your purchase.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. User Responsibilities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use ShopEase for unlawful activities.</li>
              <li>Attempt unauthorized access to our systems or data.</li>
              <li>Submit false, misleading, or fraudulent information.</li>
              <li>Interfere with the website's functionality or security.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>9. Privacy</h2>
            <p>
              Personal information collected through ShopEase should be
              handled in accordance with our Privacy Policy and applicable
              data protection laws. Please review our Privacy Policy to
              understand how information is collected, used, and protected.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Limitation of Liability</h2>
            <p>
              To the extent permitted by applicable law, ShopEase is not
              responsible for indirect losses arising from website use or
              service interruptions. Nothing in these terms excludes or
              limits liability where such exclusion or limitation is
              prohibited by law.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Changes to These Terms</h2>
            <p>
              We may update these Terms and Conditions from time to time.
              Updated terms will be published on this page with a revised
              update date. Continued use of ShopEase after changes take
              effect is subject to applicable law.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Contact Us</h2>
            <p>
              If you have questions about these Terms and Conditions,
              please contact us through the Contact page on ShopEase.
            </p>
          </section>
        </div>

        <div className="terms-footer">
          <p>Thank you for shopping with ShopEase!</p>
        </div>
      </div>
    </>
  );
}

export default Terms;
