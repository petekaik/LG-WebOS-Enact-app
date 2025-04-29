/**
 * Application version configuration
 * Used for tracking feature implementations and development progress
 */

export const APP_VERSION = '0.1.0'; // Splash Screen implementation

export const FEATURE_FLAGS = {
	// User Story Implementation Status
	SPLASH_SCREEN_IMPLEMENTED: true,      // US-7.*: Basic splash screen with loading/error states
	GRID_VIEW_IMPLEMENTED: false,         // US-1.*: Grid layout for multiple webcams
	FULLSCREEN_VIEW_IMPLEMENTED: false,   // US-1.2: Full-screen viewing of selected webcam
	NAVIGATION_IMPLEMENTED: false,        // US-2.*: Remote control navigation between webcams 
	TIME_DISPLAY_IMPLEMENTED: false,      // US-3.1, US-3.2: Current time display in grid view
	ERROR_LOG_IMPLEMENTED: false,         // US-3.3, US-3.4: Error message log box
	DEBUG_MODE_IMPLEMENTED: false,        // US-3.5: Debug mode for detailed logs
	SETTINGS_IMPLEMENTED: false,          // US-4.*, US-5.*, US-6.*, US-8.*: Settings menu features
};

export default {
	APP_VERSION,
	FEATURE_FLAGS
};