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
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import { z } from "zod";
import LoginSchema from "../validations/Login";
import React from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";

const LoginPage = () => {
  const [show, setShow] = React.useState(false);
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
              email: "",
              password: "",
            }}
            validate={(values) => {
              try {
                LoginSchema.parse(values);
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
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Flex direction={"column"} rowGap={5}>
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
                  <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Login
                  </Button>
                  <Box as="div" textAlign={"center"} mb={4}>
                    <span>Don't have an account?</span>
                    <ChakraLink
                      ml={2}
                      fontWeight={"bold"}
                      color={"blue"}
                      as={ReactRouterLink}
                      to="/auth/register"
                    >
                      new account
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

export default LoginPage;
