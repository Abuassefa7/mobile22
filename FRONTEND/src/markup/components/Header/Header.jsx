import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/Logo/Untitled design (7).png";
import FooterLogo from "../../../assets/images/Logo/foooterlogoblack2.png";
import ria from "./../../../assets/images/services/ria-nobackground.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../../Contexts/AuthContext";
import loginService from "../../../services/login.service";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import QRCodeModal from "../QR-CODE/QRCodeModal";

export default function Header() {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const [showServicesMenu, setShowServicesMenu] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// for sticky header and mobile size
	const {
		isSticky,
		isMobile,
		isLogged,
		isAdmin,
		setIsLogged,
		setIsAdmin,
		employee,
	} = useAuth();

	const { pathname } = useLocation();

	// for main menu
	function handleClick() {
		setShowMenu(() => !showMenu);
	}
	// for submenu
	function handleServicesClick() {
		setShowServicesMenu(() => !showServicesMenu);
	}
	// for logout
	const logOut = () => {
		// Call the logout function from the login service
		loginService.logOut();
		// Set the isLogged state to false
		setIsLoading(true);
		setTimeout(() => {
			setIsLogged(false);
			setIsAdmin(false);
			setIsLoading(false);
			navigate("/admin");
		}, 2000);
	};
	return (
		<div className={`main-header header-style-one ${isSticky ? "sticky" : ""}`}>
			<section className={`top-bar-area header-top ${isSticky ? "hide" : ""}`}>
				<div className="container">
					<div className="row">
						<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
							<div className="welcome">
								<h4>Welcome to Linktech Wireless</h4>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
							<QRCodeModal />
						</div>
						<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
							<div className="topinfo clearfix">
								<div className="rate info">
									<Link to="/info">
										<img className="ria-logo-img" src={ria} alt="" />{" "}
										<span className="basement-text">
											& Basement Information
										</span>
										{/* <h4>Information</h4> */}
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<header className={`header-area header-upper ${isSticky ? "hide" : ""}`}>
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
							{!isMobile && (
								<div className="logo">
									<Link to="/">
										<img src={logo} alt="Logo" />
									</Link>
								</div>
							)}
						</div>
						<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
							<div className="header-contact-info">
								<ul>
									<li>
										<div className="iocn-holder">
											<span className="flaticon-home-page"></span>
										</div>
										<div className="text-holder">
											<h5>13690, E Iliff Ave </h5>
											<h6>Aurora CO,USA 80014</h6>
										</div>
									</li>
									<li>
										<div className="iocn-holder">
											<span className="flaticon-clock"></span>
										</div>
										<div className="text-holder">
											<h5>Opening Time</h5>
											<h6>Mon - Sat: 10am to 07pm</h6>
										</div>
									</li>
									<li>
										<div className="iocn-holder">
											<span className="flaticon-envelope"></span>
										</div>
										<div className="text-holder">
											<h5>Mail Us</h5>
											<h6>
												<Link
													className="email"
													to={"mailto:Mylinktech@gmail.com"}
												>
													Mylinktech@gmail.com
												</Link>
											</h6>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>

			<section className="mainmenu-area stricky">
				<div className="container">
					<div className="row">
						<div className="col-md-8 col-sm-8 col-xs-12">
							{/* Start mainmenu */}
							<nav className="main-menu">
								<div className="navbar-header mobile">
									{isMobile && isLogged && (
										<Link to="/">
												<img src={FooterLogo} alt="Logo" className="mobile-logo" />
										</Link>
									
									)}
									{showMenu ? (
										<MdClose
											onClick={handleClick}
											size={25}
											color="white"
											className="icon_background"
										/>
									) : (
										<CiMenuBurger
											onClick={handleClick}
											size={25}
											color="white"
											className="icon_background"
										/>
									)}
								</div>
								<div
									className={`navbar-collapse collapse clearfix ${
										showMenu ? "visible" : ""
									}`}
								>
									<ul
										id="menuList"
										className={showMenu ? "navigation  visible" : "navigation"}
									>
										<li onClick={handleClick} className="current">
											<NavLink to="/">Home</NavLink>
										</li>
										<li onClick={handleClick} className="current">
											<NavLink to="/aboutUs">About Us</NavLink>
										</li>
										<li
											className={`dropdown services-link ${
												showServicesMenu ? "open" : ""
											}`}
										>
											<NavLink to="/services" className="services-link">
												Services
												<span className="icon-container">
													{showServicesMenu ? (
														<MdClose
															onClick={handleServicesClick}
															size={25}
															color="white"
															className="icon_background"
														/>
													) : (
														<CiMenuBurger
															onClick={handleServicesClick}
															size={25}
															color="white"
															className="icon_background"
														/>
													)}
												</span>
											</NavLink>
											<ul
												className={`dropdown-menu ${
													showServicesMenu ? "visible" : ""
												}`}
											>
												<li onClick={handleClick}>
													<NavLink to="/services/phone-repair">
														Smartphone Repair
													</NavLink>
												</li>
												<li onClick={handleClick}>
													<NavLink to="/services/t&i-repair">
														Tablet & IPad Repair
													</NavLink>
												</li>
												<li onClick={handleClick}>
													<NavLink to="/services/l&m-repair">
														Laptop & Mac Repair
													</NavLink>
												</li>
											</ul>
										</li>

										<li onClick={handleClick} className="dropdown">
											<NavLink to="/products">Products</NavLink>
										</li>
										<li onClick={handleClick}>
											<NavLink to="/contact">Contact Us</NavLink>
										</li>
										<li onClick={handleClick}>
											{isLogged && (
												<NavLink to="/admin" className="menu">
													Dash
												</NavLink>
											)}
										</li>
									</ul>
								</div>
							</nav>

							{/* End mainmenu */}
						</div>
						<div className="col-md-4 col-sm-4 col-xs-12">
							{!isLogged && (
								<div className="customer-care pull-left">
									<div className="icon-holder">
										<span className="flaticon-cell-phone"></span>
									</div>
									<div className="title-holder">
										<h5>Customer Care</h5>
										<h4>
											<Link className="tele" to="tel:+17207487909">
												+1 (720) 748-7909
											</Link>
											{/* +1 720-748-7909 */}
										</h4>
									</div>
								</div>
							)}
							{isMobile && showMenu && isLogged && (
								<div className="link-btn visible">
									<button
										className="theme-btn btn-style-one blue"
										onClick={logOut}
									>
										LOG OUT
									</button>
								</div>
							)}

							{!isMobile && isLogged && (
								<div className="link-btn">
									<button
										className="theme-btn btn-style-one blue"
										onClick={logOut}
									>
										LOG OUT
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
			{isLoading && <LoadingSpinner />}
		</div>
	);
}
