const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const { utils: { fromBuildIdentifier } } = require('@electron-forge/core');

module.exports = {
  packagerConfig: {
    asar: true,
    overwrite: true,
    win32metadata: {
      FileDescription: 'Cilicili App',
      ProductName: 'Cilicili'
    },
    icon: './electron/favicon.ico',
    ignore: [
      /^\/src/,
      /^\/public/,
      /^\/node_modules/,
      /^\/out/,
      /^\/\./,
      /^\/forge\.config\.js/,
      /^\/vite\.config\.ts/,
      /package-lock\.json/,
      /yarn\.lock/,
      /\.gitignore/,
      /\.git/
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Cilicili',
        authors: 'Cilicili',
        description: 'Cilicili',
        setupIcon: './electron/favicon.ico'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux', 'win32']
    },
    process.platform === 'linux' ? {
      name: '@electron-forge/maker-deb',
      config: {}
    } : null,
    process.platform === 'linux' ? {
      name: '@electron-forge/maker-rpm',
      config: {}
    } : null
  ].filter(Boolean),
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    }
  ]
};
