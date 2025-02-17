import { loadMathJax, Plugin } from 'obsidian';

export default class MathPlugin extends Plugin {
	async onload() {
		console.log("Math plugin loaded!");

		await loadMathJax();

		if (!MathJax) {
		  console.warn("MathJax was not defined despite loading it.");
		  return;
		}

		// Load preample
		const preamble = "$\\newcommand{\\Vec}[3]{\\mathbf{\\begin{pmatrix} #1 \\\\ #2 \\\\ #3 \\end{pmatrix}}}$";
		if (MathJax.tex2chtml == undefined) {
			MathJax.startup.ready = () => {
				MathJax.startup.defaultReady();
				MathJax.tex2chtml(preamble);
				console.log("Preamble loaded")
			};
		} else {
			MathJax.tex2chtml(preamble);
			console.log("Preamble loaded")
		}
	}

	onunload() {
		console.log("Math plugin unloaded!");
	}
}
