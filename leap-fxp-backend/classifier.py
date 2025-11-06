# Use a pipeline as a high-level helper

from transformers import pipeline

pipe = pipeline("image-classification", model="imzynoxprince/pokemons-image-classifier-gen1-gen9")
pipe("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parrots.png")

# Load model directly
from transformers import AutoImageProcessor, AutoModelForImageClassification

processor = AutoImageProcessor.from_pretrained("imzynoxprince/pokemons-image-classifier-gen1-gen9")
model = AutoModelForImageClassification.from_pretrained("imzynoxprince/pokemons-image-classifier-gen1-gen9")    

from transformers import pipeline
from PIL import Image

clf = pipeline("image-classification", model="imzynoxprince/pokemons-image-classifier-gen1-gen9")

def predict(img, number):
    preds = clf(img)
    with open('labels.txt', 'r') as file:
        data = file.read()
        names = data.split('\n')
        print(names)
        ans = names[number]
        for p in preds:
            print(p)
        print(ans, preds[number]['label'])
        if preds[number]['label'] == ans:
            return False
        else:
            return True
