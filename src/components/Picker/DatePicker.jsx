import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

export default function DatePicker({ value, onChange, minDate, maxDate, views = ['month', 'year', 'day'] }) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<MuiDatePicker
				sx={{
					'& .MuiOutlinedInput-root': {
						py: 0.5,
						height: 40,
					},
				}}
				views={views}
				minDate={minDate}
				maxDate={moment().add({ years: 300 })}
				value={value}
				onChange={onChange}
				format="DD-MM-YYYY"
				slotProps={{
					textField: {
						readOnly: true,
					},
				}}
			/>
		</LocalizationProvider>
	);
}
