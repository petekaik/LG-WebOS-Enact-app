import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import Spinner from '@enact/moonstone/Spinner';
import BodyText from '@enact/moonstone/BodyText';

import css from './SplashScreen.module.less';

/**
 * SplashScreenBase component
 * 
 * Displays during application initialization.
 * Shows loading status, progress, and error messages.
 */
const SplashScreenBase = kind({
	name: 'SplashScreenBase',

	propTypes: {
		/**
		 * Loading status message to display
		 */
		status: PropTypes.string,
		
		/**
		 * Progress value (0-100)
		 */
		progress: PropTypes.number,
		
		/**
		 * Error message if any
		 */
		error: PropTypes.string,
		
		/**
		 * Whether the splash screen should be visible
		 */
		visible: PropTypes.bool
	},

	defaultProps: {
		status: 'Loading...',
		progress: 0,
		error: null,
		visible: true
	},

	styles: {
		css,
		className: 'splashScreen'
	},

	render: ({status, progress, error, visible, ...rest}) => {
		if (!visible) return null;
		
		return (
			<div {...rest}>
				<div className={css.contentContainer}>
					<div className={css.logo}>
						<div className={css.appTitle}>Webcam Viewer</div>
					</div>
					
					<div className={css.statusContainer}>
						{error ? (
							<BodyText className={css.errorText}>{error}</BodyText>
						) : (
							<>
								<BodyText className={css.statusText}>{status}</BodyText>
								<Spinner />
							</>
						)}
					</div>
					
					{progress > 0 && !error && (
						<div className={css.progressContainer}>
							<div 
								className={css.progressBar} 
								style={{width: `${progress}%`}}
							/>
							<BodyText className={css.progressText}>{progress}%</BodyText>
						</div>
					)}
				</div>
			</div>
		);
	}
});

/**
 * SplashScreen component with automatic transition behavior
 */
class SplashScreen extends React.Component {
	static propTypes = {
		status: PropTypes.string,
		progress: PropTypes.number,
		error: PropTypes.string,
		isReady: PropTypes.bool,
		hideDelay: PropTypes.number,
		onComplete: PropTypes.func
	};

	static defaultProps = {
		status: 'Loading...',
		progress: 0,
		error: null,
		isReady: false,
		hideDelay: 1000
	};

	state = {
		visible: true
	};

	componentDidUpdate(prevProps) {
		const { isReady, hideDelay, onComplete } = this.props;
		const { visible } = this.state;

		// Handle transition when ready state changes
		if (isReady && !prevProps.isReady && visible) {
			this.hideTimer = setTimeout(() => {
				this.setState({ visible: false });
				if (onComplete) onComplete();
			}, hideDelay);
		}
	}

	componentWillUnmount() {
		if (this.hideTimer) {
			clearTimeout(this.hideTimer);
		}
	}

	render() {
		const { status, progress, error } = this.props;
		const { visible } = this.state;

		return (
			<SplashScreenBase
				status={status}
				progress={progress}
				error={error}
				visible={visible}
			/>
		);
	}
}

export default SplashScreen;