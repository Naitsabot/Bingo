from django.urls import path

from . import views

urlpatterns = [
    # ex: /bingo - Main Bingo Page
    path("", views.index, name="index"),
    # ex: /bingo/number - Number Detail Page
    #path("<int:number>/", views.number, name="number"),
]
