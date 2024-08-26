/* eslint-disable no-nested-ternary */
import { Box, IconButton, Stack, Tab, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @param {object} param0
 * @param {Array} param0.tabs
 * @param {String} param0.activeTab
 * @param {Function=} param0.onChange
 * @param {Function=} param0.onBack
 * @param {'Rectangular'|'Circular'|'BorderIndicator'} [param0.variant = 'Rectangular']
 * @param {'Dark'|'Light'} [param0.mode = 'Dark']
 * @param {Boolean=} param0.withIcon
 * @param {Boolean=} param0.usePanel
 * @param {SxProps} param0.tabPanelSx
 * @returns
 */
const NavigationTabs = ({
	tabs,
	activeTab,
	onChange,
	onBack,
	variant = 'Rectangular',
	mode = 'Dark',
	withIcon = true,
	usePanel = true,
	indicatorColor = 'transparent',
	children,
	tabPanelSx = {
		p: 0,
	},
}) => {
	const navigate = useNavigate();
	const [value, setValue] = useState(activeTab || '0');

	const handleChange = (event, newValue) => {
		setValue(`${newValue}`);
		if (typeof onChange === 'function') {
			onChange(newValue);
		}
	};

	useEffect(() => {
		if (activeTab) {
			setValue(activeTab);
		}
	}, [activeTab]);

	return (
		<TabContext value={value}>
			<Box
				sx={{
					position: 'sticky',
					display: 'flex',
					top: 0,
					zIndex: 1000,
				}}
			>
				{typeof onBack === 'function' && (
					<IconButton
						onClick={() => {
							navigate(-1);
							onBack();
						}}
					>
						<ArrowBackIosNew />
					</IconButton>
				)}
				<TabList onChange={handleChange} variant="fullWidth">
					{tabs.map(({ label, Icon, title, icon, count }, i) => (
						<Tab
							label={
								<Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize={12} fontWeight={500}>
									{label || title}
									{count ? ` (${count})` : ''}
								</Typography>
							}
							value={`${i}`}
							key={i}
						/>
					))}
				</TabList>
				<Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>{children}</Box>
			</Box>

			{usePanel &&
				tabs?.map(({ Component, props }, i) => (
					<TabPanel value={`${i}`} key={i} sx={{ ...tabPanelSx }}>
						<Component {...props} />
					</TabPanel>
				))}
		</TabContext>
	);
};

export default NavigationTabs;
