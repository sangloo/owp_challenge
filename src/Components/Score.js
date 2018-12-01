import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

const Score = ({ mainstore: { gameScore } }) => {
	return (
		<Para>
			Score: <Span> {gameScore.get() || 0}</Span>
		</Para>
	);
};

export default inject('mainstore')(observer(Score));

const Para = styled.p`
	margin-left: 20px;
	font-size: 1.5em;
`;

const Span = styled.span`
	font-weight: 600;
	font-size: 1.5em;
`;
