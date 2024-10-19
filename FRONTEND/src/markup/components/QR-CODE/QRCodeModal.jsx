import React, { useEffect, useState } from "react";
import websiteQRCode from "../../../assets/images/QR-Code/qr-code.png";

const QRCodeModal = () => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};
     useEffect(() => {
				document.body.classList.toggle("modal-open", showModal);
			}, [showModal]);

	return (
		<>
			<button className="qr-button col-sm-8 col-xs-8" onClick={toggleModal}>
				View QR Code
			</button>

			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<span className="close-button" onClick={toggleModal}>
							&times;
						</span>
						<img
							className="qr-code-image"
							src={websiteQRCode}
							alt="QR Code for Electronics Repair and Sales Website"
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default QRCodeModal;
