import { Box, Stack, TableContainer, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { generatePath, useNavigate } from 'react-router-dom';
import CustomTable from 'components/Table/TableBackendPagination';
import ApiService from 'services/patient';
import { notify } from 'utils/notification';
import { formatDate } from 'utils/formats';
import { PATH_NAME } from 'configs';
import AppHeader from 'components/Header';

const StaysList = () => {
	const navigate = useNavigate();

	const fetchStaysList = async (payload) => {
		try {
			const res = await ApiService.getAllStays(payload);
			return res.data;
		} catch (e) {
			notify('error', e.message || 'Something went wrong');
		}
	};

	const handleRowClick = (row) => {
		navigate({ pathname: generatePath(PATH_NAME.STAY_DETAIL, { id: row?.stay_id }) });
	};

	const columns = [
		{
			id: 'stay_id',
			label: 'Stay Id',
		},
		{
			id: 'subject_id',
			label: 'Subject Id',
		},
		{
			id: 'first_careunit',
			label: 'First CareUnit',
		},
		{
			id: 'last_careunit',
			label: 'Last CareUnit',
		},
		{
			id: 'intime',
			label: 'In Time',
			format: (row) => formatDate(row.intime),
		},
		{
			id: 'outtime',
			label: 'Out Time',
			format: (row) => formatDate(row.outime),
		},
	];

	return (
		<Stack gap={2}>
			<AppHeader title="Stays List" />
			<Box px={2}>
				<CustomTable columns={columns} fetchData={fetchStaysList} onRowClick={handleRowClick} />
			</Box>
		</Stack>
	);
};

export default StaysList;
