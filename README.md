# Fast Publish

> Reduce the fixed time spent on release note publication.

[![Build Status][travis-image]][travis-url]

## Getting Started

    npm install @servicerocket/tools-fast-release-notes -g --registry=https://ld-npm.performancerocket.com/
    
## CLI Help

Call `fast-release-notes --help` for CLI help.

    Usage:
      fast-release-notes [OPTIONS] <command> [ARGS]
    
    Options:
      -m, --markup [STRING]  Markup type: html | markdown | textile (Default is markdown)
          --confUrl [STRING] Confluence URL (Default is https://intranet.servicerocket.com)
      -sp, --confSpaceKey [STRING]Confluence Space Key (Default is Tools)
          --getSatDomain [STRING]GetSat Domain (Default is servicerocket)
          --getSatProduct STRINGGetSat Product
      -u, --username STRING  Username
      -p, --password STRING  Password
      -t, --title STRING     Title of the post
      -c, --content STRING   Content for publishing
      -f, --file FILE        Read content from file for publishing
      -h, --help             Display help and usage details
    
    Commands:
      confluence-blogpost, getsat-announcement

## How? (v0.0.1)

There are a few scripts, each designed publishing to a specific destination, e.g. to Confluence:

    MARKUP=<html|markdown|textile> URL=https://intranet.servicerocket.com USERNAME=<u> PASSWORD=<p> SPACE=<s> FILE=content.md node --harmony confluence.js

Or to GetSatisfaction:

    MARKUP=<html|markdown|textile> DOMAIN=servicerocket USERNAME=<u> PASSWORD=<p> PRODUCT=<d> FILE=content.md node --harmony getsat.js

When required variables are not provided, you should receive an error, otherwise you may identify them, e.g

    cat confluence.js  | grep -E "[A-Z]{2,}"


[travis-url]: https://travis-ci.org/ServiceRocket/fast-release-notes
[travis-image]: https://travis-ci.org/ServiceRocket/fast-release-notes.svg