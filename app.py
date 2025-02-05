from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Personalized Riddles about her
responses = {
    "riddle1": "I’m from the land of backwaters, beaches, and spices. I am known for my beautiful landscapes and vibrant culture. Where am I?",
    "riddle2": "I am full of colors, and I create art that speaks to hearts. I capture beauty in every stroke. Who am I?",
    "riddle3": "I was born in the month when the air turns cooler, and the festivals are in full swing. When is my birthday?",
    "riddle4": "I can watch a movie for hours and lose myself in the story. My empathy makes me feel every moment deeply. What am I?",
    "riddle5": "I’m a woman who is always in charge, leading and inspiring. I take charge of my world. Who am I?",
    "reveal": "Vava, I know we are taking it slow but I wanted you to know I am doing this corny thing just for you. I loved doing this hectic thing, fixing mistakes using GPT and trying to make something worthy of you... I failed badly but I am glad I made something for someone I love so dearly."
}

# Compliments for each wrong answer
compliments = [
    "I love your nose—it’s the perfect touch to your beautiful face.",
    "Your lips are absolutely captivating. I can never stop admiring them.",
    "The way your eyes light up when you smile is one of my favorite things.",
    "I could get lost in your hair forever, it's always so soft and beautiful.",
    "Your voice is soothing, like a melody I want to hear every day."
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
    data = request.json
    step = data["step"]
    answer = data["answer"].lower()

    # Handle riddle answer logic
    if step in responses:
        # No right or wrong answer for her riddles, just compliments!
        response = compliments[(int(step[-1]) - 1) % len(compliments)]  # Give a compliment based on the step
        if answer:  # If the user provides an answer
            response = f"There is no correct answer, the answer is you. {response}"
    else:
        response = responses["reveal"]

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
