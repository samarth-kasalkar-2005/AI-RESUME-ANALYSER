import re


SECTION_ALIASES = {
    "summary": [
        "summary",
        "professional summary",
        "profile",
        "career objective",
        "objective",
        "about me",
    ],

    "education": [
        "education",
        "academic background",
        "academic qualifications",
        "qualifications",
    ],

    "experience": [
        "experience",
        "work experience",
        "professional experience",
        "employment history",
        "internship",
        "internships",
    ],

    "projects": [
        "projects",
        "personal projects",
        "academic projects",
        "project experience",
        "key projects",
    ],

    "skills": [
        "skills",
        "technical skills",
        "technical expertise",
        "technologies",
        "core competencies",
    ],

    "certifications": [
        "certifications",
        "certificates",
        "courses",
        "licenses & certifications",
    ],
}


def clean_text(text):
    """Basic cleanup while preserving line structure."""

    if not text:
        return ""

    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")

    # Remove excessive spaces but preserve newlines
    text = re.sub(r"[ \t]+", " ", text)

    # Avoid huge blocks of empty lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def normalize_heading(text):
    """Normalize a potential section heading."""

    text = text.lower().strip()

    text = re.sub(
        r"[^a-z0-9+#/& ]",
        "",
        text,
    )

    text = re.sub(
        r"\s+",
        " ",
        text,
    )

    return text.strip()


def identify_section(line):
    """
    Determine whether a line represents
    a known resume section heading.
    """

    normalized = normalize_heading(line)

    # Resume headings should generally be short.
    if not normalized or len(normalized) > 40:
        return None

    for section, aliases in SECTION_ALIASES.items():

        for alias in aliases:

            if normalized == alias:
                return section

    return None


def parse_resume_sections(text):
    """
    Split resume text into logical sections.

    Anything before the first recognized heading
    is stored as 'header'.
    """

    text = clean_text(text)

    sections = {
        "header": "",
        "summary": "",
        "education": "",
        "experience": "",
        "projects": "",
        "skills": "",
        "certifications": "",
    }

    if not text:
        return sections

    current_section = "header"

    lines = text.split("\n")

    buffers = {
        key: []
        for key in sections
    }

    for raw_line in lines:

        line = raw_line.strip()

        if not line:
            continue

        detected_section = identify_section(line)

        if detected_section:

            current_section = detected_section
            continue

        buffers[current_section].append(line)

    for section, content in buffers.items():

        sections[section] = "\n".join(
            content
        ).strip()

    return sections


def count_words(text):
    return len(
        re.findall(
            r"\b[\w+#.-]+\b",
            text
        )
    )


def analyze_section_content(sections):
    """
    Produce basic metadata that can later be
    consumed by the AI recruiter.
    """

    analysis = {}

    for section, content in sections.items():

        word_count = count_words(content)

        analysis[section] = {
            "present": bool(content.strip()),
            "word_count": word_count,
        }

    return analysis


def build_resume_structure(text):
    """
    Main public function.
    """

    sections = parse_resume_sections(text)

    metadata = analyze_section_content(
        sections
    )

    return {
        "sections": sections,
        "metadata": metadata,
    }