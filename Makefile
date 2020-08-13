install:
	npm install
docker-up:
	docker-compose up -d
db-migrate:
	./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run

run: docker-up 
	sleep 1 && ./node_modules/.bin/ts-node ./node_modules/.bin/typeorm -c default migration:run && npm start

test:
	npm test

integration-test: docker-up
	  sleep 2 && ./node_modules/.bin/ts-node ./node_modules/.bin/typeorm -c test migration:run && NODE_ENV=test NODE_PORT=3001 npm test && docker-compose down

run-migration: 
	npm run typeorm migration:run

revert-migration: 
	npm run typeorm migration:revert

