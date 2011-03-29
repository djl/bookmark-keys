EXTENSION="`basename $(PWD)`"
VERSION=`grep "em:version" $(PWD)/src/install.rdf | sed -n -e 's/<.*>\(.*\)<\/.*>/\1/p' | sed 's/^[ \t]*//'`
FILENAME="$(EXTENSION)-$(VERSION).xpi"

help:
	@echo 'Commonly used make targets:'
	@echo '  build      Builds a complete XPI file from "src" dir'

build:
	@echo "Building $(FILENAME)..."
	@if [ -f "builds/$(FILENAME)" ]; then rm -f "builds/$(FILENAME)"; fi
	@cd "src" && zip -q "$(FILENAME)" *
	@mv "src/$(FILENAME)" builds
	@cd "builds" && rm -f "$(EXTENSION)-latest.xpi"
	@cd "builds" && ln -s "$(FILENAME)" "$(EXTENSION)-latest.xpi"
	@echo "Done!"

.PHONY: help build
