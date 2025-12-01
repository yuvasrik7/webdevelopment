<%@ page import="java.util.List" %>
<%@ page import="model.Event" %>

<html>
<head>
    <title>Club Events</title>
    <style>

                body { font-family: Arial; background: #f0f0f5; color:#2A1B49; }
                      table {
                          width: 80%; margin: 40px auto;
                          border-collapse: collapse; background: white;
                          box-shadow: 0 0 10px #ccc;
                           border-radius:15px;
                           border:none;
                      }
                      th, td {
                          padding: 12px; border:none;
                          text-align: center;
                          color:#2A1B49;
                      }

                      th { background: #C7B8EA; color:#2A1B49; }
                      tr:hover { background: #E4DAF7; }
          button{
            background:#C7B8EA;
            color:#2A1B49;
            border:none;
            padding:5px;
            border-radius:5px;
            }
            h2{ text-align:center;
            margin-top:30px;}
     </style>
</head>
<body>

<h2>EVENTS FOR THIS CLUB</h2>

<%
    List<Event> events = (List<Event>) request.getAttribute("events");
%>

<table border="1" cellpadding="10">
    <tr>
        <th>EventID</th>
        <th>ClubID</th>
        <th>Event Name</th>
         <th>venue</th>
        <th>Description</th>
        <th>Date</th>
        <th>Registration</th>
    </tr>

<%
    if (events != null && !events.isEmpty()) {
        for (Event e : events) {
%>
    <tr>
         <td><%= e.getEventId() %></td>
        <td><%= e.getClubId() %></td>
        <td><%= e.getEventName() %></td>
          <td><%= e.getVenue()%></td>
        <td><%= e.getDescription() %></td>
        <td><%= e.getDate() %></td>
        <td>
         <form action="registerEvent" method="post">
                    <input type="hidden" name="eventId" value="<%= e.getEventId() %>">
                    <input type="hidden" name="clubId" value="<%= e.getClubId() %>">
                    <input type="hidden" name="eventName" value="<%= e.getEventName() %>">
                    <input type="hidden" name="venue" value="<%= e.getVenue() %>">
                    <input type="hidden" name="date" value="<%= e.getDate() %>">
                    <input type="hidden" name="description" value="<%= e.getDescription() %>">

                    <button type="submit">Register</button>
                </form>
                </td>
    </tr>


<%
        }
    } else {
%>

    <tr><td colspan="4">No events found for this club.</td></tr>
<%
    }
%>


</table>

</body>
</html>
