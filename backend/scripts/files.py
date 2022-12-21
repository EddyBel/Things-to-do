def readFile(file):
    """
    Reads the content of a file.

    Parameters:
    - file (str): the path to the file

    Returns:
    - str: the content of the file
    """
    with open(file, 'r', encoding='utf-8', errors='ignore') as archivo:
        content = archivo.read()
    return content


def getFirstParagraph(text):
    """
    Extracts the first paragraph from a block of text.

    The first paragraph is defined as the text before the first line break.

    Parameters:
    - text (str): the block of text

    Returns:
    - str: the first paragraph of the text
    """
    first_linebreak = text.find('\n')
    if first_linebreak == -1:
        return text
    else:
        first_paragraph, rest_of_text = text.split('\n', 1)
        return first_paragraph


def removeFirstParagraph(text):
    """
    Removes the first paragraph from a block of text.

    The first paragraph is defined as the text before the first line break.

    Parameters:
    - text (str): the block of text

    Returns:
    - str: the text with the first paragraph removed
    """
    first_linebreak = text.find('\n')
    if first_linebreak == -1:
        return ''
    else:
        first_paragraph, rest_of_text = text.split('\n', 1)
        return rest_of_text


def getParagraphs(text):
    """
    Extracts the paragraphs from a block of text.

    A paragraph is defined as a block of text separated by line breaks.

    Parameters:
    - text (str): the block of text

    Returns:
    - list: a list of paragraphs
    """
    paragraphs = text.split('\n')
    paragraphs = [paragraph.strip() for paragraph in paragraphs]
    paragraphs = [paragraph for paragraph in paragraphs if paragraph]
    return paragraphs


def getContentFile(file):
    """
    Extracts the title and content from a file.
    
    The title is defined as the first paragraph of the file. The content is defined as the rest of the text in the file, 
    split into paragraphs.
    
    Parameters:
    - file (str): the path to the file
    
    Returns:
    - dict: a dictionary with the following keys:
        - 'title': the title of the file
        - 'content': the content of the file, as a list of paragraphs
    """
    content = readFile(file)
    title = getFirstParagraph(content)
    body = removeFirstParagraph(content)
    source = getParagraphs(body)

    return {
        "title": title,
        "content": source
    }



if __name__ == "__main__":
    content = readFile("../content/About.md")
    oneParagrapht = getFirstParagraph(content)
    newText = removeFirstParagraph(content)
    text = getContentFile("../content/About.md")
    print(text)
    # print(content)
    # print(oneParagrapht)
    # print(newText)
