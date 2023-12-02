/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      // {
      //   source: "/github",
      //   destination: "https://github.com/admineral/OpenAI-Assistant-API-Chat",
      //   permanent: true,
      // },
      {
        source: "/deploy",
        destination: "https://monday.5zeroinfo.com",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
