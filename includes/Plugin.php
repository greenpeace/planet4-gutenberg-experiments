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

    // Load the editor scripts
    add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_editor_scripts' ] );

    // Load Blocks
    $this->blocks = [
      new Blocks\ArcticSunrise(),
      new Blocks\Covers(),
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

  public function enqueue_editor_scripts() {
    wp_enqueue_style( 'wp-components' );

    wp_enqueue_style(
      'p4ge-blocks',
      P4_GUTENBERG_EXPERIMENTS_BASE_URL .
      'react-blocks/build/style.min.css', // - Bundled CSS for the blocks
      [ 'bootstrap' ]
    );

    // Enqueue editor script for all Blocks in this Plugin
    wp_enqueue_script(
      'planet4-gutenberg-experiments-editor-script',                       // - Script handler
      P4_GUTENBERG_EXPERIMENTS_BASE_URL .
      'react-blocks/build/editorIndex.js',     		                         // - Bundled JS for the editor
      [
        'wp-blocks',      // - Helpers for registering blocks
        'wp-components',  // - Wordpress components
        'wp-element',     // - WP React wrapper
        'wp-data',        // - WP data helpers
        'wp-editor',      // - WP editor helpers
        'wp-i18n'         // - Exports the __() function
      ]
    );

    // Variables exposed from PHP to JS,
    // WP calls this "localizing a script"...
    $reflectionVars = [
      'home' => P4_GUTENBERG_EXPERIMENTS_BASE_URL . '/public/'
    ];
    wp_localize_script( 'planet4-gutenberg-experiments-editor-script', 'p4ge_vars', $reflectionVars );
  }
}
