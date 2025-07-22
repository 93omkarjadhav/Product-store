import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<Routes>
				<Route path='/home' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/' element={<LoginPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</Box>
	);
}

export default App;
