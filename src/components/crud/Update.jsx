import React, { useId, useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const name = useId();
  const email = useId();
  const phone = useId();

  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    await axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
      .put("http://localhost:3000/users/" + id, data)
      .then((res) => {
        setData(res.data);
        navigate("/");
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-start mt-5">
      <div className="md:w-50 sm:w-50 border bg-white shadow px-5 pt-3 pb-3 rounded ">
        <h1>Edit User</h1>
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
              value={data.name}
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
              value={data.email}
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
              value={data.phone}
            />
          </div>
          <div className="mb-2 pt-2">
            <button className="btn btn-sm btn-success">Update</button>
            <Link to="/" className="btn btn-sm btn-primary ms-3">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
