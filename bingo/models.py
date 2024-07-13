from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.html import format_html

class BingoNumber(models.Model):
    number = models.IntegerField(unique="True", validators=[
            MaxValueValidator(90),
            MinValueValidator(1)
        ])
    author = default_text = models.TextField(max_length=100, default="")
    default_text = models.TextField(max_length=100, default="")
    picked = models.BooleanField(default=False)

    def __str__(self):
        return f"Number: {self.number} Picked: {self.picked}, Text: {self.default_text}"
    
    def gif_urls_display(self):
        return format_html(
            '<br>'.join([f'<a href="{gif.url}" target="_blank">{gif.url}</a>' for gif in self.gif_urls.all()])
        )

    gif_urls_display.short_description = "GIF URLs"

class GifUrl(models.Model):
    bingo_number = models.ForeignKey(BingoNumber, related_name='gif_urls', on_delete=models.CASCADE)
    url = models.URLField()

    def __str__(self):
        return self.url