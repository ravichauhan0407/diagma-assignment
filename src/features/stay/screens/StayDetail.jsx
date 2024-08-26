import { Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Ventilation from '../componets/Ventilation';
import Neurology from '../componets/Neurology';
import Labs from '../componets/Labs';
import AppHeader from 'components/Header';
import NavigationTabs from 'components/Tabs/NavigationTabs';

const StayDetail = () => {
	const { id } = useParams();

	const tabs = [
		{
			label: 'Neurology',
			Component: Neurology,
		},
		{
			label: 'Labs',
			Component: Labs,
		},
		{
			label: 'Ventilation',
			Component: Ventilation,
		},
	];

	return (
		<Stack>
			<AppHeader title={`Stay/${id}`} canGoBack />
			<NavigationTabs tabs={tabs} tabPanelSx={{ p: 2 }} />
		</Stack>
	);
};

export default StayDetail;
