import { Container, Heading } from "@chakra-ui/layout";
import { Box, Button, Flex, HStack, Input } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory, useLocation } from "react-router-dom";
import * as yup from "yup";

import FormErrorMessage from "../../Components/Form/FormErrorMessage";
import PhoneInput from "../../Components/Form/PhoneInput";
import api from "../../config/api";
import ZipCodeInput from "../../Components/Form/ZipCodeInput";
import { unmaskPhoneNumber } from "../../services/mask.service";
import NumberInput from "../../Components/Form/NumberInput";
import GoBack from "../../Components/GoBack";

interface LocationInterface {
  company: any;
  state: any;
}

const NewCompany: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationInterface>();
  const { addToast } = useToasts();
  const company = location.state?.company;

  const companyInitialValues = {
    name: company?.name || "",
    phone: company?.phone || "",
    address: {
      zipcode: company?.address.zipcode || "",
      street: company?.address.street || "",
      province: company?.address.province || "",
      number: company?.address.number || "",
      district: company?.address.district || "",
      city: company?.address.city || "",
      complement: company?.address.complement || ""
    },
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .max(200, "Limite de caracteres")
      .min(3, "Informe o nome da empresa")
      .required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório"),
    address: yup.object().shape({
      zipcode: yup.string().required("Campo obrigatório"),
      street: yup.string().required("Campo obrigatório"),
      city: yup.string().required("Campo obrigatório"),
      province: yup.string().required("Campo obrigatório"),
      number: yup.number().required("Informe o número da casa"),
      district: yup.string().required("Campo obrigatório"),
      complement: yup.string(),
    }),
  });

  const submitForm = async (values: any) => {
    let parsedValues = values;
    parsedValues.phone = unmaskPhoneNumber(values.phone);
    parsedValues.zipcode = values.address.zipcode.replace("-", "");

    if (!company || company._id === "") {
      try {
        await api.post("/company/save", parsedValues);

        addToast("Empresa salva com sucesso", {
          appearance: "success",
          autoDismiss: true,
        });

        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await api.patch(`/company/${company._id}`, parsedValues);

      addToast("Empresa atualizada com sucesso", {
        appearance: "success",
        autoDismiss: true,
      });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getzipcode = async (zipcode: any, setFieldValue: any) => {
    const parsedZipcode = zipcode.replace("-", "");

    try {
      const address = await api.get(`/cep/${parsedZipcode}`);

      setFieldValue("address.street", address.data.logradouro);
      setFieldValue("address.city", address.data.localidade);
      setFieldValue("address.province", address.data.uf);
      setFieldValue("address.district", address.data.bairro);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container w="80%">
      <GoBack />
      <Heading m="2">Cadastrar Empresa</Heading>
      <Formik
        enableReinitialize
        initialValues={companyInitialValues}
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
                      placeholder="Nome da Empresa"
                      component={Input}
                    />
                    <FormErrorMessage name="name" />
                  </Box>
                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("phone", e.target.value)
                      }
                      value={values.phone}
                      type="text"
                      name="phone"
                      placeholder="Telefone"
                      component={PhoneInput}
                    />
                    <FormErrorMessage name="phone" />
                  </Box>
                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("address[zipcode]", e.target.value)
                      }
                      type="text"
                      name="address[zipcode]"
                      placeholder="Cep"
                      component={ZipCodeInput}
                      onBlur={() =>
                        getzipcode(values.address.zipcode, setFieldValue)
                      }
                      value={values.address.zipcode}
                    />
                    <FormErrorMessage name="address[zipcode]" />
                  </Box>
                </HStack>
                <HStack mt="4" spacing="24px">
                  <Box w="80%">
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("address[street]", e.target.value)
                      }
                      value={values.address.street}
                      disabled
                      type="text"
                      name="address[street]"
                      placeholder="Logradouro"
                      component={Input}
                    />
                    <FormErrorMessage name="address[street]" />
                  </Box>
                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("address[number]", e.target.value)
                      }
                      type="text"
                      name="address[number]"
                      placeholder="Número"
                      component={NumberInput}
                      value={values.address.number}
                    />
                    <FormErrorMessage name="address[number]" />
                  </Box>
                </HStack>
                <HStack mt="4" spacing="24px">
                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("address[city]", e.target.value)
                      }
                      type="text"
                      name="address[city]"
                      placeholder="Cidade"
                      component={Input}
                      value={values.address.city}
                      disabled
                    />
                    <FormErrorMessage name="address[city]" />
                  </Box>
                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("address[province]", e.target.value)
                      }
                      type="text"
                      name="address[province]"
                      placeholder="Estado"
                      component={Input}
                      value={values.address.province}
                      disabled
                    />
                    <FormErrorMessage name="address[province]" />
                  </Box>
                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("address[district]", e.target.value)
                      }
                      type="text"
                      name="address[district]"
                      placeholder="Bairro"
                      component={Input}
                      value={values.address.district}
                      disabled
                    />
                    <FormErrorMessage name="address[district]" />
                  </Box>

                  <Box>
                    <Field
                      onChange={(e: any) =>
                        setFieldValue("address[complement]", e.target.value)
                      }
                      type="text"
                      name="address[complement]"
                      placeholder="Complemento"
                      component={Input}
                      value={values.address.complement}
                    />
                    <FormErrorMessage name="address[complement]" />
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

export default NewCompany;
