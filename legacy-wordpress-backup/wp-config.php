<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'benlowre_benlowrey' );

/** MySQL database username */
define( 'DB_USER', 'benlowre_ben' );

/** MySQL database password */
define( 'DB_PASSWORD', 'q~D[PZz4_@$u' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'uHBxpoOoY1xWhD84bE0UH3JvmnsxAdUxbGREfJwXqum6ohkXV8zSfvLHMbACtQWj');
define('SECURE_AUTH_KEY',  'VjP90GebFeejTu7YxC4hwqKchlsTYdV0ZxECFTkCZFooI6b82rhsVghJhYRWGoEN');
define('LOGGED_IN_KEY',    '6qUtdY7K5SiMcw9os01qMlmHUsLclL2wGHseNvRDnaDTfSJeAUfjc3W1244gIlqa');
define('NONCE_KEY',        'nFJhA9eV1tEKSoMNeSMDAgzhvl46LclXR6quyN38zWYgCYS517ew3dFcpK4vO8BF');
define('AUTH_SALT',        'qqU0vNjyPf9ePHGsR7uySPW0Cf7RufHCvb2hCITqfHDX23S08HrAzuC7s3rdUsr8');
define('SECURE_AUTH_SALT', 'wCKwwqGatHGbTQ5BHkbLktebUycf4qss1H8NKRY1TxMXhpTDvLJgFGeF5YRkGgJj');
define('LOGGED_IN_SALT',   'SyG8aEuxczR83E5DCwIfHMKP4hveTdtGGlFBloVSwWzo8j4q8RR9KDlVLoU8RIj8');
define('NONCE_SALT',       'evFcgsoMvqlr3Iu7eYUJ8ZRjhUWkEfPIaU2hAJW7O9cVtWOjh01CIDV1Ha2EeyxJ');

/**
 * Other customizations.
 */
define('FS_METHOD','direct');
define('FS_CHMOD_DIR',0755);
define('FS_CHMOD_FILE',0644);
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');

/**
 * Turn off automatic updates since these are managed externally by Installatron.
 * If you remove this define() to re-enable WordPress's automatic background updating
 * then it's advised to disable auto-updating in Installatron.
 */
define('AUTOMATIC_UPDATER_DISABLED', true);


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';