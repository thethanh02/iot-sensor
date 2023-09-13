#include "DHT.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// const char* ssid = "";
// const char* password = "";
// const char* mqtt_server = "";
const uint16_t mqtt_port = 1884;

const char* mqtt_sensor_topic = "esp/sensor";
#define DHTPIN 14
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
#define LDRPIN A0

const char* mqtt_ledy_topic = "esp/ledy";
#define LEDYPIN 5

const char* mqtt_fan_topic = "esp/fan";
#define FANPIN 4

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsgSensor = 0;

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  // payload to string
  // char p[length + 1];
  // memcpy(p, payload, length);
  // p[length] = NULL;
  // String message(p);
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];  // Convert *byte to string
  }

  Serial.print(message);
  if (String(topic) == String(mqtt_ledy_topic)) {
    if (message == "on") {
      digitalWrite(LEDYPIN, LOW);
    } else if (message == "off") {
      digitalWrite(LEDYPIN, HIGH);
    }
  } else if (String(topic) == String(mqtt_fan_topic)) {
    if (message == "on") {
      digitalWrite(FANPIN, LOW);
    } else if (message == "off") {
      digitalWrite(FANPIN, HIGH);
    }
  }
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      client.subscribe(mqtt_ledy_topic);
      client.subscribe(mqtt_fan_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(9600);
  setup_wifi();

  pinMode(LDRPIN, INPUT);
  pinMode(LEDYPIN, OUTPUT);
  pinMode(FANPIN, OUTPUT);

  digitalWrite(LEDYPIN, HIGH);
  digitalWrite(FANPIN, HIGH);

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  client.subscribe(mqtt_ledy_topic);
  client.subscribe(mqtt_fan_topic);
}

float temp, hum;
int ldrValue;
int fakeVal1;

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsgSensor > 2000) {
    lastMsgSensor = now;

    // DHT 11
    temp = dht.readTemperature();
    hum = dht.readHumidity();
    ldrValue = analogRead(LDRPIN);
    fakeVal1 = random(10, 100);

    Serial.print("Publish message: ");

    String stringJson = "{\"temperature\":" + String(temp, 2) + ",\"humidity\":" + String(hum, 2) + ",\"light\":" + String((float)ldrValue/10, 1) + ",\"fakeVal1\":" + String(fakeVal1) + "}";

    char buffer[256];
    stringJson.toCharArray(buffer, 256);
    uint16_t packetIdPubSensor = client.publish(mqtt_sensor_topic, buffer);
    Serial.printf("Publishing on topic %s at QoS 1, packetId %i: ", mqtt_sensor_topic, packetIdPubSensor);
    Serial.printf(buffer);
    Serial.println();
  }
}
