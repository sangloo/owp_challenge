import { observable, action, autorun, toJS } from 'mobx';

const GAME_STATES = ['playing', 'won', 'lost'];

export default class MainStore {
	gameState = observable.box(GAME_STATES[0]);
	gameScore = observable.box(0);
	gameGrid = observable.array();

	/* actions */
	setGameState = action(state => {
		GAME_STATES.includes(state)
			? this.gameState.set(state)
			: this.gameState.set(GAME_STATES[0]);
	});

	setGameGrid = action(val => {
		this.gameGrid.replace(val);
	});

	increaseGameScore = action(val => {
		this.gameScore.set(this.gameScore.get() + val);
	});

	resetGameScore = action(() => {
		this.gameScore.set(0);
	});

	//Utils
	startNewGame = () => {
		this.resetGameScore();
		this.setGameGrid(this.generateEmptyGrid(6, 6));
		this.setGameState(GAME_STATES[0]);
	};

	handleCellClicked = key => {
		if (this.gameState.get() === GAME_STATES[0]) {
			for (const row of this.gameGrid) {
				for (const cell of row) {
					if (cell.key === key) {
						if (!cell.isHidden) {
							console.log('already visible');
						} else {
							cell.isHidden = false;
							cell.isMine
								? this.setGameState('lost')
								: this.increaseGameScore(cell.value);
						}
					}
				}
			}
		} else {
			alert(`You already ${this.gameState.get()}, start a new game `);
		}
	};

	genrateRandomNumber = max => {
		return Math.floor(Math.random() * (max + 1));
	};

	generateEmptyGrid = (height, width) => {
		let key = 0;
		let gridData = [];

		for (let i = 0; i <= height; i++) {
			gridData.push([]);
			for (let j = 0; j <= width; j++) {
				const randomNumber = this.genrateRandomNumber(3);

				j === height || i === width
					? (gridData[i][j] = {
							key,
							type: 'solverCell',
							isMine: false,
							isHidden: false,
							value: 0,
							nbMines: 0
					  })
					: (gridData[i][j] = {
							key,
							type: 'cell',
							isMine: randomNumber === 0 ? true : false,
							isHidden: true,
							value: randomNumber,
							nbMines: 0
					  });

				key++;
			}
		}
		this.fillCellSolver(gridData);

		gridData[height][width].type = 'empty';

		return gridData;
	};

	fillCellSolver = data => {
		for (const [index, row] of data.entries()) {
			const rowSolverCell = row.reduce((acc, cell) => {
				return acc + cell.value;
			}, 0);
			const rowSolverCellMines = row.filter(cell => cell.value === 0);

			data[index][data.length - 1].value = rowSolverCell;
			data[index][data.length - 1].nbMines =
				rowSolverCellMines.length - 1;
		}

		for (let i = 0; i < data.length; i++) {
			let columnSolverCell = [];
			let columnSolverCellMines = [];
			for (const row of data) {
				row[i].value === 0
					? columnSolverCellMines.push(0)
					: columnSolverCell.push(row[i].value);
			}

			data[data.length - 1][i].value = columnSolverCell.reduce(
				(acc, cell) => {
					return acc + cell;
				},
				0
			);
			data[data.length - 1][i].nbMines = columnSolverCellMines.length - 1;
		}
	};

	solveNextBest = () => {
		const data = toJS(this.gameGrid);
		let toOrderList = [];
		for (const [i, row] of data.entries()) {
			for (const [j, cell] of row.entries()) {
				if (i !== 6 && j !== 6 && cell.isHidden) {
					toOrderList.push({
						key: cell.key,
						score:
							data[data.length - 1][j].nbMines === 0 ||
							data[i][data.length - 1].nbMines === 0
								? data[data.length - 1][j].value *
								  data[i][data.length - 1].value
								: data[data.length - 1][j].value *
										data[i][data.length - 1].value -
								  Math.pow(
										data[data.length - 1][j].nbMines + 1,
										3
								  ) *
										Math.pow(
											data[i][data.length - 1].nbMines +
												1,
											3
										)
					});
				}
			}
		}

		toOrderList.sort((item1, item2) => item2.score - item1.score);
		this.handleCellClicked(toOrderList[0].key);
	};

	constructor() {
		this.startNewGame();

		autorun(() => {
			this.gameScore.get() >= 45 && this.setGameState('won');
		});
	}
}
