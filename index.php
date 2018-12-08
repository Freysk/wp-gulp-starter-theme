<?php get_header(); ?>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<h1>WP-Gulp Starter theme</h1>

<?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>
