import React, { useState } from "react";
import employeeService from "../../../../../services/employee.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function EmployeeForm() {
  const navigate = useNavigate();
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_username, setUserName] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActiveEmployee] = useState("");
  const [company_role_id, setCompanyRoleId] = useState("");
  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "employee_email":
        setEmail(value);
        break;
      case "employee_first_name":
        setFirstName(value);
        break;
      case "employee_last_name":
        setLastName(value);
        break;
      case "employee_phone":
        setPhoneNumber(value);
        break;
      case "employee_username":
        setUserName(value);
        break;
      case "employee_password":
        setPassword(value);
        break;
      case "active_employee":
        setActiveEmployee(parseInt(value, 10));
        break;
      case "company_role_id":
        setCompanyRoleId(parseInt(value, 10));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    // First name is required
    if (!employee_first_name) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }
    // Email is required
    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!valid) return;

    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_username,
      employee_password,
      active_employee,
      company_role_id,
    };

    employeeService
			.createEmployee(formData, loggedInEmployeeToken)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setServerError(data.error);
				} else {
					setSuccess(true);
					setServerError("");
					setTimeout(() => {
						navigate("/admin/employees");
					}, 2000);
				}
			})
			.catch((error) => {
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();
				setServerError(resMessage);
			});
  };

  return (
    <div className="">
      <div className="admin-title">
        <h1>Add Employee</h1> <br /> <br />
      </div>
      <div className="product-back">
        <div className="login-register-area white">
          <div className="">
            <div className="row">
              <div className=" col-md-12">
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                      <div className="input-field">
                        <input
                          className="input-option"
                          type="email"
                          name="employee_email"
                          placeholder="email"
                          value={employee_email}
                          onChange={handleChange}
                        />
                        {emailError && (
                          <div className="validation-error" role="alert">
                            {emailError}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field">
                        <input
                          type="text"
                          name="employee_first_name"
                          placeholder="First name"
                          value={employee_first_name}
                          onChange={handleChange}
                        />
                        {firstNameError && (
                          <div className="validation-error" role="alert">
                            {firstNameError}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field">
                        <input
                          type="text"
                          name="employee_last_name"
                          placeholder="Last name"
                          value={employee_last_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="input-field">
                        <input
                          type="text"
                          name="employee_phone"
                          value={employee_phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="input-field">
                        <select
                          className="input-option"
                          name="active_employee"
                          value={active_employee}
                          onChange={handleChange}
                        >
                          <option value={""} >--Employee status---</option>
                          <option value={1}>Yes</option>
                          <option value={0}>No</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="col-md-12">
                      <div className="input-field">
                        <select
                          className="input-option"
                          name="company_role_id"
                          value={company_role_id}
                          onChange={handleChange}
                        >
                          <option value="">--Employee Role---</option>
                          <option value={1}>Admin</option>
                          <option value={2}>Employee</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field">
                        <input
                          type="text"
                          name="employee_username"
                          placeholder="user name"
                          value={employee_username}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field">
                        <input
                          type="text"
                          name="employee_password"
                          placeholder="password"
                          value={employee_password}
                          onChange={handleChange}
                        />
                        {passwordError && (
                          <div className="validation-error" role="alert">
                            {passwordError}
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="submit" className="thm-btn bg-1">
                      Add Employee
                    </button>
                    {success && (
                      <div className="success-message">
                        Employee added successfully!
                      </div>
                    )}
                    {serverError && (
                      <div className="validation-error" role="alert">
                        {serverError}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
