import Navbar from '../Components/Navbar';
import './HomePageStyles/ContactPage.css';
import { useForm } from 'react-hook-form';
import Allservices from '../Services/Services.jsx';
function ContactPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data){
        Allservices.addService('Contacts',data);
        alert("Your message has been sent successfully!");
    }
  return (
    <>
      <Navbar />
      <div className="container contact mt-1">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="fs-5 text-center">We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.</p>
      </div>
        <div className="container contact-form mt-4">
            <form className="w-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" {...register('name', { required: true })} />
                    {errors.name && <span className="text-danger">This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlfor="phoneno" className="form-label">Phone Number</label>
                  <input type="text" className="form-control" id="phoneno" {...register('phoneno', { required: true })} />
                  {errors.phoneno && <span className="text-danger">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" {...register('email', { required: true })} />
                    {errors.email && <span className="text-danger">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="3" {...register('message', { required: true })}></textarea>
                    {errors.message && <span className="text-danger">This field is required</span>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
  )
}

export default ContactPage
