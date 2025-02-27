import { loadMathJax, Plugin } from 'obsidian';

export default class MathPlugin extends Plugin {
	async onload() {
		console.log("Math plugin loaded");

		await loadMathJax();

		if (!MathJax) {
		  console.warn("MathJax was not defined despite loading it");
		  return;
		}

		// Load preample
		const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'] as const;
		const preamble = letters.map((letter, index) => {
			const dimension = index + 1;
			const placeholders = Array(dimension)
			  .fill(0)
			  .map((_, i) => `#${i + 1}`)
			  .join(' \\\\ ');
			return `\\newcommand{\\Vec${letter}}[${dimension}]{\\mathbf{\\begin{pmatrix} ${placeholders} \\end{pmatrix}}}`;
		}).join(' ');

		if (MathJax.tex2chtml == undefined) {
			MathJax.startup.ready = () => {
				MathJax.startup.defaultReady();
				MathJax.tex2chtml(preamble);
			};
		} else {
			MathJax.tex2chtml(preamble);
		}
	}

	onunload() {
		console.warn("Can't disable preamble")
		console.log("Math plugin unloaded");
	}
}
