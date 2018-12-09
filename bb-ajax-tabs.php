<?php
/**
 * Plugin Name: AJAX Tabs for Beaver Builder
 * Plugin URI: http://www.wpbeaverbuilder.com
 * Description: Beaver Builder Tabs with AJAX! Pull posts on your website into tabs, or use the regular text editor on a tab-by-tab basis. Includes an "Initial Tab" setting to specify the tab to open when the page loads.
 * Version: 1.0
 * Author: Simon Barnett
 * Author URI: http://www.simonbarnett.co.za
 */
define( 'BB_AJAX_TABS_DIR', plugin_dir_path( __FILE__ ) );
define( 'BB_AJAX_TABS_URL', plugins_url( '/', __FILE__ ) );

/**
 * AJAX Tabs Beaver Builder Module
 */
function load_bb_ajax_tabs() {
	if ( class_exists( 'FLBuilder' ) ) {
			require_once 'ajaxtabs/bb-ajax-tabs-module.php';
	}
}
add_action( 'init', 'load_bb_ajax_tabs' );
