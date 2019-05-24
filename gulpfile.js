var gulp       = require('gulp'), 
	sass         = require('gulp-sass'), 
	browserSync  = require('browser-sync'), 
	concat       = require('gulp-concat'), 
	cssnano      = require('gulp-cssnano'), 
	rename       = require('gulp-rename'), 
	del          = require('del'), 
	imagemin     = require('gulp-imagemin'), 
	pngquant     = require('imagemin-pngquant'), 
	cache        = require('gulp-cache'), 
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', async function() { 
	return gulp.src('app/scss/**/*.scss') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('app/css')) 
		.pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', async function() { 
	browserSync({ 
		server: { 
			baseDir: 'app' 
		},
		notify: false 
	});
});


gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('img', function() {
	return gulp.src('app/img/**/*') 
		.pipe(cache(imagemin({ 
		
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('app/img/opt')); 
});

gulp.task('clear', async function (callback) {
	return cache.clearAll();
})

gulp.task('watch', async function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); 
	gulp.watch('app/*.html', gulp.parallel('code')); 
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));