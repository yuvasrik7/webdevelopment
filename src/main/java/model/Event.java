package model;
public class Event {


        private int eventId;
        private int clubId;
        private String eventName;
        private String date;
        private String venue;
        private String description;

        public void setEventId(int e)
        {
                eventId=e;
        }
        public void setClubId(int clubId) {
               this. clubId=clubId;
        }

        public void setEventName(String eventName) {
                this.eventName=eventName;
        }


        public void setDate(String date) {
                this.date=date;
        }

        public void setVenue(String venue) {
                this.venue=venue;
        }

        public void setDescription(String description) {
                this.description=description;
        }
        public int getEventId() {return eventId;}
        public int getClubId() {
                return clubId;
        }

        public String getEventName() {
                return eventName;
        }

        public String getDate() {
                return date;
        }

        public String getVenue() {
                return venue;
        }

        public String getDescription() {
                return description;
        }
}


