import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Spottable from '@enact/spotlight/Spottable';
import Image from '@enact/moonstone/Image';
import Spinner from '@enact/moonstone/Spinner';
import {useState, useEffect} from 'react';

import css from './WebcamFeed.module.less';

const WebcamFeedBase = kind({
	name: 'WebcamFeed',

	propTypes: {
		url: PropTypes.string.isRequired,
		title: PropTypes.string,
		onSelect: PropTypes.func
	},

	defaultProps: {
		title: ''
	},

	styles: {
		css,
		className: 'webcamFeed'
	},

	render: ({url, title, onSelect, ...rest}) => {
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);

		useEffect(() => {
			setLoading(true);
			setError(false);
			
			// In a real app, this would handle webcam connection and error states
			const timer = setTimeout(() => {
				setLoading(false);
			}, 2000);

			return () => clearTimeout(timer);
		}, [url]);

		return (
			<div {...rest} onClick={onSelect}>
				<div className={css.container}>
					{loading && <Spinner centered />}
					{error && <div className={css.error}>Unable to connect to webcam</div>}
					{!loading && !error && (
						<Image
							className={css.feedImage}
							src={url}
							alt={title}
						/>
					)}
				</div>
				{title && <div className={css.title}>{title}</div>}
			</div>
		);
	}
});

const WebcamFeed = Spottable(WebcamFeedBase);

export default WebcamFeed;