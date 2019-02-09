import gulp from "gulp";
import * as conf from "./conf";

/**
 * @author: Shoukath Mohammed
 * @global
 */
const replace = require("gulp-replace")
/**************************************************************
 ********************** REUSABLE METHODS **********************
 **************************************************************/


gulp.task("update-build", () => {
  const comment = conf.comment();

  gulp
    .src(`${conf.buildCfg.web}index.html`)
    .pipe(replace(new RegExp("<%buildInfo%>", "g"), comment.html))
    .pipe(replace(new RegExp("<%encBuildInfo%>", "g"), comment.js))
    .pipe(
      gulp.dest(file => {
        return file.base;
      })
    );
});
