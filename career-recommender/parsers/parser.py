from pdfminer.high_level import extract_text
import docx
import os

def parse_pdf(path):
    return extract_text(path)

def parse_docx(path):
    doc = docx.Document(path)
    return "\n".join([p.text for p in doc.paragraphs])

def parse_resume(path):
    ext = os.path.splitext(path)[1].lower()

    if ext == ".pdf":
        return parse_pdf(path)
    elif ext == ".docx":
        return parse_docx(path)
    elif ext == ".txt":
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    else:
        raise Exception("Unsupported file format")
