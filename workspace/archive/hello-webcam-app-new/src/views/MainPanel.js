import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';
import Scroller from '@enact/moonstone/Scroller';
import {Row, Column, Cell} from '@enact/ui/Layout';
import {useCallback, useState, useEffect} from 'react';

import css from './MainPanel.module.less';

// Sample webcam feeds for initial setup - will be replaced by configurable list later
const defaultWebcams = [
  { id: 1, name: 'Living Room', url: 'https://example.com/cam1/stream', enabled: true },
  { id: 2, name: 'Front Door', url: 'https://example.com/cam2/stream', enabled: true },
  { id: 3, name: 'Backyard', url: 'https://example.com/cam3/stream', enabled: true },
  { id: 4, name: 'Garage', url: 'https://example.com/cam4/stream', enabled: true }
];

// MainPanel component for the webcam grid view
const MainPanelBase = kind({
  name: 'MainPanel',
  propTypes: {},
  defaultProps: {},
  styles: {
    css,
    className: 'mainPanel'
  },
  handlers: {
    onSettingsClick: (ev, {onSettings}) => {
      if (onSettings) {
        onSettings();
      }
    },
    onWebcamClick: (ev, {onSelectWebcam, webcam}) => {
      if (onSelectWebcam) {
        onSelectWebcam(webcam);
      }
    }
  },
  render: ({onSettingsClick, onWebcamClick, webcams, currentTime, ...rest}) => {
    return (
      <Panel {...rest}>
        <Header title="Webcam 2.0" />
        <Scroller>
          <Column>
            <Cell shrink>
              <Row align="center space-between" className={css.topBar}>
                <Cell shrink>
                  <Button onClick={onSettingsClick}>Settings</Button>
                </Cell>
                <Cell shrink>
                  <div className={css.time}>{currentTime}</div>
                </Cell>
              </Row>
            </Cell>
            <Cell>
              <Row>
                {webcams.slice(0, 2).map(webcam => (
                  <Cell key={webcam.id} className={css.webcamCell}>
                    <div
                      className={css.webcamContainer}
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={() => onWebcamClick(webcam)}
                    >
                      <div className={css.webcamLabel}>{webcam.name}</div>
                      <div className={css.webcamPlaceholder}>
                        {webcam.enabled ? 'Camera Feed' : 'Camera Disabled'}
                      </div>
                    </div>
                  </Cell>
                ))}
              </Row>
            </Cell>
            {webcams.length > 2 && (
              <Cell>
                <Row>
                  {webcams.slice(2, 4).map(webcam => (
                    <Cell key={webcam.id} className={css.webcamCell}>
                      <div
                        className={css.webcamContainer}
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={() => onWebcamClick(webcam)}
                      >
                        <div className={css.webcamLabel}>{webcam.name}</div>
                        <div className={css.webcamPlaceholder}>
                          {webcam.enabled ? 'Camera Feed' : 'Camera Disabled'}
                        </div>
                      </div>
                    </Cell>
                  ))}
                </Row>
              </Cell>
            )}
          </Column>
        </Scroller>
      </Panel>
    );
  }
});

// MainPanel container component to manage state
const MainPanel = (props) => {
  // Using setWebcams is planned for future implementation when we add settings functionality
  // eslint-disable-next-line no-unused-vars
  const [webcams, setWebcams] = useState(defaultWebcams);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSettingsClick = useCallback(() => {
    // Will implement settings functionality later
    console.log('Settings clicked');
  }, []);

  const handleSelectWebcam = useCallback((webcam) => {
    // Will implement fullscreen view functionality later
    console.log('Selected webcam:', webcam);
  }, []);

  return (
    <MainPanelBase
      {...props}
      webcams={webcams}
      currentTime={currentTime}
      onSettings={handleSettingsClick}
      onSelectWebcam={handleSelectWebcam}
    />
  );
};

export default MainPanel;
