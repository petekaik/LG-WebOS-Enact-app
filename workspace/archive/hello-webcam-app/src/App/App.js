import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/moonstone/ThemeDecorator';
import MainPanel from '../views/MainPanel';

const App = kind({
    name: 'App',

    render: (props) => (
        <div {...props}>
            <MainPanel />
        </div>
    )
});

export default ThemeDecorator(App);