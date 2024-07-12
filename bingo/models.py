from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class BingoNumber(models.Model):
    number = models.IntegerField(unique="True", validators=[
            MaxValueValidator(90),
            MinValueValidator(1)
        ])
    author = default_text = models.TextField(max_length=100, default="")
    default_text = models.TextField(max_length=100, default="")
    gif_url = models.URLField(default="", blank=True)
    picked = models.BooleanField(default=False)

    def __str__(self):
        return f"Number: {self.number} Picked: {self.picked}, Text: {self.default_text}, Gif: {self.gif_url}"