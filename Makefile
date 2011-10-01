EXTENSION="`basename $(PWD)`"
VERSION=`grep "em:version" $(PWD)/src/install.rdf | sed -n -e 's/<.*>\(.*\)<\/.*>/\1/p' | sed 's/^[ \t]*//'`
FILENAME="$(EXTENSION)-$(VERSION).xpi"

help:
	@echo 'Commonly used make targets:'
	@echo '  build      Builds a complete XPI file from "src" dir'
	@echo '  release    Builds a complete XPI and sets up the symlink'

build:
	@echo "Building $(FILENAME)..."
	@cd "src" && zip -q "$(FILENAME)" *
	@mv "src/$(FILENAME)" .
	@echo "Done!"

release: build
	@echo
	@echo "Packing..."
	@mkdir -p "builds"
	@rm -rf "builds/$(FILENAME)"
	@mv "$(FILENAME)" builds
	@rm -f "builds/$(EXTENSION)-latest.xpi"
	@cd "builds" && ln -s "$(FILENAME)" "$(EXTENSION)-latest.xpi"
	@echo "Done!"

.PHONY: help build release
