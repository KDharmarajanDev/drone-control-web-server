import cv2 as cv
import numpy as np
import base64
import time
import os

cap = cv.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if ret:
        retval, buffer = cv.imencode('.jpg', frame)
        text = base64.b64encode(buffer)
        print(text.decode('utf-8'))

cap.release()
cv.destroyAllWindows()

