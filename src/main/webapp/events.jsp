<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<%@ page import="model.DBConnection" %>

<html>
<head>
    <title>Events</title>
    <style>
         body { font-family: Arial; background: #f0f0f5; color:#2A1B49; }
                              table {
                                  width: 90%; margin: 40px auto;
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
        h2 { text-align:center; margin-top:30px; }
    </style>
</head>

<body>

<h2>ALL EVENTS</h2>

<%
     Connection conn=null;
     try {
                conn = DBConnection.getConnection(); // get DB connection
            } catch (NullPointerException e) {
                System.out.println(e.getMessage());
            }

        String query = "SELECT * FROM events";
       Statement st = conn.createStatement();
       ResultSet rs = st.executeQuery(query);

%>

<table>
    <tr>

        <th>Event ID</th>
        <th>Club ID</th>
        <th>Event Name</th>
        <th>Venue</th>
        <th>Date</th>
         <th>Description</th>

    </tr>

<%
        while(rs.next()){
%>
    <tr>
        <td><%= rs.getInt(1) %></td>
        <td><%= rs.getInt(2) %></td>
        <td><%= rs.getString(3) %></td>
        <td><%= rs.getString(5) %></td>
        <td><%= rs.getString(4) %></td>
        <td><%= rs.getString(6) %></td>


    </tr>
<%
        }


%>

</table>

</body>
</html>
