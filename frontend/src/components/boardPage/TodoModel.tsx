import React from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { CiCalendar } from "react-icons/ci";
import { FiEdit2, FiLoader } from "react-icons/fi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import { z } from "zod";
import { InitialValues } from "../../utils/types";
import TodoModelSchema from "../../validations/Todo";
import { DateTime } from "luxon";

interface TodoModelProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  heading: string;
  initialValues: InitialValues;
  setInitialValues: React.Dispatch<React.SetStateAction<InitialValues>>;
}

const TodoModel: React.FC<TodoModelProps> = ({
  isOpen,
  onClose,
  heading,
  initialValues,
  setInitialValues,
}) => {
  const choseHandler = () => {
    onClose();
    setInitialValues({
      title: "",
      status: "",
      priority: "",
      deadline: "",
      description: "",
    });
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={choseHandler}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              try {
                TodoModelSchema.parse(values);
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
            onSubmit={(_values, { setSubmitting }) => {
              setSubmitting(false);
              console.log(_values);
              choseHandler();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid templateRows="repeat(7, 1fr)" gap={3}>
                  <GridItem>
                    <Field name="title">
                      {({ field }: FieldProps<string>) => (
                        <Input
                          {...field}
                          border={0}
                          focusBorderColor="transparent"
                          placeholder="Title"
                          resize="none"
                          p={0}
                          fontSize="40px"
                          fontWeight="bold"
                        />
                      )}
                    </Field>
                    <ErrorMessage name="title" component="div" />
                  </GridItem>

                  <GridItem>
                    <Grid
                      justifyContent="center"
                      templateColumns="repeat(3, 1fr)"
                      gap={6}
                    >
                      <GridItem w="100%" h="10">
                        <Flex align="center" columnGap={2} h="100%">
                          <Icon as={FiLoader} fontSize={20} />
                          <Text>Status</Text>
                        </Flex>
                      </GridItem>
                      <GridItem
                        colSpan={2}
                        w="100%"
                        h="10"
                        alignContent="center"
                      >
                        <Field name="status">
                          {({ field }: FieldProps<string>) => (
                            <Select
                              {...field}
                              m={0}
                              placeholder="Not selected"
                              size="sm"
                              w="100%"
                            >
                              <option value="Progress">Progress</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Completed">Completed</option>
                            </Select>
                          )}
                        </Field>
                        <ErrorMessage name="status" component="div" />
                      </GridItem>
                    </Grid>
                  </GridItem>

                  <GridItem>
                    <Grid
                      justifyContent="center"
                      templateColumns="repeat(3, 1fr)"
                      gap={6}
                    >
                      <GridItem w="100%" h="10">
                        <Flex align="center" columnGap={2} h="100%">
                          <Icon
                            as={MdOutlineReportGmailerrorred}
                            fontSize={20}
                          />
                          <Text>Priority</Text>
                        </Flex>
                      </GridItem>
                      <GridItem
                        colSpan={2}
                        w="100%"
                        h="10"
                        alignContent="center"
                      >
                        <Field name="priority">
                          {({ field }: FieldProps<string>) => (
                            <Select
                              {...field}
                              m={0}
                              placeholder="Not selected"
                              size="sm"
                              w="100%"
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </Select>
                          )}
                        </Field>
                        <ErrorMessage name="priority" component="div" />
                      </GridItem>
                    </Grid>
                  </GridItem>

                  <GridItem>
                    <Grid
                      justifyContent="center"
                      templateColumns="repeat(3, 1fr)"
                      gap={6}
                    >
                      <GridItem w="100%" h="10">
                        <Flex align="center" columnGap={2} h="100%">
                          <Icon as={CiCalendar} fontSize={20} />
                          <Text>Deadline</Text>
                        </Flex>
                      </GridItem>
                      <GridItem
                        colSpan={2}
                        w="100%"
                        h="10"
                        alignContent="center"
                      >
                        <Field name="deadline">
                          {({ field }: FieldProps<string>) => {
                            let formattedDeadline = "";
                            if (field.value) {
                              const date = DateTime.fromISO(field.value, {
                                zone: "utc",
                              });
                              formattedDeadline =
                                date.toFormat("yyyy-MM-dd'T'HH:mm");
                            }
                            return (
                              <Input
                                {...field}
                                value={formattedDeadline}
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                                defaultValue={""}
                              />
                            );
                          }}
                        </Field>
                        <ErrorMessage name="deadline" component="div" />
                      </GridItem>
                    </Grid>
                  </GridItem>

                  <GridItem rowSpan={3}>
                    <Grid
                      justifyContent="center"
                      templateColumns="repeat(3, 1fr)"
                      gap={6}
                    >
                      <GridItem w="100%" h="10">
                        <Flex align="center" columnGap={2} h="100%">
                          <Icon as={FiEdit2} fontSize={20} />
                          <Text>Description</Text>
                        </Flex>
                      </GridItem>
                      <GridItem
                        colSpan={2}
                        w="100%"
                        h="10"
                        alignContent="center"
                      >
                        <Field name="description">
                          {({ field }: FieldProps<string>) => {
                            return (
                              <Textarea
                                {...field}
                                maxBlockSize={150}
                                placeholder="Add Description"
                                size="sm"
                              />
                            );
                          }}
                        </Field>
                        <ErrorMessage name="description" component="div" />
                      </GridItem>
                    </Grid>
                  </GridItem>
                </Grid>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      choseHandler();
                    }}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TodoModel;
