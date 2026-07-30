import re


SECTION_PATTERNS = {
    "summary": [
        "summary",
        "professional summary",
        "profile",
        "objective",
        "career objective",
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
        "employment",
        "internship",
        "internships",
    ],
    "projects": [
        "projects",
        "academic projects",
        "personal projects",
        "project experience",
    ],
    "skills": [
        "skills",
        "technical skills",
        "technologies",
        "technical expertise",
        "core competencies",
    ],
    "certifications": [
        "certifications",
        "certificates",
        "courses",
    ],
}


ACTION_VERBS = [
    "developed",
    "built",
    "created",
    "designed",
    "implemented",
    "engineered",
    "optimized",
    "improved",
    "increased",
    "reduced",
    "automated",
    "deployed",
    "integrated",
    "managed",
    "led",
    "collaborated",
    "analyzed",
    "tested",
    "maintained",
    "configured",
    "trained",
    "achieved",
    "delivered",
    "launched",
]


WEAK_PHRASES = [
    "hardworking",
    "hard working",
    "team player",
    "quick learner",
    "fast learner",
    "passionate individual",
    "good communication skills",
    "responsible for",
    "worked on",
    "helped with",
]


def normalize(text):
    if not text:
        return ""

    return re.sub(r"\s+", " ", text.lower()).strip()


def contains_any(text, phrases):
    return any(
        re.search(
            rf"(?<!\w){re.escape(phrase.lower())}(?!\w)",
            text,
        )
        for phrase in phrases
    )


def detect_sections(text):
    normalized = normalize(text)

    sections = {}

    for section, names in SECTION_PATTERNS.items():
        sections[section] = contains_any(
            normalized,
            names
        )

    return sections


def analyze_contact_info(text):
    email_found = bool(
        re.search(
            r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",
            text,
        )
    )

    phone_found = bool(
        re.search(
            r"(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3,5}\)?[\s.-]?)?\d{3,5}[\s.-]?\d{4}",
            text,
        )
    )

    linkedin_found = bool(
        re.search(
            r"(linkedin\.com|linkedin)",
            text,
            re.IGNORECASE,
        )
    )

    github_found = bool(
        re.search(
            r"(github\.com|github)",
            text,
            re.IGNORECASE,
        )
    )

    checks = {
        "email": email_found,
        "phone": phone_found,
        "linkedin": linkedin_found,
        "github": github_found,
    }

    # Email + phone are most important.
    score = 0

    if email_found:
        score += 35

    if phone_found:
        score += 35

    if linkedin_found:
        score += 15

    if github_found:
        score += 15

    return min(score, 100), checks


def analyze_sections(text):
    sections = detect_sections(text)

    # Core sections have greater importance.
    weights = {
        "summary": 10,
        "education": 20,
        "experience": 20,
        "projects": 20,
        "skills": 25,
        "certifications": 5,
    }

    score = sum(
        weight
        for section, weight in weights.items()
        if sections.get(section)
    )

    return min(score, 100), sections


def analyze_action_verbs(text):
    normalized = normalize(text)

    found = sorted({
        verb
        for verb in ACTION_VERBS
        if contains_any(normalized, [verb])
    })

    count = len(found)

    if count >= 8:
        score = 100
    elif count >= 6:
        score = 85
    elif count >= 4:
        score = 70
    elif count >= 2:
        score = 50
    elif count == 1:
        score = 30
    else:
        score = 0

    return score, found


def analyze_measurable_impact(text):
    """
    Detect numbers that often indicate measurable impact:
    percentages, money, user counts, performance changes, etc.
    """

    patterns = [
        r"\b\d+(?:\.\d+)?%",
        r"(?:₹|\$|€|£)\s?\d+(?:[,.]\d+)*",
        r"\b\d+\+?\s+(?:users|clients|customers|projects|requests|records|students|employees|members)\b",
        r"\b(?:increased|improved|reduced|decreased|saved|grew|boosted|optimized)\b.{0,45}\b\d+(?:\.\d+)?%?",
    ]

    matches = []

    for pattern in patterns:
        matches.extend(
            re.findall(
                pattern,
                text,
                flags=re.IGNORECASE,
            )
        )

    count = len(matches)

    if count >= 5:
        score = 100
    elif count >= 3:
        score = 80
    elif count >= 2:
        score = 65
    elif count == 1:
        score = 45
    else:
        score = 15

    return score, count


def analyze_content_length(text):
    words = re.findall(r"\b\w+\b", text)

    count = len(words)

    # Approximate heuristic rather than pretending
    # there is one universally perfect resume length.
    if 300 <= count <= 850:
        score = 100
    elif 200 <= count < 300:
        score = 80
    elif 850 < count <= 1100:
        score = 75
    elif 120 <= count < 200:
        score = 55
    elif count > 1100:
        score = 50
    else:
        score = 30

    return score, count


def analyze_weak_language(text):
    normalized = normalize(text)

    found = sorted({
        phrase
        for phrase in WEAK_PHRASES
        if contains_any(normalized, [phrase])
    })

    if not found:
        score = 100
    elif len(found) == 1:
        score = 80
    elif len(found) == 2:
        score = 60
    elif len(found) == 3:
        score = 40
    else:
        score = 20

    return score, found


def generate_recommendations(
    contact_checks,
    sections,
    action_verbs,
    measurable_count,
    word_count,
    weak_phrases,
):
    recommendations = []

    if not contact_checks["email"]:
        recommendations.append({
            "priority": "high",
            "category": "Contact",
            "message": "Add a professional email address to your resume.",
        })

    if not contact_checks["phone"]:
        recommendations.append({
            "priority": "high",
            "category": "Contact",
            "message": "Add a phone number so recruiters can contact you easily.",
        })

    if not contact_checks["linkedin"]:
        recommendations.append({
            "priority": "medium",
            "category": "Profile",
            "message": "Consider adding your LinkedIn profile.",
        })

    if not contact_checks["github"]:
        recommendations.append({
            "priority": "medium",
            "category": "Profile",
            "message": "For technical roles, adding GitHub can strengthen your profile.",
        })

    if not sections["skills"]:
        recommendations.append({
            "priority": "high",
            "category": "Skills",
            "message": "Add a clearly labelled technical skills section.",
        })

    if not sections["projects"]:
        recommendations.append({
            "priority": "high",
            "category": "Projects",
            "message": "Add a projects section that demonstrates practical experience.",
        })

    if not sections["experience"]:
        recommendations.append({
            "priority": "medium",
            "category": "Experience",
            "message": "Add internship, freelance, volunteer, or relevant practical experience where applicable.",
        })

    if not sections["education"]:
        recommendations.append({
            "priority": "high",
            "category": "Education",
            "message": "Add a clearly labelled education section.",
        })

    if len(action_verbs) < 4:
        recommendations.append({
            "priority": "medium",
            "category": "Writing",
            "message": "Start more achievement bullets with strong action verbs such as Developed, Built, Implemented, Optimized, or Deployed.",
        })

    if measurable_count == 0:
        recommendations.append({
            "priority": "high",
            "category": "Impact",
            "message": "Add measurable outcomes where truthful—for example performance improvements, users served, time saved, records processed, or project results.",
        })

    if word_count < 200:
        recommendations.append({
            "priority": "medium",
            "category": "Content",
            "message": "Your resume appears quite short. Add relevant projects, skills, achievements, or experience rather than filler.",
        })

    if word_count > 1100:
        recommendations.append({
            "priority": "medium",
            "category": "Content",
            "message": "Your resume may be overly long. Remove repetitive or low-value information and prioritize role-relevant achievements.",
        })

    if weak_phrases:
        recommendations.append({
            "priority": "medium",
            "category": "Writing",
            "message": "Replace generic phrases such as "
            + ", ".join(weak_phrases[:3])
            + " with specific evidence or achievements.",
        })

    if not recommendations:
        recommendations.append({
            "priority": "low",
            "category": "Overall",
            "message": "Your resume has a strong basic structure. Focus next on tailoring achievements and keywords to each job description.",
        })

    priority_order = {
        "high": 0,
        "medium": 1,
        "low": 2,
    }

    recommendations.sort(
        key=lambda item: priority_order[item["priority"]]
    )

    return recommendations


def analyze_resume_quality(text):
    """
    Main resume-quality analysis.
    """

    contact_score, contact_checks = analyze_contact_info(text)

    section_score, sections = analyze_sections(text)

    action_score, action_verbs = analyze_action_verbs(text)

    impact_score, measurable_count = analyze_measurable_impact(text)

    length_score, word_count = analyze_content_length(text)

    language_score, weak_phrases = analyze_weak_language(text)

    # Explainable weighted score.
    #
    # Structure       25%
    # Contact         15%
    # Action language 20%
    # Measurable      20%
    # Content length  10%
    # Writing quality 10%

    overall_score = (
        section_score * 0.25
        + contact_score * 0.15
        + action_score * 0.20
        + impact_score * 0.20
        + length_score * 0.10
        + language_score * 0.10
    )

    overall_score = round(
        max(0, min(100, overall_score)),
        2,
    )

    recommendations = generate_recommendations(
        contact_checks,
        sections,
        action_verbs,
        measurable_count,
        word_count,
        weak_phrases,
    )

    return {
        "overall_score": overall_score,

        "score_breakdown": {
            "structure": section_score,
            "contact_information": contact_score,
            "action_language": action_score,
            "measurable_impact": impact_score,
            "content_length": length_score,
            "writing_quality": language_score,
        },

        "sections": sections,

        "contact": contact_checks,

        "action_verbs_found": action_verbs,

        "measurable_achievements": measurable_count,

        "word_count": word_count,

        "weak_phrases": weak_phrases,

        "recommendations": recommendations,
    }