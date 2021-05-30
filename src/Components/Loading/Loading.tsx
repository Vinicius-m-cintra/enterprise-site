import React from 'react';
import { Container, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => {
  return(
    <Container alignItems='center' justifyContent='center'>
      <Spinner size='lg' />
    </Container>
  );
}

export default Loading;