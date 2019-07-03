import { CoversIcon } from './CoversIcon.js';
import { Covers } from './Covers.js';

export class CoversBlock {
    constructor() {
				const { registerBlockType } = wp.blocks;
				const { withSelect } = wp.data;

        registerBlockType( 'planet4-gutenberg-experiments/covers', {
            title: 'Covers',
            icon: CoversIcon,
						category: 'planet4-gutenberg-experiments',
						transforms: {
							from: [
								{
										type: 'shortcode',
										// Shortcode tag can also be an array of shortcode aliases
										tag: 'shortcake_newcovers',
										attributes: {
											cover_type: {
												type: 'integer',
												shortcode: ( { named: { cover_type = '1' } } ) => cover_type,
											},
											title: {
												type: 'string',
												shortcode: ( { named: { title = '' } } ) => title,
											},
											description: {
												type: 'string',
												shortcode: ( { named: { description = '' } } ) => description,
											},
										},
								},
							]
						},
						attributes: {
							title: {
								type: 'string',
							},
							description: {
								type: 'string',
							},
							tags: {
								type: 'array',
								default: []
							},
							posts: {
								type: 'array',
								default: []
							},
							post_types: {
								type: 'array',
								default: []
							},
							covers_view: {
								type: 'string',
								default: '1'
							},
							cover_type: {
								type: 'integer',
								default: 1
							}
						},
						edit: withSelect( ( select ) => {
							const tagsTaxonomy = 'post_tag';
							const postTypesTaxonomy = 'p4-page-type';
							const args = {
								hide_empty: false,
							};
							const { getEntityRecords } = select( 'core' );
							const tagsList = getEntityRecords( 'taxonomy', tagsTaxonomy, args );
							const postTypesList = getEntityRecords( 'taxonomy', postTypesTaxonomy );
							const posts = getEntityRecords( 'postType', 'post' );

							return {
								postTypesList,
								tagsList,
								posts
							};
						} )( ( {
							postTypesList,
							tagsList,
							posts,
							isSelected,
							attributes,
							setAttributes
						} ) => {

								if ( !tagsList || !postTypesList || !posts ) {
										return "Loading tags, post types and posts...";
								}

								if ( !tagsList && !tagsList.length === 0 ) {
										return "No tags";
								}

								function onRowsChange( value ) {
									setAttributes( { covers_view: value } );
								}

								function onTitleChange( value ) {
									setAttributes( { title: value } );
								}

								function onDescriptionChange( value ) {
									setAttributes( { description: value } );
								}

								function onSelectedTagsChange( tagIds ) {
									setAttributes( { tags: tagIds } );
								}

								function onSelectedPostsChange( value ) {
									setAttributes( { selectedPosts: value.tokens } );
								}

								function onSelectedPostTypesChange( postTypeIds ) {
									setAttributes( { post_types: postTypeIds } );
								}

								function onSelectedLayoutChange( value ) {
									setAttributes( { cover_type: Number(value) } );
								}

								return <Covers
								  { ...attributes }
									isSelected={ isSelected }
									tagsList={ tagsList }
									postTypesList={ postTypesList }
									posts={ posts }
									onSelectedTagsChange={ onSelectedTagsChange }
									onSelectedLayoutChange={ onSelectedLayoutChange }
									onTitleChange={ onTitleChange }
									onDescriptionChange={ onDescriptionChange }
									onSelectedPostsChange={ onSelectedPostsChange }
									onSelectedPostTypesChange={ onSelectedPostTypesChange }
									onRowsChange={ onRowsChange } />
						} ),
            save() {
							return null;
            }
        } );
    };
}

