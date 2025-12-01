package model;
public class Club {

        private int clubId;
        private String clubName;
        private int coordinatorId;


      public  int getClubId() {
           return clubId;
       }
        public String getName()
        {
            return clubName;
        }
        public int getCoordinatorId(){
          return coordinatorId;
        }
    public void setName(String name) {
           clubName=name;
    }

    public void setId(int id) {
            clubId=id;
    }

    public void setCoordinatorId(int anInt) {
           coordinatorId=anInt;
    }
}


