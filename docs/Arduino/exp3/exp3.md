---
sidebar_position: 3
title: Ultrasonic Distance Measurement
---

# Ultrasonic Distance Measurement

This project measures distance using an ultrasonic sensor.

---

![Ultrasonic](../image/ultra.jpeg)
 
![Mechanism](../image/mech_ultra.jpeg)

---

## How It Works

- Sensor sends ultrasonic pulse.
- Echo returns after hitting object.
- Distance is calculated using time difference.

Distance Formula:

Distance = (Time × 0.034) / 2

---

## Complete Arduino Code

```cpp
int trigPin = 9;
int echoPin = 10;

long duration;
int distance;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.println(distance);

  delay(500);
}
