import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

const Message = ({ mainstore: { gameScore, gameState } }) => {
	return (
		<div>
			{gameState.get() === 'lost' ? (
				<Para color={'red'}>You lost</Para>
			) : gameState.get() === 'won' ? (
				<Para color={'green'}>You Win</Para>
			) : (
				<Para>
					You need: <Span> {45 - (gameScore.get() || 0)}</Span> points
				</Para>
			)}
		</div>
	);
};

export default inject('mainstore')(observer(Message));

const Para = styled.p`
	margin-right: 20px;
	font-size: 1em;
	color: ${props => props.color || 'black'};
`;

const Span = styled.span`
	font-weight: 600;
	font-size: 1.5em;
`;
