test:
	@make jash_spec.js
	@node jash.js example.jsh

jash_spec.js: jash_spec.peg
	@canopy jash_spec.peg
