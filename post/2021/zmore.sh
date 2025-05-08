#!/bin/bash

# Requires: pup, curl, mkdir
# Ensure this runs from the folder containing your .md files

for file in *.md; do
  echo "Processing $file..."

  # Extract the wpe_sourcepermalink and image fields
  source_url=$(grep -A1 '^wpe_sourcepermalink:' "$file" | tail -n1 | sed 's/- //')
  image_path=$(grep '^image:' "$file" | awk '{print $2}' | tr -d '"')

  # Skip if either is missing
  if [[ -z "$source_url" || -z "$image_path" ]]; then
    echo "Missing source_url or image_path in $file, skipping..."
    continue
  fi

  echo "Found source_url: $source_url"
  echo "Found image_path: $image_path"

  # Fetch HTML from source URL
  echo "Fetching HTML from source URL..."
  html=$(curl -sL "$source_url")
  if [[ -z "$html" ]]; then
    echo "Failed to download $source_url"
    continue
  fi
  echo "HTML fetched successfully."

  # Extract first image src from <div class="article__body">
  echo "Extracting first image URL from article body..."
  image_url=$(echo "$html" | pup 'div.article__body img attr{src}' | head -n1)

  if [[ -z "$image_url" ]]; then
    echo "No image found in $source_url"
    continue
  fi
  echo "Found image URL: $image_url"

  # Construct final file path
  filename=$(basename "$image_path")
  relative_path=$(dirname "$image_path")
  full_path="themes/lightbi-hugo/assets${relative_path}"

  # Create directory if needed
  echo "Creating directory structure: $full_path"
  mkdir -p "$full_path"

  # Download and save the image
  echo "Downloading and saving image to $full_path/$filename"
  curl -sL "$image_url" -o "$full_path/$filename"
  echo "Image saved successfully."

  # Stop after the first successful file
  break
done
