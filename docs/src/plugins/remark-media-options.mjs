const DOWNLOAD_IMAGE = /^!\[([^\]]*)\]\((\S+\.pdf)\s+download\)$/i;
const STORAGE_TOKEN = 'BASE_STORAGE';

function resolveStorageUrl(url) {
	if (!url.startsWith(STORAGE_TOKEN)) return url;
	const base = process.env.BASE_STORAGE ?? '';
	return base + url.slice(STORAGE_TOKEN.length);
}

function rewriteStorageUrls(node) {
	if (node.type === 'image' && typeof node.url === 'string') {
		node.url = resolveStorageUrl(node.url);
	}
	if (node.children) node.children.forEach(rewriteStorageUrls);
}

function rewriteMediaOptionText(parent) {
	parent.children = parent.children?.map((child) => {
		if (child.type === 'paragraph' && child.children?.length === 1 && child.children[0].type === 'text') {
			const match = child.children[0].value.trim().match(DOWNLOAD_IMAGE);
			if (match) {
				return {
					type: 'paragraph',
					children: [
						{
							type: 'image',
							alt: match[1],
							url: match[2],
							title: 'download',
						},
					],
				};
			}
		}

		if (child.children) rewriteMediaOptionText(child);
		return child;
	});
}

export default function remarkMediaOptions() {
	return (tree) => {
		rewriteMediaOptionText(tree);
		rewriteStorageUrls(tree);
	};
}
