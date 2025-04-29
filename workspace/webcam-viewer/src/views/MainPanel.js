import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';
import {useState, useCallback} from 'react';
import IconButton from '@enact/moonstone/IconButton';

import GridView from '../components/GridView/GridView';
import SettingsPanel from '../components/SettingsPanel/SettingsPanel';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => {
		// Sample webcam data - in a real app this would come from storage/API
		const [webcams, setWebcams] = useState([
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
		]);
		
		const [showSettings, setShowSettings] = useState(false);
		const [selectedWebcam, setSelectedWebcam] = useState(null);
		
		const handleSettingsClick = useCallback(() => {
			setShowSettings(true);
		}, []);
		
		const handleBackFromSettings = useCallback(() => {
			setShowSettings(false);
		}, []);
		
		const handleWebcamSelect = useCallback((webcam) => {
			setSelectedWebcam(webcam);
			// In a real app, this would navigate to a fullscreen view
			console.log('Selected webcam:', webcam);
		}, []);
		
		// Display settings panel if activated
		if (showSettings) {
			return <SettingsPanel onClose={handleBackFromSettings} />;
		}
		
		// Display main webcam grid
		return (
			<Panel {...props}>
				<Header 
					title="Webcam Viewer"
					slotAfter={
						<IconButton 
							backgroundOpacity="transparent"
							onClick={handleSettingsClick}
						>
							settings
						</IconButton>
					}
				/>
				<GridView 
					webcams={webcams}
					onSelect={handleWebcamSelect}
				/>
			</Panel>
		);
	}
});

export default MainPanel;
