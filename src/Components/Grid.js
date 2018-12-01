import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import Cell from './Cell';
import SolverCell from './SolverCell';

const Grid = ({ mainstore: { gameGrid, handleCellClicked } }) => {
	const renderGrid = () => {
		return gameGrid.map(row =>
			row.map(cell =>
				cell.type === 'cell' ? (
					<Cell
						key={cell.key}
						cell={cell}
						clickHandler={handleCellClicked}
					/>
				) : cell.type === 'solverCell' ? (
					<SolverCell key={cell.key} cell={cell} />
				) : (
					<p key={cell.key} />
				)
			)
		);
	};

	return <GridContainer>{renderGrid()}</GridContainer>;
};

export default inject('mainstore')(observer(Grid));

const GridContainer = styled.div`
	width: calc(80vh - 200px);
	height: calc(80vh - 200px);
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-gap: 1px;
`;
