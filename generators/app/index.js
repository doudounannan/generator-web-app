/**
 * Copyright (C) 2017 baidu.com
 * index.js
 *
 * changelog
 * 2017-08-24[10:26:42]:revised
 *
 * @author yinyong02@baidu.com
 * @version 1.0.0
 * @since 1.0.0
 * @file
 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const moment = require('moment');
const _ = require('lodash');

module.exports = class extends Generator {
    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the amazing ' + chalk.red('generator-web-app') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Your project name?',
            required: true,
            default: this.appname
        }, {
            type: 'input',
            name: 'userName',
            message: 'Your name?',
            required: true,
            default: this.user.git.name()
        }, {
            type: 'input',
            name: 'userEmail',
            message: 'Your email?',
            required: true,
            default: this.user.git.email()
        }];

        return this.prompt(prompts).then(function (props) {
            const m = moment();
            props.now = m.format('YYYY-MM-DD') + '[' + m.format('HH:mm:ss') + ']'; // 2016-11-14[13:52:13]
            props.today = m.format('YYYY-MM-DD'); // 2016-11-14
            props.componentName = _.upperFirst(_.camelCase(props.name));
            this.props = props;
        }.bind(this));
    }

    writing() {
        const metaFiles =
            '.editconfig,.babelrc,.eslintrc,.gitignore,.gitattributes'.split(',');
        const normalFiles =
            'README.md,package.json,CHANGELOG.md,gulpfile.js'.split(',');
        const copyFiles = 'app'.split(',');

        metaFiles.forEach(meta => {
            this.fs.copy(
                this.templatePath(meta),
                this.destinationPath(meta),
                this.props
            );
        });
        normalFiles.forEach(meta => {
            this.fs.copyTpl(
                this.templatePath(meta),
                this.destinationPath(meta),
                this.props
            );
        });
        copyFiles.forEach(meta => {
            this.fs.copy(
                this.templatePath(meta),
                this.destinationPath(meta),
                this.props
            );
        });
    }

    install() {
        this.installDependencies({
            npm: true,
            bower: false,
            yarn: false,
            callback: () => {
                this.log('开发指南:' + chalk.green(' https://www.baidu.com'));
            }
        });
    }
};
