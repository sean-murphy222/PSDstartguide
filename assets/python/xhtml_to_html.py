import os
import re

def convert_html_to_html5(file_path):
    """Convert an html file to HTML5 by updating the DOCTYPE, removing XML namespaces, and fixing self-closing tags."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Change DOCTYPE
    content = re.sub(r'<!DOCTYPE html PUBLIC .*?>', '<!DOCTYPE html>', content, flags=re.DOTALL)
    
    # Remove xmlns from <html>
    content = re.sub(r'<html[^>]*xmlns=["\']http://www.w3.org/1999/html["\']', '<html', content)
    
    # Fix self-closing tags
    content = re.sub(r'(<(br|hr|img|input|meta|link|source|col|embed|area|track|wbr)[^>]*)/>', r'\1>', content)
    
    # Remove CDATA sections from <script> and <style>
    content = re.sub(r'<!\[CDATA\[(.*?)\]\]>', r'\1', content, flags=re.DOTALL)
    
    # Remove type attributes from <script> and <link>
    content = re.sub(r'(<script[^>]*?) type=["\']text/javascript["\']', r'\1', content)
    content = re.sub(r'(<link[^>]*?) type=["\']text/css["\']', r'\1', content)
    
    # Save the updated file
    new_file_path = file_path.replace('.html', '.html')
    with open(new_file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f'Converted: {file_path} -> {new_file_path}')


def batch_convert(directory):
    """Convert all html files in a directory to HTML5."""
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                convert_html_to_html5(file_path)


if __name__ == "__main__":
    input_directory = input("Enter the directory containing html files: ")
    batch_convert(input_directory)
    print("Conversion complete!")
