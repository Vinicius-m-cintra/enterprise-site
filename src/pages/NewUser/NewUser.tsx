import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useToasts } from "react-toast-notifications";
import React from "react";
import FormErrorMessage from "../../Components/Form/FormErrorMessage";
import { useHistory, useLocation, useParams } from "react-router-dom";

import api from "../../config/api";
import GoBack from "../../Components/GoBack";

interface LocationInterface {
  user: any;
  state: any;
}

interface IParam {
  _id: string;
}

const NewUser: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationInterface>();
  const user = location.state?.user;
  const { addToast } = useToasts();
  const { _id } = useParams<IParam>();

  const userInitialValues = {
    name: user?.name || "",
    role: user?.role || "",
    salary: user?.salary || "",
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .max(200, "Limite de caracteres")
      .min(3, "Informe o nome do funcionário")
      .required("Campo obrigatório"),
    role: yup.string().required("Campo obrigatório"),
    salary: yup.number().required("Campo Obrigatório"),
  });

  async function submitForm(values: any) {
    const parsedValues = values;
    parsedValues.salary = Number(values.salary);
    parsedValues.company = _id;

    if (!user || user._id === "") {
      try {
        await api.post("/user/save", parsedValues);

        addToast("Funcionário cadastrado com sucesso", {
          appearance: "success",
          autoDismiss: true,
        });

        history.goBack();
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await api.patch(`/user/${user._id}`, parsedValues);

      addToast("Funcionário atualizado com sucesso", {
        appearance: "success",
        autoDismiss: true,
      });

      history.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container w="80%">
      <GoBack />
      <Heading m="2">Cadastrar Funcionário</Heading>
      <Formik
        enableReinitialize
        initialValues={userInitialValues}
        validationSchema={schema}
        onSubmit={submitForm}
      >
        {({
          handleSubmit,
          setFieldValue,
          resetForm,
          values,
          errors,
          isValid,
        }) => {
          return (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex flexDirection="column">
                <HStack spacing="24px">
                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("name", e.target.value)
                      }
                      value={values.name}
                      type="text"
                      name="name"
                      placeholder="Nome do Funcionário"
                      component={Input}
                    />
                    <FormErrorMessage name="name" />
                  </Box>
                  <Box>
                    <Field
                      as="select"
                      onChange={(e: any) =>
                        setFieldValue("role", e.target.value)
                      }
                      value={values.role}
                      type="text"
                      name="role"
                      placeholder="Cargo"
                      component={Select}
                    >
                      <option value="developer">Desenvolvedor</option>
                      <option value="designer">Designer</option>
                      <option value="administrator">Admnistração</option>
                    </Field>
                    <FormErrorMessage name="phone" />
                  </Box>
                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("salary", e.target.value)
                      }
                      type="text"
                      name="salary"
                      placeholder="Salário"
                      component={Input}
                      value={values.salary}
                    />
                    <FormErrorMessage name="salary" />
                  </Box>
                </HStack>
                <Button colorScheme="green" mt="4" type="submit">
                  Salvar
                </Button>
              </Flex>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default NewUser;
