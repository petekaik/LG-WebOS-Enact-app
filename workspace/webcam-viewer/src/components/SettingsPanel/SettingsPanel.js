import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/moonstone/Panels';
import Input from '@enact/moonstone/Input';
import Button from '@enact/moonstone/Button';
import BodyText from '@enact/moonstone/BodyText';
import Scroller from '@enact/moonstone/Scroller';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {useCallback, useState} from 'react';

import css from './SettingsPanel.module.less';

const SettingsPanel = kind({
	name: 'SettingsPanel',

	styles: {
		css,
		className: 'settingsPanel'
	},

	render: (props) => {
		const [autoRefresh, setAutoRefresh] = useState(true);
		const [refreshInterval, setRefreshInterval] = useState('30');

		const handleToggle = useCallback(() => {
			setAutoRefresh(!autoRefresh);
		}, [autoRefresh]);

		const handleIntervalChange = useCallback((e) => {
			setRefreshInterval(e.value);
		}, []);

		const handleSave = useCallback(() => {
			// In a real app, this would save settings to storage
			console.log('Saving settings:', {
				autoRefresh,
				refreshInterval: parseInt(refreshInterval, 10)
			});
		}, [autoRefresh, refreshInterval]);

		return (
			<Panel {...props}>
				<Header title="Settings" />
				<Scroller className={css.scroller}>
					<div className={css.settingsContent}>
						<div className={css.settingRow}>
							<BodyText>Auto-refresh webcams</BodyText>
							<ToggleButton selected={autoRefresh} onToggle={handleToggle} />
						</div>

						<div className={css.settingRow}>
							<BodyText>Refresh interval (seconds)</BodyText>
							<Input 
								value={refreshInterval} 
								onChange={handleIntervalChange} 
								disabled={!autoRefresh}
								type="number"
								min={5}
								max={300}
							/>
						</div>

						<div className={css.buttonRow}>
							<Button onClick={handleSave}>Save Settings</Button>
						</div>
					</div>
				</Scroller>
			</Panel>
		);
	}
});

export default SettingsPanel;