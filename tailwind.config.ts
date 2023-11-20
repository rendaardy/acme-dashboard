import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				"13": "repeat(13, minmax(0, 1fr))",
			},
			colors: {
				blue: {
					"400": "#2589fe",
					"500": "#0070f3",
					"600": "#2f6feb",
				},
			},
		},
		keyframes: {
			shimmer: {
				"100%": {
					transform: "translateX(100%)",
				},
			},
		},
	},
	plugins: [forms],
};
export default config;
