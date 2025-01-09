from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF

def classify_pages_by_topic(pages_text, num_topics=5):
    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    X = vectorizer.fit_transform(pages_text)

    model = NMF(n_components=num_topics, random_state=42)
    W = model.fit_transform(X)
    H = model.components_

    feature_names = vectorizer.get_feature_names_out()
    page_topics = []
    for idx, weights in enumerate(W):
        topic_idx = weights.argmax()
        keywords = [feature_names[i] for i in H[topic_idx].argsort()[:-10 - 1:-1]]
        page_topics.append((idx, topic_idx, keywords))
    return page_topics
