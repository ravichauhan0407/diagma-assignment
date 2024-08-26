import { ArrowBack } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppHeader = ({ title, canGoBack = false }) => {
	const navigate = useNavigate();

	return (
		<Stack direction="row" alignItems="center" gap={2} height={60} boxShadow="0px 0px 6px 0px #00000030" px={2}>
			{canGoBack && (
				<IconButton onClick={() => navigate(-1)}>
					<ArrowBack />
				</IconButton>
			)}
			<Typography fontSize={20} fontWeight={500}>
				{title}
			</Typography>
		</Stack>
	);
};

export default AppHeader;
