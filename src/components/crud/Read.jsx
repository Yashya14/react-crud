import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Read = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();
  console.log(id);

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

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-start mt-5 ">
      <div className="sm:w-50 border shadow bg-white px-5 pt-3 pb-5 m-2 rounded-5">
        <h4>ID : {id}</h4>
        <h5>Name : {data.name}</h5>
        <h5>Email : {data.email}</h5>
        <h5>Phone : {data.phone}</h5>
        <div className="mt-2">
          <Link to={`/update/${id}`} className="btn btn-sm btn-success">
            Edit
          </Link>
          <Link to="/" className="btn btn-sm btn-dark m-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Read;
