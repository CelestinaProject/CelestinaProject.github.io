import os
import json

def process_text_files(directory):
    formatted_texts = []

    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                lines = file.readlines()

                for line in lines:
                    # Strip the line of leading/trailing whitespace and skip empty lines
                    stripped_line = line.strip()
                    if stripped_line:
                        formatted_texts.append({
                            "text": stripped_line,
                            "styles": ""
                        })

    return formatted_texts

def save_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    directory = "text_files"  # The directory where your text files are located
    output_file = "formatted_texts.json"  # The output JSON file

    formatted_texts = process_text_files(directory)
    save_to_json(formatted_texts, output_file)

    print(f"Processed {len(formatted_texts)} text entries and saved to {output_file}")
