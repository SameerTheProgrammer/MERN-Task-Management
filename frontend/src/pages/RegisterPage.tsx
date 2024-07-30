import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldProps, ErrorMessage } from "formik";
import { z } from "zod";
import RegisterSchema from "../validations/Register";
import React from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { APIError, UserRegisterData } from "../utils/types";
import { useRegisterUserMutation } from "../store/userApi";

const RegisterPage = () => {
  const [show, setShow] = React.useState(false);
  const [cShow, setCShow] = React.useState(false);

  const [registerUser] = useRegisterUserMutation();
  const toast = useToast();

  const handleSubmit = async (
    values: UserRegisterData,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      setSubmitting(true);
      await registerUser(values).unwrap();
      toast({
        title: `User registered successfully`,
        status: "success",
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      if ((error as APIError).data) {
        const apiError = error as APIError;
        toast({
          title: "Error during registration",
          description:
            apiError.data.error[0].msg || "An unexpected error occurred.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      w="100%"
      h="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgGradient={[
        "linear(to-tr, teal.300, yellow.400)",
        "linear(to-t, blue.200, teal.500)",
        "linear(to-b, orange.100, purple.300)",
      ]}
    >
      <Flex direction={"column"} bgColor={"white"} borderRadius={10} p={7}>
        <div>
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize={30}
            fontWeight="bold"
            mx={10}
            mb={5}
          >
            Welcome to Taskman!
          </Text>
        </div>
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              cpassword: "",
            }}
            validateOnBlur
            validateOnChange
            validate={(values) => {
              try {
                RegisterSchema.parse(values);
                return {};
              } catch (error) {
                if (error instanceof z.ZodError) {
                  const errors: Record<string, string> = {};
                  error.errors.forEach((issue) => {
                    if (issue.path.length > 0) {
                      errors[issue.path[0]] = issue.message;
                    }
                  });
                  return errors;
                }
                return {};
              }
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Flex direction={"column"} rowGap={4}>
                  <div>
                    <Field name="name">
                      {({ field }: FieldProps<string>) => (
                        <Input
                          {...field}
                          focusBorderColor="pink.400"
                          variant="filled"
                          placeholder="Sameer Kumar"
                          fontSize="md"
                          fontWeight="normal"
                          bgColor={"black.500"}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="name" component="div" />
                  </div>
                  <div>
                    <Field name="email">
                      {({ field }: FieldProps<string>) => (
                        <Input
                          {...field}
                          focusBorderColor="pink.400"
                          variant="filled"
                          placeholder="sameer@taskman.com"
                          fontSize="md"
                          fontWeight="normal"
                          bgColor={"black.500"}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div>
                    <Field name="password">
                      {({ field }: FieldProps<string>) => (
                        <InputGroup size="md">
                          <Input
                            {...field}
                            focusBorderColor="pink.400"
                            variant="filled"
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            fontSize="md"
                            fontWeight="normal"
                            bgColor="black.500"
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={() => setShow(!show)}
                            >
                              <Icon
                                boxSize={5}
                                as={
                                  show ? MdOutlineRemoveRedEye : FaRegEyeSlash
                                }
                              />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      )}
                    </Field>
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <div>
                    <Field name="cpassword">
                      {({ field }: FieldProps<string>) => (
                        <InputGroup size="md">
                          <Input
                            {...field}
                            focusBorderColor="pink.400"
                            variant="filled"
                            pr="4.5rem"
                            type={cShow ? "text" : "password"}
                            placeholder="Confirm Password"
                            fontSize="md"
                            fontWeight="normal"
                            bgColor={"black.500"}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={() => setCShow(!cShow)}
                            >
                              <Icon
                                boxSize={5}
                                as={
                                  cShow ? MdOutlineRemoveRedEye : FaRegEyeSlash
                                }
                              />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      )}
                    </Field>
                    <ErrorMessage name="cpassword" component="div" />
                  </div>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Register
                  </Button>
                  <Box as="div" textAlign={"center"} mb={4}>
                    <span>Already have an account?</span>
                    <ChakraLink
                      ml={2}
                      fontWeight={"bold"}
                      color={"blue"}
                      as={ReactRouterLink}
                      to="/auth/login"
                    >
                      Log in
                    </ChakraLink>
                  </Box>
                </Flex>
              </Form>
            )}
          </Formik>
        </div>
      </Flex>
    </Box>
  );
};

export default RegisterPage;
