import { ArcticSunriseIcon } from './ArcticSunriseIcon.js';
import { ShipModel } from '../../components/ShipModel/ShipModel.js';

export class ArcticSunriseBlock {
  constructor() {
  const { registerBlockType } = wp.blocks;  // - Extract the `registerBlockType` function from
                                            //   the `wp.blocks` object.

  // - Add the `arctic-sunrise` block to the `planet4-gutenberg-experiments` namespace
  registerBlockType( 'planet4-gutenberg-experiments/arctic-sunrise', {
    title: 'Arctic Sunrise',                      // - Sets the block title
    icon: ArcticSunriseIcon,                      // - The icon is a React component
    category: 'planet4-gutenberg-experiments',    // - Adds it to our custom category
    edit() {
    return <ShipModel />;                         // - Returns the JSX for the Edit window
    },
    save() {
    return null;                                  // - The `save()` function of a block's backend
                                                  //   should be a *pure function*, it's used mainly
                                                  //   to generate the content to be saved for static blocks
                                                  //   from the client side, to be rendered on the frontend.
                                                  //   In this case, it returns null as the rendering for
                                                  //   the frontend view, is handled by the server-side
                                                  //   render_callback.
    }
  } );
  };
}

