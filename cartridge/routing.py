from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

import chat.routing
import main.routing

print(chat.routing.websocket_urlpatterns)
print(main.routing.websocket_urlpatterns)
application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns +
            main.routing.websocket_urlpatterns
        )
    ),
    # 'websocket': AuthMiddlewareStack(
    #     URLRouter(
    #         main.routing.websocket_urlpatterns,
    #     )
    # ),
})

