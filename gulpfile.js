let gulp = require('gulp'),						
	sass = require('gulp-sass'),				
	browserSync = require('browser-sync'),				
	uglify = require('gulp-uglify'),			
	concat = require('gulp-concat'),			
	rename = require('gulp-rename'),			
	del = require('del'),									
	autoprefixer = require('gulp-autoprefixer'),	
	babel = require('gulp-babel');

gulp.task('clean', async function(){  	
	del.sync('dist')
});

gulp.task('scss', function(){								
	return gulp.src('app/scss/**/*.scss')			 
	.pipe(sass({outputStyle: 'compressed'}))	
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 5 versions'],
		cascade: true
	}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))					
	.pipe(browserSync.reload({stream: true}))	
});

gulp.task('html', function(){					
	return gulp.src('app/*.html')				
	.pipe(browserSync.reload({stream: true}))	
});

gulp.task('script', function(){					 
	return gulp.src('app/jsall/*.js')				
	.pipe(concat('main.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}))	
});

gulp.task('browser-sync', function() {			
    browserSync.init({
        server: {
            baseDir: "app"									
        }
    });
});

gulp.task('export', function(){ 						
	let buildHtml = gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist'))

	let buildCss = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('dist/css'))

	let buildJS = gulp.src('app/js/*.js')
	.pipe(concat('main.js'))
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))

	let buildFonts = gulp.src('app/fonts/**/*.*')	
	.pipe(gulp.dest('dist/fonts'))

	let buildImg = gulp.src('app/img/**/*.*')
	.pipe(gulp.dest('dist/img'))

	let buildVideo = gulp.src('app/video/**/*.*')
	.pipe(gulp.dest('dist/video'))
});

gulp.task('watch', function(){									
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))		
	gulp.watch('app/*.html', gulp.parallel('html'))						
	gulp.watch('app/jsall/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));	






