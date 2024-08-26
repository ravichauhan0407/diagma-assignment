import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	Skeleton,
	Stack,
	IconButton,
	Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import useUpdateEffect from 'hooks/useUpdateEffect';

const TableBackendPagination = ({ filters = null, columns, fetchData, onRowClick }) => {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(1);
	};

	useUpdateEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			const result = await fetchData({ page_number: page, num_entries: rowsPerPage, ...filters });
			setData(result);
			setIsLoading(false);
		};

		if (page === 1) {
			getData();
		} else {
			setPage(1); // Trigger a re-render with page 0 and updated filters
		}
	}, [filters, rowsPerPage]);

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			const result = await fetchData({ page_number: page, num_entries: rowsPerPage, ...filters });
			setData(result);
			setIsLoading(false);
		};
		getData();
	}, [page]);

	const customLabelDisplayedRows = ({ from }) => {
		return `${from}-${from + rowsPerPage - 1}`;
	};

	return (
		<Paper>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} sx={{ backgroundColor: '#EBF2FC', border: 'none' }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading
							? Array(rowsPerPage)
									.fill(0)
									.map((_, index) => (
										<TableRow key={index}>
											{columns.map((column) => (
												<TableCell key={column.id}>
													<Skeleton variant="rectangular" width="100%" height={20} />
												</TableCell>
											))}
										</TableRow>
									))
							: data.map((row) => (
									<TableRow
										key={row.id}
										sx={{
											':hover': {
												backgroundColor: '#F8F8F8',
												cursor: onRowClick ? 'pointer' : 'default',
											},
										}}
										onClick={onRowClick ? () => onRowClick(row) : undefined}
									>
										{columns.map((column) => (
											<TableCell key={column.id} sx={{ border: 'none' }}>
												<Typography whiteSpace="nowrap" fontSize={14}>
													{column.format ? column.format(row) : row[column.id]}
												</Typography>
											</TableCell>
										))}
									</TableRow>
								))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 50]}
				component="div"
				rowsPerPage={rowsPerPage}
				labelDisplayedRows={customLabelDisplayedRows}
				page={page - 1}
				onRowsPerPageChange={handleChangeRowsPerPage}
				ActionsComponent={(props) => {
					return (
						<Stack direction="row">
							<IconButton disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
								<ChevronLeft sx={{ color: '#000' }} />
							</IconButton>
							<IconButton onClick={() => setPage((prev) => prev + 1)}>
								<ChevronRight sx={{ color: '#000' }} />
							</IconButton>
						</Stack>
					);
				}}
			/>
		</Paper>
	);
};

export default TableBackendPagination;
