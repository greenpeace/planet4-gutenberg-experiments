import { React, Component } from 'react';

export class LayoutSelector extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className='LayoutSelector'>
			<style>{`
				.LayoutSelector {
					display: flex;
					width: 100%;
					margin-bottom: 30px;
				}
				.LayoutSelector .LayoutOption {
					padding: 20px;
					border-right: 1px solid #ccc;
					width: 100%;
				}
				.LayoutSelector .LayoutOption:last-child {
					border-right: 0;
				}
				.LayoutSelector .help {
					font-family: Roboto;
					font-size: 10pt;
					margin-top: 10px;
				}
			`}
			</style>
			{
				this.props.options.map(layoutOption => {
					return (
						<div className='LayoutOption'>
							<h5>{ layoutOption.label }</h5>
							{
								layoutOption.image
								? <img src={ layoutOption.image } />
								: null
							}
							{
								layoutOption.help
								? <p className='help'>{ layoutOption.help }</p>
								: null
							}
						</div>
					)
				})
			}
		</div>;
	}
}