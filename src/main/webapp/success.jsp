<%@ page import="java.sql.*" %>
<%@ page import="model.User" %>
<%@ page import="model.DBConnection" %>

<html>
<head>
    <title>Registration Success</title>
    <style>
        body { font-family: Arial; background: #f0f0f5; color:#2A1B49; }
        table {
            width: 80%; margin: 40px auto;
            border-collapse: collapse; background: white;
            box-shadow: 0 0 10px #ccc;
            border-radius:15px;
        }
        th, td {
            padding: 12px; text-align: center; color:#2A1B49;
        }
        th { background: #C7B8EA; }
        tr:hover { background: #E4DAF7; }
        h2 { text-align:center; margin-top:30px; }
    </style>
</head>

<body>

<h2>All Registrations</h2>

<%
 HttpSession session = request.getSession(false);

        if (session == null) {
            System.out.println("SESSION IS NULL");
            response.sendRedirect("login.jsp");
            return;
        }

        User u = (User) session.getAttribute("user");

        if (u == null) {
            System.out.println("USER is null in session");
            response.sendRedirect("login.jsp");
            return;
        }

Connection conn = null;
PreparedStatement ps = null;
ResultSet rs = null;

try {
    System.out.println("not null");
    conn = DBConnection.getConnection();
    String query = "SELECT * FROM registrations WHERE name=?";
    ps = conn.prepareStatement(query);
    ps.setString(1, u.getName());
    rs = ps.executeQuery();
%>

<table>
    <tr>
        <th>Reg ID</th>
        <th>Name</th>
        <th>Event ID</th>
        <th>Club ID</th>
        <th>Club Name</th>
        <th>Event Name</th>
        <th>Venue</th>
        <th>Date</th>
    </tr>

<%
    while(rs.next()) {
%>
    <tr>
        <td><%= rs.getInt(1) %></td>
        <td><%= rs.getString(2) %></td>
        <td><%= rs.getInt(3) %></td>
        <td><%= rs.getInt(4) %></td>
        <td><%= rs.getString(5) %></td>
        <td><%= rs.getString(6) %></td>
        <td><%= rs.getString(7) %></td>
        <td><%= rs.getString(8) %></td>
    </tr>
<%
    }
} catch(Exception e) {
    e.printStackTrace();
} finally {
    if(rs != null) try { rs.close(); } catch(Exception e){}
    if(ps != null) try { ps.close(); } catch(Exception e){}
    if(conn != null) try { conn.close(); } catch(Exception e){}
}
%>

</table>

</body>
</html>
