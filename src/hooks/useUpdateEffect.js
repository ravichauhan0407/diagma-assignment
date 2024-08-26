import { useEffect, useRef } from 'react';

const useUpdateEffect = (effect, dependencies) => {
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			effect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
};

export default useUpdateEffect;
