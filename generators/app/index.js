'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('MobileAds customized rich media ad') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project Name',
      default: 'NAME'
    }, {
      type: 'input',
      name: 'size',
      message: 'Ad Size (width x height)',
      default: '320x480'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(`${this.contextRoot}/MADS_Project_${this.props.name}`);

    this.fs.copy(
      this.templatePath('**/!(ignore.txt)'),
      this.destinationPath(),
      {
        globOptions: {
          dot: true
        }
      }
    );

    this.fs.copy(
      this.templatePath('ignore.txt'),
      this.destinationPath('.gitignore')
    );

    const width = this.props.size.split('x')[0];
    const height = this.props.size.split('x')[1];

    this.fs.copyTpl(
      this.templatePath('src/main.css'),
      this.destinationPath('src/main.css'),
      {
        height,
        width
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        name: `MADS_Project_${this.props.name}`
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: `MADS_Project_${this.props.name}`
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: `MADS_Project_${this.props.name}`
      }
    );
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true
    });
  }
};
