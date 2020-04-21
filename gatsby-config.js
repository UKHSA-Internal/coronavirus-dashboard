const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Tracking Coronavirus (COVID-19)`,
    description: `GOV.UK Coronavirus dashboard`,
    siteUrl: 'https://coronavirus.data.gov.uk',
  },
  plugins: [
    'gatsby-plugin-flow',
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    `gatsby-plugin-favicon`,
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/layouts'),
        components: path.join(__dirname, 'src/components'),
        hooks: path.join(__dirname, 'src/hooks'),
        addIECss: path.join(__dirname, 'src/addIECss.js'),
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tracking Coronavirus (COVID-19)`,
        short_name: `covid-19-tracking`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        icon: `src/favicon.png`,
        display: "standalone",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
