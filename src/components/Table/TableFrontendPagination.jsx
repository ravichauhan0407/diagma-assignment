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
	Typography,
	IconButton,
	Stack,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const TableFrontendPagination = ({ data, isLoading = false, columns, onRowClick, maxHeight = 'calc(100vh - 250px)' }) => {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(1);
	};

	return (
		<Paper>
			<TableContainer sx={{ maxHeight: maxHeight }}>
				<Table stickyHeader>
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
							: data.slice(rowsPerPage * (page - 1), rowsPerPage * page)?.map((row) => (
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
													{column.format ? column.format(row) : row[column.id] || '--'}
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
				page={page - 1}
				count={data?.length}
				onPageChange={(_, newPage) => {
					setPage(newPage);
				}}
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

export default TableFrontendPagination;
