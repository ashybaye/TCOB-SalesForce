var gulp = require('gulp'),
    //minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    //uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat');


var //sassStyle = 'compact',
    liveOutputDir = 'production/';


var config = {
    paths: {
        javascript: {
            src:  [
                'components/javascripts/lib/jquery-1.11.3.min.js',
                'components/javascripts/lib/modernizr.js',
                'components/javascripts/lib/core.js',
                'components/javascripts/lib/mediaquery.js',
                'components/javascripts/lib/swap.js',
                'components/javascripts/lib/touch.js',
                'components/javascripts/lib/navigation.js',
                'components/javascripts/scripts.js'
            ],
            outputFile: 'site.js',
            dest: 'components/output/'
        },
        sass: {
            src: ["components/css/sass/style.scss"],
            dest: "components/output/"
        },
        css: {
            src: [
                'components/css/lib/normalize.css',
                'components/css/lib/grid.css',
                'components/css/lib/navigation.css',
                'components/output/style.css'
            ],
            outputFile: 'site.css',
            dest: "components/output/"
        }
    }
};
//sassSources = ['components/sass/style.scss'];
//htmlSources = [outputDir + '*.html'];
//gulp.task('js', function() {
//    gulp.src(jsSources)
//        .pipe(concat('script.js'))
//        .pipe(browserify())
//        .pipe(gulpif(env === 'production', uglify()))
//        .pipe(gulp.dest(outputDir + 'js'))
//        .pipe(connect.reload())
//
//});


gulp.task('sass', function() {
    gulp.src(config.paths.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.paths.sass.dest))
        .pipe(connect.reload());
});

gulp.task('styles', function() {
    gulp.src(config.paths.css.src)
        .pipe(concat(config.paths.css.outputFile))
        .pipe(gulp.dest(config.paths.css.dest))
        .pipe(gulp.dest(liveOutputDir + 'css/'))
        .pipe(connect.reload());
});

gulp.task('javascript', function() {
    gulp.src(config.paths.javascript.src)
        .pipe(concat(config.paths.javascript.outputFile))
        .pipe(gulp.dest(config.paths.javascript.dest))
        .pipe(gulp.dest(liveOutputDir + 'js/'))
        .pipe(connect.reload());
});

//gulp.task('html', function() {
//    gulp.src('builds/development/*.html')
//        .pipe(gulpif(env === 'production', minifyHTML()))
//        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
//        .pipe(connect.reload())
//});
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(config.paths.javascript.src, ['javascript']);
    //gulp.watch('*.html');
    gulp.watch('components/css/sass/*.scss', ['sass']);
    gulp.watch('components/output/*.css', ['styles']);
});

// Reload the browser to see changes
gulp.task('connect', function() {
    connect.server({
        root: 'production/',
        livereload: true
    });
});
gulp.task('default', ['sass', 'styles', 'javascript','connect','watch']);