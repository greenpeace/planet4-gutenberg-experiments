import { StaticIcon } from '././StaticIcon';
import { Static } from './Static';

export class StaticBlock {
    constructor() {
        const { registerBlockType } = wp.blocks;

        registerBlockType( 'planet4-gutenberg-experiments/static', {
            title: 'Static Example',
            icon: StaticIcon,
						category: 'planet4-gutenberg-experiments',
						attributes: {
							favouriteShip: {
								type: 'string'
							}
						},
            edit( {
							attributes, 			// - The block's attributes
							setAttributes,    // - Method to set the attributes
							isSelected        // - Handy flag to toggle the edit view
						} ) {
							function onFavouriteShipChange( value ) {
								setAttributes( { favouriteShip: value } );
							}
							return <Static
								isSelected={ isSelected }
								favouriteShip={ attributes.favouriteShip }
								onFavouriteShipChange={ onFavouriteShipChange } />;
            },
            save( { attributes } ) {
							return <Static favouriteShip={ attributes.favouriteShip } />;
            }
        } );
    };
}

