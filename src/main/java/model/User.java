package model;
public class User {

        private int id;
        private String name;
        private String email;
        private String password;
        private String role; // student / admin / coordinator
       public User(){}

       public User(String name, String email, String password, String role)
       {
           this.name=name;
           this.email=email;
           this.password=password;
           this.role=role;
       }
       public int getId()
       {
           return id;
       }
      public String getName()
      {
          return name;
      }
      public String getEmail()
      {
          return email;
      }
      public String getPassword()
      {
          return password;
      }
      public String getRole()
      {
          return role;
      }
      public void setIdu(int id1)
      {
           id=id1;
      }


    public void setNameu(String name1) {
             name =name1;
    }

    public void setRoleu(String role1) {
           role=role1;
    }

    public void setPassword(String password) {
           this.password=password;
    }

    public void setemail(String email) {
           this.email=email;
    }
}

