---
sidebar_position: 1
title: LED and Push Button Control
---

# LED and Push Button Control

This project demonstrates how to control LEDs and a buzzer using push buttons.

---

![led_push_button](../image/led.jpeg)

--- 

![button](../image/push_button.jpeg)

---

## How It Works

- Push buttons act as digital inputs.
- LEDs and buzzer act as outputs.
- When a button is pressed, the corresponding LED turns ON.
- If any button is pressed, the buzzer activates.

---

## Complete Arduino Code

```cpp
int led1 = 12;
int led2 = 10;
int led3 = 8;

int sw1 = 6;
int sw2 = 5;
int sw3 = 2;

int buzzer = 4;

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);

  pinMode(sw1, INPUT);
  pinMode(sw2, INPUT);
  pinMode(sw3, INPUT);

  pinMode(buzzer, OUTPUT);
}

void loop() {
  int s1 = digitalRead(sw1);
  int s2 = digitalRead(sw2);
  int s3 = digitalRead(sw3);

  digitalWrite(led1, s1);
  digitalWrite(led2, s2);
  digitalWrite(led3, s3);

  if (s1 == HIGH || s2 == HIGH || s3 == HIGH)
    digitalWrite(buzzer, HIGH);
  else
    digitalWrite(buzzer, LOW);
}
