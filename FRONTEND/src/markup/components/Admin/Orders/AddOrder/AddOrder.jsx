import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiSearch } from "react-icons/ci";
import customerService from "../../../../../services/customer.service";
import deviceService from "../../../../../services//device.service";
// import searchCustomer
import SearchCustomer from "../SearchCustomer/SearchCustomer";
import CustomerDevice from "../CustomerDevice/CustomerDevice";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { useLocation } from "react-router-dom";

function AddOrder() {
	const location = useLocation();
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [allCustomers, setAllCustomers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterdCustomers, setFilteredCustomer] = useState([]);
	const [isCustomerSelected, setIsCustomerSelected] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState({});
	const [customerDevices, setCustomerDevices] = useState([]);
	const { employee } = useAuth();
	let token = null;
	if (employee) {
		token = employee.employee_token;
	}
	useEffect(() => {
		if (token) {
			const getCustomers = async () => {
				try {
					let response = await customerService.getAllCustomers(token);
					if (!response.ok) {
						setApiError(true);
						if (response.status === 401) {
							setApiErrorMessage("Please login again");
						} else if (response.status === 403) {
							setApiErrorMessage("You are not authorized to view this page");
						} else {
							setApiErrorMessage("Please try again later");
						}
					} else {
						const data = await response.json();

						if (data.customers.length !== 0) {
							setAllCustomers(data.customers);
						}
					}
				} catch (error) {
					console.log(`Error: ${error}`);
				}
			};
			getCustomers();
		}
	}, [token]);
	// do the filter based on the search key word
	const handleInputChange = (event) => {
		setSearchQuery(event.target.value.toLowerCase());
		const filteredCustomers = searchQuery
			? allCustomers.filter(
					(customer) =>
						customer.customer_first_name.toLowerCase().includes(searchQuery) ||
						customer.customer_last_name.toLowerCase().includes(searchQuery) ||
						customer.customer_email.toLowerCase().includes(searchQuery) ||
						customer.customer_phone_number.includes(searchQuery)
			  )
			: [];
		// Display the filtered customer list or perform any other action

		setFilteredCustomer(filteredCustomers);
	};

	// function to manage if customer is selected or not
	const handleCustomerSelection = async (customer) => {
		setIsCustomerSelected(true);
		setSelectedCustomer(customer);
		// fetch customer device using customer_id
		const response = await deviceService.getDevicesPerCustomer(
			token,
			customer.customer_id
		);
		const customerDevices = await response.json();
		if (customerDevices.status == "fail") {
			setCustomerDevices([]);
		} else {
			setCustomerDevices(customerDevices);
		}
	};
	// for adding order from the customer profile page
	const dataFromProfile = location?.state;
	return (
		<div className="product-back customerprofile order">
			{apiError ? (
				<section className="contact-section categories-area">
					<div className="auto-container">
						<div className="contact-title">
							<h2>{apiErrorMessage}</h2>
						</div>
					</div>
				</section>
			) : (
				<section className="contact-section categories-area">
					<div className="auto-container">
						<div className="admin-title">
							<h1
								style={{
									color: "#152545",
									marginLeft: "15px",
									display: "flex",
									alignItems: "center",
								}}
							>
								Creat a new order{" "}
								<span
									style={{
										flexGrow: 1,
										height: "4px",
										backgroundColor: "#43c3ea",
										marginLeft: "15px",
										marginTop: "20px",
										maxWidth: "60px",
									}}
								></span>{" "}
							</h1>
							<br /> <br />
						</div>
						{!dataFromProfile ? (
							<>
								{!isCustomerSelected ? (
									<>
										<SearchCustomer
											filterdCustomers={filterdCustomers}
											handleCustomerSelection={handleCustomerSelection}
											handleInputChange={handleInputChange}
											searchQuery={searchQuery}
										/>
									</>
								) : (
									<>
										<CustomerDevice
											customer={selectedCustomer}
											devices={customerDevices}
										/>
									</>
								)}
							</>
						) : (
							<>
								<CustomerDevice
									customer={dataFromProfile.customer}
									devices={dataFromProfile.addDevices}
								/>
							</>
						)}
					</div>
				</section>
			)}
		</div>
	);
}

export default AddOrder;
