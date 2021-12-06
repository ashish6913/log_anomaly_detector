import re
import nltk
import pickle
from nltk.corpus import stopwords
import csv
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from sklearn.model_selection import train_test_split
from nltk.stem import WordNetLemmatizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score


nltk.download('stopwords')
nltk.download('wordnet')
stemmer = WordNetLemmatizer()

# open the file in the read mode
f = open('final_log_data.csv', 'r')

# create the csv reader
csv_reader = csv.reader(f)
next(csv_reader, None)  # skip the headers

num_of_comments = 1000
i = 1
comments = []
durations = []
labels = []
for row in csv_reader:
    comment = row[2]
    duration = row[0]
    label = row[3]

    # Substituting multiple spaces with single space
    comment = re.sub(r'\s+', ' ', comment, flags=re.I)

    # Converting to Lowercase
    comment = comment.lower()
    
    # Lemmatization
    comment = comment.split()
    comment = [stemmer.lemmatize(word) for word in comment]
    comment = ' '.join(comment)
    
    comments.append(comment)
    durations.append(duration)
    labels.append(label)

    i = i + 1
    if i > num_of_comments:
        break

f.close()

# TFIDF Vectorizer
tfidfconverter = TfidfVectorizer(max_features=1000, stop_words=stopwords.words('english'))
tfidfconverter = tfidfconverter.fit(comments)
comments_features = tfidfconverter.transform(comments).toarray()

# Combining durations with vectorized matrix
A = np.array(durations)[:,None]
X = np.concatenate((A, comments_features), axis=1)

# Dividing data into training and test data - 80/20 percent
X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.2, random_state=1, stratify=labels)

classifier = LogisticRegression(solver='liblinear', random_state=1)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)

with open('classifier', 'wb') as picklefile:
    pickle.dump(classifier,picklefile)

print(confusion_matrix(y_test,y_pred))
print(classification_report(y_test,y_pred))
print(accuracy_score(y_test, y_pred))

