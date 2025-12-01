from rest_framework.response import Response
from rest_framework.decorators import api_view
import base64
from io import BytesIO
from PIL import Image

from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score

import torch
import numpy as np
import pickle
from torchvision import transforms
import torch.nn as nn
device = "cuda" if torch.cuda.is_available() else "cpu"


class SimpleEncoder(nn.Module):
    def __init__(self):
        super().__init__()

        self.conv = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.Conv2d(32, 32, 3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(32, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.Conv2d(64, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(64, 128, 3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.Conv2d(128, 128, 3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(128, 256, 3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),
            nn.Conv2d(256, 256, 3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )

        # THIS REPLACES HUGE FLATTEN LAYER
        self.pool = nn.AdaptiveAvgPool2d((1,1))
        self.fc = nn.Linear(256, 256)   # feature dim = 256

    def forward(self, x):
        x = self.conv(x)
        x = self.pool(x)        # [batch, 256, 1, 1]
        x = x.squeeze(-1).squeeze(-1)  # [batch, 256]
        h = self.fc(x)
        return h

class ProjectionHead(nn.Module):
    def __init__(self, in_dim=256, out_dim=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, 256),
            nn.ReLU(),
            nn.Linear(256, out_dim)
        )

    def forward(self, x):
        return self.net(x)
class SimCLR(nn.Module):
    def __init__(self, encoder, projection_head):
        super().__init__()
        self.encoder = encoder
        self.projection = projection_head

    def forward(self, x):
        h = self.encoder(x)      # feature vector (batch, 256)
        z = self.projection(h)   # projection vector (batch, 128)
        return h, z
class SimpleCNN(nn.Module):
    def __init__(self, num_classes=2):
        super().__init__()
        self.encoder = SimpleEncoder()
        self.classifier = nn.Linear(256, num_classes)

    def forward(self, x):
        h = self.encoder(x)
        out = self.classifier(h)
        return out
encoder = SimpleEncoder()
projection_head = ProjectionHead()
model = SimCLR(encoder, projection_head)

state_dict = torch.load("models/SIMCLR_MODEL.pth", map_location=device)
model.load_state_dict(state_dict)
model.to(device)
model.eval()

encoder = model.encoder

encoder.eval()

pca= pickle.load(open("models/pca.pkl","rb"))
kmeans= pickle.load(open("models/kmeans.pkl","rb"))

infer_transform=transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor()
])


def run_inference(base64_string):
    header,encoded = base64_string.split(',',1)
    image_bytes=base64.b64decode(encoded)
    img= Image.open(BytesIO(image_bytes)).convert("RGB")
    img_tensor= infer_transform(img).unsqueeze(0).to(device)

    with torch.inference_mode():
        h,_=model(img_tensor)

    features=h.cpu().numpy()
    pca_feat=pca.transform(features)
    pred_cluster= kmeans.predict(pca_feat)[0]
    label="Dog" if pred_cluster==0 else "Cat"
    return {
        "label":label
    }

@api_view(['POST'])
def predict(request):
    image_data = request.data.get('image')

    result= run_inference(image_data)
    return Response(result)
    