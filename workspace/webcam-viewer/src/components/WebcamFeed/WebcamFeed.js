import React from 'react';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Spottable from '@enact/spotlight/Spottable';
import Image from '@enact/moonstone/Image';
import Spinner from '@enact/moonstone/Spinner';

import css from './WebcamFeed.module.less';

/**
 * WebcamFeed base component
 */
class WebcamFeedCore extends React.Component {
	static propTypes = {
		url: PropTypes.string.isRequired,
		title: PropTypes.string,
		onSelect: PropTypes.func
	};

	static defaultProps = {
		title: ''
	};

	state = {
		loading: true,
		error: false
	};

	componentDidMount() {
		this.startLoading();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.url !== this.props.url) {
			this.startLoading();
		}
	}

	componentWillUnmount() {
		if (this.loadingTimer) {
			clearTimeout(this.loadingTimer);
		}
	}

	startLoading = () => {
		this.setState({ loading: true, error: false });
		
		// In a real app, this would handle webcam connection and error states
		this.loadingTimer = setTimeout(() => {
			this.setState({ loading: false });
		}, 2000);
	};

	render() {
		const { url, title, onSelect, ...rest } = this.props;
		const { loading, error } = this.state;

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
}

/**
 * Apply styling to the WebcamFeed component
 */
const WebcamFeedBase = kind({
	name: 'WebcamFeedBase',

	styles: {
		css,
		className: 'webcamFeed'
	},

	render: (props) => <WebcamFeedCore {...props} />
});

const WebcamFeed = Spottable(WebcamFeedBase);

export default WebcamFeed;