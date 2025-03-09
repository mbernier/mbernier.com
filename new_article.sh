#!/bin/bash

# Create a slug from the title (lowercase, replace spaces with hyphens, remove special chars)
SLUG=$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')

# Copy template to new file with the slug name
cp my-website/src/content/templates/articles.md "my-website/src/content/articles/$SLUG.md"

# Replace placeholder values in the new file
sed -i '' "s/title: \".*\"/title: \"$1\"/" "my-website/src/content/articles/$SLUG.md"
sed -i '' "s/date: \".*\"/date: \"$(date +%Y-%m-%d)\"/" "my-website/src/content/articles/$SLUG.md"
sed -i '' "s|canonical_url: \".*\"|canonical_url: \"$2\"|" "my-website/src/content/articles/$SLUG.md"

# Open the new file in the default editor
open "my-website/src/content/articles/$SLUG.md"

echo "Created new article: $SLUG.md"

# Example usage:
# ./new_article.sh "Your wiki doesn't suck. Your wiki entry points suck." "https://mbernier.medium.com/your-wiki-doesnt-suck-your-wiki-entry-points-suck-d16497539056"