import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Hides the default title/description/AI-toolbar header for pages
				// that embed their own fully custom content (e.g. interactive guides).
				hidePageIntro: z.boolean().default(false),
			}),
		}),
	}),
};
