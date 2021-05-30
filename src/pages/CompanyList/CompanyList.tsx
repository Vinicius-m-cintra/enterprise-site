import React from "react";
import {
  Button,
  Container,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { FaTrashAlt, FaPen, FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import api from "../../config/api";
import Loading from "../../Components/Loading";
import Swal from "sweetalert2";

const CompanyList: React.FC = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [companies, setCompanies] = React.useState([{ name: "", _id: "" }]);
  const [loading, setLoading] = React.useState(false);

  async function fetchCompanies() {
    try {
      setLoading(true);
      const result = await api.get("/company");

      setCompanies(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchCompanies();
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
          await api.delete(`company/${_id}`);

          addToast("Empresa excluida com sucesso", {
            appearance: "success",
            autoDismiss: true,
          });
          fetchCompanies();
        } catch (error) {
          addToast("Erro ao excluir empresa", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    });
  }

  return (
    <Container>
      <Text fontSize="4xl">Empresas</Text>
      <Button
        onClick={() => history.push("/new-company")}
        colorScheme="green"
        leftIcon={<FaPlus />}
      >
        Cadastrar Empresa
      </Button>
      {loading ? (
        <Loading />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Empresa</Th>
              <Th isNumeric>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies &&
              companies.map((company) => (
                <Tr cursor="pointer" onClick={() => history.push(`/company/${company._id}`)}>
                  <Td>{company.name}</Td>
                  <Td isNumeric>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(company._id)
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
                      history.push("/new-company", { company })
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
      )}
    </Container>
  );
};

export default CompanyList;
