import React from 'react';
import { storiesOf } from '@storybook/react';
import PubHeader from 'containers/PubNew/PubHeader';
import { pubData, locationData } from '../data';

storiesOf('Components/PubHeaderNew', module).add('default', () => (
	<div>
		<PubHeader
			pubData={pubData}
			locationData={locationData}
			setOverlayPanel={() => {}}
			// isMinimal={false}
		/>
		<PubHeader
			pubData={{
				...pubData,
				useHeaderImage: false,
			}}
			locationData={locationData}
			setOverlayPanel={() => {}}
			// isMinimal={false}
		/>
		<PubHeader
			pubData={pubData}
			locationData={{
				...locationData,
				params: {
					...locationData.params,
					mode: 'Discussions',
				},
			}}
			setOverlayPanel={() => {}}
			// isMinimal={true}
		/>
		<PubHeader
			pubData={{
				...pubData,
				useHeaderImage: false,
			}}
			locationData={{
				...locationData,
				params: {
					...locationData.params,
					mode: 'Discussions',
				},
			}}
			setOverlayPanel={() => {}}
			// isMinimal={true}
		/>
	</div>
));
