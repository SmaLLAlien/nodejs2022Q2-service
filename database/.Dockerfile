FROM postgres:14-alpine

CMD ["postgres", "-c", "logging_collector=on", "-c", "log_statement=mod"]
