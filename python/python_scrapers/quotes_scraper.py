import requests
from bs4 import BeautifulSoup

url = "http://quotes.toscrape.com"
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')

quotes = soup.find_all('span', class_='text')
for i, quote in enumerate(quotes, 1):
    print(f"{i}: {quote.text}")