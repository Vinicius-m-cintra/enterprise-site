import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";

// import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <Box
      bg="#0c5e8a"
      w="100%"
      p={4}
      color="white"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      bottom="0"
    >
      <Flex>
        <Text marginRight="2">Desenvolvido Por</Text>
        <Text fontWeight="bold">
          <a href="https://github.com/Vinicius-m-cintra">Vinicius Miranda</a>
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
