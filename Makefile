EXTENSION="command-keys"
VERSION=`grep "em:version" $(PWD)/src/install.rdf | sed -n -e 's/<.*>\(.*\)<\/.*>/\1/p' | sed 's/^[ \t]*//'`
FILENAME="$(EXTENSION)-$(VERSION).xpi"

help:
	@echo 'Commonly used make targets:'
	@echo '  build		Builds a complete XPI file from "src" dir'

build:
	@echo "Building $(FILENAME)..."
	@cd "src" && zip -q "$(FILENAME)" *
	@mv "src/$(FILENAME)" builds
	@echo "Done!"

.PHONY: help build
