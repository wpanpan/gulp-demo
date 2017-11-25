'use strict'
var gulp = require('gulp');
//css代码编译，压缩，合并没有必要，一般预处理css可以导包
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
gulp.task('style',function(){
	gulp.src(['src/css/*.less','!src/css/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream:true
	}));
});
//js合并，压缩，混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
		stream:true
	}));
});
//图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
		stream:true
	}));
});
//html代码压缩,去注释，拷贝
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({
		stream:true
	}));
}); 
//浏览器同步
var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server:{
			baseDir:['dist']
		}
	},function(err,bs){
		console.log(bs.options.getIn(["urls", "local"]));//该行是直接从文档上拿过来的代码,多查文档
	})
});

gulp.watch('src/css/*.less',['style']);
gulp.watch('*.html',['html']);
gulp.watch('src/scripts/*.js',['script']);
gulp.watch('src/images/*.*',['image']);

