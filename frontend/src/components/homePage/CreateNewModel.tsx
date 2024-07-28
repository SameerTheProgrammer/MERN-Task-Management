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
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { FiEdit2, FiLoader } from "react-icons/fi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

interface createNewModelProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  heading: string;
}

const CreateNewModel: React.FC<createNewModelProps> = ({
  isOpen,
  onClose,
  heading,
}) => {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateRows="repeat(7, 1fr)" gap={3}>
              <GridItem>
                <Input
                  border={0}
                  focusBorderColor="transparent"
                  placeholder="Title"
                  resize={"none"}
                  p={0}
                  fontSize={"40px"}
                  fontWeight={"40px"}
                />
              </GridItem>
              <GridItem>
                <Grid
                  justifyContent={"center"}
                  templateColumns="repeat(3, 1fr)"
                  gap={6}
                >
                  <GridItem w="100%" h="10">
                    <Flex align={"center"} columnGap={2} h={"100%"}>
                      <Icon as={FiLoader} fontSize={20} />
                      <Text>Status </Text>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2} w="100%" h="10" alignContent={"center"}>
                    <Select
                      m={0}
                      placeholder="Not selected"
                      size="sm"
                      w={"100%"}
                    >
                      <option value="option1">Progress</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Completed">Completed</option>
                    </Select>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <Grid
                  justifyContent={"center"}
                  templateColumns="repeat(3, 1fr)"
                  gap={6}
                >
                  <GridItem w="100%" h="10">
                    <Flex align={"center"} columnGap={2} h={"100%"}>
                      <Icon as={MdOutlineReportGmailerrorred} fontSize={20} />
                      <Text>Priority </Text>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2} w="100%" h="10" alignContent={"center"}>
                    <Select
                      m={0}
                      placeholder="Not selected"
                      size="sm"
                      w={"100%"}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Select>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <Grid
                  justifyContent={"center"}
                  templateColumns="repeat(3, 1fr)"
                  gap={6}
                >
                  <GridItem w="100%" h="10">
                    <Flex align={"center"} columnGap={2} h={"100%"}>
                      <Icon as={CiCalendar} fontSize={20} />
                      <Text>Deadline </Text>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2} w="100%" h="10" alignContent={"center"}>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                    />
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem rowSpan={3}>
                <Grid
                  justifyContent={"center"}
                  templateColumns="repeat(3, 1fr)"
                  gap={6}
                >
                  <GridItem w="100%" h="10">
                    <Flex align={"center"} columnGap={2} h={"100%"}>
                      <Icon as={FiEdit2} fontSize={20} />
                      <Text>Description </Text>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2} w="100%" h="10" alignContent={"center"}>
                    <Textarea
                      maxBlockSize={150}
                      placeholder="Add Description"
                      size={"sm"}
                    ></Textarea>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateNewModel;
