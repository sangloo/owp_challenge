import React from 'react';
import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';

import MineIcon from '../assets/images/mine.png';

const Cell = ({ cell, clickHandler }) => {
	return (
		<CellContainer>
			<CellData
				isHidden={cell.isHidden}
				onClick={() => clickHandler(cell.key)}>
				{cell.isHidden ? (
					cell.key
				) : !cell.isMine ? (
					cell.value
				) : (
					<Icon src={MineIcon} />
				)}
			</CellData>
		</CellContainer>
	);
};

export default inject('mainstore')(observer(Cell));

const CellContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CellData = styled.div`
	width: 80%;
	height: 80%;
	border: 5px solid black;
	font-weight: 600;
	font-size: 1.3em;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.33s ease;

	&:hover {
		transform: scale(1.1);
		transition: transform 0.33s ease;
	}

	${props =>
		props.isHidden &&
		css`
			background-color: black;
			font-size: 1em;
			font-weight: 300;
			color: white;
		`};
`;

const Icon = styled.img`
	width: 70%;
	height: 70%;
	cursor: pointer;
	transform: scale(1);
	transition: transform ease 0.33s;

	:hover {
		transform: scale(1.2);
		filter: invert(30%) sepia(80%) saturate(1000%) hue-rotate(330deg)
			brightness(100%) contrast(100%);
		transition: transform ease 0.33s;
	}
`;
