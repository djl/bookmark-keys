EXTENSION="`basename $(PWD)`"
VERSION=`grep "em:version" $(PWD)/src/install.rdf | sed -n -e 's/<.*>\(.*\)<\/.*>/\1/p' | sed 's/^[ \t]*//'`
FILENAME="$(EXTENSION)_$(VERSION).xpi"

build:
	@echo "Building $(FILENAME)..."
	@cd "src" && zip -rq "$(FILENAME)" *
	@mv "src/$(FILENAME)" .
	@echo "Done!"

.PHONY: build
