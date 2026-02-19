---
sidebar_position: 5
title: MQ135 Gas Sensor
---

# MQ135 Air Quality Monitoring

This project monitors air quality using MQ135 gas sensor.

---

![MQ135 gas sensor module featuring a circular sensing element on the control board. The board displays labeled components including output LED, power LED, voltage comparator IC labeled LM393, analog output pin, digital output pin, GND, VCC, and a sensitivity potentiometer for calibration. Blue circuit board with white silk-screen labels and gold-plated pins for connection to Arduino microcontroller](../image/pin_smoke.jpeg)

---
## 1. Introduction

A smoke sensor is a device used to detect the presence of smoke in the air.  
It is commonly used in fire detection and safety systems.

In Arduino projects, the MQ-2 smoke sensor is widely used.  
It can detect:

- Smoke
- LPG gas
- Methane
- Butane
- Hydrogen

The sensor provides both analog and digital outputs and can be easily interfaced with Arduino.

---

## 2. Working

The MQ-2 smoke sensor works based on gas-sensitive material (SnO2 - Tin Dioxide).

1. When clean air is present, the sensor has low conductivity.
2. When smoke or gas is detected, conductivity increases.
3. The sensor converts this change into an electrical signal.
4. Arduino reads the signal (analog or digital).
5. If the value crosses a set threshold, smoke is detected.

The sensor requires a small heating element inside to function properly, which helps detect gases accurately.

---

## How It Works

- MQ135 detects gases like CO₂ and smoke.
- Analog output provides gas concentration value.
- Digital output triggers when threshold exceeds.

---

## Complete Arduino Code

```cpp
int analogPin = A0;
int digitalPin = 2;

void setup() {
  Serial.begin(9600);
  pinMode(digitalPin, INPUT);
}

void loop() {
  int analogValue = analogRead(analogPin);
  int digitalValue = digitalRead(digitalPin);

  Serial.print("Air Quality: ");
  Serial.println(analogValue);

  delay(1000);
}
```

## Connection

![Arduino UNO microcontroller connected to MQ135 sensor module via color-coded wires. Red wire connects VCC, black wire connects GND, blue wire connects to analog input pin A0, and yellow wire connects digital output to pin 2. Diagram shows the complete circuit connection layout for air quality monitoring system](../image/smoke_con.png)