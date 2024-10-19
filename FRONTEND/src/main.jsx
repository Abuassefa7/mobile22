import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Import the BrowserRouter
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<React.StrictMode>
			<AuthProvider>
				<App />
			</AuthProvider>
		</React.StrictMode>
	</BrowserRouter>
);
