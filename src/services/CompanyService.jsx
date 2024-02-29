import axios from "axios"

const BASE_REST_API_URL="http://localhost:8180/company"

class CompanyService{
    getAllFunds(){
            return axios.get(BASE_REST_API_URL+"/all")
    }

    addCompany(company){
        return(axios.post(BASE_REST_API_URL+"/add",company))
    }

    getCompanyById(id){
        return axios.get(BASE_REST_API_URL+"/one/"+id);
    }

    updateCompany(id, company){
        return (axios.put(BASE_REST_API_URL+"/update/"+id,company));
    }
    deleteCompany(id){
        return axios.delete(BASE_REST_API_URL+"/delete/"+id);
    }
}
export default  new CompanyService();