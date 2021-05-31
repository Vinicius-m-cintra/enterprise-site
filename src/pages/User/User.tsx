import { Container } from "@chakra-ui/layout";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import GoBack from "../../Components/GoBack";
import api from "../../config/api";
import { maskPhoneNumber } from "../../services/mask.service";

interface IParam {
  _id: string;
}

interface IUser {
  _id: string;
  name: string;
  role: string;
  salary: number;
  company: {
    _id: string;
    name: string;
    phone: string;
    address: {
      zipcode: string;
      street: string;
      province: string;
      number: string;
      district: string;
      city: string;
      complement: string;
    };
  };
}

const User: React.FC = () => {
  const [user, setUser] = React.useState<IUser>();
  const { _id } = useParams<IParam>();

  React.useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data } = await api.get(`/user/${_id}`);

      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <GoBack />
      {user && (
        <>
          <SimpleGrid columns={2} spacing={2}>
            <Box>
              <Heading>{user?.company?.name}</Heading>
            </Box>
            <Box>
              <Text>id: {user?.company?._id}</Text>
            </Box>
            <Box>
              {console.log(typeof user?.company?.phone)}
              <Text>{maskPhoneNumber(user?.company?.phone)}</Text>
            </Box>
          </SimpleGrid>
          <Divider />
          <SimpleGrid columns={1} spacing={2}>
            <Text>
              {user?.company?.address.street}, {user?.company?.address.number}
            </Text>
            <Flex justifyContent="space-between">
              <Text>
                {user?.company?.address.city} -{" "}
                {user?.company?.address.province}
              </Text>
              <Text>{user?.company?.address.zipcode}</Text>
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={3} spacing={2}>
            <Text>{user.name}</Text>
            <Text>{user.role}</Text>
            <Text>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(user.salary))}
            </Text>
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default User;
