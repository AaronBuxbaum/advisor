import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["coverage/", "jest.config.cjs", "jest.setup.cjs"],
  },
];

export default eslintConfig;
