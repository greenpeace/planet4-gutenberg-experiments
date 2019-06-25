<?php

namespace Greenpeace\Planet4GutenbergExperiments;

class Planet4_Gutenberg_Experiments {

	/**
	 * Singleton instance
	 *
	 * @var Planet4_Gutenberg_Experiments
	 */
	private static $instance;

	/**
	 * Block instances
	 *
	 * @var $blocks
	 */
	private $blocks;


	/**
	 * Returns the instance
	 *
	 * @return Planet4_Gutenberg_Experiments
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}


	/**
	 * Constructor.
	 */
	private function __construct() {
		// Register a block category
		add_filter( 'block_categories', [ $this, 'register_block_category' ], 10, 2 );

		// Load Blocks
		$this->blocks = [
			new Blocks\ArcticSunrise(),
		];
	}

	/**
	 * Registers a new category for our blocks
	 *
	 * @param $categories
	 * @param $post
	 *
	 * @return array
	 */
	public function register_block_category( $categories ) {
		return array_merge(
			$categories,
			[
				[
					'slug'  => 'planet4-gutenberg-experiments',
					'title' => __( 'P4 Experiments', 'planet4-gutenberg-experiments' ),
				],
			]
		);
	}
}
