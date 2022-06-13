import {
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [profileData, setProfileData] = React.useState<any>([
    { address: { street: "" } },
  ]);

  const navigate = useNavigate();

  const myId: any = useParams().id;

  console.log(useParams());

  React.useEffect(() => {
    fetch(`http://localhost:8000/users/${myId}`)
      .then((response) => response.json())
      .then((res) => {
        setProfileData(res);
        console.log("data", res);
        setFormData(res);
      });
  }, [myId]);

  //   fetchUsers();
  const toast = useToast();
  const onDelete = async (id: any) => {
    await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    }).then((respond) => {
      if (respond.status !== 200) {
        console.log("Error");
      } else {
      }
    });
  };
  const onEdit = async (id: any) => {
    await fetch(`http://localhost:8000/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    }).then((respond) => {
      console.log("stringEdit", respond);
      if (respond.status !== 200) {
        console.log("Error");
      } else {
        toast({
          title: "Edited user.",
          description: "Successfully edited user.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => navigate("/"), 5000);
      }
    });
  };

  const handleProfileUser = () => {
    onDelete(myId);
    toast({
      title: "Deleted user.",
      description: "Successfully deleted user.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };
  const handleOnChange = (event: any) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <Center>
      <Grid h="400px" w="50%" gap={4}>
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg="gray.100"
          borderRadius="20"
          boxShadow="xl"
          p="20px"
          m="2"
        >
          <Flex direction="column" p="20px" justifyContent="space-between">
            <Center>
              <Image
                objectFit="cover"
                boxSize="100px"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
                borderRadius="20%"
              ></Image>
            </Center>
            <Text fontWeight="bold" fontSize="20px">
              Id: {profileData?.id}
            </Text>
            <Text fontWeight="bold" fontSize="20px">
              Name: {profileData?.name}
            </Text>
            <Text fontWeight="bold" fontSize="20px">
              Username: {profileData?.username}
            </Text>
            <Text fontWeight="bold" fontSize="20px">
              Address:
              {profileData.address?.city}
            </Text>
            <Flex p="20px" justifyContent="space-between">
              {/* Edit process starts here */}
              <Button colorScheme="teal" onClick={onOpen}>
                Edit
              </Button>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit user account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        ref={initialRef}
                        value={formData?.name}
                        placeholder="First name"
                        onChange={handleOnChange}
                        id="name"
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Username</FormLabel>
                      <Input
                        value={formData?.username}
                        onChange={handleOnChange}
                        placeholder="Last name"
                        id="username"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        placeholder="email"
                        onChange={handleOnChange}
                        id="email"
                        value={formData?.email}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => onEdit(formData.id)}
                    >
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Button colorScheme="red" onClick={handleProfileUser}>
                Delete
              </Button>
            </Flex>
          </Flex>
        </GridItem>
        <Center>
          <Button colorScheme="blue" variant="outline" size="md" w="20%">
            <Link to="/">Home</Link>
          </Button>
        </Center>
      </Grid>
    </Center>
  );
};
export default Profile;
