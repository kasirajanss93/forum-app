install:
	npm install
docker-up:
	docker-compose up -d
db-migrate:
	./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run
run: docker-up 
	sleep 3 && ./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run && npm start

test:
	npm test
