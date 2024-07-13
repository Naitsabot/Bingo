from django.contrib import admin
from .models import BingoNumber, GifUrl

# Register your models here.

@admin.action(description="Mark selected numbers as picked")
def mark_as_picked(modeladmin, request, queryset):
    queryset.update(picked=True)
    
@admin.action(description="Mark selected numbers as not picked")
def mark_as_not_picked(modeladmin, request, queryset):
    queryset.update(picked=False)

class GifUrlInline(admin.TabularInline):
    model = GifUrl
    extra = 1  # Show at least one blank field for adding new URLs

class BingoNumberAdmin(admin.ModelAdmin):
    list_display = ("number", "picked", "default_text", "gif_urls_display")
    actions = [mark_as_picked, mark_as_not_picked]
    inlines = [GifUrlInline]
    
    
admin.site.register(BingoNumber, BingoNumberAdmin)
admin.site.register(GifUrl)