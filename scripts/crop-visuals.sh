#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "$0")/.." && pwd)"
source_dir="$root_dir/assets/visual-sources"
target_dir="$root_dir/public/visuals/crops"
mkdir -p "$target_dir"
find "$target_dir" -maxdepth 1 -type f \( -name '*.png' -o -name '*.webp' \) -delete

crop_grid() {
  local source_name="$1"
  local prefix="$2"
  local columns="$3"
  local rows="$4"
  local source_path="$source_dir/$source_name"
  local dimensions width height
  dimensions="$(magick identify -format '%w %h' "$source_path")"
  read -r width height <<< "$dimensions"

  for ((row = 0; row < rows; row++)); do
    for ((column = 0; column < columns; column++)); do
      local x0 x1 y0 y1 cell_width cell_height
      x0=$((column * width / columns))
      x1=$(((column + 1) * width / columns))
      y0=$((row * height / rows))
      y1=$(((row + 1) * height / rows))
      cell_width=$((x1 - x0))
      cell_height=$((y1 - y0))
      magick "$source_path" -crop "${cell_width}x${cell_height}+${x0}+${y0}" +repage -strip -quality 82 -define webp:method=6 "$target_dir/${prefix}-${row}-${column}.webp"
    done
  done
}

crop_cells() {
  local source_name="$1"
  local prefix="$2"
  local x_start_values="$3"
  local x_end_values="$4"
  local y_start_values="$5"
  local y_end_values="$6"
  local source_path="$source_dir/$source_name"
  local -a x_starts x_ends y_starts y_ends
  read -r -a x_starts <<< "$x_start_values"
  read -r -a x_ends <<< "$x_end_values"
  read -r -a y_starts <<< "$y_start_values"
  read -r -a y_ends <<< "$y_end_values"

  for ((row = 0; row < ${#y_starts[@]}; row++)); do
    for ((column = 0; column < ${#x_starts[@]}; column++)); do
      local x0 x1 y0 y1
      x0="${x_starts[$column]}"
      x1="${x_ends[$column]}"
      y0="${y_starts[$row]}"
      y1="${y_ends[$row]}"
      magick "$source_path" -crop "$((x1 - x0))x$((y1 - y0))+$x0+$y0" +repage -strip -quality 82 -define webp:method=6 "$target_dir/${prefix}-${row}-${column}.webp"
    done
  done
}

crop_cells "prevention-icons-a.png" "a" "44 386 736 1086" "360 704 1053 1400" "40 305 558 808" "285 540 789 1035"
crop_cells "prevention-icons-b.png" "b" "44 386 736 1086" "360 704 1053 1400" "40 305 558 808" "285 540 789 1035"
crop_cells "platform-icons.png" "platform" "34 264 491 733 962 1196" "241 472 712 940 1178 1418" "57 297 549 779" "292 550 789 1024"
crop_grid "capabilities-grid.png" "capabilities" 3 2
crop_grid "community-response.png" "community" 2 2
echo "Découpes générées dans $target_dir"
