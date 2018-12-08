# Template theme for wordpress

Here is a template for wordpress integrator who wants to work with sass and gulp.

## Features

-   The gulp file minifies the sass, js and reloads when css, js, php is edited.
-   the `src/` directory is the location where your sass and integration html is settle.(it uses my default [front-end starter kit](https://github.com/iStuffs/starter-kit) stucture).
-   the wordpress theme implements a header and a footer include (with `wp_head()` and `wp_footer()`).
-   the wordpress theme uses the `<base>` tag to set relative links.

## Installation 

You just have to install the last version of Wordpress via the official website, install it on your local server. And then, just put the theme in the themes directory. 

/!\ You have to change some details about the url and the local server port in the gulpfile.js.
