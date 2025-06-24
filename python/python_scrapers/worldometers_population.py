import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://www.worldometers.info/world-population/population-by-country/"
res = requests.get(url)
soup = BeautifulSoup(res.content, 'html.parser')
table = soup.find('table', id='example2')

headers = [th.text.strip() for th in table.find_all('th')]
rows = []
for tr in table.tbody.find_all('tr'):
    row = [td.text.strip() for td in tr.find_all('td')]
    rows.append(row)

df = pd.DataFrame(rows, columns=headers)
df.to_csv("population.csv", index=False)
print("Data saved to population.csv")