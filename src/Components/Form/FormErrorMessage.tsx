import React from 'react';

import { Text } from '@chakra-ui/react';
import { ErrorMessage, ErrorMessageProps } from 'formik';

type FormErrorMessageProps = ErrorMessageProps;

const FormErrorMessage: React.FC<FormErrorMessageProps> = (props: FormErrorMessageProps) => {
	return (
		<ErrorMessage {...props}>{ msg => <Text fontSize={`sm`} color={`red.500`}>{msg}</Text> }</ErrorMessage>
	);
};

export default FormErrorMessage;