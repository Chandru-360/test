import React, { useEffect, useState } from "react";
import FundService from "../services/CompanyService";
import Hearder from "./Header";
import Footer from "./Footer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CompanyService from "../services/CompanyService";

export const ListCompany = () => {
  //const [state variable,function that can change the state variable]
  const [funds, setFunds] = useState([]);
  const navigate = useNavigate();

  const fetchAllcompany = () => {
    console.log("fetch all company fired");
    CompanyService.getAllFunds().then((response) => {
      console.log("Response received from API", response.data);
      setFunds(response.data);
      console.log("State variable changed with response data");
    });
  };

  const deleteCompany = (id) => {
    let confirmDelete = window.confirm("Are you sure to delete this company?");
    console.log("delete handler fired. ID value received", id);
    if (confirmDelete) {
      CompanyService.deleteCompany(id)
        .then((response) => {
          console.log("Response received from delete api..", JSON.stringify(response.data));
          // After successful deletion, fetch all companies again
          fetchAllcompany();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log("UseEffect fired..");
    fetchAllcompany();
  }, []);

  return (
    <div className="container">
      {console.log("App rendered..")}
      <h2 className="text-center">Company Data</h2>
      <Link to="/addcompany" className="btn btn-primary mb-3">
        Add New Company{" "}
      </Link>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>type</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((company, key) => (
            <tr key={key}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.fundtype}</td>
              <td>{company.address}</td>
              <td>{company.user.email}</td>
              <td>{company.contact}</td>
              <td>
                <Link to={`/update/${company.id}`} className="btn btn-success">
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCompany(company.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
