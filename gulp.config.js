const $ = require("gulp-load-plugins")({lazy: true});

module.exports = function(args) {
  function Config() {

    this.src = "/src/";
    this.dest = "./dist/";

    this.img = {
      in: `.${this.src}emails/**/img/*.{png,gif,jpg}`,
      out: `${this.dest}`
    };

    this.server = {
      host: "localhost",
      port: "8001",
      root: "dist/"
    };

    this.helpers = {
        changeMsg: function(event){
            const srcPatter = new RegExp(`/.*(?=${config.src.replace("/\//g", "\/")})/`);
            $.util.log(`File ${ $.util.colors.blue(event.path.replace(srcPatter, "")) }  ${ event.type }`);
        }
    }
  }

  const config = new Config();
  return config;

};
