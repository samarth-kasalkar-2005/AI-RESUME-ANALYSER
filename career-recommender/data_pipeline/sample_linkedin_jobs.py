import pandas as pd
import os

INPUT_PATH = "data/raw/linkedin_jobs/linkedin_job_postings.csv"
OUTPUT_PATH = "data/linkedin_jobs_sample.csv"


CHUNK_SIZE = 100_000
TARGET_ROWS = 100_000

columns_needed = [
    "job_title",
    "company",
    "job_location",
    "job_level",
    "job_type"
]


rows_collected = 0
chunks = []

for chunk in pd.read_csv(INPUT_PATH, chunksize=CHUNK_SIZE, usecols=columns_needed):
    chunks.append(chunk)
    rows_collected += len(chunk)

    if rows_collected >= TARGET_ROWS:
        break

sample_df = pd.concat(chunks).head(TARGET_ROWS)
sample_df.dropna(inplace=True)

os.makedirs("data", exist_ok=True)
sample_df.to_csv(OUTPUT_PATH, index=False)

print(f"Sample created: {len(sample_df)} rows saved to {OUTPUT_PATH}")
