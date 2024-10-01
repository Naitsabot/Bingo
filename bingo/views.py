from django.shortcuts import render, HttpResponse
from django.http import JsonResponse, FileResponse

from .models import BingoNumber

from .utils import PDF_ticket_generator

import json
import random

# Create your views here.

def index(request):
    try:
        bingo_numbers = BingoNumber.objects.order_by("number").all()
        
        bingo_numbers_len = len(bingo_numbers)
        
        context = {
            "bingo_numbers": bingo_numbers,
            "empty_numbers": ["."]*(90-bingo_numbers_len)
        }
        
        return render(request, "bingo/bingo.html", context)
    except:
        return HttpResponse("Error").status_code(404)

def bingo_object(request, number):
    if request.method == "GET":
        try:
            bingo_number = BingoNumber.objects.get(number=number)
            gif_urls = bingo_number.gif_urls.all()
            url = random.choice(gif_urls).url if gif_urls else "/static/bingo/putter.gif"
            text = bingo_number.default_text
            
            context = {
                "url": url,
                "text": text
            }
            
            return JsonResponse(context, safe=False)
        except:
            return JsonResponse({"error": "Bingo number not found"}, status=404)

def bingo_numbers_data(request):
    if request.method == "GET":
        try:
            data = list(BingoNumber.objects.order_by("number").all().filter(picked=True).values())
            
            return JsonResponse(data, safe=False)
        except:
            return JsonResponse({"error": "Error fetching data"}, status=404)
    
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
    
    elif request.method == "DELETE":
        try:            
            bingo_numbers = BingoNumber.objects.all()
            for bingo_number in bingo_numbers:
                bingo_number.picked = False
                bingo_number.save()
        
            return JsonResponse({"success": True})
        except:
            return JsonResponse({"success": False})
        
def card_generator(request):
    if request.method == "GET":
        try:
            return render(request, "bingo/ticketgen.html")
        except:
            return HttpResponse("error").status_code(404)

def card_generator_api(request):
    if request.method == "GET":
        try:
            n = int(request.GET.get("count", 1))
            
            buffer = PDF_ticket_generator(n)
            return FileResponse(buffer, as_attachment=True, filename="hello.pdf")
        except:
            return HttpResponse("error").status_code(404)
    
