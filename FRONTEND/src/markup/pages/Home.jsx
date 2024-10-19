import React from "react";
import About from "../components/Home/About/About";
import Banner from "../components/Home/Banner/Banner";
import Blog from "../components/Home/Blog/Blog";
import FactCounter from "../components/Home/FactCounter/FactCounter";
import Action from "../components/Home/Action/Action";
import Catagories from "../components/Home/Catagories/Catagories";
import BeforeAndAfter from "../components/Home/Works/BeforeAndAfter";
import BrandArea from "../components/Home/BrandArea/BrandArea";

function Home() {
	return (
		<>
			<Banner />
			<Action />
			<Catagories />
			<About />
			<FactCounter />
			<BeforeAndAfter />
			<Blog />
			<BrandArea/>
		</>
	);
}

export default Home;
