import { createContentlayerPlugin } from "next-contentlayer"


/** @type {import('next').NextConfig} */
const nextConfig = {
  
  compiler: {
    removeConsole:false,
    
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '**',
      },
  ],
  },

  redirects() {
    return [
      {
        source: "/components",
        destination: "/shadcn/docs/components/accordion",
        permanent: true,
      },
      {
        source: "/shadcn/docs/components",
        destination: "/shadcn/docs/components/accordion",
        permanent: true,
      },
      {
        source: "/examples",
        destination: "/shadcn/examples/dashboard",
        permanent: false,
      },
      {
        source: "/shadcn/docs/primitives/:path*",
        destination: "/shadcn/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/figma",
        destination: "/shadcn/docs/figma",
        permanent: true,
      },
      {
        source: "/shadcn/docs/forms",
        destination: "/shadcn/docs/components/form",
        permanent: false,
      },
      {
        source: "/shadcn/docs/forms/react-hook-form",
        destination: "/shadcn/docs/components/form",
        permanent: false,
      },
    ]
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
