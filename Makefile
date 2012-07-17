EXTENSION="`basename $(PWD)`"
VERSION=`grep "em:version" $(PWD)/src/install.rdf | sed -n -e 's/<.*>\(.*\)<\/.*>/\1/p' | sed 's/^[ \t]*//'`
FILENAME="$(EXTENSION)-$(VERSION).xpi"

help:
	@echo 'Commonly used make targets:'
	@echo '  build      Builds a complete XPI file from "src" dir'
	@echo '  release    Builds a complete XPI and sets up the symlink'

build:
	@echo "Building $(FILENAME)..."
	@cd "src" && zip -rq "$(FILENAME)" *
	@mv "src/$(FILENAME)" .
	@echo "Done!"

.PHONY: help build
