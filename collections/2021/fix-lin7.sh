#!/bin/bash

# This script finds all .md files under 'content' and appends a " at the end of line 7

find content -type f -name "*.md" | while read -r file; do
  echo "Fixing $file"
  awk 'NR==7{$0=$0 "\""} {print}' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
done

echo "All files processed."
