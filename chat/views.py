from django.shortcuts import render, redirect


def room(request):
    return redirect("http://it-vlshv.dellin.local/")
    # return render(request, 'chat/room.html', {
    #     'room_name': room_name
    # ***REMOVED***)
