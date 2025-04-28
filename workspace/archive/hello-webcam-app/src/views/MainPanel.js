import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';
import {Row, Column, Cell} from '@enact/ui/Layout';
import Button from '@enact/moonstone/Button';

import css from './MainPanel.module.less';

// Sample webcam feeds for initial setup - will be replaced by configurable list later
const sampleWebcams = [
  { id: 1, name: 'Living Room', url: 'https://example.com/cam1/stream' },
  { id: 2, name: 'Front Door', url: 'https://example.com/cam2/stream' },
  { id: 3, name: 'Backyard', url: 'https://example.com/cam3/stream' },
  { id: 4, name: 'Garage', url: 'https://example.com/cam4/stream' }
];

const MainPanel = kind({
  name: 'MainPanel',

  render: (props) => (
    <Panel {...props}>
      <Header title="Webcam 2.0" />
      <Scroller>
        <Column>
          <Cell shrink>
            <Row align="center space-around">
              <Cell shrink>
                <Button>Settings</Button>
              </Cell>
              <Cell shrink>
                <div>Current Time: {new Date().toLocaleTimeString()}</div>
              </Cell>
            </Row>
          </Cell>

          <Cell>
            <Row>
              {sampleWebcams.slice(0, 2).map(webcam => (
                <Cell key={webcam.id} className={css['webcam-cell']}>
                  <div className={css['webcam-container']}>
                    <div className={css['webcam-label']}>{webcam.name}</div>
                    <div className={css['webcam-placeholder']}>
                      Camera Feed Placeholder
                    </div>
                  </div>
                </Cell>
              ))}
            </Row>
          </Cell>

          <Cell>
            <Row>
              {sampleWebcams.slice(2, 4).map(webcam => (
                <Cell key={webcam.id} className={css['webcam-cell']}>
                  <div className={css['webcam-container']}>
                    <div className={css['webcam-label']}>{webcam.name}</div>
                    <div className={css['webcam-placeholder']}>
                      Camera Feed Placeholder
                    </div>
                  </div>
                </Cell>
              ))}
            </Row>
          </Cell>
        </Column>
      </Scroller>
    </Panel>
  )
});

export default MainPanel;