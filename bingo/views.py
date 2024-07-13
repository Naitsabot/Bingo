from django.shortcuts import render, HttpResponse
from django.http import JsonResponse

from .models import BingoNumber

import json

# Create your views here.

def index(request):
    bingo_numbers = BingoNumber.objects.order_by("number").all()
    
    bingo_numbers_len = len(bingo_numbers)
    
    context = {
        "bingo_numbers": bingo_numbers,
        "empty_numbers": ["."]*(90-bingo_numbers_len)
    }
    
    return render(request, "bingo/index.html", context)

def bingo_object(request, number):
    if request.method == "GET":
        bingo_number = BingoNumber.objects.get(number=number)
        
        url = bingo_number.gif_url if bingo_number.gif_url != "" else "/static/bingo/putter.gif"
        text = bingo_number.default_text
        
        context = {
            "url": url,
            "text": text
        }
        
        return JsonResponse(context, safe=False)

def bingo_numbers_data(request):
    if request.method == "GET":
        data = list(BingoNumber.objects.order_by("number").all().filter(picked=True).values())
        
        return JsonResponse(data, safe=False)
    
    elif request.method == "POST":
        try:
            data = request.body.decode("utf-8")
            number = json.loads(data)["number"]
            
            bingo_number = BingoNumber.objects.get(number=number)
            bingo_number.picked = True
            bingo_number.save()
        
            return JsonResponse({"success": True})
        except:
            return JsonResponse({"success": False})