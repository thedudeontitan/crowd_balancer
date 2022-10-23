#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

extern "C" {
  #include <user_interface.h>
}

#define DATA_LENGTH           112

#define TYPE_MANAGEMENT       0x00
#define TYPE_CONTROL          0x01
#define TYPE_DATA             0x02
#define SUBTYPE_PROBE_REQUEST 0x04
#define MAC_ADDR_SIZE 18
#define MAC_ARRAY_SIZE 500 // 500 mac address storage
// #define MIN_RSSI -70
#define MIN_RSSI -100

// wifi details
#define SSID "Airtel"
// #define PASS "12345678"
#define PASS "10012724"

// location details
String LOCATION = "Library";
String FLOOR = "LIB_NO1";

String url = "http://192.168.1.9:5000/update_crowd/?location=Library&floor=LIB_NO1&count=";
// "http://192.168.1.10:5000/?location=Library&floor=LIB_NO1&count=10"



// array to store peer mac address
struct TotalPeopleMacTable{
  /*
    Make a table for all mobile present in that area | Avoids duplication
    stores count of total no of mobiles present in an area
  */
  char mac_array[MAC_ARRAY_SIZE][MAC_ADDR_SIZE];
  int user_count = 0;
};

struct TotalPeopleMacTable mac_table;

int insert_mac_address(char* mac_address){

  bool found = 0;
  for(int i=0;i<=mac_table.user_count;i++){
    if(strcmp(mac_address,mac_table.mac_array[i])==0){
      found=true;
      break;
    }
  }

  if(!found){

    if(mac_table.user_count<MAC_ARRAY_SIZE){
      Serial.print(" Mac Addr Unique: ");
      Serial.print(mac_address);
      Serial.print(" Count: ");
      Serial.print(mac_table.user_count);
      Serial.println();
      strncpy(mac_table.mac_array[mac_table.user_count+1],mac_address,MAC_ADDR_SIZE);
      mac_table.user_count++;
      return 0; // distinct mac address found | added to the table
    }
    else{
      Serial.println("MAC ARRAY size filled");
    }

  }

  return 1; // duplicate mac address not appended

}

struct RxControl {
 signed rssi:8; // signal intensity of packet
 unsigned rate:4;
 unsigned is_group:1;
 unsigned:1;
 unsigned sig_mode:2; // 0:is 11n packet; 1:is not 11n packet;
 unsigned legacy_length:12; // if not 11n packet, shows length of packet.
 unsigned damatch0:1;
 unsigned damatch1:1;
 unsigned bssidmatch0:1;
 unsigned bssidmatch1:1;
 unsigned MCS:7; // if is 11n packet, shows the modulation and code used (range from 0 to 76)
 unsigned CWB:1; // if is 11n packet, shows if is HT40 packet or not
 unsigned HT_length:16;// if is 11n packet, shows length of packet.
 unsigned Smoothing:1;
 unsigned Not_Sounding:1;
 unsigned:1;
 unsigned Aggregation:1;
 unsigned STBC:2;
 unsigned FEC_CODING:1; // if is 11n packet, shows if is LDPC packet or not.
 unsigned SGI:1;
 unsigned rxend_state:8;
 unsigned ampdu_cnt:8;
 unsigned channel:4; //which channel this packet in.
 unsigned:12;
};

struct SnifferPacket{
    struct RxControl rx_ctrl;
    uint8_t data[DATA_LENGTH];
    uint16_t cnt;
    uint16_t len;
};

// Declare each custom function (excluding built-in, such as setup and loop) before it will be called.
// https://docs.platformio.org/en/latest/faq.html#convert-arduino-file-to-c-manually
static void showMetadata(SnifferPacket *snifferPacket);
static void ICACHE_FLASH_ATTR sniffer_callback(uint8_t *buffer, uint16_t length);
static void printDataSpan(uint16_t start, uint16_t size, uint8_t* data);
static void getMAC(char *addr, uint8_t* data, uint16_t offset);
void channelHop();

static void showMetadata(SnifferPacket *snifferPacket) {

  unsigned int frameControl = ((unsigned int)snifferPacket->data[1] << 8) + snifferPacket->data[0];

  // uint8_t version      = (frameControl & 0b0000000000000011) >> 0;
  uint8_t frameType    = (frameControl & 0b0000000000001100) >> 2;
  uint8_t frameSubType = (frameControl & 0b0000000011110000) >> 4;
  // uint8_t toDS         = (frameControl & 0b0000000100000000) >> 8;
  // uint8_t fromDS       = (frameControl & 0b0000001000000000) >> 9;

  // Only look for probe request packets
  if (frameType != TYPE_MANAGEMENT ||
      frameSubType != SUBTYPE_PROBE_REQUEST)
        return;

  // Serial.print(snifferPacket->rx_ctrl.rssi, DEC);

  //  how far is the connection
  // if(snifferPacket->rx_ctrl.rssi>=MIN_RSSI){
    // Serial.print("RSSIM: ");
    // Serial.print(snifferPacket->rx_ctrl.rssi, DEC);
    // Serial.println();
    char addr[] = "00:00:00:00:00:00";
    getMAC(addr, snifferPacket->data, 10);
    insert_mac_address(addr);
  // }
  
}

/**
 * Callback for promiscuous mode
 */
static void ICACHE_FLASH_ATTR sniffer_callback(uint8_t *buffer, uint16_t length) {
  struct SnifferPacket *snifferPacket = (struct SnifferPacket*) buffer;
  showMetadata(snifferPacket);
}

static void printDataSpan(uint16_t start, uint16_t size, uint8_t* data) {
  for(uint16_t i = start; i < DATA_LENGTH && i < start+size; i++) {
    Serial.write(data[i]);
  }
}

static void getMAC(char *addr, uint8_t* data, uint16_t offset) {
  sprintf(addr, "%02x:%02x:%02x:%02x:%02x:%02x", data[offset+0], data[offset+1], data[offset+2], data[offset+3], data[offset+4], data[offset+5]);
}

#define CHANNEL_HOP_INTERVAL_MS   1000
static os_timer_t channelHop_timer;

/**
 * Callback for channel hoping
 */
void channelHop()
{
  // hoping channels 1-13
  uint8 new_channel = wifi_get_channel() + 1;
  if (new_channel > 13) {
    new_channel = 1;
  }
  wifi_set_channel(new_channel);
}


#define DISABLE 0
#define ENABLE  1

void setup() {

  // set the WiFi chip to "promiscuous" mode aka monitor mode
  Serial.begin(115200);


  delay(10);
  wifi_set_opmode(STATION_MODE);
  wifi_set_channel(1);
  wifi_promiscuous_enable(DISABLE);
  delay(10);
  wifi_set_promiscuous_rx_cb(sniffer_callback);
  delay(10);
  wifi_promiscuous_enable(ENABLE);

  // setup the channel hoping callback timer
  os_timer_disarm(&channelHop_timer);
  os_timer_setfn(&channelHop_timer, (os_timer_func_t *) channelHop, NULL);
  os_timer_arm(&channelHop_timer, CHANNEL_HOP_INTERVAL_MS, 1);
}

int time_passed = 0;
// after 30 seconds transfer the data to server

void loop() {

  delay(1000);
  time_passed++;

  if(time_passed==30){

    wifi_promiscuous_enable(DISABLE);
    WiFi.mode(WIFI_STA);
    delay(1000);
    WiFi.begin(SSID,PASS);

        while (WiFi.status() != WL_CONNECTED) {
          delay(1000);
          Serial.println("Connecting to WiFi..");
        }
        Serial.println("Connected to wifi");

        if(WiFi.status()== WL_CONNECTED){
          WiFiClient client;
          HTTPClient http;

          String serverUrl = url+String(mac_table.user_count);
          Serial.println(serverUrl);
          Serial.println(mac_table.user_count);
          // Send request

          http.begin(client,serverUrl);

          int httpResponseCode = http.GET(); //Send the actual POST request

          // Read response
          Serial.print(http.getString());

          if (httpResponseCode > 0)
          {
            String response = http.getString(); //Get the response to the request
            Serial.println(httpResponseCode);   //Print return code
            Serial.println(response);           //Print request answer
          }
          else
          {
            Serial.print("Error on sending POST: ");
            Serial.println(httpResponseCode);

            // Disconnect
            http.end();
          }
        }

        wifi_promiscuous_enable(ENABLE);
        delay(5000);
        time_passed=0;
  }   

 
  
}

