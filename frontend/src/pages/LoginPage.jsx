// src/pages/LoginPage.jsx
import {
  Box, Button, Container, Heading, Input, Text, VStack, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("/auth/login", user);

      // Save token/user info if needed
      localStorage.setItem("token", data.token);

      toast({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/home");
    } catch (err) {
      toast({
        title: "Login failed!",
        description: err.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" mt={10}>
      <Box p={8} boxShadow="md" borderRadius="lg">
        <Heading size="lg" textAlign="center" mb={6}>Login</Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button colorScheme="blue" w="full" onClick={handleLogin}>Login</Button>
          <Text>
            New user?{" "}
            <Button variant="link" colorScheme="blue" onClick={() => navigate("/signup")}>
              Create an account
            </Button>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;
