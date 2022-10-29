<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'tech' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'YA/bp15(3slx]0C|fVhJ8!j<A.EpP&.8]:;y-T)n/ q`g9!ze?iiJE`ZI<wn+HW3' );
define( 'SECURE_AUTH_KEY',  '8KnrQYT{U&E$twLN9Qt%3]_^R`4eekHlCi-*{NT{3_ueNEwHu!p@Xa{HmEA1(P|m' );
define( 'LOGGED_IN_KEY',    'hrCJ]pI|;uVI`_`DVeaShDhv4OVG+rh{0EDj{k&^&1R%9NT]TZ!B7@.`kL^MnkT)' );
define( 'NONCE_KEY',        'K2>7v3j(8MxL3/BB6dVkt*!A*yghI1CJ$h hkdjwV=*^FpOSqajf5>3zcwZKEwIN' );
define( 'AUTH_SALT',        'C.17;#Tmy>fN0nhwv]0jn^J-mzbBJ_pU%h(FEFrDM6i[q,imn0@3B}|6/^kpdPG*' );
define( 'SECURE_AUTH_SALT', '3#!FE`]5MLYgLP$#8L];k3d6y IJo4EU5Jxix)d2XI;hZtC/:If9a>OF1}&HhtOJ' );
define( 'LOGGED_IN_SALT',   'B2Z;f_!&,PS%Ceb5dKo4eky#Zus4tI@P!]yefF%>B(|EdD&Q4{t!Cuqga^ /)#8V' );
define( 'NONCE_SALT',       '!J@szWq<8qUa1IYFfh%UhGWJirM&AFb|jo=.EGZeN0%^DzMfr+2)>Ts)^tjiL92>' );

/**#@-*/

/**
 * WordPress database table prefix.
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
define( 'FS_METHOD', 'direct' );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
?>