import { CoversIcon } from './CoversIcon.js';
import { Covers } from '../../components/Covers/Covers.js';

export class CoversBlock {
    constructor() {
				const { registerBlockType } = wp.blocks;
				const { withSelect } = wp.data;

        registerBlockType( 'planet4-gutenberg-experiments/covers', {
            title: 'Covers',
            icon: CoversIcon,
						category: 'planet4-gutenberg-experiments',
						attributes: {
							rows: {
								type: 'string',
							},
							selectedTags: {
								type: 'array'
							},
							selectedLayout: {
								type: 'string'
							}
						},
						edit: withSelect( ( select ) => {
							const taxonomy = 'post_tag';
							const args = {
								hide_empty: false,
							};
							const { getEntityRecords } = select( 'core' );
							const tagsList = getEntityRecords( 'taxonomy', taxonomy, args );
							const posts = getEntityRecords( 'postType', 'post' );

							return {
								tagsList,
								posts
							};
						} )( ( { tagsList, posts, isSelected, attributes, setAttributes } ) => {

								if ( ! tagsList ) {
										return "Loading...";
								}

								if ( tagsList && tagsList.length === 0 ) {
										return "No posts";
								}

								function onRowsChange( value ) {
									setAttributes( { rows: value } );
								}

								function onSelectedTagsChange( value ) {
									setAttributes( { selectedTags: value.tokens } );
								}

								function onSelectedLayoutChange( value ) {
									setAttributes( { selectedLayout: value } );
								}

								return <Covers
									isSelected={ isSelected }
									tagsList={ tagsList }
									rows={ attributes.rows }
									posts={ posts }
									selectedTags={ attributes.selectedTags }
									onSelectedTagsChange={ onSelectedTagsChange }
									onSelectedLayoutChange={ onSelectedLayoutChange }
									onSelectedPostChange={ onRowsChange } />
						} ),
            save( { attributes } ) {
							return <Covers rows={ attributes.rows } selectedTags={ attributes.selectedTags } />;
            }
        } );
    };
}

