require 'fileutils'

TAGS_DIR = "_tags"
LAYOUT = "tag"

# Ambil semua tag dari post
all_tags = Dir["_posts/**/*.md"].flat_map do |file|
  content = File.read(file)
  if content =~ /tags:\s*\[(.*?)\]/m
    $1.split(',').map(&:strip).map { |t| t.gsub(/["']/, '') }
  else
    []
  end
end.uniq

# Buat folder _tags jika belum ada
FileUtils.mkdir_p(TAGS_DIR)

# Generate file markdown untuk tiap tag
all_tags.each do |tag|
  filename = "#{TAGS_DIR}/#{tag.downcase.gsub(' ', '-')}.md"
  unless File.exist?(filename)
    File.write(filename, <<~TAG)
      ---
      layout: #{LAYOUT}
      title: #{tag}
      permalink: /tag/#{tag.downcase.gsub(' ', '-')}/
      ---
    TAG
    puts "Generated tag: #{filename}"
  end
end
