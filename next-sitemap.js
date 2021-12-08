module.exports  = {
    siteUrl:"https://dana.uz",
    generateRobotsTxt:true,
    exclude:[
      '/vendor/account-settings',
      '/vendor/add-product',
      '/vendor/orders',
      '/vendor/products',
      '/wish-list',
      '/profile/edit',
      '/profile/budget',
      '/server-sitemap.xml',
      "/terms_deliver",
      "/document",
      "/about",
      "/review",
      "/vendor/create/",
      "/review",
      "/cart",
      "/mobile-cart"
    ],
    priority:0.9,
    changefreq:"monthly",
    alternateRefs:[
          {
            href: "https://dana.uz",
            hreflang: 'uz',
          },
          {
            href: "https://dana.uz/ru",
            hreflang: 'ru',
          },
          {
            href: "https://dana.uz/en",
            hreflang: 'en',
          },
    ],
    robotsTxtOptions: {
        additionalSitemaps: [
        `https://dana.uz/server-sitemap.xml`, // <==== Add here
        ],
        policies:[{
          userAgent:"*",
          disallow:[
            '/vendor/account-settings',
            '/vendor/add-product',
            '/vendor/orders',
            '/vendor/products',
            '/wish-list',
            '/profile/edit',
            '/profile/budget',
            '/server-sitemap.xml',
            "/terms_deliver",
            "/document",
            "/about",
            "/review",
            "/vendor/create/",
            "/cart",
             "/mobile-cart"
          ],
          allow:"/"
        }]
    },
}