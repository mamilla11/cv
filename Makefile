install:
		npm install

publish:
		npm run build
		git add .
		git commit -m 'new build added'
		git push
		git subtree push --prefix dist origin gh-pages

lint:
		npm test
