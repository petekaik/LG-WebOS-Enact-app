import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';
import IconButton from '@enact/moonstone/IconButton';
import BodyText from '@enact/moonstone/BodyText';

import GridView from '../components/GridView/GridView';
import SettingsPanel from '../components/SettingsPanel/SettingsPanel';
import {APP_VERSION, FEATURE_FLAGS} from '../config/versions';

/**
 * MainPanel component with webcam viewer features
 */
class MainPanelBase extends React.Component {
	constructor(props) {
		super(props);
		
		// Sample webcam data - in a real app this would come from storage/API
		this.state = {
			webcams: [
				{ 
					id: '1', 
					url: 'https://via.placeholder.com/640x360.png?text=Webcam+1', 
					title: 'Front Door' 
				},
				{ 
					id: '2', 
					url: 'https://via.placeholder.com/640x360.png?text=Webcam+2', 
					title: 'Backyard' 
				},
				{ 
					id: '3', 
					url: 'https://via.placeholder.com/640x360.png?text=Webcam+3', 
					title: 'Garage' 
				}
			],
			showSettings: false,
			selectedWebcam: null,
			showDebug: false
		};
	}

	handleSettingsClick = () => {
		this.setState({ showSettings: true });
	};
	
	handleBackFromSettings = () => {
		this.setState({ showSettings: false });
	};
	
	handleWebcamSelect = (webcam) => {
		this.setState({ selectedWebcam: webcam });
		// In a real app, this would navigate to a fullscreen view
		console.log('Selected webcam:', webcam);
	};
	
	toggleDebug = () => {
		this.setState(prevState => ({ showDebug: !prevState.showDebug }));
	};
	
	render() {
		const { webcams, showSettings, selectedWebcam, showDebug } = this.state;
		
		// Display settings panel if activated
		if (showSettings) {
			return <SettingsPanel onClose={this.handleBackFromSettings} />;
		}
		
		// Display main webcam grid
		return (
			<Panel {...this.props}>
				<Header 
					title={`Webcam Viewer v${APP_VERSION}`}
					slotAfter={
						<IconButton 
							backgroundOpacity="transparent"
							onClick={this.handleSettingsClick}
						>
							settings
						</IconButton>
					}
				/>
				
				<div style={{padding: '20px', height: 'calc(100% - 120px)'}}>
					{webcams.length > 0 ? (
						<GridView 
							webcams={webcams}
							onSelect={this.handleWebcamSelect}
						/>
					) : (
						<div style={{textAlign: 'center', marginTop: '40px'}}>
							<BodyText>No webcams configured. Add webcams in settings.</BodyText>
						</div>
					)}
					
					{/* Debug Information (feature state) */}
					{showDebug && (
						<div style={{
							position: 'absolute',
							bottom: '20px',
							left: '20px',
							right: '20px',
							background: 'rgba(0, 0, 0, 0.7)',
							padding: '15px',
							borderRadius: '10px'
						}}>
							<BodyText>Implemented Features:</BodyText>
							<ul style={{columns: 2, columnGap: '20px'}}>
								{Object.entries(FEATURE_FLAGS).map(([feature, implemented]) => (
									<li key={feature} style={{color: implemented ? '#4CAF50' : '#FF5252'}}>
										{feature.replace(/_/g, ' ')}: {implemented ? '✓' : '✗'}
									</li>
								))}
							</ul>
							<Button size="small" onClick={this.toggleDebug}>Hide Debug</Button>
						</div>
					)}
					
					<Button 
						style={{position: 'absolute', bottom: '20px', right: '20px'}}
						onClick={this.toggleDebug}
					>
						{showDebug ? 'Hide Debug' : 'Show Debug'}
					</Button>
				</div>
			</Panel>
		);
	}
}

const MainPanel = kind({
	name: 'MainPanel',
	render: (props) => <MainPanelBase {...props} />
});

export default MainPanel;
