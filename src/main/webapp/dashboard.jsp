<%@ page import="model.User" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<%@ page import="model.DBConnection" %>
<%
    User u = (User) session.getAttribute("user");

    if (u == null) {
        request.getRequestDispatcher("/loginnew").forward(request, response);
        return;
    }
%>
<%
     Connection conn=null;
     int count=0;
     int countclub=0;
     int counte=0;
     ResultSet rs=null;
     try {
                conn = DBConnection.getConnection(); // get DB connection
            } catch (NullPointerException e) {
                System.out.println(e.getMessage());
            }


       Statement st = conn.createStatement();
      rs= st.executeQuery("select count(*) from users");
while(rs.next())
{    count=rs.getInt(1);
}
rs=st.executeQuery("select count(*) from clubs");
while(rs.next())
{    countclub=rs.getInt(1);
}
  rs=st.executeQuery("select count(*) from events");
  while(rs.next())
  {
    counte=rs.getInt(1);
    }
%>

<html>
<head>
    <title>Dashboard</title>

    <style>
        body {
            margin: 0;
            font-family: Arial;
            background: #F3EEFB;
        }

        /* Sidebar */
        .sidebar {
            width: 240px;
            height: 100vh;
            background: #2A1B49;
            padding-top: 30px;
            position: fixed;
        }

        .sidebar h2 {
            color: white;
            text-align: center;
            margin-bottom: 30px;
        }

        .sidebar a {
            display: block;
            padding: 14px 25px;
            font-size: 16px;
            color: #E4DAF7;
            text-decoration: none;
            border-radius: 8px;
            margin: 6px 15px;
        }

        .sidebar a:hover {
            background: #C7B8EA;
            color: #2A1B49;
        }

        /* Main dashboard section */
        .main {
            margin-left: 260px;
            padding: 30px;
        }

        .heading {
            font-size: 28px;
            color: #2A1B49;
            margin-bottom: 20px;
        }

        /* Dashboard cards */
        .cards {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
        }

        .card {
            flex: 1;
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 0 12px rgba(0,0,0,0.1);
            color: #2A1B49;
            font-size: 20px;
            text-align: center;
            transition: 0.3s;
        }

        .card:hover {
            background: #E4DAF7;
            cursor: pointer;
        }

        /* User box */
        .box {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 0 12px rgba(0,0,0,0.1);
            width: 85%;
            margin: 20px auto;
            color: #2A1B49;
        }

        .box h2 {
            margin-top: 0;
            color: #2A1B49;
        }

        .box a {
            display: block;
            background: #2A1B49;
            color: #ffffff;
            padding: 12px;
            border-radius: 10px;
            text-decoration: none;
            margin-bottom: 10px;
            text-align: center;
            transition: 0.3s;
        }

        .box a:hover {
            background: #4b3580;
        }
    </style>
</head>

<body>

<!-- Sidebar -->
<div class="sidebar">
    <h2>Dashboard</h2>
    <a href="#">Home</a>
    <a href="#">Registrations</a>
    <a href="#">Clubs</a>
    <a href="#">Events</a>
    <a href="index.jsp">Logout</a>
</div>

<!-- Main Dashboard Area -->
<div class="main">

    <div class="heading">Welcome to the inter-college club events</div>

    <div class="cards">
       <div class="card">Total Students <%=count%> </div>

        <div class="card">Registered Clubs  <%=countclub%></div>
        <div class="card">Upcoming Events   <%=counte%></div>
    </div>

    <!-- User info + Actions box -->
    <div class="box">
        <h2>Welcome, <%= u.getName() %>!</h2>
        <h4>Your Role: <%= u.getRole() %></h4>
          <% if (u.getRole().equalsIgnoreCase("student")) { %>
                     <a href="clubs?num=5">View Clubs</a>
                 <% } %>

        <a href="events.jsp">View Events</a>
         <a href="clubs?num=6">Make Registrations</a>


        <% if (u.getRole().equalsIgnoreCase("coordinator")) { %>
            <a href="createEvent.jsp">Create New Event</a>
            <a href="manageEvents.jsp">Manage My Events</a>
        <% } %>

        <% if (u.getRole().equalsIgnoreCase("admin")) { %>
            <a href="addClub.jsp">Add New Club</a>
            <a href="allUsers.jsp">Manage Users</a>
            <a href="allEvents.jsp">All Events Overview</a>
        <% } %>

        <a href="index.jsp">Logout</a>
    </div>

</div>

</body>
</html>
