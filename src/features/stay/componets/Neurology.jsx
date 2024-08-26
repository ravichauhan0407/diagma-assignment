import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import DatePicker from 'components/Picker/DatePicker';
import { formatDate } from 'utils/formats';
import TableFrontendPagination from 'components/Table/TableFrontendPagination';
import ApiService from 'services/patient';
import { notify } from 'utils/notification';

const Neurology = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [filters, setFilters] = useState({ date: '2171-11-14' });
	const [isLoading, setIsLoading] = useState(false);
	const [types, setTypes] = useState(null);
	const firstRenderRef = useRef(true);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const res = await ApiService.getNeurologyStays({ stay_id: id, ...filters });
			setData(res.data);
			if (firstRenderRef.current) {
				setTypes(Object.keys(res.data.reduce((prev, curr) => ({ ...prev, [curr.type]: curr.type }), {})));
				firstRenderRef.current = false;
			}
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
		{
			id: 'type',
			label: 'Type',
		},
	];

	return (
		<Stack gap={2}>
			<Stack direction="row" justifyContent="end" gap={2}>
				<FormControl size="small">
					<InputLabel>Type</InputLabel>
					<Select
						label="Type"
						size="small"
						sx={{ width: 200 }}
						value={filters?.type}
						renderValue={(value) => value || 'All'}
						onChange={(e) => {
							const val = e.target.value;
							setFilters((prev) => ({ ...prev, type: val }));
						}}
					>
						{types?.map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<DatePicker
					value={moment(filters.date)}
					onChange={(value) => setFilters((prev) => ({ ...prev, date: moment(value).format('YYYY-MM-DD') }))}
				/>
			</Stack>
			<TableFrontendPagination data={data} columns={columns} isLoading={isLoading} />
		</Stack>
	);
};

export default Neurology;
