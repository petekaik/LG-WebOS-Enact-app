import React from 'react';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Scroller from '@enact/moonstone/Scroller';

import WebcamFeed from '../WebcamFeed/WebcamFeed';

import css from './GridView.module.less';

/**
 * GridView component base implementation
 */
class GridViewBase extends React.Component {
	static propTypes = {
		webcams: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				url: PropTypes.string.isRequired,
				title: PropTypes.string
			})
		),
		onSelect: PropTypes.func
	};

	static defaultProps = {
		webcams: []
	};

	handleSelect = (webcam) => {
		if (this.props.onSelect) {
			this.props.onSelect(webcam);
		}
	};

	render() {
		const { webcams, ...rest } = this.props;

		return (
			<Scroller {...rest} className={css.gridView}>
				<div className={css.grid}>
					{webcams.map((webcam) => (
						<WebcamFeed
							key={webcam.id}
							url={webcam.url}
							title={webcam.title}
							onSelect={() => this.handleSelect(webcam)}
						/>
					))}
					{webcams.length === 0 && (
						<div className={css.emptyState}>
							No webcams available. Add a webcam to get started.
						</div>
					)}
				</div>
			</Scroller>
		);
	}
}

const GridView = kind({
	name: 'GridView',

	styles: {
		css,
		className: 'gridView'
	},

	render: (props) => <GridViewBase {...props} />
});

export default GridView;