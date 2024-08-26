import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'components/Picker/DatePicker';
import ApiService from 'services/patient';
import { notify } from 'utils/notification';
import TableFrontendPagination from 'components/Table/TableFrontendPagination';
import { formatDate } from 'utils/formats';

const Ventilation = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [filters, setFilters] = useState({ date: '2171-11-15' });
	const [isLoading, setIsLoading] = useState(false);
	const [types, setTypes] = useState(null);
	const firstRenderRef = useRef(true);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const res = await ApiService.getVentilationStays({ stay_id: id, ...filters });
			setData(res.data);
			if (firstRenderRef.current) {
				setTypes(Object.keys(res.data.reduce((prev, curr) => ({ ...prev, [curr.param_category]: curr.param_category }), {})));
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
			id: 'param_category',
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
						renderValue={(value) => value || 'All'}
						sx={{ width: 200 }}
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

export default Ventilation;
