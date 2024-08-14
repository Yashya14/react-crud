import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const name = useId();
  const email = useId();
  const phone = useId();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", data)
      .then((res) => {
        setData(res.data);
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-start mt-5">
      <div className="md:w-50 sm:w-50 border bg-white shadow px-5 pt-3 pb-3 rounded ">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor={name}>Name : </label>
            <input
              type="text"
              name="name"
              id={name}
              placeholder="enter your name"
              className="form-control mt-2"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor={email}>Email : </label>
            <input
              type="email"
              name="email"
              id={email}
              placeholder="enter your email"
              className="form-control mt-2"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor={phone}>Phone : </label>
            <input
              type="phone"
              name="phone"
              id={phone}
              placeholder="enter your phone number"
              className="form-control mt-2"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2 pt-2">
            <button className="btn btn-sm btn-success">Submit</button>
            <Link to="/" className="btn btn-sm btn-primary ms-3">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
