import { React, Component } from 'react';

// Include a Select control from WP's React components
import { SelectControl } from '@wordpress/components';

export class DynamicReact extends Component {
		constructor(props) {
			super(props)
			this.renderEdit = this.renderEdit.bind(this);
			this.renderView = this.renderView.bind(this);
		}

		renderEdit() {
			const options = this.props.posts.map( post => {
				return {
					label: post.title.rendered,
					value: post.title.rendered
				}
			});

			return (
				<div>
					<label>This is a Dynamic React Block with no PHP side.</label>

					<SelectControl
						label="Select a post:"
						value={ this.props.selectedPostTitle }
						options={ options }
						// This method is referenced from the DynamicReactBlock class
						onChange={ this.props.onSelectedPostChange }
					/>
				</div>
			);
		}

		renderView() {
			return (
				<h2>You selected the { this.props.selectedPostTitle } post.</h2>
			);
		}

		render() {
			return (
					<div style={{
						background: '#eee',
						marginBottom: 20,
						padding: 20,
						borderRadius: 20
					}}>
							{
								this.props.isSelected
								? this.renderEdit()
								: this.renderView()
							}
					</div>
			);
		}
};