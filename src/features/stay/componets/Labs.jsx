import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import DatePicker from 'components/Picker/DatePicker';
import { formatDate } from 'utils/formats';
import TableFrontendPagination from 'components/Table/TableFrontendPagination';
import { notify } from 'utils/notification';
import ApiService from 'services/patient';

const Labs = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [filters, setFilters] = useState({ date: '2171-11-14' });
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const res = await ApiService.getLabsStays({ stay_id: id, ...filters });
			setData(res.data);
		} catch (e) {
			notify('error', e.message || 'Something went wrong');
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [filters]);

	const columns = [
		{
			id: 'index',
			label: 'Index',
		},
		{
			id: 'value',
			label: 'Value',
			format: (row) => `${row.value} / ${row.valueuom}`,
		},
		{
			id: 'valueuom',
			label: 'Uom',
		},
		{
			id: 'label',
			label: 'Label',
		},
		{
			id: 'charttime',
			label: 'Time',
			format: (row) => formatDate(row.charttime),
		},
	];

	return (
		<Stack gap={2}>
			<Stack alignItems="end">
				<DatePicker
					value={moment(filters.date)}
					onChange={(value) => setFilters((prev) => ({ ...prev, date: moment(value).format('YYYY-MM-DD') }))}
				/>
			</Stack>
			<TableFrontendPagination data={data} columns={columns} isLoading={isLoading} />
		</Stack>
	);
};

export default Labs;
