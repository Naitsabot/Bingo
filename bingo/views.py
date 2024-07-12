from django.shortcuts import render

from .models import BingoNumber

# Create your views here.

def index(request):
    bingo_numbers = BingoNumber.objects.order_by("number").all()
    
    bingo_numbers_len = len(bingo_numbers)
    
    context = {
        "bingo_numbers": bingo_numbers,
        "empty_numbers": ["."]*(90-bingo_numbers_len)
    }
    
    return render(request, "bingo/index.html", context)
