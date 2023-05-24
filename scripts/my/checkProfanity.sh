#!/bin/bash

curl -v -X POST "https://passbolt-moderator-lab.cognitiveservices.azure.com//contentmoderator/moderate/v1.0/ProcessText/Screen?autocorrect=True&PII=True&classify=True" \
-H "Content-Type: text/plain" \
-H "Ocp-Apim-Subscription-Key: 8d7bca9e10c6457e99936b937fe87029" \
--data-ascii "Is this a crap email abcdef@abcd.com, phone: 6657789887, IP: 255.255.255.255, 1 Microsoft Way, shit Redmond, WA 98052 asshole"
