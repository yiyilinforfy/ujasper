#!/bin/sh
# Uploads dist/ to S3 with cache headers, then clears the CloudFront cache. Run via `npm run deploy`.
set -e

BUCKET=s3://ujasper.ca
DISTRIBUTION=E2D6WU9O27QFEQ

# Content-hashed build output: a changed file always gets a new name, so browsers may keep it for a year.
# assets/social/* and assets/founding-crest.jpg keep fixed names (social previews, structured data) and are excluded.
aws s3 sync dist/ "$BUCKET" --delete \
  --exclude '*' --include 'assets/*' \
  --exclude 'assets/social/*' --exclude 'assets/founding-crest.jpg' \
  --cache-control 'public, max-age=31536000, immutable'

# Everything else (HTML, PDFs, robots.txt, sitemap.xml, fixed-name images): browsers revalidate on every visit;
# CloudFront may keep a copy for a day because each deploy invalidates it.
aws s3 sync dist/ "$BUCKET" --delete \
  --exclude 'assets/*' \
  --include 'assets/social/*' --include 'assets/founding-crest.jpg' \
  --cache-control 'public, max-age=0, s-maxage=86400, must-revalidate'

aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION" --paths '/*'
