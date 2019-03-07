const config = require('../config')

const assetsSubDirectory = config.build.assetsSubDirectory
const jsMatchRegExp = new RegExp(`^${assetsSubDirectory}\/(js|css)\/[A-Za-z0-9_-]+\/\\S+\\.(js|css)$`)
const cssMatchRegExp = new RegExp(`^${assetsSubDirectory}\/(js|css)\/\\S+\\.(js|css)$`)

function ImagePublicPathReset (options) {}

ImagePublicPathReset.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, cb) {

        let compilationMap = {},
            relativePath = '',
            ext = 'css'

        for (let filename in compilation.assets) {
            if (jsMatchRegExp.test(filename) || cssMatchRegExp.test(filename)) {
                ext = filename.endsWith('css') ? 'css' : 'js'
                relativePath = filename.split(`${assetsSubDirectory}/${ext}/`)[1]
                relativePath = relativePath.replace(/[^\/]/g, '').replace(/[\/]/g, '../')

                if (ext === 'css') {
                    relativePath += '../../'
                }

                compilationMap[filename] = compilation.assets[filename].source().replace(/static\/img\//g, `${relativePath}static/img/`)
            }
        }

        for (let fileItem in compilationMap) {
            compilation.assets[fileItem] = {
                source () {
                    return compilationMap[fileItem]
                },

                size () {
                    return compilationMap[fileItem].length
                }
            }
        }
        cb()
    })
}

module.exports = ImagePublicPathReset