import { StaticWithAPI } from './StaticWithAPI';

export class StaticWithAPIBlock {
    constructor() {
				const { registerBlockType } = wp.blocks;
				const { withSelect } = wp.data;
        registerBlockType( 'planet4-gutenberg-experiments/static-with-api', {
            title: 'Static with API (Ex. 2)',
            icon: 'format-video',
						category: 'planet4-gutenberg-experiments',
						attributes: {
							selectedPostTitle: {
								type: 'string'
							}
						},
						edit: withSelect( ( select ) => {
								return {
										posts: select( 'core' ).getEntityRecords( 'postType', 'post' )
								};
						} )( ( { posts, isSelected, attributes, setAttributes } ) => {

								if ( ! posts ) {
										return "Loading...";
								}

								if ( posts && posts.length === 0 ) {
										return "No posts";
								}

								function onSelectedPostChange( value ) {
									setAttributes( { selectedPostTitle: value } );
								}

								return <StaticWithAPI
									isSelected={ isSelected }
									posts={ posts }
									selectedPostTitle={ attributes.selectedPostTitle }
									onSelectedPostChange={ onSelectedPostChange } />
						} ),
            save( { attributes } ) {
							return <StaticWithAPI selectedPostTitle={ attributes.selectedPostTitle } />;
            }
        } );
    };
}

