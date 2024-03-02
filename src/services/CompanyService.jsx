import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { LoginComponent } from "../components/LoginComponent";

const BASE_REST_API_URL = "http://localhost:8180/company";
const SIGNUP_URL = "http://localhost:8180/signup";
const LOGIN_URL = "http://localhost:8180/login";


class CompanyService {
    // const {auth}=useContext(AuthContext)
    getAllFunds() {
        // const token ="eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0YXRhIiwicm9sZSI6IiIsImlhdCI6MTcwOTM1ODMxNywiZXhwIjoxNzA5OTYzMTE3fQ.v_8E8hLPandvzSsl82Sh8GkEWVXC4hbCm2_QLOuVhdS7GjAC1R80jkm3aMFxy0Ka"
        const token = localStorage.getItem('token');
        console.log('accesstoken',token);
        return axios.get(BASE_REST_API_URL + "/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    addCompany(company) {
        return axios.post(BASE_REST_API_URL + "/add", company);
    }

    getCompanyById(id) {
        return axios.get(BASE_REST_API_URL + "/one/" + id);
    }

    updateCompany(id, company) {
        return axios.put(BASE_REST_API_URL + "/update/" + id, company);
    }

    deleteCompany(id) {
        return axios.delete(BASE_REST_API_URL + "/delete/" + id);
    }

    saveUserRegistration(user) {
        return axios.post(SIGNUP_URL, user);
    }
    userLogin(user) {
        return axios.post(LOGIN_URL, user);
    }
}

export default new CompanyService();






