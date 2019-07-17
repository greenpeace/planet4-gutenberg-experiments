export const convertBlocks = () => {
	wp.data.subscribe(() => {
		const editor = wp.data.select('core/editor');

		if ( editor.getBlockCount() === 1 ) {
			const blocks = editor.getBlocks();

			blocks.forEach(block => {
				if ( block.name === 'core/freeform' ) {
					wp.data.dispatch( 'core/editor' ).replaceBlocks(
						block.clientId,
						wp.blocks.rawHandler({
							HTML: wp.blocks.getBlockContent( block )
						})
					);
				};
			});
		}
	});
};
