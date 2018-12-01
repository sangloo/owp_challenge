import React from 'react';
import styled from 'styled-components';

const ButtonNewGame = ({ clickHandler }) => {
	return <Button onClick={() => clickHandler()} />;
};

export default ButtonNewGame;

const Button = styled.div`
	position: relative;
	width: 300px;
	height: 50px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
	cursor: pointer;

	::before {
		content: 'New game';
		color: black;
		font-weight: 300;
		font-size: 1em;
		letter-spacing: 0.2em;
		position: absolute;
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: center;
		width: 300px;
		height: 50px;
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1) inset;
		border: 1px solid black;
		will-change: letter-spacing, font-size, box-shadow, transform;
		transition: all ease 0.3s;
	}

	:hover::before {
		transform: scale(1.1);
		font-size: 0.9em;
		letter-spacing: 0.4em;
		box-shadow: 0px 10px 0px 0px rgba(0, 0, 0, 1) inset;
		will-change: letter-spacing, font-size, box-shadow, transform;
		transition: all ease 0.33s;
	}
`;
