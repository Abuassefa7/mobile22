import React from "react";

const NextArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", right: "10px" }}
			onClick={onClick}
		>
			<i
				className="fa fa-chevron-right"
				style={{ fontSize: "30px", color: "#000" }}
			></i>
		</div>
	);
};

const PrevArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
			onClick={onClick}
		>
			<i
				className="fa fa-chevron-left"
				style={{ fontSize: "30px", color: "#000" }}
			></i>
		</div>
	);
};

export { NextArrow, PrevArrow };
