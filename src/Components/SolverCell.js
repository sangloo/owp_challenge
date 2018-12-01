import React from 'react';
import styled from 'styled-components';

const SolverCell = ({ cell }) => {
	return (
		<CellContainer>
			{cell.value} / {cell.nbMines}
		</CellContainer>
	);
};

export default SolverCell;

const CellContainer = styled.div`
	border: 1px solid black;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
