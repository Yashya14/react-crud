import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [userData, setUserData] = useState([]);
  

  const getUsersData = async () => {
    await axios
      .get("http://localhost:3000/users")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log("error", err));
  };

  console.log(userData);

  useEffect(() => {
    getUsersData();
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      axios.delete("http://localhost:3000/users/" +id).then((res) => {
        console.log(res.name)
        toast.success("Deleted successfully");
        // location.reload();   
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center bg-light vh-100">
      <h1>Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4 ">
        <div className="d-flex justify-contnet-end">
          <Link to="/create" className="btn btn-sm btn-success">
            Add
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((data, idx) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <Link
                  to={`/read/${data.id}`}
                  className="btn btn-sm btn-primary m-2"
                >
                  View
                </Link>
                <Link
                  to={`/update/${data.id}`}
                  className="btn btn-sm btn-dark m-2"
                >
                  Edit
                </Link>
                <button onClick={e => handleDelete(data.id)} className="btn btn-sm btn-danger m-2">
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
