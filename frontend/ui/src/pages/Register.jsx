import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import "../css/Register.css";
import regImage from "../assets/reg.jpg";


export default function Register() {
  const [form, setForm] = useState({
    email: "", password: "", name: "", mobile: "", eventName: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) setErrors(data);
      else { setMessage("Registered successfully!"); setErrors({}); }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

 return (
   <div className="register-page">
     <div className="register-wrapper">

       {/* Left Side */}
       <div className="register-container">

         <h2>Welcome to pixelbloom</h2>

         <form onSubmit={handleSubmit}> <InputField name="email" placeholder="Email" value={form.email} onChange={handleChange}
            autoComplete="email" error={errors.email} />

           <InputField name="password" placeholder="Password" type="password" value={form.password}
             onChange={handleChange} autoComplete="current-password" error={errors.password} />

           <InputField name="name" placeholder="Name" value={form.name} onChange={handleChange} error={errors.name}/>

           <InputField name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} error={errors.mobile} />

           <select
             name="eventName"  value={form.eventName}  onChange={handleChange}>
             <option value="">Select Event</option>
             {["MEETUP", "CONFERENCE", "WORKSHOP", "WEBINAR"]
               .map((e) => (
                 <option key={e} value={e}>
                   {e}
                 </option>      ))}
           </select>

           {errors.eventName && ( <p className="error-text">   {errors.eventName} </p> )}

          <button type="submit"> Register </button>


          {message && <p className="success-text">{message}</p>}
          {errors.error && <p className="error-text">{errors.error}</p>}

         </form>

         <p className="login-link">
           Already have an account?
           <Link to="/login"> Login Here</Link>
         </p>

       </div>

       {/* Right Side */}
       <div className="image-section">
         <img src={regImage} alt="Fluid" />
       </div>

     </div>
   </div>
 );
}
