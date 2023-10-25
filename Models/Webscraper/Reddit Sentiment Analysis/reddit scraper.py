from pprint import pprint
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import praw

user_agent = "Scraper 1.0"
reddit = praw.Reddit(
    client_id = "gscPTd0wywq_IjgqoL1Smg",
    client_secret = "UAeWcM7eWeVXQVRJLZehtFq655Dzmw",
    user_agent = user_agent
)
headlines = set()

for submission in reddit.subreddit('politics').hot(limit = None):
    #print(submission.title)
    #print(submission.id)
    #print(submission.author)
    #print(submission.created_utc)
    #print(submission.score)
    #print(submission.upvote_ratio)
    #print(submission.url)
    #break
    headlines.add(submission.title)
for submission in reddit.subreddit('news').hot(limit = None):
    headlines.add(submission.title)
for submission in reddit.subreddit('worldnews').hot(limit = None):
    headlines.add(submission.title)
for submission in reddit.subreddit('technology').hot(limit = None):
    headlines.add(submission.title)
print(len(headlines))
df = pd.DataFrame(headlines)
df.head()