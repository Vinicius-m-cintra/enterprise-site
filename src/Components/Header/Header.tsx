import React from 'react';
import { Box, Heading } from "@chakra-ui/react"


const Header: React.FC = () => {
  return (
      <Box display="flex" bg="#0c5e8a" w="100%" h="75px" color="white" alignItems="center" justifyContent="center">
          <Heading fontFamily="heading" >Seu Negócio</Heading>
      </Box>
  );
}

export default Header;