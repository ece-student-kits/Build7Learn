---
sidebar_position: 2
title: IR Sensor and Servo Motor
---

# IR Sensor and Servo Motor

This project detects an object using an IR sensor and controls a servo motor.

---

 ![IR_sensor](../image/ir_sensor_pin.jpeg)

 ---

 ![Servo_motor](../image/servo_motor.jpeg)

 ---

## How It Works

- IR sensor detects object presence.
- When object is detected, servo rotates.
- When no object is detected, servo returns to initial position.

---

## Complete Arduino Code

```cpp
#include <Servo.h>

Servo myServo;
int irPin = 2;

void setup() {
  pinMode(irPin, INPUT);
  myServo.attach(9);
}

void loop() {
  int irValue = digitalRead(irPin);

  if (irValue == LOW) {
    myServo.write(90);
  } else {
    myServo.write(0);
  }

  delay(200);
}
