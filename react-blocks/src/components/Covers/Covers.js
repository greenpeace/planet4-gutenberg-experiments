import { React, Component } from 'react';
import { FormTokenField, SelectControl, RadioControl } from '@wordpress/components';
import { LayoutSelector } from '../LayoutSelector/LayoutSelector';

export class Covers extends Component {
		constructor(props) {
			super(props);
		}

		renderEdit() {
			const suggestions = this.props.tagsList.map( tag => tag.name );
			const postsSelectOptions = this.props.posts.map( post => {
				return { label: post.title.rendered, value: post.title.rendered }
			});

			return (
				<div>
					<label>Covers Block Options</label>

					<div>
						<LayoutSelector
							selected={ this.props.selectedLayout }
							options={[
								{
									label: 'Take Action Covers',
									image: window.p4ge_vars.home + 'images/take_action_covers.png',
									value: '1',
									help: 'Take action covers pull the featured image, tags, have a 25 character excerpt and have a call to action button'
								},
								{
									label: 'Campaign Covers',
									image: window.p4ge_vars.home + 'images/campaign_covers.png',
									value: '2',
									help: 'Campaign covers pull the associated image and hashtag from the system tag definitions.',
								},
								{
									label: 'Content Covers',
									image: window.p4ge_vars.home + 'images/content_covers.png',
									value: '3',
									help: 'Content covers pull the image from the post.' },
							]}
						/>
					</div>

					<SelectControl
						label="Rows to display"
						value={ this.props.rows }
						options={ [
							{ label: '1 Row', value: '1' },
							{ label: '2 Rows', value: '2' },
							{ label: 'All rows', value: 'all' },
						] }
						onChange={ this.props.onRowsChange }
					/>

					<label>Tags</label>

					<FormTokenField
						value={ this.props.selectedTags }
						suggestions={ suggestions }
						onChange={ tokens => this.props.onSelectedTagsChange( { tokens } ) }
						placeholder="Select Tags"
					/>

					<SelectControl
					  multiple
						label="Select posts"
						value={ this.props.selectedPosts }
						options={ postsSelectOptions }
						onChange={ this.props.onSelectedPostsChange }
					/>

				</div>
			);
		}

		render() {
			return (
					<div>
							{
								this.props.isSelected
								? this.renderEdit()
								: <div>
										<h1>Covers here</h1>
										Value is { this.props.rows }
									</div>
							}

					</div>
			);
		}
};