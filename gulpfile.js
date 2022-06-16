const gulp = require("gulp");
const minifier = require("gulp-minify-html");
const cssMinifier = require("gulp-minify-css");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const copyHtmlFileInputAddress = "./src/*.html";
const imageMinInputAddress = "./src/assets/*";
const sassInputAddress = "./src/scss/*.scss";

function destAddress(address) {
	return gulp.dest(address);
}

// copy html file
gulp.task("copyHtmlFile", function () {
	gulp
		.src(copyHtmlFileInputAddress)
		.pipe(
			minifier({
				minify: true,
				minifyHTML: {
					collapseWhitespace: true,
					conservativeCollapse: true,
				},
				minifyJS: {
					sourceMap: true,
				},
				minifyCSS: true,
				getKeptComment: function (content, filePath) {
					var m = content.match(/\/\*![\s\S]*?\*\//gim);
					return (m && m.join("\n") + "\n") || "";
				},
			})
		)
		.pipe(gulp.dest("./dist"));
});

// convert sass to css
gulp.task("sass", () => {
	gulp
		.src(sassInputAddress)
		.pipe(sass())
		.pipe(cssMinifier())
		.pipe(destAddress("./dist/css/"));
});

// minify images
gulp.task("imagemin", function () {
	gulp.src("./src/assets/*").pipe(imagemin()).pipe(gulp.dest("./dist/assets"));
});

const copyFont = gulp.task("copyFont", () => {
	gulp.src("./src/font/*").pipe(gulp.dest("./dist/font"));
});

gulp.task("default", () => {
	gulp.watch(copyHtmlFileInputAddress, gulp.series(["copyHtmlFile"]));
	gulp.watch(imageMinInputAddress, gulp.series(["imagemin"]));
	gulp.watch(sassInputAddress, gulp.series(["sass"]));
	gulp.watch("./src/font/*", gulp.series(["copyFont"]));
});
