import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PATH_NAME } from 'configs';

const StaysList = lazy(() => import('features/stay/screens/StaysList'));
const StayDetail = lazy(() => import('features/stay/screens/StayDetail'));

const AppRoutes = () => {
	return (
		<Suspense fallback={<div />}>
			<React.Fragment>
				<Routes>
					<Route path={PATH_NAME.ROOT} element={<StaysList />} />
					<Route path={PATH_NAME.STAY_DETAIL} element={<StayDetail />} />
				</Routes>
			</React.Fragment>
		</Suspense>
	);
};

export default AppRoutes;
