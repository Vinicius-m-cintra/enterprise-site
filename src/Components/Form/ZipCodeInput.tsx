import * as React from 'react';

import { Input, InputProps } from '@chakra-ui/react';

import InputMask from "react-input-mask";

const ZipCodeInput: React.FC<InputProps> = (props: any) => {
	return (
		<InputMask
			mask="99999-999"
			formatChars={{ 9: "[0-9]", "?": "[0-9 ]" }}
			maskChar={null}			
			{...props}		
		>
			{(inputProps: any) => {
				return (
					<Input type="text" {...inputProps} />
				);
			}}
		</InputMask>
	)
};

export default ZipCodeInput;
