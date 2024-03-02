import React, { useState, useEffect } from "react";
import FundService from "../services/CompanyService";
import { Link, useParams, useNavigate } from "react-router-dom";
import CompanyService from "../services/CompanyService";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fundtype, setFundType] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const changeTitle = () => {
    if (id) {
      console.log("returned title update company,Id value from url:", id);
      return <h2 className="text-center">Update Company</h2>;
    } else {
      console.log("returned title add company");
      return <h2 className="text-center">Add Company</h2>;
    }
  };

  useEffect(() => {
    console.log("useeffect triggered..");
    console.log("id value received from url usign useParams()", id);
    if (id) {
      CompanyService.getCompanyById(id)
        .then((response) => {
          console.log(
            "Data received from getbyId api ",
            JSON.stringify(response.data)
          );
          const companyData = response.data;
          setName(companyData.name);
          setEmail(companyData.email);
          setAddress(companyData.address);
          setUsername(companyData.user.username);
          setPassword(companyData.user.password);
          console.log("state variable changed..");
        })
        .catch((err) => {
          console.log("err from get api", err);
        });
    }
  }, [id]);

  const saveOrUpdateCompany = (e) => {
    e.preventDefault();
    const user = { username, password, email };
    const company = { name, email, address, user };

    console.log(company);
    console.log("company object received from :", company);
    if (id) {
      CompanyService.updateCompany(id, company)
        .then((response) => {
          console.log(
            "Response received from save api..",
            JSON.stringify(response.data)
          );
          navigate('/')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      CompanyService.addCompany(company)
        .then((response) => {
          console.log(
            "Response received from save api..",
            JSON.stringify(response.data)
          );
        })
        .catch((err) => {
          console.log(err);
        });
        navigate('/')
    }
  };

  return (
    <div>
      {console.log("App rendered...")}
      <div className="container">
        <div className="card col-md-6 offset-md-3">
          {changeTitle()}
          <div className="card-body">
            <form>
              {/* name text box */}
              <div className="form-group mb-2">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  name="cname"
                  value={name}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* email box */}
              <div className="form-group mb-2">
                <label className="form-label">Company Email Id</label>
                <input
                  type="email"
                  placeholder="Enter company Email id"
                  name="cemail"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* address textbox */}

              <div className="form-group mb-2">
                <label className="form-label">Company Address</label>
                <input
                  type="address"
                  placeholder="Enter company Address"
                  name="caddress"
                  value={address}
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {/* user details */}
              {/* username textbox */}
              { !id && ( <div>
              <div className="form-group mb-2">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* password textbox */}
              <div className="form-group mb-2">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              </div>
              )}

              {/* email box */}
              <div className="form-group mb-2">
                <label className="form-label">Company Email Id</label>
                <input
                  type="email"
                  placeholder="Enter company Email id"
                  name="cemail"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* submit button */}

              <button
                onClick={(e) => saveOrUpdateCompany(e)}
                className="btn btn-success"
              >
                Submit
              </button>
              <Link to="/" className="btn btn-danger float-end">
                cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
