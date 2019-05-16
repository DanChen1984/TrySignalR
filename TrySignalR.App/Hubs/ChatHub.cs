using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrySignalR.App.Hubs
{
    public class ChatHub: Hub
    {
        private static Dictionary<string, string> onlineUsers = new Dictionary<string, string>();

        public override Task OnConnectedAsync()
        {           
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var user = string.Empty;
            var connectionId = Context.ConnectionId;
            if (onlineUsers.ContainsKey(connectionId))
            {
                user = onlineUsers[connectionId];
                onlineUsers.Remove(Context.ConnectionId);
            }

            var userList = onlineUsers.Select(p => p.Value).ToList();
            Clients.All.SendAsync("UpdateOnlineUsers", userList);

            Clients.All.SendAsync("ReceiveMessage", "System", string.Format("[ {0} ] left the chatting room.", user));

            return base.OnDisconnectedAsync(exception);
        }

        public async Task Connected(string user)
        {
            await Task.Run(() => {
                var connectionId = Context.ConnectionId;
                if (!onlineUsers.ContainsKey(connectionId))
                {
                    onlineUsers.Add(connectionId, user);
                }
                else
                {
                    onlineUsers[connectionId] = user;
                }

                var userList = onlineUsers.Select(p => p.Value).ToList();

                Clients.All.SendAsync("UpdateOnlineUsers", userList);

                Clients.All.SendAsync("ReceiveMessage", "System", string.Format("Welcome [ {0} ] to join the chatting room.", user));
            });
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
