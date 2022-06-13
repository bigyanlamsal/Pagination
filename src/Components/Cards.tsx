import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Button,
  Center,
  WrapItem,
  ButtonGroup,
} from "@chakra-ui/react";
import * as React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Form from "./Form";

const Cards = (): any => {
  const [users, setUsers] = useState([
    {
      name: "",
      id: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:8000/users?_page=1&_limit=6")
      .then((response) => response.json())
      .then((res) => {
        setUsers(res);
      });
  }, []);
  console.log(users);

  const fetchUsers = async (currentPage: any) => {
    const res = await fetch(
      `http://localhost:8000/users?_page=${currentPage}&_limit=6`
    );
    const data = await res.json();
    return data;
  };
  const handlePageClick = async (data: any) => {
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    const usersFromServer = await fetchUsers(currentPage);
    setUsers(usersFromServer);
  };
  const [visible, setVisible] = React.useState(false);
  const saveData = () => {
    setVisible(!visible);
  };

  return (
    <Box>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button onClick={saveData}>Add</Button>
      </ButtonGroup>
      {visible && <Form />}
      <SimpleGrid columns={3} spacing={10} p="20px 20px 20px 20px">
        {users.map((item: any) => (
          <Box
            bg="gray.100"
            height="100%"
            borderRadius="20"
            boxShadow="dark-lg"
            p="20px"
          >
            <Center>
              <Image
                borderRadius="full"
                boxSize="100px"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              ></Image>
            </Center>
            <Text>{item.name}</Text>
            <Center>
              <WrapItem gap="4">
                <Button colorScheme="blue" size="sm">
                  <Link to={"/profile/" + item.id}>Profile</Link>
                </Button>
              </WrapItem>
            </Center>
          </Box>
        ))}
      </SimpleGrid>
      {/* <Profile /> */}

      <Center>
        <ReactPaginate
          pageCount={10}
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
        />
      </Center>
    </Box>
  );
};
export default Cards;
