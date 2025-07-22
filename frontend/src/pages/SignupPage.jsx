// src/pages/SignupPage.jsx
import {
  Box, Button, Container, Heading, Input, Text, VStack, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const SignupPage = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("/auth/signup", user);

      toast({
        title: "Signup successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/home");
    } catch (err) {
      toast({
        title: "Signup failed!",
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
        <Heading size="lg" textAlign="center" mb={6}>Sign Up</Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
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
          <Button colorScheme="blue" w="full" onClick={handleSignup}>Create Account</Button>
          <Text>
            Already have an account?{" "}
            <Button variant="link" colorScheme="blue" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default SignupPage;
