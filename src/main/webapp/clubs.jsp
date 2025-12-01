<%@ page import="java.util.List" %>

<%@ page import="model.Club" %>   <!-- change package if different -->
<!DOCTYPE html>
<html>
<head>
    <title>Clubs</title>
    <style>
        body { font-family: Arial; background: #f0f0f5; color:#2A1B49; }
        table {
            width: 60%; margin: 40px auto;
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

        a{  text-decoration:none;
        color:#2A1B49;
        }
        h2{
        text-align:center;
        color:#2A1B49;
    </style>
</head>
<body>



<h2>AVAILABLE CLUBS</h2>

<%
    List<Club> clubs = (List<Club>) request.getAttribute("clubsList");
    int num=Integer.parseInt(request.getParameter("num"));
%>

<table border="1" cellpadding="10">
    <tr>
        <th>ID</th>
        <th>Club Name</th>
        <th>Description</th>
    </tr>

<%

    for (Club c : clubs) {
%>
    <tr>
        <td><%= c.getClubId() %></td>
        <td>
        <% if (num == 6) { %>
                   <a href="createEvent?clubId=<%= c.getClubId() %>">
                       <%= c.getName() %>
                   </a>
               <% } else { %>
                   <%= c.getName() %>
               <% } %>
        </td>
        <td><%= c.getCoordinatorId() %></td>
    </tr>
<%
    }

%>
</table>

</body>
</html>
