from django.urls import include, path

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = [

    path(r'cricket/', include('cricket.api_urls')),
]
