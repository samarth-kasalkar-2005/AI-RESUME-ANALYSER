import spacy

nlp = spacy.load("en_core_web_sm")

SKILLS = [
    "python", "java", "c++",
    "machine learning", "deep learning",
    "sql", "mongodb", "mysql",
    "pandas", "numpy", "scikit-learn",
    "react", "node.js", "javascript"
]

def extract_skills(text):
    text = text.lower()
    found = []

    # keyword match
    for skill in SKILLS:
        if skill in text:
            found.append(skill)

    # spaCy entities
    doc = nlp(text)
    for ent in doc.ents:
        if ent.text.lower() in SKILLS:
            found.append(ent.text.lower())

    return list(set(found))
