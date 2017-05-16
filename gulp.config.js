import fs from 'fs';
import path from 'path';
const $ = require("gulp-load-plugins")({lazy: true});

module.exports = function(args) {
  function Config() {

    this.src = "/src/";
    this.dest = "./dist/";
    this.index = `.${this.src}index.pug`;
    this.email_src = `${this.src}emails/`;
    this.pug_w = ['src/layout/*.pug','src/emails/**/*.pug']

    this.img = {
      in: `.${this.email_src}**/img/**/*.{png,gif,jpg}`,
      out: `${this.dest}`
    };

    this.server = {
      host: "localhost",
      port: "8001",
      root: this.dest
    };

    this.helpers = {
        changeMsg: function(event){
            const srcPatter = new RegExp(`/.*(?=${config.src.replace("/\//g", "\/")})/`);
            $.util.log(`File ${ $.util.colors.blue(event.path.replace(srcPatter, "")) }  ${ event.type }`);
        },
        getFolders: function(dirname){
          return fs.readdirSync(dirname)
          .filter(function(file) {
              return fs.statSync(path.join(dirname, file)).isDirectory();
          });
        }
    }
  }

  const config = new Config();
  return config;

};
