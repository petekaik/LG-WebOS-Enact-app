import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/moonstone/Panels';
import Input from '@enact/moonstone/Input';
import Button from '@enact/moonstone/Button';
import BodyText from '@enact/moonstone/BodyText';
import Scroller from '@enact/moonstone/Scroller';
import ToggleButton from '@enact/moonstone/ToggleButton';

import css from './SettingsPanel.module.less';

/**
 * Core SettingsPanel implementation
 */
class SettingsPanelBase extends React.Component {
	state = {
		autoRefresh: true,
		refreshInterval: '30'
	};

	handleToggle = () => {
		this.setState(prevState => ({
			autoRefresh: !prevState.autoRefresh
		}));
	};

	handleIntervalChange = (e) => {
		this.setState({
			refreshInterval: e.value
		});
	};

	handleSave = () => {
		// In a real app, this would save settings to storage
		console.log('Saving settings:', {
			autoRefresh: this.state.autoRefresh,
			refreshInterval: parseInt(this.state.refreshInterval, 10)
		});
		
		if (this.props.onClose) {
			this.props.onClose();
		}
	};

	render() {
		const { autoRefresh, refreshInterval } = this.state;
		const { ...rest } = this.props;

		return (
			<Panel {...rest}>
				<Header title="Settings" />
				<Scroller className={css.scroller}>
					<div className={css.settingsContent}>
						<div className={css.settingRow}>
							<BodyText>Auto-refresh webcams</BodyText>
							<ToggleButton selected={autoRefresh} onToggle={this.handleToggle} />
						</div>

						<div className={css.settingRow}>
							<BodyText>Refresh interval (seconds)</BodyText>
							<Input 
								value={refreshInterval} 
								onChange={this.handleIntervalChange} 
								disabled={!autoRefresh}
								type="number"
								min={5}
								max={300}
							/>
						</div>

						<div className={css.buttonRow}>
							<Button onClick={this.handleSave}>Save Settings</Button>
						</div>
					</div>
				</Scroller>
			</Panel>
		);
	}
}

/**
 * Styled SettingsPanel component
 */
const SettingsPanel = kind({
	name: 'SettingsPanel',

	propTypes: {
		onClose: PropTypes.func
	},

	styles: {
		css,
		className: 'settingsPanel'
	},

	render: (props) => <SettingsPanelBase {...props} />
});

export default SettingsPanel;