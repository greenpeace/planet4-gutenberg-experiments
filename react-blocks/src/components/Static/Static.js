import { React, Component } from 'react';

// Include a Select control from WP's React components
import { SelectControl } from '@wordpress/components';

export class Static extends Component {
		constructor(props) {
			super(props)
		}

		renderEdit() {
			return (
				<div>
					<label>Choose a ship</label>

					<SelectControl
						label="Your favourite ship is:"
						value={ this.props.favouriteShip }
						options={ [
							{ label: 'Rainbow Warrior', value: 'Rainbow Warrior' },
							{ label: 'Arctic Sunrise', value: 'Arctic Sunrise' },
							{ label: 'Esperanza', value: 'Esperanza' },
						] }
						// This method is referenced from the SimplestBlock class
						onChange={ this.props.onFavouriteShipChange }
					/>
				</div>
			);
		}

		renderView() {
			return (
				<h3>Your favourite ship is { this.props.favouriteShip }</h3>
			);
		}

		render() {
			return (
					<div>
							{
								this.props.isSelected
								? this.renderEdit()
								: this.renderView()
							}
					</div>
			);
		}
};