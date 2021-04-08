const configs = require('./config')

module.exports = {
  purge: {
    // enabled: true,
    mode: 'all',
    preserveHtmlElements: false,
    content: [
      './src/**/*.html',
      './src/javascripts/**/*.js'
    ],
    options: {
      safelist: configs.noClass,
      blocklist: [/^debug-/],
      keyframes: true,
      fontFace: true
    }
  },
  darkMode: false,
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-mute)'
        }
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          'button-primary': 'var(--color-button-primary)',
          'button-primary-hover': 'var(--color-button-primary-hover)'
        }
      },
      fontFamily: {
        body: ['Source Sans Pro'],
        jost: ['Jost']

      },
      zIndex: {
        '0': 0,
        'a-1': -1,
        '1': 1,
        'auto': 'auto'
      },
      maxWidth: configs.maxWidths,
      maxHeight: configs.maxHeights,
      screens: configs.Screes,
      colors: configs.Colors,
      backgroundPosition: configs.backgroundPositions,
      backgroundSize: configs.backgroundSizes,
      borderRadius: configs.radiusBorder,
      borderWidth: configs.widthBorder,
      boxShadow: configs.boxShadows,
      cursor: configs.Cursors,
      fontSize: configs.fontSizes,
      fontWeight: configs.fontWeights,
      letterSpacing: configs.letterSpacings,
      lineHeight: configs.lineHeights,
      listStyleType: configs.listStyleTypes,
      minHeight: configs.minHeights,
      minWidth: configs.minWidths,
      opacity: configs.opacitys,
      order: configs.Orders,
      transformOrigin: configs.transformOrigins,
      transitionDuration: configs.transitionDurations,
      transitionProperty: configs.transitionPropertys,
      transitionTimingFunction: configs.transitionTimingFunctions,
      rotate: configs.rotates,
      scale: configs.scales,
      spacing: configs.spaces
    }
  },
  variants: {
    extend: {
      translate: ['motion-safe']
    }

  },
  corePlugins: {
    container: false,
    animation: false
  },
  plugins: [
    function ({ addComponents }) {
      addComponents(configs.containers)
    }
  ]
}
