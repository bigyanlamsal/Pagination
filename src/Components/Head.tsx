import { Box, Flex, Text, Divider, Center } from "@chakra-ui/react";
import Cards from "./Cards";

const Head = () => {
  return (
    <Box>
      <Flex direction="column">
        <Text fontSize="45px" fontWeight="bold" p="40px 0px 0px 0px">
          Pagination
        </Text>
        <Center>
          <Divider
            orientation="horizontal"
            height="3px"
            width="110px"
            bg="#6EE3EB"
            m="2"
          />
        </Center>
      </Flex>

      <Cards />
    </Box>
  );
};
export default Head;
