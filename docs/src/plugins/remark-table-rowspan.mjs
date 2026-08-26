const ROWSPAN_MARKER = '^^';

function cellText(cell) {
	return cell?.children?.length === 1 && cell.children[0].type === 'text' ? cell.children[0].value.trim() : '';
}

export default function remarkTableRowSpan() {
	return (tree) => {
		for (const node of tree.children ?? []) {
			if (node.type !== 'table') continue;

			const rows = node.children ?? [];
			const spanStart = [];

			rows.forEach((row, rowIndex) => {
				const toRemove = [];

				row.children?.forEach((cell, columnIndex) => {
					if (cellText(cell) !== ROWSPAN_MARKER) {
						spanStart[columnIndex] = { cell, rowIndex };
						return;
					}

					const target = spanStart[columnIndex];
					if (!target || target.rowIndex === 0) return;

					target.cell.data ??= {};
					target.cell.data.hProperties ??= {};
					target.cell.data.hProperties.rowSpan = (target.cell.data.hProperties.rowSpan ?? 1) + 1;
					toRemove.push(cell);
				});

				row.children = row.children.filter((cell) => !toRemove.includes(cell));
			});
		}
	};
}
