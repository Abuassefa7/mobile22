// Import the css files
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from "./markup/pages/AboutUs";
// Import the custom css file
import "./assets/styles/custom.css";
import Home from "./markup/pages/Home";

import Footer from "./markup/components/Footer/Footer";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./markup/components/Header/Header";
import ServicesPublic from "./markup/pages/ServicesPublic";

import RepairServiceDetailsPublic from "./markup/pages/RepairServiceDetailsPublic";
import ContactUs from "./markup/components/contactUs/ContactUs";
// import Basement from "./markup/components/Home/Basement/Basement";
import SingleProductPublic from "./markup/pages/SingleProductPublic";
import ProductsPublic from "./markup/pages/ProductsPublic";
import AddProduct from "./markup/pages/Admin/Products/AddProduct";
import Employees from "./markup/pages/Admin/Employee/Employees";
import EmployeeEdit from "./markup/pages/Admin/Employee/EmployeeEdit";
import AddEmployee from "./markup/pages/Admin/Employee/AddEmployee";
import AddCustomer from "./markup/pages/Admin/Customer/CustomerAdd";
// import EmployeesList from "./markup/components/Admin/Employee/EmployeesList/EmployeesList";
import UpdateProduct from "./markup/pages/Admin/Products/UpdateProduct";
import ProductsList from "./markup/pages/Admin/Products/ProductsList";
import OneProduct from "./markup/pages/Admin/Products/OneProduct";
import Login from "./markup/components/Login/Login";
import Resetpassword from "./markup/components/ResetPassword/ResetPassword";
import Forgotpasswordreq from "./markup/components/Forgotpasswordreq/Forgotpasswordreq";
import Resetforgotpassword from "./markup/components/Resetforgotpassword/Resetforgotpassword";
import Dashboard from "./markup/pages/Admin/Dahboard/Dashboard";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Unauthorized from "./markup/pages/Unauthorized";
import { useEffect } from "react";
import Customers from "./markup/pages/Admin/Customer/Customers";
import CustomerEdit from "./markup/pages/Admin/Customer/CustomerEdit";
import Customerprofile from "./markup/pages/Admin/Customer/Customerprofile";
import Services from "./markup/pages/Admin/Services/Services";
import NewOrder from "./markup/pages/Admin/Order/NewOrder";
import Orders from "./markup/pages/Admin/Order/Orders";
import OrderDetailPage from "./markup/pages/OrderDetail/OrderDetailPage";
import UpdateOrder from "./markup/pages/Admin/Order/UpdateOrder";
import BasmentServices from "./markup/pages/Admin/HousingService/BasmentServices";
import Rias from "./markup/pages/Admin/Ria/Rias";
import ExtraInfo from "./markup/pages/ExtraInfo";
import AdminDashboard from "./markup/components/Admin/AdminDashboard/AdminDashboard";

function App() {
	//  Use the location hook to access the current URL's pathname to start from top
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/services" element={<ServicesPublic />} />
				<Route
					path="/services/phone-repair"
					element={<RepairServiceDetailsPublic />}
				/>
				<Route
					path="/services/t&i-repair"
					element={<RepairServiceDetailsPublic />}
				/>
				<Route
					path="/services/l&m-repair"
					element={<RepairServiceDetailsPublic />}
				/>
				<Route path="/contact" element={<ContactUs />} />
				<Route path="/aboutUs" element={<AboutUs />} />
				<Route path="/products" element={<ProductsPublic />} />
				<Route path="/products/single/:id" element={<SingleProductPublic />} />
				<Route path="/admin" element={<Dashboard />} />
				<Route path="/resetpassword" element={<Resetpassword />} />
				<Route path="/forgot-password" element={<Forgotpasswordreq />} />
				<Route path="/forgotpassword-reset" element={<Resetforgotpassword />} />
				<Route path="/order-status/:order_hash" element={<OrderDetailPage />} />

				{/* admin routes */}
				<Route
					path="/admin/new-product"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<AddProduct />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/update-product/:pid"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<UpdateProduct />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/products"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<ProductsList />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/products/:pid"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<OneProduct />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/add-employee"
					element={
						<PrivateAuthRoute roles={[1]}>
							<AddEmployee />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/add-customer"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<AddCustomer />
						</PrivateAuthRoute>
					}
				/>

				<Route
					path="/admin/employees"
					element={
						<PrivateAuthRoute roles={[1]}>
							<Employees />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/customers"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<Customers />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/employee/edit/:id"
					element={
						<PrivateAuthRoute roles={[1]}>
							<EmployeeEdit />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/customer/edit/:id"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<CustomerEdit />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/customer-profile/:customer_id"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<Customerprofile />
						</PrivateAuthRoute>
					}
				/>
				<Route path="/unauthorized" element={<Unauthorized />}></Route>

				<Route
					path="/admin/services"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<Services />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/new-order"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<NewOrder />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/orders"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<Orders />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/orders/edit/:order_id"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<UpdateOrder />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/rent"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<BasmentServices />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/ria"
					element={
						<PrivateAuthRoute roles={[1, 2]}>
							<Rias />
						</PrivateAuthRoute>
					}
				/>
				<Route path="/info" element={<ExtraInfo />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
