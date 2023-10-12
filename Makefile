build:
	@docker-compose -f docker-compose.yml up --build -d --remove-orphans

restart:
	@docker-compose -f docker-compose.yml restart

start:
	@docker-compose -f docker-compose.yml start

stop:
	@docker-compose -f docker-compose.yml stop
