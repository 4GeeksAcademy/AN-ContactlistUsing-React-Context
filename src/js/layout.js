import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";

import { Footer } from "./component/footer";
import { Home } from "./views/home";
import { Addcontact } from "./views/addcontact";
import { EditContact } from "./views/editcontact";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/addcontact" element={<Addcontact />} />
						<Route path="/editcontact/:id" element={<EditContact />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
