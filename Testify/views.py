from django.views.generic import TemplateView
from Website.models import Brand


class AdminReactView(TemplateView):
    template_name = 'admin-ui/admin-ui.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["brand"] = Brand.objects.get(id=1)
        return context
    