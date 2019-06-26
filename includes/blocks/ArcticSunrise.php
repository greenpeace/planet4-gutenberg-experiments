<?php

namespace Greenpeace\Planet4GutenbergExperiments\Blocks;

class ArcticSunrise extends Base_Block {
  public function __construct() {
    register_block_type( 'planet4-gutenberg-experiments/arctic-sunrise', [
      'editor_script' => 'planet4-gutenberg-experiments',
      'render_callback' => [ $this, 'render' ]
    ] );
  }

  public function enqueue_react() {
    wp_enqueue_script(
      'planet4-gutenberg-experiments-frontend-script',                    // - Script handler
      P4_GUTENBERG_EXPERIMENTS_BASE_URL .
      'react-blocks/build/frontendIndex.js',                              // - Bundled JS for the frontend
      [ 'wp-element' ],                                                   // - wp-element is actually React
      time(),                                                             // - version number (`time()` for development)
      true                                                                // - Enqueue in the footer
    );
  }

  public function render() {
    return '<div class="ArcticSunriseBlock"></div>';
  }
}
