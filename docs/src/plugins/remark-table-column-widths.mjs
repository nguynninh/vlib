const WIDTH_MARKER = /\s*\[(?:width|w)=([^\]]+)\]\s*$/;
const SAFE_WIDTH = /^[\w\s.%(),+-]+$/;

function appendStyle(node, style) {
	node.data ??= {};
	node.data.hProperties ??= {};
	node.data.hProperties.style = [node.data.hProperties.style, style].filter(Boolean).join('; ');
}

function takeWidthMarker(cell) {
	const lastChild = cell.children?.at(-1);
	if (!lastChild || lastChild.type !== 'text') return;

	const match = lastChild.value.match(WIDTH_MARKER);
	if (!match) return;

	const width = match[1].trim();
	if (!SAFE_WIDTH.test(width)) return;

	lastChild.value = lastChild.value.replace(WIDTH_MARKER, '');
	return width;
}

export default function remarkTableColumnWidths() {
	return (tree) => {
		for (const node of tree.children ?? []) {
			if (node.type !== 'table') continue;

			const widths = node.children?.[0]?.children?.map(takeWidthMarker) ?? [];
			widths.forEach((width, columnIndex) => {
				if (!width) return;

				for (const row of node.children ?? []) {
					const cell = row.children?.[columnIndex];
					if (cell) appendStyle(cell, `width: ${width}; min-width: ${width}`);
				}
			});
		}
	};
}
