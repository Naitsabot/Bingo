from django.contrib import admin
from .models import BingoNumber

# Register your models here.

@admin.action(description="Mark selected numbers as picked")
def mark_as_picked(modeladmin, request, queryset):
    queryset.update(picked=True)
    
@admin.action(description="Mark selected numbers as not picked")
def mark_as_not_picked(modeladmin, request, queryset):
    queryset.update(picked=False)
    
class BingoNumberAdmin(admin.ModelAdmin):
    list_display = ("number", "picked", "default_text", "gif_url")
    actions = [mark_as_picked, mark_as_not_picked]
    
    
admin.site.register(BingoNumber, BingoNumberAdmin)