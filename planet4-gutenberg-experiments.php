<?php
/**
 * Plugin Name: Planet4 Gutenberg Experiments
 * Plugin URI: https://github.com/greenpeace/planet4-gpch-plugin-blocks
 * Description: Provides Planet4 content blocks specific to Greenpeace Switzerland
 * Version: 0.1.1
 * License: MIT
 * Text Domain: planet4-gpch-blocks
 */

// Exit if accessed directly
defined( 'ABSPATH' ) || exit;

// Constants
define( 'P4_GUTENBERG_EXPERIMENTS_BASE_PATH', plugin_dir_path( __FILE__ ) );
define( 'P4_GUTENBERG_EXPERIMENTS_BASE_URL', plugin_dir_url( __FILE__ ) );

// Load translations
add_action( 'plugins_loaded', 'planet4_gutenberg_experiments_load_textdomain' );

function planet4_gutenberg_experiments_load_textdomain() {
	load_plugin_textdomain( 'planet4-gutenberg-experiments', false, basename( dirname( __FILE__ ) ) . '/languages' );
}

// include the Composer autoload file
require P4_GUTENBERG_EXPERIMENTS_BASE_PATH . 'vendor/autoload.php';

// Initialize the actual plugin
$p4_gutenberg_experiments = Greenpeace\Planet4GutenbergExperiments\Planet4_Gutenberg_Experiments::get_instance();
