<?php

namespace Greenpeace\Planet4GutenbergExperiments\Blocks;

class Base_Block {
	/**
	 * Outputs an error message
	 *
	 * @param $message
	 */
	public function render_error_message( $message ) {
		// ensure only editors see the error, not visitors to the website
		if ( current_user_can( 'edit_posts' ) ) {
			\Timber::render( P4_GUTENBERG_EXPERIMENTS_BASE_PATH . 'templates/block-error-message.twig', array(
				'category' => __('Error', 'planet4-gutenberg-experiments'),
				'message' => $message,
			) );
		}
	}
}
