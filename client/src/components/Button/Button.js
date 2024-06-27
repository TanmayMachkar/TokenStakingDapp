import { React } from 'react';

const Button = ({ onClick, label, type }) => {
	return(
		<div>
			<button type = {type} onClick = {onClick} >
				{label}
			</button>
		</div>
	);
}

export default Button;