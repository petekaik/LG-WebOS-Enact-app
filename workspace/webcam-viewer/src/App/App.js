import React from 'react';
import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels from '@enact/moonstone/Panels';

import MainPanel from '../views/MainPanel';
import SplashScreen from '../components/SplashScreen';

import css from './App.module.less';

/**
 * App component with splash screen
 */
class AppBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			loadingStatus: 'Initializing...',
			loadingProgress: 0,
			loadingError: null,
			isReady: false
		};
	}

	componentDidMount() {
		this.startLoadingSequence();
	}

	startLoadingSequence = () => {
		// Simulate app initialization with phases
		const phases = [
			{ message: 'Initializing application...', progress: 10, delay: 800 },
			{ message: 'Loading resources...', progress: 30, delay: 1200 },
			{ message: 'Preparing interface...', progress: 50, delay: 1000 },
			{ message: 'Connecting services...', progress: 70, delay: 1500 },
			{ message: 'Almost ready...', progress: 90, delay: 800 },
			{ message: 'Ready!', progress: 100, delay: 500 }
		];

		// Process each loading phase sequentially
		let currentPhase = 0;
		const processNextPhase = () => {
			if (currentPhase < phases.length) {
				const phase = phases[currentPhase];
				this.setState({
					loadingStatus: phase.message,
					loadingProgress: phase.progress
				});
				
				currentPhase++;
				
				this.phaseTimer = setTimeout(() => {
					if (currentPhase === phases.length) {
						// All phases completed
						this.setState({ isReady: true });
					} else {
						// Process next phase
						processNextPhase();
					}
				}, phase.delay);
			}
		};

		// Start the loading sequence
		processNextPhase();
	};

	handleSplashComplete = () => {
		this.setState({ isLoading: false });
	};

	componentWillUnmount() {
		if (this.phaseTimer) {
			clearTimeout(this.phaseTimer);
		}
	}

	render() {
		const {
			isLoading, 
			loadingStatus, 
			loadingProgress, 
			loadingError, 
			isReady
		} = this.state;
		
		return (
			<div className={css.app}>
				{isLoading && (
					<SplashScreen
						status={loadingStatus}
						progress={loadingProgress}
						error={loadingError}
						isReady={isReady}
						hideDelay={1500}
						onComplete={this.handleSplashComplete}
					/>
				)}

				{!isLoading && (
					<Panels>
						<MainPanel />
					</Panels>
				)}
			</div>
		);
	}
}

const AppDecorator = kind({
	name: 'App',
	
	styles: {
		css,
		className: 'app'
	},
	
	render: (props) => <AppBase {...props} />
});

export default ThemeDecorator(AppDecorator);
