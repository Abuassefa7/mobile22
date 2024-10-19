import React from "react";
import { Link } from "react-router-dom";

function SingleSideBareCategory({
	categories,
	selectedCategories,
	onCategorySelect,
}) {
	return (
		<>
			<div className="sidebar-title">
				<h1>Categories</h1>
			</div>
			<ul className="categories clearfix">
				{categories.map((category) => (
					<li
						key={category}
						className={`category-item ${
							selectedCategories?.includes(category) ? "active" : ""
						}`}
						onClick={() => onCategorySelect(category)}
					>
						{category}
						<span className="pull-right">
							<i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
						</span>
					</li>
				))}
			</ul>
		</>
	);
}

export default SingleSideBareCategory;
