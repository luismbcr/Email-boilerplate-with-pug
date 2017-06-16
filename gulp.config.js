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
    this.zip_path = "./dist"
    this.pkg_json = JSON.parse(fs.readFileSync(`${__dirname}/package.json`, 'utf8'));
    this.remote_conf = `${__dirname}/.ftppass`;
    this.remote_d = (fs.existsSync(this.remote_conf)) ? JSON.parse(fs.readFileSync(this.remote_conf, 'utf8')) : null;
    this.ftp_info = (this.remote_d) ? this.remote_d.ftp : null;
    this.email_d = (this.remote_d) ? this.remote_d.email : null;

    this.img = {
      in: `.${this.email_src}**/img/**/*.{png,gif,jpg}`,
      out: `${this.dest}`
    };

    this.ftp = (this.remote_d) ? {
            //default title is set to same name as package.json
            stagingFolder: this.ftp_info.remotePath + this.pkg_json.name,
            host: this.ftp_info.host,
            port: this.ftp_info.port,
            user: this.ftp_info.user,
            pass: this.ftp_info.pass,

    } : null;

    this.email = (this.remote_d) ? {
            //send-mail credentials
            mailType: this.email_d.mailType,
            mailService: this.email_d.mailService,
            mailUsername: this.email_d.user,
            mailPassword: this.email_d.pass
    } : null;

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
