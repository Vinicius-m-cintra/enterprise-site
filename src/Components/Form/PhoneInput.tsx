import * as React from 'react';

import { Input, InputProps } from '@chakra-ui/react';

import InputMask from "react-input-mask";

const PhoneInput: React.FC<InputProps> = (props: any) => {
	return (
		<InputMask
			mask="(99) 99999-9999"
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

export default PhoneInput;
