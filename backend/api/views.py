from rest_framework.response import Response
from rest_framework.decorators import api_view
import base64
from io import BytesIO
from PIL import Image


@api_view(['POST'])
def predict(request):
    image_data = request.data.get('image')

    header,encoded = image_data.split(',',1)

    image_bytes=base64.b64decode(encoded)
    img= Image.open(BytesIO(image_bytes)).convert("RGB")
    

    result={
        "label":"Dog"
    }
    return Response(result)
    