# Fast Publish

This script is meant to reduce the fixed time spent on release note publication.

## How?

There are a few scripts, each designed publishing to a specific destination, e.g. to Confluence:

    MARKDOWN=1 URL=https://intranet.servicerocket.com USERNAME=<u> PASSWORD=<p> SPACE=<s> FILE=content.md node --harmony confluence.js

Or to GetSatisfaction:

    MARKDOWN=1 DOMAIN=servicerocket USERNAME=<u> PASSWORD=<p> PRODUCT=<d> FILE=content.md node --harmony getsat.js

When required variables are not provided, you should receive an error, otherwise you may identify them, e.g

    cat confluence.js  | grep -E "[A-Z]{2,}"

