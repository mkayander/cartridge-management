from django.shortcuts import render, redirect


def room(request):
    return redirect("http://localhost:3000/")
    # return render(request, 'chat/room.html', {
    #     'room_name': room_name
    # ***REMOVED***)
