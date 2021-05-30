import React from "react";
import { Button } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const GoBack: React.FC = () => {
  const history = useHistory();
  return (
    <Button
      marginY="5"
      onClick={() => history.goBack()}
      leftIcon={<FaArrowLeft />}
      colorScheme="blue"
    >
      Voltar
    </Button>
  );
};

export default GoBack;
