from django.urls import path

from . import views

urlpatterns = [
    # ex: /bingo - Main Bingo Page
    path("", views.index, name="index"),
    # ex: /bingo/api/datanumbers/ - API Data - GET all picked numbers - POST pick a number
    path("api/data/numbers/", views.bingo_numbers_data, name='bingo_numbers_data'),
    # ex: /bingo/api/data/numbers/$number - API Data - GET number detail/object
    path("api/data/numbers/<int:number>/", views.bingo_object, name='bingo_object'),
    # ex: /bingo/gen/ - Generate Bingo Card
    path("gen/", views.card_generator, name='card_generator'),
    # ex: /bingo/api/card/ - API Data - GET generated card in pdf format
    path("api/tickets/", views.card_generator_api, name='card_generator_api'),
    
]
