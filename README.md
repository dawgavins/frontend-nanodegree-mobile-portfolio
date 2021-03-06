===================
Running the website
===================

To view/test the website, please either open your web browser to the hosted site at:
  http://dawgavins.github.io/frontend-nanodegree-mobile-portfolio/dist/index.html
or grab the repository and load dist/index.html in your browser.

The source for the website is all in the root directory of the project, and the optimized/production version of all files is under the dist/ directory

I set up Grunt and installed minify tasks for CSS (grunt-contrib-cssmin), Javascript (grunt-contrib-uglify), HTML (grunt-minify-html), and the image files (grunt-contrib-imagemin).  These tasks take all the files, reduce their size, and copy them to the same relative location under the dist directory.

I also installed the pagespeed plugin for Grunt, to help automate testing.

All references used during the course of this project are listed in references.txt.

=====================================================
Optimizations made in views/js/main.js for pizza.html
=====================================================

Moving pizza optimization
-------------------------
1)  I started by reducing the number of animating pizzas being created.  I noticed that only 5 columns of pizzas were being updated in updatePositions(), so I assumed it was safe to reduce the number of coloumns originally created from 8 to 5.  I also calculated the number of rows of pizzas required by dividing the window height by the height (256) allocated to each row of pizzas.  The total number of pizzas created is now the number of rows * the number of columns.  On my macbook Pro laptop this results in 5 * 4 == 20 pizzas, and on my Samsung Galaxy S3 it adds up to 5 * 6 = 30 pizzas, both well down from 200.

2)  I also optimized the loop inside the updatePositions() function.  The new positions are now only calculated once for each of the 5 phases, and applied to each row of pizzas without repeating the calculation.

3)  I stored a global array (g_moverItems) of all moving pizzas after they are created.  This was done so that when updatePositions() is called, there is no longer a need to query the document for a list of moving pizzas.

4)  I added the "backface-visibility: hidden;", and "transform: translate3d(0, 0, 0);" properties to the .mover class in views/css/style.css.  This cuts down on painting time by giving each moving pizza its own layer, allowing the browser to repaint only the areas where the pizzas have moved.  This takes more memory but runs faster, so may impact slower mobile devices, but I tested it on my Samsung Galaxy S3, and it was fine, so I consider it ok to do.

Resizing pizza optimization
---------------------------

1)  I stored a global array (g_randomPizzaItems) of all resizeable pizzas after they are created.  This was done so that when resizePizzas is called, there is no longer a need to query the document for a list of resizeable pizzas.

2)  I changed the loop inside changePizzaSizes.  Previously the new size was being calculated for every pizza, which was unnecessary since they are all being sized the same.  Instead, I calculated the size difference for the first pizza, and then apply that difference to the entire list of pizzas (cached in g_randomPizzaItems).
