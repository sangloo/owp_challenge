import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import ButtonNewGame from './Components/ButtonNewGame';
import Score from './Components/Score';
import Message from './Components/Message';
import Grid from './Components/Grid';

const App = ({ mainstore: { startNewGame, solveNextBest } }) => {
	return (
		<Layout>
			<Container height={'100px'}>
				<ButtonNewGame clickHandler={startNewGame} />
			</Container>
			<Container height={'calc(100% - 200px)'}>
				<Grid />
			</Container>
			<Container height={'100px'}>
				<ScoreContainer>
					<Score />
				</ScoreContainer>
				<NextMoveContainer>
					<Para onClick={() => solveNextBest()} />
				</NextMoveContainer>
				<MessageContainer>
					<Message />
				</MessageContainer>
			</Container>
		</Layout>
	);
};

export default inject('mainstore')(observer(App));

const Layout = styled.div`
	width: 80vw;
	height: 90vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	flex-wrap: nowrap;
`;

const Container = styled.div`
	width: 100%;
	height: ${props => props.height};
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 2px;
`;

const MessageContainer = styled.div`
	width: 33%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: rgba(240, 233, 43, 0.3);
`;

const NextMoveContainer = styled.div`
	width: 33%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(240, 233, 43, 0.3);
`;

const ScoreContainer = styled.div`
	width: 33%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background-color: rgba(240, 233, 43, 0.3);
`;

const Para = styled.p`
	font-size: 1.2em;
	width: 200px;
	text-align: center;
	height: 40px;
	position: relative;

	::before {
		content: 'Next Move';
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		color: white;
		cursor: pointer;
	}
`;
