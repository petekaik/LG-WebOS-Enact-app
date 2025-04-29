import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import Spotlight from '@enact/spotlight';
import Scroller from '@enact/moonstone/Scroller';

import WebcamFeed from '../WebcamFeed/WebcamFeed';

import css from './GridView.module.less';

const GridView = kind({
	name: 'GridView',

	propTypes: {
		webcams: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				url: PropTypes.string.isRequired,
				title: PropTypes.string
			})
		),
		onSelect: PropTypes.func
	},

	defaultProps: {
		webcams: []
	},

	styles: {
		css,
		className: 'gridView'
	},

	render: ({webcams, onSelect, ...rest}) => {
		const handleSelect = useCallback((webcam) => {
			if (onSelect) {
				onSelect(webcam);
			}
		}, [onSelect]);

		return (
			<Scroller {...rest}>
				<div className={css.grid}>
					{webcams.map((webcam) => (
						<WebcamFeed
							key={webcam.id}
							url={webcam.url}
							title={webcam.title}
							onSelect={() => handleSelect(webcam)}
						/>
					))}
					{webcams.length === 0 && (
						<div className={css.emptyState}>
							No webcams available. Add a webcam to get started.
						</div>
					)}
				</div>
			</Scroller>
		);
	}
});

export default GridView;