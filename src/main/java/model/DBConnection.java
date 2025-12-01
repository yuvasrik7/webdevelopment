package model;
import java.sql.Connection;
import java.sql.DriverManager;
public class DBConnection {

    static String url = "jdbc:mysql://127.0.0.1:3306/collegedb";
    // or use //127.0.0.1:1521/XE
    static String user = "root";
    static String password = "Krishnaveni@123";
    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
