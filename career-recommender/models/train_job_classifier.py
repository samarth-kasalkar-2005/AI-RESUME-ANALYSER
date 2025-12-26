import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load resume dataset
df = pd.read_csv("data/resumes.csv")

X = df["Resume"].astype(str)
y = df["Category"]

# Vectorizer
tfidf = TfidfVectorizer(
    max_features=30000,
    ngram_range=(1,2),
    stop_words="english"
)

X_vec = tfidf.fit_transform(X)

# Model
model = LogisticRegression(max_iter=2000)
model.fit(X_vec, y)

# Save model
joblib.dump(model, "models/job_classifier.pkl")
joblib.dump(tfidf, "models/tfidf.pkl")

print("Job classifier trained successfully")
