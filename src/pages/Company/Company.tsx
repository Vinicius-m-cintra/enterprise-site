import {
  Container,
  SimpleGrid,
  Box,
  Text,
  Heading,
  Divider,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";

import api from "../../config/api";
import Swal from "sweetalert2";
import GoBack from "../../Components/GoBack";
import { maskPhoneNumber } from "../../services/mask.service";

interface IParam {
  _id: string;
}

interface ICompany {
  company: {
    _id: string;
    name: string;
    phone: string;
    address: {
      zipcode: string;
      street: string;
      province: string;
      number: number;
      district: string;
      city: string;
      complement: string;
    };
  };
  users: {
    name: string;
    _id: string;
  }[];
}

const Company: React.FC = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [company, setCompany] = React.useState<ICompany>();
  const { _id } = useParams<IParam>();

  async function fetchUsers() {
    try {
      const { data } = await api.get(`/company/users/${_id}`);

      console.log(data);
      setCompany(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchUsers();
  }, []);

  function handleDelete(_id: string) {
    Swal.fire({
      title: "Excluir?",
      text: "Esta ação é irreversível, continuar?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "orange",
      confirmButtonColor: "red",
      confirmButtonText: "Excluir",
      icon: "warning"
    }).then(async (res) => {
      if (res.value) {
        try {
          await api.delete(`user/${_id}`);

          addToast("Funcionário deletado com sucesso", {
            appearance: "success",
            autoDismiss: true,
          });
          fetchUsers();
        } catch (error) {
          addToast("Erro ao excluir funcionário", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    });
  }

  return (
    <Container>
      <GoBack />
      {company && (
        <>
          <SimpleGrid columns={2} spacing={2}>
            <Box>
              <Heading>{company?.company?.name}</Heading>
            </Box>
            <Box>
              <Text>id: {company?.company?._id}</Text>
            </Box>
            <Box>
              <Text>{maskPhoneNumber(company?.company?.phone)}</Text>
            </Box>
          </SimpleGrid>
          <Divider />
          <SimpleGrid columns={1} spacing={2}>
            <Text>
              {company?.company?.address.street},{" "}
              {company?.company?.address.number}
            </Text>
            <Flex justifyContent="space-between">
              <Text>
                {company?.company?.address.city} -{" "}
                {company?.company?.address.province}
              </Text>
              <Text>{company?.company?.address.zipcode}</Text>
            </Flex>
          </SimpleGrid>
        </>
      )}
      <Button
        onClick={() => history.push(`/new-user/${_id}`)}
        colorScheme="green"
        leftIcon={<FaPlus />}
      >
        Cadastrar Usuário
      </Button>
      {company?.users && company.users.length ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Usuários</Th>
              <Th isNumeric>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {company.users.map((user) => (
              <Tr key={user._id} curosr="pointer" onClick={() => history.push(`/user/${user._id}`)}>
                <Td>{user?.name}</Td>
                <Td isNumeric>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user._id)
                    }}
                    mr="5"
                    leftIcon={<FaTrashAlt />}
                    colorScheme="red"
                    variant="solid"
                  >
                    excluir
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/new-user/${_id}`, { user })
                    }}
                    leftIcon={<FaPen />}
                    colorScheme="orange"
                    variant="solid"
                  >
                    editar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Company;
