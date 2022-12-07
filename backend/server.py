import time, json
from flask import Flask
import pandas as pd
import plotly
import plotly.express as px

app = Flask(__name__)

@app.route("/members")
def home():
    return {"members": ["member1", "member2", "member3"]}



@app.route('/plot')
def plot_test():
    df = pd.DataFrame({
        "Fruit": ["Apples", "Oranges", "Bananas", "Apples", "Oranges", "Bananas"],
        "Amount": [4, 1, 2, 2, 4, 5],
        "City": ["SF", "SF", "SF", "Montreal", "Montreal", "Montreal"]
    })
    fig = px.bar(df, x="Fruit", y="Amount", color="City", barmode="group")
    graphJSON = plotly.io.to_json(fig, pretty=True)
    return graphJSON




if __name__ == '__main__':
    app.run(debug=True)